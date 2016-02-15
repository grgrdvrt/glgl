import DrawCallData from "../core/DrawCallData";
import Vec3 from "../math/Vec3";
import Quaternion from "../math/Quaternion";
import Mat4 from "../math/Mat4";
import Mat3 from "../math/Mat3";

export default class SceneNode
{
  constructor()
  {
    this.drawCallData = new DrawCallData();

    this._transform = new Mat4();
    this._globalTransform = new Mat4();
    this.position = new Vec3();
    this.orientation = new Mat3();
    //this.orientation = new Quaternion();
    this.scale = new Vec3(1, 1, 1);
  }


  detach()
  {
    if(this.parent !== undefined){
      this.parent.remove(this);
    }
  }


  get transform()
  {
    //this._transform.multiplyMat3(this.orientation);
    let t = this.orientation.data;
    this._transform.set(
      t[0], t[3], t[6], 0,
      t[1], t[4], t[7], 0,
      t[2], t[5], t[8], 0,
      0, 0, 0, 1
    );
    this._transform.scaleV(this.scale);
    this._transform.translateV(this.position);
    return this._transform.clone();
  }


  get globalTransform()
  {
    return this._globalTransform.clone();
  }


  lookAt(target, up)
  {
    this.orientation.lookAt(this.position, target, up);
  }



  getDrawCallData()
  {
    return this.drawCallData;
  }
}
