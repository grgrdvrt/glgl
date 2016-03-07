export default class Vec3
{
  constructor(x = 0, y = 0, z = 0)
  {
    this.set(x, y, z);
  }


  set(x = 0, y = 0, z = 0)
  {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  copy(v)
  {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }


  add(v)
  {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }


  sub(v)
  {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }


  scale(s)
  {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }


  negate()
  {
    return this.scale(-1);
  }


  dot(v)
  {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }


  cross(v)
  {
    this.set(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
    return this;
  }


  getNormalVec()
  {
    if(this.x === 0){
      return new Vec3(1, 0, 0);
    }
    else {
      return new Vec3(-(this.y + this.z) / this.x, 1, 1);
    }
  }

  get squaredLength()
  {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  get length()
  {
    return Math.hypot(this.x, this.y, this.z);
  }


  set length(l)
  {
    let s = l / this.length;
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }


  normalize()
  {
    let s = 1 / this.length;
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }


  angleWith(v)
  {
    return Math.acos(this.dot(v) / (this.length * v.length));
  }


  clone()
  {
    return new Vec3(this.x, this.y, this.z);
  }


  toString()
  {
    return `[Vec3 ${this.x} ${this.y} ${this.z}]`;
  }
}

Vec3.distance = function(v0, v1)
{
  return Math.hypot(
    v1.x - v0.x,
    v1.y - v0.y,
    v1.z - v0.z
  );
};

Vec3.origin = new Vec3(0, 0, 0);
Vec3.X = new Vec3(1, 0, 0);
Vec3.Y = new Vec3(0, 1, 0);
Vec3.Z = new Vec3(0, 0, 1);
