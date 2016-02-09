import DrawCallData from "../core/DrawCallData";

export default class Geometry
{
  constructor(inputs)
  {
    this.drawCallData = new DrawCallData();
    this.setInputs(inputs);
  }

  setInputs(inputs)
  {
    this.drawCallData.setInputs(inputs);
  }


  getDrawCallData()
  {
    let positionInput = this.drawCallData.getInput("aVertexPosition");
    if(positionInput === undefined){
      console.warn("missing aVertexPosition, is it intended?");
    }
    return this.drawCallData;
  }
}
