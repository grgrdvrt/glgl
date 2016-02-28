import SceneNode from "../sceneObjects/SceneNode";
import Color from "../math/Color";

export default class AmbientLight extends SceneNode
{
  constructor(color)
  {
    super();
    this.isLightEmitter = true;

    this.color = new Color(color);
  }

  getDrawCallData()
  {
    let obj = {};
    this.drawCallData.setUniforms({
      ambientLight:this.color
    });
    return this.drawCallData;
  }
}
