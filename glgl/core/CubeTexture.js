import consts from "./consts";

var sides = {
  px: consts.TEXTURE_CUBE_MAP_POSITIVE_X,
  nx: consts.TEXTURE_CUBE_MAP_NEGATIVE_X,
  py: consts.TEXTURE_CUBE_MAP_POSITIVE_Y,
  ny: consts.TEXTURE_CUBE_MAP_NEGATIVE_Y,
  pz: consts.TEXTURE_CUBE_MAP_POSITIVE_Z,
  nz: consts.TEXTURE_CUBE_MAP_NEGATIVE_Z
};


export default class CubeTexture 
{
  constructor(images)
  {
    this.images = images;
    this.isInit = false;
    this.textureId = getAvailableId();
  }


  get images() { return this._images; }

  set images(value){
    this._images = value;
    this.needsUpdate = true;
  }


  initGL(context)
  {
    let gl = context.glContext;
    this.glContext = gl;
    this.glTexture = gl.createTexture();

    this.textureId = context.getTextureId();
    gl.activeTexture(consts.TEXTURE0 + this.textureId);
    gl.bindTexture(consts.TEXTURE_CUBE_MAP, this.glTexture);

    gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_MAG_FILTER, consts.LINEAR);
    gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_MIN_FILTER, consts.LINEAR);
    //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_MAG_FILTER, consts.NEAREST);
    //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_MIN_FILTER, consts.NEAREST);

    gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_WRAP_S, consts.CLAMP_TO_EDGE);
    gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_WRAP_T, consts.CLAMP_TO_EDGE);
    //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_WRAP_S, consts.REPEAT);
    //gl.texParameteri(consts.TEXTURE_CUBE_MAP, consts.TEXTURE_WRAP_T, consts.REPEAT);
    gl.bindTexture(consts.TEXTURE_CUBE_MAP, null);
    this.isInit = true;
  }


  updateGL(context)
  {
    let gl = context.glContext;
    gl.activeTexture(consts.TEXTURE0 + this.textureId);
    gl.bindTexture(consts.TEXTURE_CUBE_MAP, this.glTexture);
    for(let id in this._images){
      gl.pixelStorei(consts.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(sides[id], 0, consts.RGBA, consts.RGBA, consts.UNSIGNED_BYTE, this._images[id]);
    }

    gl.bindTexture(consts.TEXTURE_CUBE_MAP, null);
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
    ids[i] = false;
    //TODO: actual dispose
  }
}
