import Context from "../glgl/core/Context";
import DrawCall from "../glgl/core/DrawCall";
import DrawCallData from "../glgl/core/DrawCallData";
import Program from "../glgl/core/Program";

import Mesh from "../glgl/sceneObjects/Mesh";
import QuadGeometry from "../glgl/primitives/QuadGeometry";
import Loop from "../utils/Loop";


let vertex = `precision mediump float;

attribute vec3 aVertexPosition;

uniform float time;
uniform vec2 screenSize;

varying vec3 vPos;

void main(void)
{

  vec2 pixelRatio = vec2(1.0, screenSize.y / screenSize.x);
  vec4 pos = vec4(aVertexPosition.xy * pixelRatio, 0.0, 1.0);
  vPos = pos.xyz;
  gl_Position = pos;
}`;


let defaultFragment = `precision mediump float;

uniform vec2 screenSize;
uniform float time;
const vec3 off = vec3(-1.0, 0.0, 1.0);
varying vec3 vPos;

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
  constructor()
  {
    this.conteyt = new Context(document.getElementById("canvas"));
    this.drawCallData = new DrawCallData();
    this.quad = new QuadGeometry();
    this.setFragmentShader(defaultFragment);
  }


  setFragmentShader(fragment)
  {
    this.drawCallData.params.program = new Program(vertex, fragment);
  }


  start(loopCallback)
  {
    this.loopCallback = loopCallback;
    new Loop(frameId => this.render(frameId));
  }


  set(values)
  {
    this.drawCallData.set(values);
  }


  render(frameId)
  {
    this.viewport.update();
    if(this.loopCallback !== undefined) {
      this.loopCallback();
    }
    let drawCall = new DrawCall([
      this.quad.getDrawCallData(),
      this.drawCallData
    ]);
    drawCall.exec(this.context);
  }
}


var toy = new FragmentToy();
toy.start();
