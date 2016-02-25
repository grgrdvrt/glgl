import SceneNode from "../sceneObjects/SceneNode";
import Vec3 from "../math/Vec3";

export default class AmbientLight extends SceneNode
{
  constructor(color)
  {
    super();
    this.isLightEmitter = true;

    this._rgb = new Vec3();
    this.color = color;
  }

  get color(){return this._color;}
  set color(value)
  {
    this._color = value;
    this._rgb.set(
      ((this._color >> 16) & 0xff) / 0xff,
      ((this._color >> 8) & 0xff) / 0xff,
      (this._color & 0xff) / 0xff
    );
  }

  getDrawCallData()
  {
    let obj = {};
    this.drawCallData.setUniforms({
      ambientLight:this._rgb
    });
    return this.drawCallData;
  }
}
