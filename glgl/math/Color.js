//RGBA color

export default class Color
{

  static createRandom()
  {
    return new Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
  }

  constructor(r, g, b, a)
  {
    this.set(r, g, b, a);
  }


  set(r, g, b, a = 1)
  {
    if(r === undefined){
      this.r = this.g = this.b = 0;
      this.a = 1;
    }
    else if(r.constructor === Color){
      this.copy(r);
    }
    else if(g === undefined || b === undefined){
      this.hex = r;
    }
    else {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
    return this;
  }


  scale(value)
  {
    this.r *= value;
    this.g *= value;
    this.b *= value;
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
    return ((0xff * this.r) << 16) | ((0xff * this.g) << 8) | (0xff * this.b);
  }


  get x(){ return this.r; }
  get y(){ return this.g; }
  get z(){ return this.b; }

  valueOf(){ return this; }

  toString(){ return `[Color ${this.r} ${this.g} ${this.b}]`; }
}
