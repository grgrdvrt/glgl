import DrawCallData from "../core/DrawCallData";

export default class Geometry
{
  constructor(buffers, ids)
  {
    this.drawCallData = new DrawCallData();
    this.setIds(ids);
    this.setAttributes(buffers, ids);
  }


  setIds(ids)
  {
    this.drawCallData.setIds(ids);
  }


  setAttributes(buffers)
  {
    this.drawCallData.setAttributes(buffers);
  }


  getDrawCallData()
  {
    let positionInput = this.drawCallData.attributes.aVertexPosition;
    if(positionInput === undefined){
      console.warn("missing aVertexPosition, is it intended?");
    }
    return this.drawCallData;
  }
}
