let vertexSrc = `precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aUV;

varying vec3 vPos;
varying vec2 vUV;

void main(void)
{

  vec4 pos = vec4(aVertexPosition.xy, 0.0, 1.0);
  vPos = pos.xyz;
  vUV = aUV;
  gl_Position = pos;
}`;



let displaySrc = `precision mediump float;

varying vec2 vUV;
uniform sampler2D uTexture;

void main(void)
{
  gl_FragColor = vec4(texture2D(uTexture, vUV).rgb, 1.0);
}`;

export default class PostProcessor
{
  constructor(context)
  {
    this.context = context;
    this.passes = [];
  }

  add(pass)
  {
    this.passes.push(pass);
  }


  apply(input, output)
  {
    let drawCalls = this.passes.map(pass => {
      let data = pass.getDrawCallData();
      data.params.program = new Program(vertexSrc, pass.getShader());
      return new DrawCall(data);
    });


    drawCalls.forEach(d => d.exec(context, output));
  }

}
