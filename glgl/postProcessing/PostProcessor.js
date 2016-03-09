import FrameBuffer from "../core/FrameBuffer";


let displaySrc = `precision mediump float;

varying vec2 vUV;
uniform sampler2D uTexture;

void main(void)
{
  gl_FragColor = vec4(texture2D(uTexture, vUV).rgb, 1.0);
}`;

export default class PostProcessor
{
  constructor(context, passes)
  {
    this.context = context;
    this.passes = passes;

    this.autoClear = true;

    //this.viewport = new Viewport();
    //this.resize(width, height);
    //
    this.readBuffer = new FrameBuffer(
      this.context.width,
      this.context.height
    );
    this.readBuffer.initGL(this.context);
    this.readBuffer.name = "buff1";

    this.writeBuffer = new FrameBuffer(
      this.context.width,
      this.context.height
    );
    this.writeBuffer.initGL(this.context);
    this.writeBuffer.name = "buff2";

    this.isInit = true;
  }


  initGL(context) { }


  get glFrameBuffer()
  {
    return this.writeBuffer.glFrameBuffer;
  }


  get texture()
  {
    return this.readBuffer.texture;
  }


  get width()
  {
    return this.writeBuffer.width;
  }


  get height()
  {
    return this.writeBuffer.height;
  }


  exec(input, output)
  {
    this.swapBuffers();
    let drawCalls = this.passes.map((pass, i, arr) => {
      if(!pass.isInit){
        pass.init(this.context);
      }
      let writeBuffer = i === arr.length - 1 ? output : this.writeBuffer;
      pass.exec(this.readBuffer, writeBuffer);
      this.swapBuffers();
    });
  }


  toScreen()
  {
    this.exec(this.readBuffer, this.context);
  }


  toTexture()
  {
    this.exec(this.readBuffer, this.writeBuffer);
    this.swapBuffers();
    return this.readBuffer;
  }


  swapBuffers()
  {
    let temp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = temp;
  }


  clear()
  {
    this.readBuffer.clear();
    this.writeBuffer.clear();
  }


  getDrawCallData()
  {
    return this.writeBuffer.getDrawCallData();
  }


  dispose()
  {
  }
}
