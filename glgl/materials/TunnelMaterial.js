import Program from "../core/Program";
import DrawCallData from "../core/DrawCallData";

var vertex = `precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aUV;
uniform vec2 screenSize;

uniform float time;
uniform mat4 worldToScreen;

varying vec2 vUV;
varying vec3 vPos;

void main(void) {
  float t = 0.03 * time;
  vec3 offset = 0.14 * vec3(
    (1.0 + cos(0.1 * t)) * 2.0 * (cos(10.0 * aUV.y + t) + cos(5.0 * aUV.y + 1.3 + 0.1 * t) - cos(t) - cos(1.3 + 0.1 * t)),
    (1.0 + sin(0.01 * t)) * 2.0 * (sin(7.0 * aUV.y + 0.2 + 0.01 * t) + cos(3.0 * aUV.y + 0.1 + 1.5 * t) - sin(0.2 + 0.01 * t) - cos(0.1 + 1.5 * t)),
    0.0
  );

  mat4 scaleMat = mat4(
    0.5, 0.0, 0.0, 0.0,
    0.0, 20.0, 0.0, 0.0,
    0.0, 0.0, 0.5, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 rotMat = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 0.0, -1.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 transMat = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -1.0, 1.0
  );
  vec3 posRatio = vec3( screenSize.x / screenSize.y);
  vec4 pos = vec4(aVertexPosition, 1.0);
  vPos = pos.xyz;
  gl_Position = worldToScreen * transMat * (rotMat * scaleMat * pos + vec4(offset, 0.0));
	vUV = aUV;
}`;



var fragment = `precision mediump float;

varying vec2 vUV;
varying vec3 vPos;
uniform float time;

void main(void) {
	vec2 offset = vec2(0.0, 0.003 * time);
	vec2 gridSize = vec2(8.0, 50.0);
	vec2 gridPos = mod(floor((vUV.xy + offset) * gridSize), 2.0);
	if(gridPos.x == gridPos.y) gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	else gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	gl_FragColor = mix(gl_FragColor, vec4(0.0, 0.0, 0.0, 1.0), vUV.y);
}`;


export default class ShaderMaterial
{
  constructor()
  {
    this.drawCallData = new DrawCallData();
    this.drawCallData.program = new Program(vertex, fragment);
  }


  getDrawCallData()
  {
    return this.drawCallData;
  }
}
