import consts from "./consts";

export default class AttributeBuffer
{
  constructor()
  {
    this.glBuffer = undefined;
    this.data = undefined;
    this.isInit = false;
  }


  initGL(context)
  {
    this.glBuffer = context.glContext.createBuffer();
    this.isInit = true;
  }


  setData(data)
  {
    this.data = data;
    this.needsUpdate = true;
  }


  updateGL(context)
  {
    let gl = context.glContext;
    gl.bindBuffer(consts.ARRAY_BUFFER, this.glBuffer);
    gl.bufferData(consts.ARRAY_BUFFER, this.data, consts.STATIC_DRAW);
    this.needsUpdate = false;
  }
}
