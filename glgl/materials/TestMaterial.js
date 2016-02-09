import Program from "../core/Program";
import DrawCallData from "../core/DrawCallData";

var vertex = `precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aUV;

uniform float time;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 globalTransform;
uniform mat3 normalMatrix;

varying vec3 vPos;
varying vec2 vUV;
varying vec3 vNormal;

void main(void)
{

  vec4 pos = vec4(aVertexPosition, 1.0);
  vPos = pos.xyz;
  vUV = aUV;
  vNormal = normalize(normalMatrix * aVertexNormal);
  gl_Position = projectionMatrix * viewMatrix * globalTransform * pos;
}`;



var fragment = `precision mediump float;

uniform float time;
const vec3 off = vec3(-1.0, 0.0, 1.0);
varying vec3 vPos;
varying vec2 vUV;
varying vec3 vNormal;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

struct Light {
  vec3 specular;
  vec3 diffuse;
  vec3 ambient;
  vec3 direction;
  vec3 position;
  vec3 positions[3];
  mat4 globalTransform;
};


const int N_LIGHTS = 2;

uniform Light lights[2];

void main(void)
{

  vec4 texColor = mix(texture2D(uSampler, vUV), texture2D(uSampler2, vUV), 0.5);

  vec3 ambient = vec3(0.0);
  for(int i = 0; i < N_LIGHTS; i++){
    ambient += lights[i].ambient;
  }

  float lightValue = max(dot(vNormal, normalize(lights[0].direction)), 0.0);
  lightValue = min(lightValue + 0.3, 1.0);
  gl_FragColor = vec4(vec3(lightValue) * lights[0].diffuse * texColor.rgb, 1.0);
}`;


export default class TestMaterial
{
  constructor()
  {
    this.drawCallData = new DrawCallData();
    this.drawCallData.params.program = new Program(vertex, fragment);

  }

  get texture(){ return this._texture; }

  set texture(value)
  {
    this._texture = value;
    this.drawCallData.set({ uSampler:this._texture });
  }

  get texture2(){return this._texture2;}
  set texture2(value)
  {
    this._texture2 = value;
    this.drawCallData.set({ uSampler2:this._texture2 });
  }


  getDrawCallData()
  {
    return this.drawCallData;
  }
}
