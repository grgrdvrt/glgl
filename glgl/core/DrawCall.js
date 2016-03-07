import consts from "./consts";
import UniformInput from "./UniformInput";

export default class DrawCall
{
  constructor(drawCallDatas)
  {
    this.drawCallDatas = [];
    
    this.ids = undefined;
    this.program = undefined;
    this.drawMethod = consts.TRIANGLES;
    this.cullingMode = consts.BACK;
    this.enableCulling = true;
    this.defines = {};

    this.addData(drawCallDatas);
  }


  addData(drawCallDatas)
  {
    if(drawCallDatas === undefined)return;
    function flatten (arr, obj) {
      if(Array.isArray(obj)) {
       for(let i = 0, n = obj.length; i < n; i++){
         flatten(arr, obj[i]);
       }
      }
      else { arr.push(obj); }
      return arr;
    }

    let setIfDefined = (dData, name) => {
      if(dData[name] !== undefined){
        this[name] = dData[name];
      }
    };

    var arr = flatten([], drawCallDatas);
    for(let i = 0, n = arr.length; i < n; i++){
      let dData = arr[i];
      this.drawCallDatas.push(dData);

      setIfDefined(dData, "program");
      setIfDefined(dData, "ids");
      setIfDefined(dData, "drawMethod");
      setIfDefined(dData, "cullingMode");
      setIfDefined(dData, "enableCulling");

      for(let k in dData.defines) {
        this.defines[k] = dData.defines[k];
      }
    }
  }


  _setAttributes(gl)
  {
    let inputs = this.program.attributesInputs;
    for(let i = 0; i < inputs.length; i++){
      let input = inputs[i];
      let buffer;
      for(let j = this.drawCallDatas.length - 1; j >= 0; j--){
        let b = this.drawCallDatas[j].attributes[input.name];
        if(b !== undefined) {
          buffer = b;
          break;
        }
      }
      if(buffer === undefined){
        console.warn("Missing buffer : ", input.name);
      }
      if(!buffer.isInit){ buffer.initGL(gl); }
      input.updateGL(gl, buffer);
    }
  }

  _setInputs(gl, inputs, candidates)
  {
    for(let name in inputs){
      let input = inputs[name];
      if(input.constructor === UniformInput){
        this._setUniform(gl, name, input, candidates);
      }
      else if(Array.isArray(input)){
        this._setArray(gl, name, input, candidates);
      }
      else {
        this._setStruct(gl, name, input, candidates);
      }
    }
  }


  _setUniform(gl, name, input, candidates)
  {
    for(let i = candidates.length - 1; i >= 0; i--){
      let data = candidates[i][name];
      if(data !== undefined){
        input.updateGL(gl, data);
        break;
      }
    }
  }


  _setArray(gl, name, input, candidates)
  {
    let newCandidates = [];
    for(let i = candidates.length - 1; i >= 0; i--){
      let data = candidates[i][name];
      if(Array.isArray(data)){
        for(let j = 0, n = data.length; j < n; j++){
          newCandidates.push(data[j]);
        }
      }
      else if(data !== undefined){
        newCandidates.push(data);
      }
      if(newCandidates.length >= input.length){
        break;
      }
    }
    for(let i = 0, n = Math.min(newCandidates.length, input.length); i < n; i++){
      this._setInputs(gl, input[i], [newCandidates[i]]);
    }
  }


  _setStruct(gl, name, input, candidates)
  {
    let newCandidates = [];
    for(let i = candidates.length - 1; i >= 0; i--){
      let data = candidates[i][name];
      if(data !== undefined){
        newCandidates.push(data);
      }
    }
    this._setInputs(gl, input, newCandidates);
  }


  _setUniforms(gl)
  {
    let inputs = this.program.uniformsInputs;
    let uniforms = [];
    for(let i = 0; i < this.drawCallDatas.length; i++){
      uniforms[i] = this.drawCallDatas[i].uniforms;
    }

    this._setInputs(gl, inputs, uniforms);
  }


  exec(context, target, viewport)
  {
    var gl = context.glContext;

    if(target === undefined){
      target = context;
    }

    if(!target.isInit) {
     target.initGL(gl);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.glFrameBuffer);

    if(viewport !== undefined){
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
    }
    else {
      gl.viewport(0, 0, target.width, target.height);
    }


    this.program.setDefines(this.defines);
    if(!this.program.isInit) {
      this.program.initGL(gl);
    }
    var glProgram = this.program.glProgram;
    gl.useProgram(glProgram);

    this._setAttributes(gl);
    this._setUniforms(gl);


    if(this.enableCulling){
      gl.enable(consts.CULL_FACE);
      gl.cullFace(this.cullingMode);
    }
    else {
      gl.disable(consts.CULL_FACE);
    }

    if(this.ids === undefined) {
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
