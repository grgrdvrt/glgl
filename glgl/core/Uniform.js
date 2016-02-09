export default class Uniform
{
  constructor(type)
  {
    this.type = type;
    this.updateFunc = updateFuncs[type];
  }


  initGL(gl, glProgram, name)
  {
    this.name = name;
  }


  updateGL(gl, data, program)
  {
    this.data = data;
    var location = program.uniformsLocations[this.name];
    if(this.data) {
      this.updateFunc(gl, location, this.data.valueOf());
    }
  }


  load(gl) { }

}

var updateFuncs = {
  "float":function(gl, location, data){ gl.uniform1f(location, data);},
  "int":function(gl, location, data){ gl.uniform1i(location, data);},
  "float[]":function(gl, location, data){ gl.uniform1fv(location, data);},
  "int[]":function(gl, location, data){ gl.uniform1iv(location, data);},
  "vec2":function(gl, location, data){ gl.uniform2f(location, data.x, data.y);},
  "int2":function(gl, location, data){ gl.uniform2i(location, data.x, data.y);},
  "vec2[]":function(gl, location, data){ gl.uniform2fv(location, data);},
  "int2[]":function(gl, location, data){ gl.uniform2iv(location, data);},
  "vec3":function(gl, location, data){ gl.uniform3f(location, data.x, data.y, data.z);},
  "int3":function(gl, location, data){ gl.uniform3i(location, data.x, data.y, data.z);},
  "vec3[]":function(gl, location, data){ gl.uniform3fv(location, data);},
  "int3[]":function(gl, location, data){ gl.uniform3iv(location, data);},
  "vec4":function(gl, location, data){ gl.uniform4f(location, data.x, data.y, data.z, data.w);},
  "int4":function(gl, location, data){ gl.uniform4i(location, data.x, data.y, data.z, data.w);},
  "vec4[]":function(gl, location, data){ gl.uniform4fv(location, data);},
  "int4[]":function(gl, location, data){ gl.uniform4iv(location, data);},

  "mat2":function(gl, location, data){ gl.uniformMatrix2fv(location, false, data);},
  "mat3":function(gl, location, data){ gl.uniformMatrix3fv(location, false, data);},
  "mat4":function(gl, location, data){ gl.uniformMatrix4fv(location, false, data);},

  "sampler2D":function(gl, location, data){
    if(!data.isInit){
      data.initGL(gl);
    }
    if(data.needsUpdate){
      data.updateGL(gl);
    }
    gl.activeTexture(gl.TEXTURE0 + data.textureId);
    gl.bindTexture(gl.TEXTURE_2D, data.glTexture);
    gl.uniform1i(location, data.textureId);
  }
};



module.exports = Uniform;
