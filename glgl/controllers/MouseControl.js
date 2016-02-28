import Mouse from "../../utils/Mouse";
import Loop from "../../utils/Loop";
import Sphere from "../math/Sphere";
import Ray from "../math/Ray";
import Vec2 from "../math/Vec2";
import Vec3 from "../math/Vec3";
import Mat3 from "../math/Mat3";
import Quaternion from "../math/Quaternion";

export default class MouseControl
{
  constructor(domElement, camera)
  {
    this.domElement = domElement;
    this.camera = camera;

    this.radius = this.camera.position.length;

    this.speed = 0.001;
    this.velocity = new Vec2();
    this.friction = 0.9;
    this.lastMousePos = new Vec2();

    this.rotation = new Vec2(Math.PI / 2, 0);
    //this.rotation = new Vec2(-Math.PI / 2, 0);


    this.mouse = new Mouse(this.domElement);
    this.mouse.onDown.add(this.onDown, this);
    this.mouse.onMove.add(this.onMove, this);
    this.mouse.onWheel.add(this.onWheel, this);

    this.loop = new Loop(this.update, this, false);
  }


  onDown()
  {
    this.time = 0;
    this.loop.play();
    this.lastMousePos.copy(this.mouse);
  }


  onMove()
  {
    if(!this.mouse.isDown)return;
    this.velocity.copy(this.lastMousePos).sub(this.mouse).scale(this.speed);
    this.lastMousePos.copy(this.mouse);
  }


  onWheel(delta)
  {
    this.radius += -0.0001 * this.radius * delta;
    this.update();
  }


  update(frame)
  {
    this.velocity.scale(this.friction);
    this.rotation.add(this.velocity);
    this.rotation.x = this.rotation.x % (2 * Math.PI);
    this.rotation.y = Math.max(Math.min(this.rotation.y, 0.5 * Math.PI), -0.5 * Math.PI);

    
    let y = Math.sin(this.rotation.y);
    let r = Math.cos(this.rotation.y);
    this.camera.position.set(
      r * Math.cos(this.rotation.x),
      y,
      r * Math.sin(this.rotation.x)
    ).scale(this.radius);
    this.camera.lookAt(new Vec3(), new Vec3(0, 1, 0));

    if(this.rotation.length < 0.001){
      this.loop.pause();
    }
  }


  dispose()
  {
    this.mouse.onDown.remove(this.onDown, this);
    this.mouse.onMove.remove(this.onMove, this);
    this.mouse.onWheel.remove(this.onWheel, this);
    this.loop.dispose();
  }

}
