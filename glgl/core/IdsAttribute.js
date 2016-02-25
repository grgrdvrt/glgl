import consts from "./consts";

export default class IdsAttribute
{
  constructor()
  {
    this.data = undefined;
    this.buffer = undefined;
    this.location = undefined;
    this.isInit = false;
    this.needsUpdate = true;
  }


  setData(data)
  {
    this.data = data;
    this.needsUpdate = true;
  }


  initGL(gl, program)
  {
    this.buffer = gl.createBuffer();
    this.location = gl.getAttribLocation(program, "ids");
    this.isInit = true;
  }


  updateGL(gl)
  {
    if(this.type !== consts.UNSIGNED_INT && this.data.constructor === Uint32Array){
      let extension = gl.getExtension("OES_element_index_uint");
      if(extension === undefined){
        console.warn("extension 'OES_element_index_uint' not available, large meshes won't render properly");
        this.type = consts.UNSIGNED_SHORT;
      }
      else { this.type = consts.UNSIGNED_INT; }
    }
    else { this.type = consts.UNSIGNED_SHORT; }

    this.count = this.data.length;
    gl.bindBuffer(consts.ELEMENT_ARRAY_BUFFER, this.buffer);
    gl.bufferData(consts.ELEMENT_ARRAY_BUFFER, this.data, consts.STATIC_DRAW);
    this.needsUpdate = false;
  }
}
