export default class Vec2
{
  constructor(x, y)
  {
    this.x = x || 0;
    this.y = y || 0;
  }


  set(x, y)
  {
    this.x = x || 0;
    this.y = y || 0;
    return this;
  }


  add(v)
  {
    this.x += v.x;
    this.y += v.y;
    return this;
  }


  sub(v)
  {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }


  scale(s)
  {
    this.x *= s;
    this.y *= s;
    return this;
  }


  dot(v)
  {
    return this.x * v.x + this.y * v.y;
  }


  get length()
  {
    return Math.hypot(this.x, this.y);
  }


  set length(l)
  {
    var s = l / this.length;
    this.x *= s;
    this.y *= s;
    return this;
  }


  normalize()
  {
    var s = 1 / this.length;
    this.x *= s;
    this.y *= s;
    return this;
  }


  clone()
  {
    return new Vec2(this.x, this.y);
  }

  toString()
  {
    return `[Vec2 ${this.x} ${this.y}]`;
  }
}
