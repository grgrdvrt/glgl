import Mat3 from "./Mat3";

//visit : 
//www.j3d.org/matrix_faq/matrfaq_latest.html
//http://www.songho.ca/opengl/gl_projectionmatrix.html

//row major 4x4 matrix
export default class Mat4
{
  constructor(
    a=1, b=0, c=0, d=0,
    e=0, f=1, g=0, h=0,
    i=0, j=0, k=1, l=0,
    m=0, n=0, o=0, p=1)
  {
    this.data = new Float32Array(16);
    this.set(
      a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, o, p
    );
  }


  identity()
  {
    return this.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }


  set( a=1, b=0, c=0, d=0, e=0, f=1, g=0, h=0, i=0, j=0, k=1, l=0, m=0, n=0, o=0, p=1)
  {
    let t = this.data;
    t[0] = a; t[4] = b; t[8] = c; t[12] = d;
    t[1] = e; t[5] = f; t[9] = g; t[13] = h;
    t[2] = i; t[6] = j; t[10] = k; t[14] = l;
    t[3] = m; t[7] = n; t[11] = o; t[15] = p;
    return this;
  }


  transformVector(vec)
  {
    let t = this.data;
    let x = vec.x, y = vec.y, z = vec.z, w = vec.w;
    vec.x = t[0] * x + t[4] * y + t[8] * z + t[12] * w;
    vec.y = t[1] * x + t[5] * y + t[9] * z + t[13] * w;
    vec.z = t[2] * x + t[6] * y + t[10] * z + t[14] * w;
    vec.w = t[3] * x + t[7] * y + t[11] * z + t[15] * w;
    return vec;
  }


  multiplyMat(m)
  {
    let t = m.data;
    this.multiply(
      t[0], t[4], t[8], t[12],
      t[1], t[5], t[9], t[13],
      t[2], t[6], t[10], t[14],
      t[3], t[7], t[11], t[15]
    );
    return this;
  }


  scaleV(v) { this.scale(v.x, v.y, v.z); }

  scale(sx, sy, sz)
  {
    this.multiply(
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1
    );
    return this;
  }


  translateV(v){ this.translate(v.x, v.y, v.z); }

  translate(tx, ty, tz)
  {
    this.multiply(
      1, 0, 0, tx,
      0, 1, 0, ty,
      0, 0, 1, tz,
      0, 0, 0, 1
    );
    return this;
  }


