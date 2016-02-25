import SceneNode from "../sceneObjects/SceneNode";
import Vec3 from "../math/Vec3";

export default class DirectionalLight extends SceneNode
{
  constructor()
  {
    super();
    this.isLightEmitter = true;
    this.lightType = "directional";

    this.diffuse = new Vec3(0.6, 0.4, 0.4);
    this.specular = new Vec3(0.8, 0.8, 0.8);
    this.ambient = new Vec3(0.6, 0.4, 0.4);
    this.direction = new Vec3(0.5, 1, 1);
  }

  getDrawCallData()
  {
    let obj = {};
    this.drawCallData.setUniforms({
      directionalLights:[{
        lightModel:{
          diffuse : this.diffuse,
          specular : this.specular,
          ambient : this.ambient,
        },
        direction : this.direction,
        globalTransform : this._globalTransform
      }]
    });
    return this.drawCallData;
  }
}
