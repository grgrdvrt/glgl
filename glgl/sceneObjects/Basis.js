import consts from "../core/consts";
import DrawCallData from "../core/DrawCallData";
import Program from "../core/Program";
import SceneNode from "./SceneNode";


let vertexSrc = `
precision mediump float;

attribute vec3 aVertexPosition;
uniform mat4 globalTransform;
varying vec3 vPos;

struct Camera
{
  mat4 transform;
  mat4 globalTransform;
  mat4 projection;
  vec3 position;
};
uniform Camera camera;

void main()
{
  vec4 vertexWorldPosition =  vec4(aVertexPosition, 1.0); 
  vPos = vertexWorldPosition.xyz;
  gl_Position = camera.projection * camera.transform * vertexWorldPosition;
}`;


let fragmentSrc = `
precision mediump float;

varying vec3 vPos;

void main()
{
  gl_FragColor = vec4(normalize(vPos), 1.0);
}`;


export default class Basis extends SceneNode
{
  constructor()
  {
    super();
    this.triggersDrawCall = true;
    this.drawCallData.program = new Program(vertexSrc, fragmentSrc);
    this.drawCallData.drawMethod = consts.LINES;

    this.drawCallData.setAttributes({
      aVertexPosition:new Float32Array([
      0, 0, 0,
      1, 0, 0,
      0, 1, 0,
      0, 0, 1])
    });
    this.drawCallData.setIds(new Uint16Array([0, 1, 0, 2, 0, 3]));

  }

  getDrawCallData()
  {
    return this.drawCallData;
  }
}
