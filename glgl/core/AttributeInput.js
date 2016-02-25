import consts from "./consts";


let sizes = {}; 
sizes[consts.INT] = 1;
sizes[consts.FLOAT] = 1;
sizes[consts.FLOAT_VEC2] = 2;
sizes[consts.FLOAT_VEC3] = 3;
sizes[consts.FLOAT_VEC4] = 4;
sizes[consts.INT_VEC2] = 2;
sizes[consts.INT_VEC3] = 3;
sizes[consts.INT_VEC4] = 4;
sizes[consts.FLOAT_MAT2] = 4;
sizes[consts.FLOAT_MAT3] = 9;
sizes[consts.FLOAT_MAT4] = 16;



export default class AttributeInput
{
  constructor(name, size, type, location)
  {
    this.name = name;
    this.size = size;
    this.type = type;
    this.location = location;
    this.itemSize = sizes[this.type];
  }


  updateGL(gl, buffer)
  {
    if(buffer.needsUpdate){
      buffer.updateGL(gl);
    }
    gl.bindBuffer(consts.ARRAY_BUFFER, buffer.glBuffer);
    gl.vertexAttribPointer(this.location, this.itemSize, consts.FLOAT, false, 0, 0);
  }
}
