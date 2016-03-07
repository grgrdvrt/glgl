import SceneNode from "./SceneNode";
import Mat4 from "../math/Mat4";

export default class Camera extends SceneNode
{
  constructor(fov, aspect, near, far)
  {
    super();
    this.name = "camera";

    this._fov = fov;
    this._aspect = aspect;
    this._near = near;
    this._far = far;

    this._viewMatrix = new Mat4();
    this._projectionMatrix = new Mat4();

    this._projectionChanged = true;
  }


  computeProjectionMatrix()
  {
    Mat4.projection(
      this._fov * Math.PI / 180,
      this._aspect,
      this._near,
      this._far,
      this._projectionMatrix
    );
    this._projectionChanged = false;
  }


  get fov() { return this._fov; }
  get aspect() { return this._aspect; }
  get near() { return this._near; }
  get far() { return this._far; }


  set fov(value)
  {
    this._fov = value;
    this._projectionChanged = true;
  }

  set aspect(value)
  {
    this._aspect = value;
    this._projectionChanged = true;
  }

  set near(value)
  {
    this._near = value;
    this._projectionChanged = true;
  }

  set far(value)
  {
    this._far = value;
    this._projectionChanged = true;
  }


  getDrawCallData()
  {
    if(this._projectionChanged){
      this.computeProjectionMatrix();
    }
    this._viewMatrix.copy(this._globalTransform);
    this._viewMatrix.invert();
    //console.log(this._viewMatrix.toString());
    //
    this.drawCallData.setUniforms({
      camera:{
        globalTransform: this._globalTransform,
        transform: this._viewMatrix,
        projection: this._projectionMatrix,
        position : this.position
      }
    });
    return this.drawCallData;
  }
}
