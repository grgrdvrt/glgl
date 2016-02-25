
import QuadGeometry from "../primitives/QuadGeometry";

import DrawCallData from "../core/DrawCallData";
import DrawCall from "../core/DrawCall";
import Program from "../core/Program";

let vertexSrc = `precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aUV;

varying vec2 vUV;

void main(void)
{
  vUV = aUV;
  gl_Position = vec4(aVertexPosition.xy, 0.0, 1.0);
}`;



let fragmentSrc = `precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUV;

void main(void)
{
  gl_FragColor = texture2D( uTexture, vUV);
}`;



let quad = new QuadGeometry();



export default class Pass
{
  constructor(value)
  {
    this.drawCallData = new DrawCallData();
    this.isInit = false;
    this.vertexSrc = vertexSrc;
    this.fragmentSrc = fragmentSrc;
  }


  init(context)
  {
    this.context = context;

    let program = new Program(this.vertexSrc, this.fragmentSrc);
    this.drawCallData.params.program = program;
    this.isInit = true;
  }


  exec(input, output)
  {
    this.drawCallData.setUniforms({
      uTexture:input.texture
    });

    new DrawCall([
      this.drawCallData,
      quad.getDrawCallData()
    ]).exec(this.context, output);
  }
}
