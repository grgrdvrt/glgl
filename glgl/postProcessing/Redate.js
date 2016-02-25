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
  gl_FragColor = vec4(mix(color, vec3(1.0, 0.0, 0.0), saturation), 1.0);
}`;




export default class Redate extends Pass
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
