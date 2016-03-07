import "./polyfills";


class Listener
{
  constructor(signal, callback, scope, args)
  {
    this.callback = callback;
    this.scope = scope;
    this.args = args;
    this.once = false;
  }


  dispatch(args)
  {
    this.callback.apply(this.scope, args.concat(this.args));
  }
}




export default class Signal
{
  constructor()
  {
    this.listeners = [];
  }


  add(callback, scope)
  {
    if(callback === undefined){
      throw new Error("no callback specified");
    }
    let args = Array.prototype.slice.call(arguments, 2);
    let n = this.listeners.length;
    let listener = new Listener(this, callback, scope, args);
    this.listeners.push(listener);
    return listener;
  }


  addOnce(callback, scope)
  {
    let listener = this.add.apply(this, arguments);
    listener.once = true;
    return listener;
  }

  
  remove(callback, scope)
  {
    let n = this.listeners.length;
    for(let i = 0; i < n; i++)
    {
      let listener = this.listeners[i];
      if(listener.callback == callback && listener.scope == scope)
      {
        this.listeners.splice(i, 1);
        return;
      }
    }
  }


  removeListener(listener)
  {
    let id = this.listeners.length;
    if(id !== -1){
      this.listeners.splice(id, 1);
    }
  }


  
  dispatch()
  {
    let args = Array.prototype.slice.call(arguments);
    let n = this.listeners.length;
    for(let i = 0; i < n; i++)
    {
      let listener = this.listeners[i];
      listener.dispatch(args);
      if(listener.once)
      {
        this.listeners.splice(i, 1);
        n--;
        i--;
      }
    }
  }

  
  dispose()
  {
    this.listeners = [];
  }
}
