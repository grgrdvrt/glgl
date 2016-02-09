import ShaderInput from "./ShaderInput";
import IdsAttribute from "./IdsAttribute";

export default class DrawCallData
{
  constructor(props)
  {
    this.params = {};
    this.inputs = [];
    this.set(props);
  }


  set(data)
  {
    for(var k in data){
      this.addInput(k, data[k]);
    }
  }


  getInput(inputName)
  {
    return this.inputs.filter(input => input.inputName === inputName)[0];
  }


  addInput(inputName, data)
  {
    let input = this.getInput(inputName);
    if(input !== undefined){
      input.setData(data);
      return;
    }
    if(inputName === "ids"){
      this.params.ids = new IdsAttribute(inputName, data);
    }
    else {
      this.inputs.push(new ShaderInput(inputName, data));
    }
  }
}
