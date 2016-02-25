import consts from "./consts";

export default class AttributeBuffer
{
  constructor()
  {
    this.glBuffer = undefined;
    this.data = undefined;
    this.isInit = false;
  }


  initGL(gl)
  {
    this.glBuffer = gl.createBuffer();
    this.isInit = true;
  }


  setData(data)
  {
    this.data = data;
    this.needsUpdate = true;
  }


  updateGL(gl)
  {
    gl.bindBuffer(consts.ARRAY_BUFFER, this.glBuffer);
    gl.bufferData(consts.ARRAY_BUFFER, this.data, consts.STATIC_DRAW);
    this.needsUpdate = false;
  }
}
