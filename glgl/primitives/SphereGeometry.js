import DrawCallData from "../core/DrawCallData";
import Vec3 from "../math/Vec3";

export default class SphereGeometry
{
  constructor(nCols, nRows)
  {
    this.drawCallData = new DrawCallData();
    this.setBuffers(nCols, nRows);

  }

  setBuffers(nCols, nRows)
  {
    let nx = nCols + 1;
    let ny = nRows + 1;
    let nVertices = nx * ny;

    let positions = new Float32Array(3 * nVertices);
    let normals = new Float32Array(3 * nVertices);
    let uvs = new Float32Array(2 * nVertices);

    let i, id, col, row;
    let v3 = new Vec3();
    for(i = 0; i < nVertices; i++)
    {
      id = 3 * i;
      col = i % nx;
      row = Math.floor(i / nx);

      v3.y = -Math.cos(Math.PI * row / nRows);
      let radius = Math.sqrt(1 - v3.y * v3.y);
      let angle = 2 * Math.PI * (col / nCols);
      v3.x = radius * Math.cos(angle);
      v3.z = radius * Math.sin(angle);

      positions[id] = v3.x;
      positions[id + 1] = v3.y;
      positions[id + 2] = v3.z;

      v3.normalize();

      normals[id] = v3.x;
      normals[id + 1] = v3.y;
      normals[id + 2] = v3.z;

      let uvID = 2 * i;
      uvs[uvID] = col / nCols;
      uvs[uvID + 1] = row / nRows;
    }

    let nQuads = nVertices - nx;

    let ids = new Uint16Array(6 * nQuads);

    for(i = 0; i < nQuads; i++)
    {
      id = 6 * i;
      col = i % nx;
      row = Math.floor(i / nx);
      if(col == nx - 1) continue;
      let nextVertexID = row * nx + ((col + 1) % nx);

      ids[id] = i;
      ids[id + 1] = nextVertexID;
      ids[id + 2] = nextVertexID + nx;

      ids[id + 3] = i;
      ids[id + 4] = nextVertexID + nx;
      ids[id + 5] = i + nx;
    }

    this.drawCallData.set({
      aVertexPosition:positions,
      aVertexNormal:normals,
      aUV:uvs,
      ids:ids
    });
  }


  getDrawCallData()
  {
    return this.drawCallData;
  }
}
