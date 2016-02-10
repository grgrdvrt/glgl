import consts from "./consts";
import parseShader from "./parseShader";



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


  readShaderInfos(gl, src)
  {
    var shaderInfos = parseShader(src);

    var attributes = shaderInfos.attribute;
    var uniforms = shaderInfos.uniform;
    var addItem = item => this.shaderData[item.name] = item;
    attributes.forEach(addItem);
    uniforms.forEach(addItem);
    uniforms.forEach(item => {
      var location = gl.getUniformLocation(this.glProgram, item.name);
      this.uniformsLocations[item.name] = location;
    });
  }


  initGL(gl)
  {
    this.glProgram = gl.createProgram();
    this.initShader(gl, this.vertexShaderSrc, consts.VERTEX_SHADER);
    this.initShader(gl, this.fragmentShaderSrc, consts.FRAGMENT_SHADER);
    gl.linkProgram(this.glProgram);

    this.readShaderInfos(gl, this.vertexShaderSrc);
    this.readShaderInfos(gl, this.fragmentShaderSrc);

    if (!gl.getProgramParameter(this.glProgram, consts.LINK_STATUS)) {
      throw new Error("Could not initialise shaders");
    }
    this.isInit = true;
  }

}
