import consts from "./consts";

var sizes = {
  "float":1,
  "vec2":2,
  "vec3":3,
  "vec4":4,
  "mat2":4,
  "mat3":9,
  "mat4":16,
};

export default class Attribute
{
  constructor(type)
  {
    this.size = sizes[type];
    this.buffer = undefined;
    this.location = undefined;
  }

  initGL(gl, glProgram, name)
  {
    this.buffer = gl.createBuffer();
    this.location = gl.getAttribLocation(glProgram, name);
    gl.enableVertexAttribArray(this.location);
  }


  updateGL(gl, data)
  {
    gl.bindBuffer(consts.ARRAY_BUFFER, this.buffer);
    gl.bufferData(consts.ARRAY_BUFFER, data, consts.STATIC_DRAW);
  }


  load(gl)
  {
    gl.bindBuffer(consts.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(this.location, this.size, consts.FLOAT, false, 0, 0);
  }
}

