import Program from "../core/Program";
import consts from "../core/consts";
import DrawCallData from "../core/DrawCallData";
import Color from "../math/Color";

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



var fragment = `

#extension GL_OES_standard_derivatives : enable
precision mediump float;


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
  float cutoff;
  float decay;
  float cutoffAngle;
  float exponent;
  mat4 globalTransform;
};

struct PointLight {
  LightModel lightModel;
  vec3 position;
  float cutoff;
  float decay;
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


float lightAttenuation(float dist, float cutoff, float decay)
{
  return pow(clamp(1.0 - dist / cutoff, 0.0, 1.0), decay);
}

vec3 phong(vec3 surfaceNormal, vec3 viewDir, vec3 lightVector, LightModel lightModel, MaterialInfos material)
{
  float facing = 2.0 * float(gl_FrontFacing) - 1.0;
  vec3 lightReflect = reflect(lightVector, facing * surfaceNormal);
  LightModel mLightModel = material.lightModel;
  float diffuseDot = max(dot(lightVector, facing * surfaceNormal), 0.0);
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
    vec3 lightDir = normalize(-light.direction);//missing transformation
    lightContribution += phong(surfaceNormal, viewDir, lightDir, light.lightModel, material);
  }
  #endif

  #ifdef POINT_LIGHT_COUNT
  for(int i = 0; i < POINT_LIGHT_COUNT; i++){
    PointLight light = pointLights[i];
    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;
    float attenuation = lightAttenuation(length(sampleToLight), light.cutoff, light.decay);
    lightContribution += attenuation * phong(surfaceNormal, viewDir, normalize(sampleToLight), light.lightModel, material);
  }
  #endif

  #ifdef SPOT_LIGHT_COUNT
  for(int i = 0; i < SPOT_LIGHT_COUNT; i++){
    SpotLight light = spotLights[i];
    vec3 sampleToLight = (light.globalTransform * vec4(0.0, 0.0, 0.0, 1.0)).xyz - surfacePosition;
    vec3 lightVector = normalize(sampleToLight);
    float cone = dot(-lightVector, normalize(light.direction));
    float spot = step(cos(light.cutoffAngle), cone) * pow(cone, light.exponent);
    float attenuation = spot * lightAttenuation(length(sampleToLight), light.cutoff, light.decay);
    lightContribution += attenuation * phong(surfaceNormal, viewDir, lightVector, light.lightModel, material);
  }
  #endif
  return lightContribution;
}




void main(void)
{
  vec3 viewDir = normalize(vCameraPosition - vWorldPosition);
  vec3 surfaceNormal = normalize(vSurfaceNormal);

  vec3 lightValue = material.lightModel.ambient * ambientLight + lights(vWorldPosition, surfaceNormal, viewDir, material);

  gl_FragColor = vec4(lightValue * material.lightModel.diffuse, 1.0);
  //gl_FragColor = vec4(lightValue * material.lightModel.diffuse, -float(gl_FrontFacing));
}`;


export default class LightMaterial
{
  constructor(diffuse=0xeeeeee, specular=0xffffff, ambient=0x888888)
  {
    this.drawCallData = new DrawCallData();
    this.drawCallData.program = new Program(vertex, fragment);

    this.diffuse = new Color(diffuse);
    this.specular = new Color(specular);
    this.ambient = new Color(ambient);
  }

  getDrawCallData()
  {
    this.drawCallData.setUniforms({
      material:{
        lightModel:{
          diffuse:this.diffuse,
          specular:this.specular,
          ambient:this.ambient
        },
        shininess:5
      },
    });
    return this.drawCallData;
  }

  set doubleFace(value)
  {
    this.drawCallData.enableCulling = !value;
  }

  get doubleFace()
  {
    return this.drawCallData.enableCulling === false;
  }
}
