import Signal from "./Signal";

function getNumericStyleProperty(style, prop)
{
  return parseInt(style.getPropertyValue(prop), 10);
}

function elementPosition(e)
{
  var x = 0, y = 0;
  var inner = true ;
  do {
    x += e.offsetLeft;
    y += e.offsetTop;
    var style = getComputedStyle(e,null) ;
    var borderTop = getNumericStyleProperty(style,"border-top-width") ;
    var borderLeft = getNumericStyleProperty(style,"border-left-width") ;
    y += borderTop ;
    x += borderLeft ;
    if (inner) {
      var paddingTop = getNumericStyleProperty(style,"padding-top") ;
      var paddingLeft = getNumericStyleProperty(style,"padding-left") ;
      y += paddingTop ;
      x += paddingLeft ;
    }
    inner = false ;
  } while (Boolean(e = e.offsetParent));
  return { x: x, y: y };
}

export default class Mouse
{
  constructor(target)
  {
    this.x = this.y = 0;
    this.oldX = this.oldY = 0;
    this.isDown = false;
    this.target = target || document;
    
    this.onDown = new Signal();
    this.onUp = new Signal();
    this.onMove = new Signal();
    this.onWheel = new Signal();

    this._moveBind = this._onMouseMove.bind(this);
    this._downBind = this._onMouseDown.bind(this);
    this._upBind = this._onMouseUp.bind(this);
    this._wheelBind = this._onMouseWheel.bind(this);
    this._enabled = false;
    this.enable();
  }


  enable()
  {
    if(this._enabled){
      return;
    }
    this.target.addEventListener("mousemove", this._moveBind);
    this.target.addEventListener("mousedown", this._downBind);
    this.target.addEventListener("mouseup", this._upBind);
    this.target.addEventListener("mousewheel", this._wheelBind);
    this._enabled = true;
  }


  disable()
  {
    this.target.removeEventListener("mousemove", this._moveBind);
    this.target.removeEventListener("mousedown", this._downBind);
    this.target.removeEventListener("mouseup", this._upBind);
    this.target.removeEventListener("mousewheel", this._wheelBind);
    this._enabled = false;
  }


  _onMouseMove(e)
  {
    this.savePos();
    
    var p = elementPosition(e.target);
    this.x = e.pageX - p.x;
    this.y = e.pageY - p.y;
    this.onMove.dispatch();
  }


  _onMouseDown(e)
  {
    this.isDown = true;
    this.savePos();
    this.onDown.dispatch();
  }


  _onMouseUp(e)
  {
    this.isDown = false;
    this.savePos();
    this.onUp.dispatch();
  }


  _onMouseWheel(e)
  {
    let delta = 0;
		if ( event.wheelDelta !== undefined ) {
			delta = event.wheelDelta;
		} else if ( event.detail !== undefined ) {
			delta = - event.detail;
		}
    this.onWheel.dispatch(delta);
  }


  savePos()
  {
    this.oldX = this.x;
    this.oldY = this.y;
  }

  
  point(pt)
  {
    pt = pt || {};
    pt.x = this.x;
    pt.y = this.y;
    return pt;
  }


  showHand()
  {
    this.target.style.cursor = "hand";
  }


  hideHand()
  {
    this.target.style.cursor = "default";
  }

  
  dispose()
  {
    this.onDown.dispose();
    this.onUp.dispose();
    this.onMove.dispose();
    this.disable();
  }
}
