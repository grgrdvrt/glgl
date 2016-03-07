import Context from "../glgl/core/Context";
import DrawCall from "../glgl/core/DrawCall";
import DrawCallData from "../glgl/core/DrawCallData";
import Program from "../glgl/core/Program";

import Mesh from "../glgl/sceneObjects/Mesh";
import QuadGeometry from "../glgl/primitives/QuadGeometry";
import Loop from "../utils/Loop";
import Mouse from "../inputs/Mouse";

import Texture from "../glgl/core/Texture";


let vertex = `precision mediump float;

attribute vec3 aVertexPosition;

uniform float time;
uniform vec2 uFrameSize;

varying vec2 vPos;

void main(void)
{
  vPos = aVertexPosition.xy;
  gl_Position = vec4(aVertexPosition, 1.0);
}`;


let defaultFragment = `precision mediump float;

uniform vec2 uFrameSize;
uniform float time;
const vec3 off = vec3(-1.0, 0.0, 1.0);
varying vec2 vPos;

vec3 white = vec3(1.0);
vec3 black = vec3(0.0);
vec3 red = vec3(1.0, 0.0, 0.0);

void main(void)
{
  float radius = 0.5;
  float inCircle = step(length(vPos) - radius, 0.0);
  float timeValue = 0.5 + 0.5 * cos(0.01 * time);
  gl_FragColor = vec4(mix(mix(white, red, timeValue), black, inCircle), 1.0);
}`;

export default class FragmentToy
{
  constructor(canvas)
  {
    this.context = new Context(canvas);
    this.drawCallData = new DrawCallData();
    this.quad = new QuadGeometry();
    this.setSource(defaultFragment);
  }


  setSource(fragment)
  {
    this.drawCallData.program = new Program(vertex, fragment);
  }


  start(loopCallback)
  {
    this.loopCallback = loopCallback;
    new Loop(frameId => this.render(frameId));
  }


  setUniforms(values)
  {
    this.drawCallData.setUniforms(values);
  }


  render(frameId)
  {
    this.context.clear();
    if(this.loopCallback !== undefined) {
      this.loopCallback(frameId);
    }
    let drawCall = new DrawCall([
      this.quad.getDrawCallData(),
      this.context.viewport.getDrawCallData(),
      this.drawCallData
    ]);
    drawCall.exec(this.context);
  }
}
window.FragmentToy = FragmentToy;
FragmentToy.Texture = Texture;
FragmentToy.Mouse = Mouse;
