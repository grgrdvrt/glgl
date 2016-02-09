import Vec3 from "./Vec3";

export default class Sphere
{
  constructor(center, radius)
  {
    this._center = new Vec3();
    this._radius = 1;
    this.set(center, radius);
  }


  set(center = new Vec3(), radius = 1)
  {
    this.center.copy(center);
    this.radius = radius;
    return this;
  }


  copy(sphere)
  {
    this._center.copy(sphere.center);
    this._radius = sphere.radius;
    return this;
  }


  get center(){ return this._center; }
  set center(value) { this._center.set(value); }


  get radius() { return this._radius; }
  set radius(value)
  {
    if(value <= 0){
      console.error("sphere radius should be stricly positive");
    }
    this._radius = value;
  }


  getRayIntersection(ray)
  {
    let co = ray.origin.clone().sub(this.center);
    let b = ray.direction.dot(co);
    let a = b * b - co.squaredLength + this.radius * this.radius;
    if(a > 0) {
      let d = Math.sqrt(a);
      return [
        ray.getPointAt(-b - d),
        ray.getPointAt(-b + d)
      ];
    }
    else if (a === 0) {
      return [
        ray.getPointAt(ray.direction.dot(co) / ray.direction.squaredLength)
      ];
    }
    else {
      return [new Vec3()];
    }
  }


  clone()
  {
    return new Sphere(this.center, this.radius);
  }


  toString()
  {
    return `[Sphere ${this.center} ${this.radius}]`;
  }
}
