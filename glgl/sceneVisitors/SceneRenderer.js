import DrawCallData from "../core/DrawCallData";

import DrawCallsVisitor from "./DrawCallsVisitor";
import LightsVisitor from "./LightsVisitor";
import TransformsVisitor from "./TransformsVisitor";
import traverseTree from "./traverseTree";

export default class SceneRenderer
{
  constructor(context)
  {
    this.context = context;
    this.drawCallData = new DrawCallData();
  }


  set(data)
  {
    this.drawCallData.set(data);
  }

  
  render(scene, camera, target)
  {
    if(target === undefined){
      target = this.context;
    }
    if(target.autoClear){
      target.clear();
    }
    var drawCallsVisitor = new DrawCallsVisitor();
    var transformsVisitor = new TransformsVisitor();
    var lightsVisitor = new LightsVisitor();

    traverseTree(scene, [
      transformsVisitor,
      lightsVisitor,
      drawCallsVisitor
    ]);

    var drawCalls = drawCallsVisitor.getResult();
    if(drawCalls.length === 0){
      console.warn("Scene doesn't contain any drawable object");
    }
    drawCalls.forEach(drawCall => {
      drawCall.addData([
        this.drawCallData,
        lightsVisitor.getResult(),
        target.viewport.getDrawCallData(),
        camera.getDrawCallData()
      ]);
      drawCall.exec(this.context, target);
    });

    return drawCalls;
  }
}
