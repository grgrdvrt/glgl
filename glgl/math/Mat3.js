import Vec3 from "./Vec3";

//row major 3x3 matrix
//www.j3d.org/matrix_faq/matrfaq_latest.html


let tx = new Vec3();
let ty = new Vec3();
let tz = new Vec3();


export default class Mat3
{
  constructor(
    a = 1, b = 0, c = 0,
    d = 0, e = 1, f = 0,
    g = 0, h = 0, i = 1)
  {
    this.data = new Float32Array(9);
    this.set(
      a, b, c,
      d, e, f,
      g, h, i);
  }


  identity()
  {
    return this.set(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
  }


  set(
    a = 1, b = 0, c = 0,
    d = 0, e = 1, f = 0,
    g = 0, h = 0, i = 1)
  {
    var t = this.data;
    t[0] = a; t[3] = b; t[6] = c;
    t[1] = d; t[4] = e; t[7] = f;
    t[2] = g; t[5] = h; t[8] = i;
    return this;
  }


  copy(mat){
    var t0 = this.data;
    var t1 = mat.data;
    t0[0] = t1[0]; t0[3] = t1[3]; t0[6] = t1[6];
    t0[1] = t1[1]; t0[4] = t1[4]; t0[7] = t1[7];
    t0[2] = t1[2]; t0[5] = t1[5]; t0[8] = t1[8];
    return this;
  }


  transformVector(v)
  {
    var t = this.data;
    var x = v.x, y = v.y, z = v.z;
    v.x = t[0] * x + t[3] * y + t[6] * z;
    v.y = t[1] * x + t[4] * y + t[7] * z;
    v.z = t[2] * x + t[5] * y + t[8] * z;
    return v;
  }


  //m x this
  multiplyMat(m)
  {
    var t = m.data;
    this.multiply(
      t[0], t[3], t[6],
      t[1], t[4], t[7],
      t[2], t[5], t[8]
    );
    return this;
  }


  multiply(
    a, b, c,
    d, e, f,
    g, h, i)
  {
    var t = this.data;
    var t0 = t[0], t3 = t[3], t6 = t[6];
    var t1 = t[1], t4 = t[4], t7 = t[7];
    var t2 = t[2], t5 = t[5], t8 = t[8];

    t[0] = a * t0 + b * t1 + c * t2;
    t[1] = d * t0 + e * t1 + f * t2;
    t[2] = g * t0 + h * t1 + i * t2;

    t[3] = a * t3 + b * t4 + c * t5;
    t[4] = d * t3 + e * t4 + f * t5;
    t[5] = g * t3 + h * t4 + i * t5;

    t[6] = a * t6 + b * t7 + c * t8;
    t[7] = d * t6 + e * t7 + f * t8;
    t[8] = g * t6 + h * t7 + i * t8;
    return this;
  }


  get determinant()
  {
    var t = this.data;
    return (
      t[0] * (t[4] * t[8] - t[5] * t[7]) - 
      t[3] * (t[1] * t[8] - t[2] * t[7]) + 
      t[6] * (t[1] * t[5] - t[2] * t[4])
    );
  }


  setRotation(x, y, z, angle)
  {
    let s = 1 / Math.hypot(x, y, z);
    x *= s;
    y *= s;
    z *= s;

    let si = Math.sin(angle);
    let co = Math.cos(angle);
    let ic = 1 - co;

    return this.set(
      x * x * ic + co, y * x * ic - si * z,z * x * ic + si * y,
      x * y * ic + si * z, y * y * ic + co,z * y * ic - si * x,
      x * z * ic - si * y, y * z * ic + si * x,z * z * ic + co
    );
  }


  rotate(x, y, z, angle)
  {
    let s = 1 / Math.hypot(x, y, z);
    x *= s;
    y *= s;
    z *= s;
    let si = Math.sin(angle);
    let co = Math.cos(angle);
    let ic = 1 - co;

    return this.multiply(
      x * x * ic + co, y * x * ic - si * z,z * x * ic + si * y,
      x * y * ic + si * z, y * y * ic + co,z * y * ic - si * x,
      x * z * ic - si * y, y * z * ic + si * x,z * z * ic + co
    );
  }


  invert()
  {
    var det = this.determinant;
    if(Math.abs(det) < 0.0005){
      return this.identity();
    }
    var t = this.data;

    var iDet = 1 / det;
    return this.set(
      (t[4] * t[8] - t[7] * t[5]) * iDet,
     -(t[3] * t[8] - t[5] * t[6]) * iDet,
      (t[3] * t[7] - t[4] * t[6]) * iDet,
     -(t[1] * t[8] - t[7] * t[2]) * iDet,
      (t[0] * t[8] - t[2] * t[6]) * iDet,
     -(t[0] * t[7] - t[1] * t[6]) * iDet,
      (t[1] * t[5] - t[2] * t[4]) * iDet,
     -(t[0] * t[5] - t[2] * t[3]) * iDet,
      (t[0] * t[4] - t[3] * t[1]) * iDet
    );
  }


  transpose()
  {
    var t = this.data;
    return this.set(
      t[0], t[1], t[2],
      t[3], t[4], t[5],
      t[6], t[7], t[8]
    );
  }


  lookAt(position, target, up)
  {
    tz.copy(target).sub(position).normalize();
    tx.copy(tz).cross(up).normalize();
    if(tx.length === 0){
      if(tx.x === 0){
        tx.set(1, 0, 0);
      }
      else {
        tx.set(-(tx.y + tx.z) / tx.x, 1, 1).normalize();
      }
    }
    ty.copy(tx).cross(tz);

    this.set(
      tx.x, ty.x, -tz.x,
      tx.y, ty.y, -tz.y,
      tx.z, ty.z, -tz.z
    );
    return this;
  }


  clone()
  {
    var cloneMat = new Mat3();
    var t0 = this.data;
    var t1 = cloneMat.data;
    for(var i = 0; i < 9; i++) {
      t1[i] = t0[i];
    }
    return cloneMat;
  }


  toString()
  {
    var t = this.data;
    return (`[Mat3
      ${t[0]}, ${t[3]}, ${t[6]}
      ${t[1]}, ${t[4]}, ${t[7]}
      ${t[2]}, ${t[5]}, ${t[8]}
    ]`);
  }


  valueOf()
  {
    return this.data;
  }
}
