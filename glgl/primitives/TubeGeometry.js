import DrawCallData from "../core/DrawCallData";
import Vec3 from "../math/Vec3";

export default class TubeGeometry
{
  constructor(pts, sides)
  {
    this.drawCallData = new DrawCallData();
    this.updateBuffers(pts, sides);
  }

  updateBuffers(pts, sides)
  {
    let vectors = computeVectors(pts);

    let vertices = computeVertices(pts, vectors.vas, vectors.vbs, sides);
    let ids = computeIds(vertices.positions, sides);
    let uvs = computeUvs(vertices.positions, sides);
    let levelsData = computeLevels(pts, sides);

    let lineNormals = vectors.vas.reduce((vas, v, i) => {
      for(let j = 0; j < sides; j++){
        let id = 3 * (sides * i + j);
        vas[id] = v.x;
        vas[id + 1] = v.y;
        vas[id + 2] = v.z;
      }
      return vas;
    }, new Float32Array(vertices.positions.length));

    this.drawCallData.set({
      aVertexPosition:vertices.positions,
      aVertexNormal:vertices.normals,
      aCenter:vertices.centers,
      aLevel:levelsData.levels,
      aLevelRatio:levelsData.levelRatios,
      aLineNormal:lineNormals,
      ids:ids,
      aUV:uvs,
    });

    return vectors;
  }

  getDrawCallData()
  {
    return this.drawCallData;
  }
}


function flipNormals(normals){
  let n = normals.length;
  for(let i = 0; i < n; i++){
    normals[i] *= -1;
  }
}

function computeVectors(pts)
{
  let n = pts.length;
  let tans = [];
  let vas = [];
  let vbs = [];
  let v0 = (new Vec3()).copy(pts[1]).sub(pts[0]).normalize();
  tans[0] = v0;
  vas[0] = v0.clone().getNormalVec().normalize();
  vbs[0] = v0.clone().cross(vas[0]).normalize();
  for(let i = 1; i < n - 1; i++)
  {
    let p0 = pts[i - 1];
    let p1 = pts[i];
    let p2 = pts[i + 1];

    let tan = (new Vec3()).copy(p2).sub(p0).normalize();
    tans[i] = tan;
    vas[i] = tan.clone().cross(vbs[i - 1]).normalize().negate();
    vbs[i] = tan.clone().cross(vas[i]).normalize();
  }
  let vn = (new Vec3()).copy(pts[n - 1]).sub(pts[n - 2]).normalize();
  tans[n - 1] = vn;
  vas[n - 1] = vn.clone().cross(vbs[n - 2]).normalize().negate();
  vbs[n - 1] = vn.clone().cross(vas[n - 1]).normalize();
  return {
    tans:tans,
    vas:vas,
    vbs:vbs
  };
}


function computeVertices(pts, vas, vbs, sides)
{
  let n = pts.length;
  let positions = new Float32Array(n * sides * 3);
  let normals = new Float32Array(n * sides * 3);
  let centers = new Float32Array(n * sides * 3);
  let angRatio = 2 * Math.PI / (sides);
  for(let i = 0; i < n; i++){
    let p = pts[i];
    let va = vas[i];
    let vb = vbs[i];
    let pid = i * sides * 3;
    for(let j = 0; j < sides; j++){
      let ang = j * angRatio;
      let ca = Math.cos(ang);
      let sa = Math.sin(ang);
      let vid = pid + 3 * j;
      normals[vid] = va.x * ca + vb.x * sa;
      normals[vid + 1] = va.y * ca + vb.y * sa;
      normals[vid + 2] = va.z * ca + vb.z * sa;

      centers[vid] = p.x;
      centers[vid + 1] = p.y;
      centers[vid + 2] = p.z;

      positions[vid] = p.x + p.radius * normals[vid];
      positions[vid + 1] = p.y + p.radius * normals[vid + 1];
      positions[vid + 2] = p.z + p.radius * normals[vid + 2];
    }
  }
  return {
    positions:positions,
    centers:centers,
    normals:normals,
  };
}


function computeIds(vertices, sides)
{
  let n = vertices.length / 3;
  let ids = new Uint16Array((n - 1) * 6);
  for(let i = 0; i < (n - sides); i++){
    let id = 6 * i;
    let nextId = ((i + 1) % sides) === 0 ? i - (sides - 1) : i + 1;

    ids[id] = i;
    ids[id + 1] = nextId;
    ids[id + 2] = nextId + sides;

    ids[id + 3] = i;
    ids[id + 4] = nextId + sides;
    ids[id + 5] = i + sides;
  }
  return ids;
}


function computeUvs(vertices, sides)
{
  let n = vertices.length / 3;
  let uvs = new Float32Array(2 * n);
  let nLevels = n / (sides + 1);
  for(let i = 0; i < n; i++){
    uvs[2 * i] = ( i % sides ) / sides;
    uvs[2 * i + 1] = (i / sides) / nLevels;
  }
  return uvs;
}


function computeLevels(pts, sides)
{
  let nPts = pts.length;
  let levels = new Float32Array(sides * nPts);
  let levelRatios = new Float32Array(sides * nPts);
  for(let i = 0; i < nPts; i++){
    let p = pts[i];
    let level = i;
    let levelRatio = i / (nPts - 1);
    for(let j = 0; j < sides; j++){
      levels[sides * i + j] = level;
      levelRatios[sides * i + j] = levelRatio;
    }
  }
  return {
    levels:levels,
    levelRatios:levelRatios
  };
}