  multiply(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
  {
    let t = this.data;
    let t0 = t[0], t4 = t[4], t8 = t[8], t12 = t[12];
    let t1 = t[1], t5 = t[5], t9 = t[9], t13 = t[13];
    let t2 = t[2], t6 = t[6], t10 = t[10], t14 = t[14];
    let t3 = t[3], t7 = t[7], t11 = t[11], t15 = t[15];


    t[0] = a * t0 + b * t1 + c * t2 + d * t3;
    t[1] = e * t0 + f * t1 + g * t2 + h * t3;
    t[2] = i * t0 + j * t1 + k * t2 + l * t3;
    t[3] = m * t0 + n * t1 + o * t2 + p * t3;

    t[4] = a * t4 + b * t5 + c * t6 + d * t7;
    t[5] = e * t4 + f * t5 + g * t6 + h * t7;
    t[6] = i * t4 + j * t5 + k * t6 + l * t7;
    t[7] = m * t4 + n * t5 + o * t6 + p * t7;

    t[8] = a * t8 + b * t9 + c * t10 + d * t11;
    t[9] = e * t8 + f * t9 + g * t10 + h * t11;
    t[10] = i * t8 + j * t9 + k * t10 + l * t11;
    t[11] = m * t8 + n * t9 + o * t10 + p * t11;

    t[12] = a * t12 + b * t13 + c * t14 + d * t15;
    t[13] = e * t12 + f * t13 + g * t14 + h * t15;
    t[14] = i * t12 + j * t13 + k * t14 + l * t15;
    t[15] = m * t12 + n * t13 + o * t14 + p * t15;

    return this;
  }



  //http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  invert()
  {
    let t = this.data;
    let a = t[0], b = t[4], c = t[8], d = t[12];
    let e = t[1], f = t[5], g = t[9], h = t[13];
    let i = t[2], j = t[6], k = t[10], l = t[14];
    let m = t[3], n = t[7], o = t[11], p = t[15];

    t[0]  = g*l*n - h*k*n + h*j*o - f*l*o - g*j*p + f*k*p;
    t[1]  = h*k*m - g*l*m - h*i*o + e*l*o + g*i*p - e*k*p;
    t[2]  = f*l*m - h*j*m + h*i*n - e*l*n - f*i*p + e*j*p;
    t[3]  = g*j*m - f*k*m - g*i*n + e*k*n + f*i*o - e*j*o;
    t[4]  = d*k*n - c*l*n - d*j*o + b*l*o + c*j*p - b*k*p;
    t[5]  = c*l*m - d*k*m + d*i*o - a*l*o - c*i*p + a*k*p;
    t[6]  = d*j*m - b*l*m - d*i*n + a*l*n + b*i*p - a*j*p;
    t[7]  = b*k*m - c*j*m + c*i*n - a*k*n - b*i*o + a*j*o;
    t[8]  = c*h*n - d*g*n + d*f*o - b*h*o - c*f*p + b*g*p;
    t[9]  = d*g*m - c*h*m - d*e*o + a*h*o + c*e*p - a*g*p;
    t[10] = b*h*m - d*f*m + d*e*n - a*h*n - b*e*p + a*f*p;
    t[11] = c*f*m - b*g*m - c*e*n + a*g*n + b*e*o - a*f*o;
    t[12] = d*g*j - c*h*j - d*f*k + b*h*k + c*f*l - b*g*l;
    t[13] = c*h*i - d*g*i + d*e*k - a*h*k - c*e*l + a*g*l;
    t[14] = d*f*i - b*h*i - d*e*j + a*h*j + b*e*l - a*f*l;
    t[15] = b*g*i - c*f*i + c*e*j - a*g*j - b*e*k + a*f*k;

    let det = a * t[0] + e * t[4] + i * t[8] + m * t[12];
    //shouldn't it be :
    //let det = a * t[0] + b * t[4] + c * t[8] + d * t[12];
    if(det === 0){
      console.warn("Matrix can't be inverted :\n" + this.toString());
      this.identity();
    }
    else {
      let iDet = 1 / det;
      for(let i = 0; i < 16; i++){
        t[i] *= iDet;
      }
    }

    return this;
  }


  transpose()
  {
    let t = this.data;
    return this.set(
      t[0], t[1], t[2], t[3],
      t[4], t[5], t[6], t[7],
      t[8], t[9], t[10], t[11],
      t[12], t[13], t[14], t[15]
    );
  }


  copy(matrix)
  {
    let t0 = this.data;
    let t1 = matrix.data;
    for(let i = 0; i < 16; i++) {
      t0[i] = t1[i];
    }
    return this;
  }


  clone()
  {
    return (new Mat4()).copy(this);
  }


  toString()
  {
    let t = this.data;
    return (`[Mat4
      ${t[0]}, ${t[4]}, ${t[8]}, ${t[12]}
      ${t[1]}, ${t[5]}, ${t[9]}, ${t[13]}
      ${t[2]}, ${t[6]}, ${t[10]}, ${t[14]}
      ${t[3]}, ${t[7]}, ${t[11]}, ${t[15]}
    ]`);
  }


  valueOf()
  {
    return this.data;
  }
}


Mat4.projection = function(fov, aspect, near, far, out)
{
  if(out === undefined){
    out = new Mat4();
  }
  let t = out.data;

  let d = 1 / Math.tan(0.5 * fov);
  let inf = 1 / (near - far);
  t[0] = d / aspect;
  t[5] = d;
  t[10] = (near + far) * inf;
  t[14] = 2 * near * far * inf;
  t[11] = -1;
  t[1] = t[2] = t[3] = t[4] = t[6] = t[7] = t[8] = t[9] = t[12] = t[13] = t[15] = 0;
  return out;
};
