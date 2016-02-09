import Texture from "./Texture";

export default class RttTexture extends Texture
{
  constructor(frameBuffer)
  {
    super(null);
    this.frameBuffer = frameBuffer;
    this._image = this.frameBuffer;
  }


  initGL(gl)
  {
    super.initGL(gl);
    var fbo = this.frameBuffer;
    if(fbo.glFrameBuffer === undefined){
      throw new Error("frameBuffer not initialized");
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.glFrameBuffer);
    gl.activeTexture(gl.TEXTURE0 + this.textureId);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    this.resize(fbo.width, fbo.height);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.glTexture, 0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }


  resize(w, h)
  {
    let gl = this.glContext;
    if(gl === undefined){
      return;
    }
    var fbo = this.frameBuffer;
    gl.activeTexture(gl.TEXTURE0 + this.textureId);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fbo.width, fbo.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }


  updateGL(gl)
  {
    gl.activeTexture(gl.TEXTURE0 + this.textureId);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.needsUpdate = false;
  }


  toString()
  {
    return `[RttTexture w:${this.frameBuffer.width} h:${this.frameBuffer.height}]`;
  }
}
