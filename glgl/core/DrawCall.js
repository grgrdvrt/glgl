import consts from "./consts";

export default class DrawCall
{
  constructor(drawCallDatas)
  {
    this.shaderInputs = [];
    
    this.ids = undefined;
    this.program = undefined;
    this.drawMethod = consts.TRIANGLES;

    if(drawCallDatas){
      this.addData(drawCallDatas);
    }
  }


  addData(drawCallDatas)
  {
    function flatten (arr, obj) {
      if(Array.isArray(obj)){ obj.reduce(flatten, arr); }
      else { arr.push(obj); }
      return arr;
    }
    var arr = flatten([], drawCallDatas);

    arr.forEach(drawCallData => {
      drawCallData.inputs.forEach(input => {
        this.shaderInputs.push(input);
      });
      for(var k in drawCallData.params){
        this[k] = drawCallData.params[k];
      }
    });
  }


  _setShaderData(gl)
  {
    this.shaderInputs.forEach(input => {
      if(!input.isInit) {
        var inputInfos = this.program.shaderData[input.inputName];
        if(inputInfos === undefined){
          return;
        }
        input.initGL(gl, this.program.glProgram, inputInfos);
      }
      if(input.needsUpdate || input.data.needsUpdate) {
        input.updateGL(gl, this.program);
      }
      input.load(gl);
    });
  }


  logInputs()
  {
    console.table([["ids", this.ids.data.toString()]].concat(this.shaderInputs.map(input => [
      input.inputName,
      (input.data !== undefined) ? input.data.toString() : undefined
    ])));
    console.log(this);
  }


  exec(context, target)
  {
    var gl = context.glContext;

    if(target.isInit === false){
      target.initGL(gl);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.glFrameBuffer);
    gl.viewport(0, 0, target.viewport.width, target.viewport.height);

    if(!this.program.isInit) {
      this.program.initGL(gl);
    }
    var glProgram = this.program.glProgram;
    gl.useProgram(glProgram);

    this._setShaderData(gl);

    if(this.ids === undefined){
      var attributesCount = 0;
      console.warn("attributesCount must be fixed");
      gl.drawArrays(this.drawMethod, 0, attributesCount);
    }
    else {
      if(!this.ids.isInit) {
        this.ids.initGL(gl, glProgram);
      }
      if(this.ids.needsUpdate) {
        this.ids.updateGL(gl);
      }
      gl.bindBuffer(consts.ELEMENT_ARRAY_BUFFER, this.ids.buffer);
      gl.drawElements(this.drawMethod, this.ids.count, this.ids.type, 0);
    }
  }
}
