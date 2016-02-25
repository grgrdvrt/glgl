export default class Texture 
{
  constructor(image)
  {
    this.image = image;
    this.isInit = false;
    this.textureId = getAvailableId();
  }


  get image() { return this._image; }

  set image(value){
    this._image = value;
    this.needsUpdate = true;
  }


  initGL(gl)
  {
    this.glContext = gl;
    this.glTexture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0 + this.textureId);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.isInit = true;
  }


  updateGL(gl)
  {
    gl.activeTexture(gl.TEXTURE0 + this.textureId);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
    gl.bindTexture(gl.TEXTURE_2D, null);
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


var ids = [];
var maxIds = 32;

function getAvailableId()
{
  var id;
  for(var i = 0; i < maxIds; i++)
  {
    if(!ids[i]){
      id = i;
      break;
    }
  }
  if(id === undefined){
    throw new Error("Too many textures");
  }
  ids[id] = true;

  return id;
}
