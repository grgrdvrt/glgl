import Mat4 from "./Mat4";
import Vec3 from "./Vec3";
//www.j3d.org/matrix_faq/matrfaq_latest.html

export default class Quaternion
{
  constructor(x, y, z, w)
  {
    this.set(x, y, z, w);

    this._rx = 0;
    this._ry = 0;
    this._rz = 0;
  }

  set(x = 0, y = 0, z = 0, w = 1)
  {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }


  copy(q)
  {
    this.x = q.x;
    this.y = q.y;
    this.z = q.z;
    this.w = q.w;
    return this;
  }


  get length()
  {
    return Math.hypot(this.x, this.y, this.z, this.w);
  }


  normalize()
  {
    let s = 1 / this.length;
    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;
    return this;
  }


  multiply(quat)
  {
    let x1 = this.x, y1 = this.y, z1 = this.z, w1 = this.w;
    let x2 = quat.x, y2 = quat.y, z2 = quat.z, w2 = quat.w;
    this.set(
      x1 * w2 + y1 * z2 - z1 * y2 + w1 * x2,
      y1 * w2 + z1 * x2 - x1 * z2 + w1 * y2,
      z1 * w2 + x1 * y2 - y1 * x2 + w1 * z2,
     -x1 * x2 - y1 * y2 - z1 * z2 + w1 * w2
    );
    return this;
  }


  add(quat)
  {
    this.x += quat.x;
    this.y += quat.y;
    this.z += quat.z;
    this.w += quat.w;
    return this;
  }


  conjugate()
  {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this;
  }
  

  invert()
  {
    return this.conjugate().normalize();
  }


  setRotationFromAxisAngle(vec, angle)
  {
    this.setRotation(vec.x, vec.y, vec.z, angle);
    return this;
  }


  setRotation(rx, ry, rz, angle)
  {
    let s = 1 / Math.hypot(rx, ry, rz);
    angle *= 0.5;
    let sin = Math.sin(angle) * s;
    this.x = rx * sin;
    this.y = ry * sin;
    this.z = rz * sin;
    this.w = Math.cos(angle);
    return this;
  }


  get matrix()
  {
    let s = 1 / this.length;
    let x = this.x * s;
    let y = this.y * s;
    let z = this.z * s;
    let w = this.w * s;

    let xx = x * x;
    let xy = x * y;
    let xz = x * z;
    let xw = x * w;
    let yy = y * y;
    let yz = y * z;
    let yw = y * w;
    let zz = z * z;
    let zw = z * w;

    return new Mat4(
      1 - 2 * (yy + zz), 2 * (xy - zw), 2 * (xz + yw), 0,
      2 * (xy + zw), 1 - 2 * (xx + zz), 2 * (yz - xw), 0,
      2 * (xz - yw), 2 * (yz + xw), 1 - 2 * (xx + yy), 0,
      0, 0, 0, 1
    );

  }


  transformVector(vec)
  {
    let quat = new Quaternion(vec.x, vec.y, vec.z, 0);
    let inv = this.clone().invert();
    vec.copy(this.clone().multiply(quat.multiply(inv)));
    return vec;
  }


  lookAt(position, target, up)
  {
    let newDir = (new Vec3()).copy(target).sub(position).normalize();
    let baseDir = new Vec3(0, 0, -1);
    up = new Vec3(0, -1, 0);
    this.setRotationFromAxisAngle(
      baseDir.clone().cross(newDir),
      baseDir.angleWith(newDir)
    );

  }



  clone()
  {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }


  toString()
  {
    return [this.x, this.y, this.z, this.w].join(", ");
  }
}
