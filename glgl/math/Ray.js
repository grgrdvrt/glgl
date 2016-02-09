import Vec3 from "./Vec3";

export default class Ray
{
  constructor(origin, direction)
  {
    this.origin = new Vec3();
    this.direction = new Vec3(1, 0, 0);
    this.set(origin, direction);
  }


  set(origin = new Vec3(), direction = new Vec3(1, 0, 0))
  {
    this.origin.copy(origin);
    this.direction.copy(direction).normalize();
    return this;
  }


  setFromPositions(p0, p1)
  {
    this.origin.copy(p0);
    this.direction.copy(p1).sub(this.origin).normalize();
    return this;
  }


  getPointAt(t)
  {
    return new Vec3(
      this.origin.x + this.direction.x * t,
      this.origin.y + this.direction.y * t,
      this.origin.z + this.direction.z * t
    );
  }


  copy(ray)
  {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);
    return this;
  }


  clone()
  {
    return new Ray(this.origin, this.direction);
  }


  toString()
  {
    return `[Ray ${this.origin} ${this.direction}]`;
  }

}

