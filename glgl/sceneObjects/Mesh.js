import SceneNode from "./SceneNode";
import Mat3 from "../math/Mat3";

export default class Mesh extends SceneNode
{
  constructor(geometry, material)
  {
    super();
    this._normalMatrix = new Mat3();
    this.triggersDrawCall = true;
    this.geometry = geometry;
    this.material = material;
  }


  get normalMatrix()
  {
    var t = this._globalTransform.data;
    this._normalMatrix.set(
      t[0], t[4], t[8],
      t[1], t[5], t[9],
      t[2], t[6], t[10]
    ).invert().transpose();
    return this._normalMatrix.clone();
  }


  getDrawCallData()
  {
    this.drawCallData.setUniforms({
      globalTransform: this._globalTransform,
      normalMatrix:this.normalMatrix
    });
    return [
      this.drawCallData,
      this.geometry.getDrawCallData(),
      this.material.getDrawCallData()
    ];
  }
}
