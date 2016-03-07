import Program from "../core/Program";
import DrawCallData from "../core/DrawCallData";

export default class ShaderMaterial
{
  constructor(vertexSrc, fragmentSrc)
  {
    this.drawCallData = new DrawCallData();
    this.drawCallData.program = new Program(vertexSrc, fragmentSrc);
  }


  getDrawCallData()
  {
    return this.drawCallData;
  }
}
