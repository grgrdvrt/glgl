import Mouse from "../../utils/Mouse";
import Sphere from "../math/Sphere";
import Ray from "../math/Ray";
import Vec3 from "../math/Vec3";
import Quaternion from "../math/Quaternion";


export default class Arcball
{
  constructor(domElement, camera)
  {
    this.domElement = domElement;
    this.camera = camera;

    this.mouse = new Mouse(this.domElement);
    this.mouse.onDown.add(this.onDown, this);
    this.mouse.onMove.add(this.onMove, this);

    this.startPoint = new Vec3();
  }


  onDown()
  {
    this.time = 0;
    this.initialPosition = this.camera.position.clone();
    this.startPoint = this.getPosOnSphere();
  }


  getPosOnSphere()
  {
    let dist = new Vec3(0, 0, -0.5 * (this.initialPosition.length - this.camera.near));
    let sphere = new Sphere(
      new Vec3(),
      -dist.z
    );

    let nearScale = Math.tan(this.camera.fov);
    let clickPosition = new Vec3(
      nearScale * (2 * this.mouse.x / this.domElement.width - 1) * this.camera.aspect,
      -nearScale * (2 * this.mouse.y / this.domElement.height - 1),
      -this.camera.near
    );
    let ray = new Ray(
      dist,
      clickPosition
    );


    return sphere.getRayIntersection(ray)[0];
  }


  onMove()
  {
    if(!this.mouse.isDown)return;
    let endPoint = this.getPosOnSphere();
    let axis = endPoint.clone().cross(this.startPoint);
    let angle = -this.startPoint.angleWith(endPoint);
    let rotation = (new Quaternion()).setRotationFromAxisAngle(axis, angle);
    let position = rotation.transformVector(this.initialPosition.clone());
    this.camera.position.copy(position);
    this.camera.lookAt(new Vec3());
  }



  dispose()
  {
    this.downListener.remove();
  }

}
