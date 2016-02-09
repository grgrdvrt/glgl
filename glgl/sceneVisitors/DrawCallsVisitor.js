import DrawCall from "../core/DrawCall";

export default class DrawCallsVisitor
{
  constructor()
  {
    this.drawCalls = [];
    this.drawCallData = [];
  }

  enterNode(node)
  {
    this.drawCallData.push(node.getDrawCallData());
    if(node.triggersDrawCall) {
      this.drawCalls.push(
        new DrawCall(this.drawCallData.concat())
      );
    }
    return true;
  }
  

  exitNode(node)
  {
    this.drawCallData.pop();
  }
  

  getResult()
  {
    return this.drawCalls;
  }
}
