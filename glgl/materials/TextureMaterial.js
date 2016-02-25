import Program from "../core/Program";
import DrawCallData from "../core/DrawCallData";

var vertex = `precision mediump float;



attribute vec3 aVertexPosition;
attribute vec2 aUV;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 globalTransform;

varying vec3 vPos;
varying vec2 vUV;

void main(void)
{

  vec4 pos = vec4(aVertexPosition, 1.0);

  gl_Position = projectionMatrix * viewMatrix * globalTransform * pos;

  vPos = pos.xyz;
  vUV = aUV;
}`;



var fragment = `precision mediump float;

varying vec3 vPos;
varying vec2 vUV;

uniform sampler2D uSampler;

void main(void)
{
  gl_FragColor = mix(vec4(1.0), vec4(texture2D(uSampler, vUV).rgb, 1.0), 0.5);
}`;


export default class TextureMaterial
{
  constructor()
  {
    this.drawCallData = new DrawCallData();
    this.drawCallData.params.program = new Program(vertex, fragment);

  }

  getDrawCallData()
  {
    this.drawCallData.setUniforms({ uSampler:this.texture });
    return this.drawCallData;
  }
}
