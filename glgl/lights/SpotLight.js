import SceneNode from "../sceneObjects/SceneNode";
import Color from "../math/Color";
import Vec3 from "../math/Vec3";

export default class SpotLight extends SceneNode
{
  constructor()
  {
    super();
    this.isLightEmitter = true;
    this.lightType = "spot";

    this.diffuse = new Color(0.6, 0.4, 0.4);
    this.specular = new Color(0.8, 0.8, 0.8);
    this.ambient = new Color(0.6, 0.4, 0.4);
    this.direction = new Color(0.5, 1, 1);
    this.cutoff = 10;
    this.decay = 2;
    this.cutoffAngle = Math.PI/2;
    this.exponent = 10;
  }

  getDrawCallData()
  {
    let obj = {};
    this.drawCallData.setUniforms({
      spotLights:[{
        lightModel:{
          diffuse : this.diffuse,
          specular : this.specular,
          ambient : this.ambient,
        },
        direction : this.direction,
        cutoff : this.cutoff,
        decay : this.decay,
        cutoffAngle : this.cutoffAngle,
        exponent : this.exponent,
        position : this.position,
        globalTransform : this._globalTransform
      }]
    });
    return this.drawCallData;
  }
}
