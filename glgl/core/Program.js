import consts from "./consts";
import parseShader from "./parseShader";


let typesNames = [];
typesNames[consts.INT] = "int";
typesNames[consts.FLOAT] = "float";
typesNames[consts.FLOAT_VEC2] = "vec2";
typesNames[consts.FLOAT_VEC3] = "vec3";
typesNames[consts.FLOAT_VEC4] = "vec4";
typesNames[consts.BOOL] = "bool";
typesNames[consts.FLOAT_MAT2] = "mat2";
typesNames[consts.FLOAT_MAT3] = "mat3";
typesNames[consts.FLOAT_MAT4] = "mat4";
typesNames[consts.SAMPLER_2D] = "sampler2D";
typesNames[consts.SAMPLER_CUBE] = "samplerCube";

export default class Program
{
  constructor(vertexShaderSrc, fragmentShaderSrc)
  {
    this.vertexShaderSrc = vertexShaderSrc;
    this.fragmentShaderSrc = fragmentShaderSrc;
    this.shaderData = {};
    this.isInit = false;
    this.uniformsLocations = {};
  }


  initShader(gl, src, type)
  {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, consts.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader));
    }
    gl.attachShader(this.glProgram, shader);
  }


  extractAttributes(gl)
  {
    let attributes = [];
    let locationsCount = gl.getProgramParameter(this.glProgram, gl.ACTIVE_ATTRIBUTES );
    for(let i = 0; i < locationsCount; i++ ) {
      let infos = gl.getActiveAttrib(this.glProgram, i);
      if(infos === -1 || infos === undefined || infos === null){
        break;
      }
      attributes[i] = {
        inputType : "attribute",
        name: infos.name,
        size: infos.size,
        type: typesNames[infos.type],
        location: gl.getAttribLocation(this.glProgram, infos.name ),
      };
    }
    return attributes;
  }


  extractUniforms(gl)
  {
    let uniforms = [];
    let locationsCount = gl.getProgramParameter(this.glProgram, gl.ACTIVE_UNIFORMS );
    for(let i = 0; i < locationsCount; i++ ) {
      let infos = gl.getActiveUniform(this.glProgram, i);
      if(infos === -1 || infos === undefined || infos === null){
        break;
      }
      uniforms[i] = {
        inputType : "uniform",
        name: infos.name,
        size: infos.size,
        type: typesNames[infos.type],
        location: gl.getUniformLocation(this.glProgram, infos.name ),
      };
    }
    return uniforms;
  }


  readShaderInfos(gl)
  {
    let shaderInfos = {
      attribute:this.extractAttributes(gl),
      uniform:this.extractUniforms(gl),
    };

    console.log(shaderInfos);
    var attributes = shaderInfos.attribute;
    var uniforms = shaderInfos.uniform;
    var addItem = item => this.shaderData[item.name] = item;
    attributes.forEach(addItem);
    uniforms.forEach(addItem);
    uniforms.forEach(item => {
      this.uniformsLocations[item.name] = item.location;
    });
  }


  initGL(gl)
  {
    this.glProgram = gl.createProgram();
    this.initShader(gl, this.vertexShaderSrc, consts.VERTEX_SHADER);
    this.initShader(gl, this.fragmentShaderSrc, consts.FRAGMENT_SHADER);
    gl.linkProgram(this.glProgram);

    this.readShaderInfos(gl);

    if (!gl.getProgramParameter(this.glProgram, consts.LINK_STATUS)) {
      throw new Error("Could not initialise shaders");
    }
    this.isInit = true;
  }

}
