import SceneNode from "../sceneObjects/SceneNode";
import Vec3 from "../math/Vec3";

export default class PointLight extends SceneNode
{
  constructor()
  {
    super();
    this.isLightEmitter = true;
    this.lightType = "point";

    this.diffuse = new Vec3(0.4, 0.4, 0.6);
    this.specular = new Vec3(0.8, 0.8, 0.8);
    this.ambient = new Vec3(0.4, 0.4, 0.6);
    this.attenuation = new Vec3(0.1, 0.3, 0.3);
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
        attenuation : this.attenuation,
        position : this.position,
        globalTransform : this._globalTransform
      }]
    });
    return this.drawCallData;
  }
}
