import consts from "./consts";

export default class IdsAttribute
{
  constructor(itemName, data)
  {
    this.itemName = itemName;
    this.data = data;
    this.buffer = undefined;
    this.location = undefined;
    this.isInit = false;
    this.needsUpdate = true;
    this.type = consts.UNSIGNED_SHORT;
  }

  initGL(gl, program)
  {
    if(this.data.constructor === Uint32Array){
      let extension = gl.getExtension("OES_element_index_uint");
      if(extension === undefined){
        console.warn("extension 'OES_element_index_uint' not available, large meshes won't render properly");
      }
      else {
        this.type = consts.UNSIGNED_INT;
      }
    }
    this.buffer = gl.createBuffer();
    this.location = gl.getAttribLocation(program, "ids");
    this.isInit = true;
  }


  updateGL(gl)
  {
    this.count = this.data.length;
    gl.bindBuffer(consts.ELEMENT_ARRAY_BUFFER, this.buffer);
    gl.bufferData(consts.ELEMENT_ARRAY_BUFFER, this.data, consts.STATIC_DRAW);
    this.needsUpdate = false;
  }


  clearCache()
  {
    this.needsUpdate = true;
  }
}
