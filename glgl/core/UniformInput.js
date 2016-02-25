import consts from "./consts";


let uploadFuncs = {};
uploadFuncs[consts.FLOAT] = function(gl, data){ gl.uniform1f(this.location, data);};
uploadFuncs[consts.INT] = function(gl, data){ gl.uniform1i(this.location, data);};
uploadFuncs[consts.FLOAT_VEC2] = function(gl, data){ gl.uniform2f(this.location, data.x, data.y);};
uploadFuncs[consts.INT_VEC2] = function(gl, data){ gl.uniform2i(this.location, data.x, data.y);};
uploadFuncs[consts.FLOAT_VEC3] = function(gl, data){ gl.uniform3f(this.location, data.x, data.y, data.z);};
uploadFuncs[consts.INT_VEC3] = function(gl, data){ gl.uniform3i(this.location, data.x, data.y, data.z);};
uploadFuncs[consts.FLOAT_VEC4] = function(gl, data){ gl.uniform4f(this.location, data.x, data.y, data.z, data.w);};
uploadFuncs[consts.INT_VEC4] = function(gl, data){ gl.uniform4i(this.location, data.x, data.y, data.z, data.w);};

uploadFuncs[consts.FLOAT_MAT2] = function(gl, data){ gl.uniformMatrix2fv(this.location, false, data);};
uploadFuncs[consts.FLOAT_MAT3] = function(gl, data){ gl.uniformMatrix3fv(this.location, false, data);};
uploadFuncs[consts.FLOAT_MAT4] = function(gl, data){ gl.uniformMatrix4fv(this.location, false, data);};

uploadFuncs[consts.SAMPLER_2D] = function(gl, data){
  if(!data.isInit){
    data.initGL(gl);
  }
  if(data.needsUpdate){
    data.updateGL(gl);
  }
  gl.activeTexture(gl.TEXTURE0 + data.textureId);
  gl.bindTexture(gl.TEXTURE_2D, data.glTexture);
  gl.uniform1i(this.location, data.textureId);
};


let uploadFuncsV = {};
uploadFuncsV[consts.FLOAT] = function(gl, data){ gl.uniform1fv(this.location, data);};
uploadFuncsV[consts.INT] = function(gl, data){ gl.uniform1iv(this.location, data);};
uploadFuncsV[consts.FLOAT_VEC2] = function(gl, data){ gl.uniform2fv(this.location, data);};
uploadFuncsV[consts.int2] = function(gl, data){ gl.uniform2iv(this.location, data);};
uploadFuncsV[consts.FLOAT_VEC3] = function(gl, data){ gl.uniform3fv(this.location, data);};
uploadFuncsV[consts.INT_VEC3] = function(gl, data){ gl.uniform3iv(this.location, data);};
uploadFuncsV[consts.FLOAT_VEC4] = function(gl, data){ gl.uniform4fv(this.location, data);};
uploadFuncsV[consts.INT4] = function(gl, data){ gl.uniform4iv(this.location, data);};



export default class UniformInput
{
  constructor(name, size, type, location)
  {
    this.name = name;
    this.size = size;
    this.type = type;
    this.location = location;

    let funcsSet = size === 1 ? uploadFuncs : uploadFuncsV;
    this.updateFunc = funcsSet[this.type];
  }


  updateGL(gl, data)
  {
    this.updateFunc(gl, data.valueOf());
  }

}
