import Program from "../core/Program";
import DrawCallData from "../core/DrawCallData";
import Vec3 from "../math/Vec3";

var vertex = `precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aUV;

uniform mat4 globalTransform;
uniform mat3 normalMatrix;

struct Camera
{
  mat4 transform;
  mat4 globalTransform;
  mat4 projection;
  vec3 position;
};

uniform Camera camera;

varying vec3 vWorldPosition;
varying vec3 vSurfaceNormal;
varying vec3 vCameraPosition;

vec4 origin = vec4(vec3(0.0), 1.0);

void main(void)
{

  vec4 vertexWorldPosition = globalTransform * vec4(aVertexPosition, 1.0); 
  vWorldPosition = vertexWorldPosition.xyz;
  vSurfaceNormal = normalMatrix * aVertexNormal;
  vCameraPosition = (camera.globalTransform * origin).xyz;
  gl_Position = camera.projection * camera.transform * vertexWorldPosition;
}`;



var fragment = `precision mediump float;


struct LightModel
{
  vec3 specular;
  vec3 diffuse;
  vec3 ambient;
};

struct MaterialInfos{
  LightModel lightModel;
  float shininess;
};

struct DirectionalLight {
  LightModel lightModel;
  vec3 direction;
  mat4 globalTransform;
};

struct SpotLight {
  LightModel lightModel;
  vec3 direction;
  vec3 position;
  vec3 attenuation;
  float coneAngle;
  mat4 globalTransform;
};

struct PointLight {
  LightModel lightModel;
  vec3 position;
  vec3 attenuation;
  mat4 globalTransform;
};


uniform vec3 ambientLight;
uniform MaterialInfos material;
const vec3 off = vec3(-1.0, 0.0, 1.0);
varying vec3 vWorldPosition;
varying vec3 vSurfaceNormal;
varying vec3 vCameraPosition;


#ifdef DIRECTIONAL_LIGHT_COUNT
uniform DirectionalLight directionalLights[DIRECTIONAL_LIGHT_COUNT];
#endif
#ifdef SPOT_LIGHT_COUNT
uniform SpotLight spotLights[SPOT_LIGHT_COUNT];
#endif
#ifdef POINT_LIGHT_COUNT
uniform PointLight pointLights[POINT_LIGHT_COUNT];
#endif


vec3 phong(vec3 surfaceNormal, vec3 viewDir, vec3 lightDir, LightModel lightModel, MaterialInfos material)
{
  float facing = 2.0 * float(gl_FrontFacing) - 1.0;
  vec3 lightReflect = reflect(lightDir, facing * surfaceNormal);
  LightModel mLightModel = material.lightModel;
  float diffuseDot = max(facing * dot(lightDir, surfaceNormal), 0.0);
  vec3 t1 = mLightModel.diffuse * diffuseDot * lightModel.diffuse;
  vec3 t2 = step(0.0, diffuseDot) * mLightModel.specular * pow(max(dot(lightReflect, -viewDir), 0.0), material.shininess) * lightModel.specular;
  return t1 + t2;
}

vec3 lights(vec3 surfacePosition, vec3 surfaceNormal, vec3 viewDir, MaterialInfos material)
{
  vec3 lightContribution = vec3(0.0);
  #ifdef DIRECTIONAL_LIGHT_COUNT
  for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++){
    DirectionalLight light = directionalLights[i];
    vec3 lightDir = -normalize(light.direction);//missing transformation
    lightContribution += phong(surfaceNormal, viewDir, lightDir, light.lightModel, material);
  }
  #endif

  #ifdef POINT_LIGHT_COUNT
  for(int i = 0; i < POINT_LIGHT_COUNT; i++){
    PointLight light = pointLights[i];
    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;
    //float dist = length(sampleToLight);
    //vec3 lAtt = normalize(light.attenuation);
    //float attenuation = 1.0 / (lAtt.x + lAtt.y * dist + lAtt.z * dist * dist);
    float attenuation = 1.0;
    lightContribution += attenuation * phong(surfaceNormal, viewDir, normalize(sampleToLight), light.lightModel, material);
  }
  #endif

  #ifdef SPOT_LIGHT_COUNT
  for(int i = 0; i < SPOT_LIGHT_COUNT; i++){
    SpotLight light = spotLights[i];
    vec3 sampleToLight = surfacePosition - (light.globalTransform * vec4(light.direction, 1.0)).xyz;
    float cone = dot(normalize(-lightDir), normalize(light.direction));
    float spot = step(cone, cos(light.coneAngle)) * cone;
    float attenuation = spot / (light.attenuation.x * light.attenuation.y * sampleDist + light.attenuation.z * sampleDist * sampleDist)
    lightContribution += phong(surfaceNormal, viewDir, sampleToLight, light.lightModel, material);
  }
  #endif
  return lightContribution;
}



/*vec4 bump(sampler2D image, vec2 pos, vec2 dir){
  vec3 delta = 0.01 * offset;
  float mid = texture2D(image, pos).x;
  float left = texture2D(image, pos + delta.xy).x;
  float right = texture2D(image, pos + delta.zy).x;
  float top = texture2D(image, pos + delta.yx).x;
  float bottom = texture2D(image, pos + delta.yz).x;
  vec3 va = normalize(vec3(size.xy, dir.x * (right - left)));
  vec3 vb = normalize(vec3(size.yx, dir.y * (bottom - top)));
  return vec4(cross(va, vb), mid);
}*/



void main(void)
{
  vec3 viewDir = normalize(vCameraPosition - vWorldPosition);
  vec3 surfaceNormal = normalize(vSurfaceNormal);

  vec3 lightValue = material.lightModel.ambient * ambientLight + lights(vWorldPosition, surfaceNormal, viewDir, material);

  gl_FragColor = vec4(lightValue * material.lightModel.diffuse, 1.0);
}`;


export default class LightMaterial
{
  constructor(color)
  {
    this.drawCallData = new DrawCallData();
    this.drawCallData.params.program = new Program(vertex, fragment);

    this._rgb = new Vec3();
    this.color = color;
  }


  get color(){return this._color;}
  set color(value)
  {
    this._color = value;
    this._rgb.set(
      ((this._color >> 16) & 0xff) / 0xff,
      ((this._color >> 8) & 0xff) / 0xff,
      (this._color & 0xff) / 0xff
    );
  }

  getDrawCallData()
  {
    this.drawCallData.setUniforms({
      material:{
        lightModel:{
          diffuse:this._rgb,
          ambient:this._rgb,
          specular:new Vec3(1, 1, 1)
        },
        shininess:10
      }
    });
    return this.drawCallData;
  }
}
