import SceneNode from "../sceneObjects/SceneNode";
import Color from "../math/Color";
import Vec3 from "../math/Vec3";

export default class PointLight extends SceneNode
{
  constructor()
  {
    super();
    this.isLightEmitter = true;
    this.lightType = "point";

    this.diffuse = new Color(0.4, 0.4, 0.6);
    this.specular = new Color(0.8, 0.8, 0.8);
    this.ambient = new Color(0.4, 0.4, 0.6);
    this.cutoff = 20;
    this.decay = 2;
  }

  getDrawCallData()
  {
    let obj = {};
    this.drawCallData.setUniforms({
      pointLights:[{
        lightModel:{
          diffuse : this.diffuse,
          specular : this.specular,
          ambient : this.ambient,
        },
        cutoff : this.cutoff,
        decay : this.decay,
        position : this.position,
        globalTransform : this._globalTransform
      }]
    });
    return this.drawCallData;
  }
}
