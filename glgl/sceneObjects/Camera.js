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

    this.computeProjectionMatrix();
  }


  computeProjectionMatrix()
  {
    Mat4.projection(this._fov, this.aspect, this._near, this._far, this._projectionMatrix);
  }


  get fov() { return this._fov; }
  get aspect() { return this._aspect; }
  get near() { return this._near; }
  get far() { return this._far; }


  set fov(value)
  {
    this._fov = value;
    this.computeProjectionMatrix();
  }

  set aspect(value)
  {
    this._aspect = value;
    this.computeProjectionMatrix();
  }

  set near(value)
  {
    this._near = value;
    this.computeProjectionMatrix();
  }

  set far(value)
  {
    this._far = value;
    this.computeProjectionMatrix();
  }


  getDrawCallData()
  {
    this._viewMatrix.copy(this._globalTransform);
    this._viewMatrix.invert();
    //console.log(this._viewMatrix.toString());
    //
    this.drawCallData.set({
      viewMatrix : this._viewMatrix,
      projectionMatrix : this._projectionMatrix,
      cameraPosition : this.position
    });
    return this.drawCallData;
  }
}
