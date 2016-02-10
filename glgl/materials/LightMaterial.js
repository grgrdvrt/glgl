import Program from "../core/Program";
import DrawCallData from "../core/DrawCallData";
import Vec3 from "../math/Vec3";

var vertex = `precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
//attribute vec2 aUV;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 globalTransform;
uniform mat3 normalMatrix;

varying vec3 vPos;
varying vec3 vNormal;

void main(void)
{

  vec4 pos = vec4(aVertexPosition, 1.0);
  vPos = pos.xyz;
  vNormal = normalize(normalMatrix * aVertexNormal);
  gl_Position = projectionMatrix * viewMatrix * globalTransform * pos;
}`;



var fragment = `precision mediump float;

uniform vec3 uColor;
const vec3 off = vec3(-1.0, 0.0, 1.0);
varying vec3 vPos;
varying vec3 vNormal;

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

  vec3 ambient = vec3(0.0);
  for(int i = 0; i < N_LIGHTS; i++){
    ambient += lights[i].ambient;
  }

  float lightValue = max(dot(vNormal, normalize(lights[0].direction)), 0.0);
  lightValue = min(lightValue + 0.3, 1.0);
  gl_FragColor = vec4(vec3(lightValue) * lights[0].diffuse * uColor, 1.0);
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
    this.drawCallData.set({ uColor:this._rgb });
  }

  getDrawCallData()
  {
    return this.drawCallData;
  }
}
