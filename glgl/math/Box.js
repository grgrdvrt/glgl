import Vec3 from "./Vec3";

export default class Box
{
  constructor(min, max)
  {
    this.min = new Vec3().copy(min);
    this.max = new Vec3().copy(max);
  }

  get width() { return this.max.x - this.min.x; }
  get height() { return this.max.y - this.min.y; }
  get depth() { return this.max.z - this.min.z; }
}
