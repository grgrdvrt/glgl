import consts from "./consts";
import RttTexture from "./RttTexture";
import DrawCallData from "./DrawCallData";
import Vec2 from "../math/Vec2";
import Color from "../math/Color";

export default class FrameBuffer
{
  constructor (width, height)
  {
    this.clearColor = new Color();
    this.drawCallData = new DrawCallData();
    this.frameSize = new Vec2();
    this.texture = new RttTexture(this);
    this.resize(width, height);
    this.isInit = false;
    this.autoClear = true;
  }


  initGL(context)
  {
    this.context = context;

    let gl = context.glContext;

    this.glFrameBuffer = gl.createFramebuffer();

    this.texture.initGL(context);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);

    this.renderBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameSize.x, this.frameSize.y);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);

    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.clear();

    this.isInit = true;
  }


  resize(w, h)
  {
    this.frameSize.set(w, h);
    this.texture.resize(w, h);
  }


  get width() { return this.frameSize.x; }

  set width(value)
  {
    this.resize(value, this.frameSize.y);
  }


  get height() { return this.frameSize.y; }

  set height(value)
  {
    this.resize(this.frameSize.x, value);
  }


  clear()
  {
    var gl = this.context.glContext;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
    gl.enable(consts.DEPTH_TEST);
    let c = this.clearColor;
    gl.clearColor(c.r, c.g, c.b, 1.0);
    gl.clear(consts.COLOR_BUFFER_BIT | consts.DEPTH_BUFFER_BIT);
  }


  getDrawCallData()
  {
    this.drawCallData.setUniforms({
      "uFrameSize":this.frameSize
    });
    return this.drawCallData;
  }


  dispose()
  {
    //TODO
  }


  toString()
  {
    return "[FrameBuffer]";
  }
}
