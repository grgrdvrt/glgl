import CubeTexture from "../core/CubeTexture";
import loadImage from "./loadImage";

let directions = ["px", "nx", "py", "ny", "pz", "nz"];

export default function loadCubeTexture(urls, textureOptions)
{
  if(urls.constructor === String){
    let path = url.split(".");
    let ext = path[path.length - 1];
    let base = path.slice(0, path.length - 1).join(".");
    urls = {};
    directions.forEach(direction => url[direction] = `${base}/${direction}.${ext}`);
  }

  let promises = [];
  for(let direction in urls){
    let url = urls[direction];
    let p = loadImage(url).then(image => {
      return {
        direction:direction,
        img:image
      };
    });
    promises.push(p);
  }

  return Promise.all(promises).then(imgs => {
    let imgsObj = {};
    imgs.forEach(img => {
      imgsObj[img.direction] = img.img;
    });
    return new CubeTexture(imgsObj);
  });
}
