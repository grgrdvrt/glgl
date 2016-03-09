import consts from "./consts";

export default class Texture 
{
  constructor(image)
  {
    this.image = image;
    this.isInit = false;
  }


  get image() { return this._image; }

  set image(value){
    this._image = value;
    this.needsUpdate = true;
  }


  initGL(context)
  {
    this.context = context;
    let gl = this.context.glContext;
    this.glTexture = gl.createTexture();

    this.textureId = context.getTextureId();

    gl.activeTexture(consts.TEXTURE0 + this.textureId);
    gl.bindTexture(consts.TEXTURE_2D, this.glTexture);

    gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_MAG_FILTER, consts.LINEAR);
    gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_MIN_FILTER, consts.LINEAR);
    //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_MAG_FILTER, consts.NEAREST);
    //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_MIN_FILTER, consts.NEAREST);

    gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_WRAP_S, consts.CLAMP_TO_EDGE);
    gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_WRAP_T, consts.CLAMP_TO_EDGE);
    //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_WRAP_S, consts.REPEAT);
    //gl.texParameteri(consts.TEXTURE_2D, consts.TEXTURE_WRAP_T, consts.REPEAT);
    gl.bindTexture(consts.TEXTURE_2D, null);
    this.isInit = true;
  }


  updateGL(context)
  {
    let gl = context.glContext;
    gl.activeTexture(consts.TEXTURE0 + this.textureId);
    gl.bindTexture(consts.TEXTURE_2D, this.glTexture);
    gl.pixelStorei(consts.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(consts.TEXTURE_2D, 0, consts.RGBA, consts.RGBA, consts.UNSIGNED_BYTE, this._image);
    gl.bindTexture(consts.TEXTURE_2D, null);
    this.needsUpdate = false;
  }


  valueOf()
  {
    return this;
  }


  toString()
  {
    return `[Texture w:${this._image.width} h:${this._image.height} image : ${this._image}]`;
  }


  dispose()
  {
    //TODO: actual dispose
  }
}
