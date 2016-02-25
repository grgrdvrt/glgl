import DrawCallData from "../core/DrawCallData";
import Pass from "./Pass";


let fragmentSrc = `precision mediump float;

uniform vec2 uFrameSize;
uniform float saturation;
uniform sampler2D uTexture;

varying vec2 vUV;

void main(void)
{
	vec3 color = texture2D( uTexture, vUV).rgb;
	float greyScale = (color.r + color.g + color.b) / 3.0;
  gl_FragColor = vec4(mix(vec3(greyScale), color, saturation), 1.0);
}`;




export default class Desaturate extends Pass
{
  constructor(saturation)
  {
    super();
    this.saturation = saturation;
    this.fragmentSrc = fragmentSrc;
  }


  exec(input, target)
  {
    this.drawCallData.setUniforms({
      saturation:this.saturation
    });
    super.exec(input, target);
  }
}
