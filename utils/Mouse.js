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

    this._moveBind = this._onMouseMove.bind(this);
    this._downBind = this._onMouseDown.bind(this);
    this._upBind = this._onMouseUp.bind(this);
    this.target.onmousemove = this._moveBind;
    this.target.onmousedown = this._downBind;
    this.target.onmouseup = this._upBind;
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

    if(this.target.onmousemove == this._moveBind) {
      this.target.onmousemove = null;
    }
    if(this.target.onmousedown == this._downBind) {
      this.target.onmousedown = null;
    }
    if(this.target.onmouseup == this._upBind) {
      this.target.onmouseup = null;
    }
  }
}
