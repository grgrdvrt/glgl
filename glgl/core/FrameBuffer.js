import RttTexture from "./RttTexture";
import Viewport from "./Viewport";

export default class FrameBuffer
{
  constructor (width, height)
  {
    this.viewport = new Viewport();
    this.texture = new RttTexture(this);
    this.resize(width, height);
    this.isInit = false;
    this.autoClear = true;
  }


  initGL(gl)
  {
    this.glContext = gl;

    this.glFrameBuffer = gl.createFramebuffer();

    this.texture.initGL(gl);
    this.viewport.initGL(gl);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);

    this.renderBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);

    //gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.clear();

    this.isInit = true;
  }


  clear()
  {
    if(this.glContext === undefined){
      return;
    }
    var gl = this.glContext;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.glFrameBuffer);
    this.viewport.clear();
  }


  resize(w, h)
  {
    if(this.viewport.width === undefined){
      this.viewport.resize(w, h);
    }
    else {
      this.viewport.resize(
        w * this.viewport.width / this.width,
        h * this.viewport.height / this.height
      );
    }
    this.width = w;
    this.height = h;
    this.texture.resize(w, h);
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
