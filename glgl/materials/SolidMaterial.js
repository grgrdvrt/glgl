import Program from "../core/Program";
import DrawCallData from "../core/DrawCallData";
import Color from "../math/Color";

var vertex = `precision mediump float;

attribute vec3 aVertexPosition;

uniform vec2 screenSize;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 globalTransform;

varying vec3 vPos;

void main(void)
{

  vec3 posRatio = vec3( screenSize.x / screenSize.y);
  vec4 pos = vec4(aVertexPosition, 1.0);
  vPos = pos.xyz;
  gl_Position = projectionMatrix * viewMatrix * globalTransform * pos;
}`;



var fragment = `precision mediump float;

uniform vec2 screenSize;
uniform vec3 uColor;
varying vec3 vPos;


void main(void)
{

  gl_FragColor = vec4(uColor, 1.0);
}`;


export default class SolidMaterial
{
  constructor(color)
  {
    this.drawCallData = new DrawCallData();
    this.drawCallData.params.program = new Program(vertex, fragment);

    this.color = new Color(color);
  }


  getDrawCallData()
  {
    this.drawCallData.setUniforms({ uColor:this.color });
    return this.drawCallData;
  }
}

