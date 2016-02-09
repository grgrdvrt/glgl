export default class LightsVisitor
{
  constructor(id)
  {
    this.id = id;
    this.result = [];
  }

  enterNode(node)
  {
    if(node.isLightEmitter){
      this.result.push(node.getDrawCallData());
    }
    return true;
  }

  exitNode(node) { }

  getResult()
  {
    return this.result;
  }
}
