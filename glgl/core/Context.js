import consts from "./consts";
import Viewport from "./Viewport";
import Vec2 from "../math/Vec2";
import Signal from "../../utils/Signal";

export default class Context
{
  constructor(canvas)
  {
    this.canvas = canvas;

    this.viewport = new Viewport();

    this._checkSizeBind = this.checkSize.bind(this);
    this.resized = new Signal();
    this.autoSize = true;
    this.autoClear = true;
    this.glFrameBuffer = null;

    try { this.glContext = this.canvas.getContext("webgl"); } catch (e) { }
    if (!this.glContext) console.log("Could not initialise WebGL, sorry :-(");

    console.log(this.glContext.getSupportedExtensions().join("\n"));
    console.log(this.glContext);

    this.viewport.initGL(this.glContext);
    this.clear();
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
    if(this.viewport.width === undefined){
      this.viewport.resize(w, h);
    }
    else {
      this.viewport.resize(
        w * this.viewport.width / this.width,
        h * this.viewport.height / this.height
      );
    }
    this.width = w;
    this.height = h;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.resized.dispatch(this.width, this.height);
  }


  clear()
  {
    var gl = this.glContext;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.viewport.clear();
  }
}
