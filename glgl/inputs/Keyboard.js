import Signal from "../utils/Signal";

export default class Keyboard
{
  constructor()
  {
    this._keys = {};
    this._preventDefaultKeys = [];
    this.onDown = new Signal();
    this.onUp = new Signal();
    this._downBind = this._onKeyDown.bind(this);
    this._upBind = this._onKeyUp.bind(this);
    document.addEventListener("keydown", this._downBind);
    document.addEventListener("keyup", this._upBind);
  }


  _onKeyDown(e)
  {
    e = e || window.event;
    this._doPreventDefault(e);
    if(this._keys[e.keyCode]){
      return;
    }
    this._keys[e.keyCode] = true;
    this._call(this.onDown, e.keyCode);
  }


  _onKeyUp(e)
  {
    e = e || window.event;
    this._doPreventDefault(e);
    this._keys[e.keyCode] = false;
    this._call(this.onUp, e.keyCode);
  }


  _call(signal, keyCode)
  {
    var listeners = signal.listeners;
    var n = listeners.length;
    for(var i = 0; i < n; i++)
    {
      var listener = listeners[i];
      if(!listener.args[0]) {
        listener.callback.apply(listener.scope, [keyCode].concat(listener.args));
      }
      else if(listener.args[0] == keyCode) {
        listener.callback.apply(listener.scope, listener.args);
      }
    }
  }


  isDown(key)
  {
    return this._keys[key] || false;
  }


  dispose()
  {
    this.onDown.dispose();
    this.onUp.dispose();
    document.removeEventListener("keydown", this._downBind);
    document.removeEventListener("keyup", this._upCallBind);
  }


  preventDefault(keys)
  {
    if(keys){
      this._preventDefaultKeys = this._preventDefaultKeys.concat(keys);
    }
    else {
      this._preventDefaultKeys = [-1];
    }
  }


  _doPreventDefault(e)
  {
    var k = this._preventDefaultKeys;
    if(k.indexOf(e.keyCode) != -1 || k[0] == -1){
      e.preventDefault();
    }
  }
}
