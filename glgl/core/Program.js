import consts from "./consts";
import UniformInput from "./UniformInput";
import AttributeInput from "./AttributeInput";


function initShader(gl, src, type, defines)
{
  let shader = gl.createShader(type);

  let definesStr = "";
  for(let defineName in defines){
    definesStr += `#define ${defineName} ${defines[defineName]}\n`;
  }
  gl.shaderSource(shader, definesStr + src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, consts.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}


function extractAttributes(gl, program)
{
  let attributes = [];
  let locationsCount = gl.getProgramParameter(program, consts.ACTIVE_ATTRIBUTES );
  for(let i = 0; i < locationsCount; i++ ) {
    let infos = gl.getActiveAttrib(program, i);
    if(infos === -1 || infos === undefined || infos === null){ break; }
    let location = gl.getAttribLocation(program, infos.name);
    gl.enableVertexAttribArray(location);
    attributes[i] = new AttributeInput(infos.name, infos.size, infos.type, location);
  }
  return attributes;
}


function extractUniforms(gl, program)
{
  let uniforms = [];
  let locationsCount = gl.getProgramParameter(program, consts.ACTIVE_UNIFORMS );
  for(let i = 0; i < locationsCount; i++ ) {
    let infos = gl.getActiveUniform(program, i);
    if(infos === -1 || infos === undefined || infos === null){ break; }
    let location = gl.getUniformLocation(program, infos.name);
    uniforms[i] = new UniformInput(infos.name, infos.size, infos.type, location);
  }
  return uniforms;
}


function readShaderInputs(gl, program)
{
  let result = {
    attributes : extractAttributes(gl, program),
    uniforms : {}
  };

  //extract arrays and structs
  extractUniforms(gl, program).forEach(item => {
    let target = result.uniforms;
    let key;
    let path = item.name.replace(/\[/g, ".").replace(/\]/g, "").split(".");
    path.forEach(pathItem => {
      if(key !== undefined){
        if(target[key] === undefined){
          let index = parseInt(pathItem);
          if(index < 0 || index >= 0){
            target[key] = [];
            pathItem = index;
          }
          else {
            target[key] = {};
          }
        }
        target = target[key];
      }
      key = pathItem;
    });
    target[key] = item;
  });
  return result;
}



export default class Program
{
  constructor(vertexShaderSrc, fragmentShaderSrc)
  {
    this.vertexShaderSrc = vertexShaderSrc;
    this.fragmentShaderSrc = fragmentShaderSrc;
    this.attributesInputs = undefined;
    this.uniformsInputs = undefined;
    this.isInit = false;

    this.defines = {};
  }


  initGL(gl)
  {
    this.glProgram = gl.createProgram();

    let vSrc = this.vertexShaderSrc;
    let vShader = initShader(gl, this.vertexShaderSrc, consts.VERTEX_SHADER, this.defines);
    gl.attachShader(this.glProgram, vShader);

    let fShader = initShader(gl, this.fragmentShaderSrc, consts.FRAGMENT_SHADER, this.defines);
    gl.attachShader(this.glProgram, fShader);

    gl.linkProgram(this.glProgram);

    let inputs = readShaderInputs(gl, this.glProgram);
    this.attributesInputs = inputs.attributes;
    this.uniformsInputs = inputs.uniforms;

    if (!gl.getProgramParameter(this.glProgram, consts.LINK_STATUS)) {
      throw new Error("Could not initialise shaders");
    }
    this.isInit = true;
  }


  setDefines(defines)
  {
    for(var defineName in defines){
      if(this.defines[defineName] !== defines[defineName]){
        this.defines[defineName] = defines[defineName];
        this.isInit = false;
      }
    }
  }
}

