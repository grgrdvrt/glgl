import Geometry from "../geometry/Geometry";
import computeVertexNormals from "../geometry/computeVertexNormals";

export default function loadObj(url){
  return fetch(url).then(
    response => response.text()
  ).then(parse);
}

function parse(response)
{

  //http://www.martinreddy.net/gfx/3d/OBJ.spec
  //http://www.fileformat.info/format/material/
  let lines = response.split("\n");
  let geoms = [];
  let positions, ids, normals;
  for(let i = 0, ii = lines.length; i < ii; i++){
    let line = lines[i];
    let items = line.trim().split(/\s+/);
    switch(items[0]){
      case "o":
      case "g":
        positions = [];
        normals = [];
        ids = [];
        geoms.push({
          positions:positions,
          normals:normals,
          ids:ids
        });
        break;
      case "v":
        positions.push(items[1], items[2], items[3]);
        break;
      case "vn":
        normals.push(items[1], items[2], items[3]);
        break;
      case "f":
        ids.push(items[1] - 1, items[2] - 1, items[3] - 1);
        break;
      default:break;
    }
  }

  return geoms.map(g => {
    let positions = new Float32Array(g.positions);
    let ids = new Uint16Array(g.ids);
    let vertexNormals;
    if(g.normals.length > 0){
      vertexNormals = new Float32Array(g.normals);
    }
    else {
      vertexNormals = computeVertexNormals(positions, ids);
    }
    vertexNormals = computeVertexNormals(positions, ids);
    return new Geometry({
      aVertexPosition:positions,
      aVertexNormal:vertexNormals,
    }, ids);
  });
}
