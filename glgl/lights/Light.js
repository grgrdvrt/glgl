import SceneNode from "../sceneObjects/SceneNode";
import Vec3 from "../math/Vec3";

export default class Light extends SceneNode
{
  constructor()
  {
    super();
    this.isLightEmitter = true;
    this.lightId = getAvailableId();

    this.diffuse = new Vec3(1, 1, 1);
    this.specular = new Vec3(0, 1, 0);
    this.ambient = new Vec3(0, 0, 1);
    this.direction = new Vec3(0.5, 1, 1);
  }

  getDrawCallData()
  {
    let obj = {};
    let prefix = "lights[" + this.lightId + "].";
    obj[prefix + "diffuse"] = this.diffuse;
    obj[prefix + "specular"] = this.specular;
    obj[prefix + "ambient"] = this.ambient;
    obj[prefix + "direction"] = this.direction;
    obj[prefix + "position"] = this.position;
    obj[prefix + "globalTransform"] = this._globalTransform;

    this.drawCallData.set(obj);
    return this.drawCallData;
  }
}

let ids = [];
let maxIds = 32;

function getAvailableId()
{
  let id;
  for(let i = 0; i < maxIds; i++)
  {
    if(!ids[i]){
      id = i;
      break;
    }
  }
  if(id === undefined){
    throw new Error("Too many lights");
  }
  ids[id] = true;

  return id;
}

