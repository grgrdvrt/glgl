import Uniform from "./Uniform";
import Attribute from "./Attribute";

var inputsTypes = {
  "attribute":Attribute,
  "uniform":Uniform,
};

export default class ShaderInput
{
  constructor(inputName, data)
  {
    this.inputName = inputName;
    this.setData(data);
    this.cache = undefined;
    this.isInit = false;
  }

  initGL(gl, glProgram, infos)
  {
    this.infos = infos;
    var inputType = inputsTypes[infos.inputType];
    this.cache = new inputType(infos.type);
    this.cache.initGL(gl, glProgram, infos.name);
    this.isInit = true;
  }


  setData(data)
  {
    this.data = data;
    this.needsUpdate = true;
  }


  updateGL(gl, program)
  {
    this.cache.updateGL(gl, this.data, program);
    this.needsUpdate = false;
  }


  load(gl)
  {
    this.cache.load(gl);
  }
}
