import dataLoader from "../../utils/services/dataLoader";
import Geometry from "../geometry/Geometry";
import computeVertexNormals from "../geometry/computeVertexNormals";

export default class ObjLoader
{
  constructor(url, options)
  {
    super(url, options);
  }

  load()
  {
    let deferred = Q.defer();
    super.load().then(function(data){
      deferred.resolve(parseObj(data));
    });
    return deferred.promise;
  }

  parse(response)
  {
    let lines = response.split("\n");
    let geoms = [];
    for(let i = 0, ii = lines.length; i < ii; i++){
      let line = lines[i];
      let items = line.split(" ");
      let positions, ids;
      switch(items[0]){
        case "o":
          positions = [];
        ids = [];
        geoms.push({
          positions:positions,
          ids:ids
        });
        break;
        case "v":
          positions.push(items[1], items[2], items[3]);
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
      let vertexNormals = computeVertexNormals(positions, ids);
      return new Geometry({
        ids:ids,
        aVertexPosition:positions,
        aVertexNormal:vertexNormals,
      });
    });
  }

}

