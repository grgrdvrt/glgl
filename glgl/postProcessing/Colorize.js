import DrawCallData from "../core/DrawCallData";
import Pass from "./Pass";
import Color from "../math/Color";


let fragmentSrc = `precision mediump float;

uniform vec2 uFrameSize;
uniform vec3 color;
uniform float quantity;
uniform sampler2D uTexture;

varying vec2 vUV;

void main(void)
{
	vec3 baseColor = texture2D( uTexture, vUV).rgb;
  gl_FragColor = vec4(mix(baseColor, color, quantity), 1.0);
}`;




export default class Colorize extends Pass
{
  constructor(color, quantity)
  {
    super();
    this.color = new Color(color);
    this.quantity = quantity;
    this.fragmentSrc = fragmentSrc;
  }


  exec(input, target)
  {
    this.drawCallData.setUniforms({
      color:this.color,
      quantity:this.quantity
    });
    super.exec(input, target);
  }
}
