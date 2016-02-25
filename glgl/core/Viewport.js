import Signal from "../../utils/Signal";
import DrawCallData from "./DrawCallData";
import consts from "./consts";
import Vec2 from "../math/Vec2";

export default class Viewport
{
  constructor()
  {
    this.drawCallData = new DrawCallData();
    this.resized = new Signal();
    this.isInit = false;
    this.frameSize = new Vec2();
  }


  initGL(gl)
  {
    this.glContext = gl;
    this.isInit = true;
  }


  resize(w, h)
  {
    this.width = w;
    this.height = h;
    this.frameSize.set(this.width, this.height);
    this.resized.dispatch(this.width, this.height);
  }


  clear()
  {
    if(!this.isInit){
      return;
    }
    var gl = this.glContext;
    gl.enable(consts.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(consts.COLOR_BUFFER_BIT | consts.DEPTH_BUFFER_BIT);
  }


  getDrawCallData()
  {
    this.drawCallData.setUniforms({
      "uFrameSize":this.frameSize
    });
    return this.drawCallData;
  }
}
