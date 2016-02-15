import DrawCallData from "../core/DrawCallData";


let framgentSrc = `precision mediump float;

uniform vec2 uFrameSize;
uniform float desaturation;

vec3 P = vec3(1.0 / uFrameSize, 0.0); 
 

void main(void)
{
	vec3 color = texture2D( uTexture, vUV).rgb;
	float greyScale = (color.r + color.g + color.b) / 3.0;
  gl_FragColor = vec4(mix(color, vec3(greyScale), desaturation), 1.0);
}`;





export default class Desaturate
{
  constructor(value)
  {
    this.drawCallData = new DrawCallData();
    this.desaturation = desaturation;
  }


  getShader()
  {
    return fragmentSrc;
  }


  getDrawCallData()
  {
    this.drawCallData.set({
      desaturation:this.desaturation
    });
    return this.drawCallData;
  }
}
