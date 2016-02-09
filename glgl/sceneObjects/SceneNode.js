import DrawCallData from "../core/DrawCallData";
import Vec3 from "../math/Vec3";
import Quaternion from "../math/Quaternion";
import Mat4 from "../math/Mat4";

export default class SceneNode
{
  constructor()
  {
    this.drawCallData = new DrawCallData();

    this._transform = new Mat4();
    this._globalTransform = new Mat4();
    this.position = new Vec3();
    this.orientation = new Quaternion();
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
    this._transform.identity();
    this._transform.scaleV(this.scale);
    this._transform.multiplyMat(this.orientation.matrix);
    this._transform.translateV(this.position);
    return this._transform.clone();
  }


  get globalTransform()
  {
    return this._globalTransform.clone();
  }


  lookAt(target)
  {
    this.orientation.lookAt(this.position, target);
  }



  getDrawCallData()
  {
    return this.drawCallData;
  }
}
