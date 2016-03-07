import Geometry from "../geometry/Geometry";
import computeVertexNormals from "../geometry/computeVertexNormals";

export default function loadObj(url){
  return fetch(url).then(
    response => response.text()
  ).then(parse);
}


function createObject(name){
  return {
    name:name,
    positions:[],
    uvs:[],
    normals:[],
    triangles:[]
  };
}

function readVertex (v) {
  let items = v.split("/");
  let pos = items[0];
  let uv = items[1] === undefined ? pos : items[1];
  let norm = items[2] === undefined ? pos : items[2];
  return {
    pos:Number(pos) - 1,
    uv:Number(uv) - 1,
    norm:Number(norm) - 1
  };
}

let patterns = [
  {
    pattern:/^o|g\s+(\S*)/g,
    func : (result, object) => {
      return createObject(result[1]);
    }
  },
  {
    pattern:/^v\s+(\S+)\s+(\S+)\s+(\S+)/,
    func : (result, object) => {
      if(object === undefined){
        object = createObject("");
      }
      object.positions.push(
        Number(result[1]),
        Number(result[2]),
        Number(result[3])
      );
      return object;
    }
  },
  {
    pattern:/^vn\s+(\S+)\s+(\S+)\s+(\S+)/,
    func : (result, object) => {
      if(object === undefined){
        object = createObject("");
      }
      object.normals.push(
        Number(result[1]),
        Number(result[2]),
        Number(result[3])
      );
      return object;
    }
  },
  {
    pattern:/^vt\s+(\S+)\s+(\S+)\s+(\S+)/,
    func : (result, object) => {
      if(object === undefined){
        object = createObject("");
      }
      object.uvs.push(
        Number(result[1]),
        Number(result[2]),
        Number(result[3])
      );
      return object;
    }
  },
  {
    pattern:/^f\s+(\S+)\s+(\S+)\s+(\S+)/,
    func : (result, object) => {
      if(object === undefined){
        object = createObject("");
      }
      object.triangles.push({
        a:readVertex(result[1]),
        b:readVertex(result[3]),
        c:readVertex(result[2]),
      });
      return object;
    }
  }
];



function addVertex(vertices, v)
{
  v.id = v.pos;
  let  candidates = vertices[v.id];
  if(candidates === undefined){
    vertices[v.id] = [v];
    return;
  }
  for(let i = 0, n = candidates.length; i < n; i++){
    let candidate = candidates[i];
    if(candidate.pos === v.pos &&
      candidate.norm === v.norm && 
      candidate.uv === v.uv
    ){
      v.id = candidate.id;
      return;
    }
  }
  candidates.push(v);
  v.id = vertices.length;
  vertices[v.id] = [v];
}

function computeIndices(triangles)
{
  var vertices = [];
  var ids = [];

  for(let i = 0, n = triangles.length; i < n; i++){
    let t = triangles[i];
    addVertex(vertices, t.a);
    addVertex(vertices, t.b);
    addVertex(vertices, t.c);
    ids.push(t.a.id, t.b.id, t.c.id);
  }
  return {
    vertices:vertices,
    ids:ids
  };
}


function buildGeometry(object)
{
  let mesh = computeIndices(object.triangles);
  let nVertices = mesh.vertices.length;
  let positions = new Float32Array(3 * nVertices);
  let ids = new Uint16Array(mesh.ids);
  let normals = new Float32Array(3 * nVertices);
  let uvs = new Float32Array(2 * nVertices);

  for(let i = 0; i < nVertices; i++){
    let vertices = mesh.vertices[i];
    if(vertices === undefined)continue;
    let v = vertices[0];

    let pId = 3 * i;
    let oPId = 3 * v.pos;
    positions[pId] = object.positions[oPId];
    positions[pId + 1] = object.positions[oPId + 1];
    positions[pId + 2] = object.positions[oPId + 2];

    if(object.normals.length > 0){
      let nId = 3 * i;
      let oNId = 3 * v.norm;
      normals[nId] = object.normals[oNId];
      normals[nId + 1] = object.normals[oNId + 1];
      normals[nId + 2] = object.normals[oNId + 2];
    }

    let tId = 2 * i;
    let oTId = 2 * v.uv;
    uvs[tId] = object.uvs[oTId];
    uvs[tId + 1] = object.uvs[oTId + 1];
    uvs[tId + 2] = object.uvs[oTId + 2];
  }


  if(normals.length <= 0){
    normals = computeVertexNormals(positions, ids);
  }

  return new Geometry({
    aVertexPosition:positions,
    aVertexNormal:normals,
    aUV:uvs,
  }, ids);
}


function parse(response)
{

  //http://www.martinreddy.net/gfx/3d/OBJ.spec
  //http://www.fileformat.info/format/material/
  let lines = response.split("\n");
  let objects = [];
  let object;
  for(let i = 0, nLines = lines.length; i < nLines; i++){
    let line = lines[i].trim();
    for(let j = 0, nPatterns = patterns.length; j < nPatterns; j++){
      let p = patterns[j];
      let result = p.pattern.exec(line);
      if(result !== null) {
        let newObject = p.func(result, object);
        if(newObject !== object){
          objects.push(newObject);
          object = newObject;
        }
        break;
      }
    }
  }

  return objects.map(buildGeometry);
}
