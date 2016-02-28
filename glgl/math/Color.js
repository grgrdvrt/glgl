//RGBA color

export default class Color
{
  constructor(r, g, b, a = 1)
  {
    if(r.constructor === Color){
      this.copy(r);
    }
    else if(r === undefined){
      this.set(0, 0, 0, 1);
    }
    else if(g === undefined || b === undefined){
      this.hex = r;
    }
    else {
      this.set(r, g, b, a);
    }
  }


  set(r, g, b, a = 1)
  {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }


  copy(color)
  {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a;
    return this;
  }


  clone()
  {
    return new Color(this.r, this.g, this.b, this.a);
  }


  set hex(value)
  {
    this.r = ((value >> 16) & 0xff) / 0xff;
    this.g = ((value >> 8) & 0xff) / 0xff;
    this.b = (value & 0xff) / 0xff;
  }


  //returns rgb hex, no alpha
  get hex()
  {
    return (this.r << 16) | (this.g << 8) | this.b;
  }


  get x(){ return this.r; }
  get y(){ return this.g; }
  get z(){ return this.b; }

  valueOf(){ return this; }

  toString(){ return `[Color ${this.r} ${this.g} ${this.b}]`; }
}
