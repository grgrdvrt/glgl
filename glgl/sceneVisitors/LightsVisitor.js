import DrawCallData from "../core/DrawCallData";

export default class LightsVisitor
{
  constructor()
  {
    this.lights = [];
    this.lightsDrawCallDatas = [];
    this.drawCallData = new DrawCallData();
  }

  enterNode(node)
  {
    if(node.isLightEmitter){
      this.lights.push(node);
      this.lightsDrawCallDatas.push(node.getDrawCallData());
      if(node.lightType !== undefined){
        let defineName = `${node.lightType.toUpperCase()}_LIGHT_COUNT`;
        if(this.drawCallData.defines[defineName] === undefined){
          this.drawCallData.defines[defineName] = 0;
        }
        this.drawCallData.defines[defineName]++;
      }
    }
    return true;
  }

  exitNode(node) { }

  getResult()
  {
    return {
      drawCallData:[
        this.drawCallData,
        this.lightsDrawCallDatas
      ],
      lights:this.lights
    };
  }
}
