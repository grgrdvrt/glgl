import SceneNode from "../sceneObjects/SceneNode";
import Vec3 from "../math/Vec3";

export default class SpotLight extends SceneNode
{
  constructor()
  {
    super();
    this.isLightEmitter = true;
    this.lightType = "spot";

    this.diffuse = new Vec3(1, 1, 1);
    this.specular = new Vec3(1, 1, 1);
    this.ambient = new Vec3(1, 1, 1);
    this.direction = new Vec3(0.5, 1, 1);
    this.coneAngle = Math.PI / 10;
    this.attenuation = new Vec3(1, 0, 0);
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
        coneAngle : this.coneAngle,
        attenuation : this.attenuation,
        position : this.position,
        globalTransform : this._globalTransform
      }]
    });
    return this.drawCallData;
  }
}
