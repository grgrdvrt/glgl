import Texture from "../core/Texture";
import loadImage from "./loadImage";

export default function loadTexture(url, textureOptions)
{
  return loadImage(url).then(image => {
    console.log("image", image);
    return new Texture(image, textureOptions);
  });
}
