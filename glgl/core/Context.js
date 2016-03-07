import consts from "./consts";
import DrawCallData from "./DrawCallData";
import Vec2 from "../math/Vec2";
import Color from "../math/Color";
import Signal from "../../utils/Signal";

export default class Context
{
  constructor(canvas)
  {
    this.canvas = canvas;

    this.drawCallData = new DrawCallData();
    this.frameSize = new Vec2();

    this._checkSizeBind = this.checkSize.bind(this);
    this.resized = new Signal();
    this.clearColor = new Color();
    this.autoSize = true;
    this.autoClear = true;
    this.glFrameBuffer = null;

    try { this.glContext = this.canvas.getContext("webgl"); } catch (e) { }
    if (!this.glContext) console.log("Could not initialise WebGL, sorry :-(");

    //console.log(this.glContext.getSupportedExtensions().join("\n"));
    //console.log(this.glContext);

    this.clear();

    this.isInit = true;
  }


  get autoSize() { return this._autoSize; }

  set autoSize(value)
  {
    if(this._autoSize === value) {
      return;
    }

    this._autoSize = value;
    if(this._autoSize){
      window.addEventListener("resize", this._checkSizeBind);
    }
    else {
      window.removeEventListener("resize", this._checkSizeBind);
    }
    this.checkSize();
  }


  checkSize()
  {
    var c = this.canvas;
    if(c.width === c.clientWidth && c.height === c.clientHeight) return;
    this.resize(c.clientWidth, c.clientHeight);
  }


  resize(w, h)
  {
    this.frameSize.set(w, h);
    this.canvas.width = this.frameSize.x;
    this.canvas.height = this.frameSize.y;
    this.resized.dispatch(this.frameSize.x, this.frameSize.y);
  }


  get width() { return this.frameSize.x; }

  set width(value)
  {
    this.resize(value, this.frameSize.y);
  }


  get height() { return this.frameSize.y; }

  set height(value)
  {
    this.resize(this.frameSize.x, value);
  }


  clear()
  {
    var gl = this.glContext;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.enable(consts.DEPTH_TEST);
    let c = this.clearColor;
    gl.clearColor(c.r, c.g, c.b, 1.0);
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
