import Signal from "./Signal";
import "./polyfills";


export default class Loop
{
  constructor(callback, scope, autoPlay)
  {
    this.onUpdate = new Signal();
    this.isPaused = true;
    this.frameId = 0;
    if(callback)
    {
      this.onUpdate.add(callback, scope);
      if(autoPlay || autoPlay === undefined)
      {
        this.play();
      }
    }
  }


  play()
  {
    if(!this.isPaused) return;
    this.isPaused = false;
    this._onUpdate();
  }


  _onUpdate()
  {
    //can cause the loop to be paused
    this.onUpdate.dispatch(this.frameId);
    if(!this.isPaused) {
      this._requestFrame = requestAnimationFrame(this._onUpdate.bind(this));
    }
    this.frameId++;
  }


  pause()
  {
    this.isPaused = true;
    cancelAnimationFrame(this._requestFrame);
  }

  
  dispose()
  {
    this.onUpdate.dispose();
    pause();
  }
}
