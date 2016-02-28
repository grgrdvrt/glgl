import Texture from "../core/Texture";
export default function loadTexture(url, textureOptions)
{
  return fetch(url).then(response => {
    return response.blob();
  }).then((imageBlob) => {
    let image = new Image();
    image.src = URL.createObjectURL(imageBlob);
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve(new Texture(image, textureOptions));
      };
    });
  });
}
