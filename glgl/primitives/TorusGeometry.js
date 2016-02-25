import DrawCallData from "../core/DrawCallData";
import Vec3 from "../math/Vec3";

export default class TorusGeometry
{
  constructor(nCols, nRows, thickness)
  {
    this.drawCallData = new DrawCallData();
    this.setBuffers(nCols, nRows, thickness);

  }

  setBuffers(nCols, nRows, thickness = 0.5)
  {
    if(thickness > 1)thickness = 1;
    else if(thickness < 0)thickness = 0;

    let nx = nRows + 1;
    let ny = nCols + 1;
    let nVertices = nx * ny;

    let positions = new Float32Array(3 * nVertices);
    let normals = new Float32Array(3 * nVertices);
    let uvs = new Float32Array(2 * nVertices);

    let i, j, id;
    let center = new Vec3();
    let norm0 = new Vec3();
    let norm1 = new Vec3();
    let pos = new Vec3();
    for(j = 0; j < ny; j++)
    {
      let ang0 = 2 * Math.PI * j / nCols;
      center.set(Math.cos(ang0), 0, Math.sin(ang0));
      for(i = 0; i < nx; i++)
      {
        let vId = j * nx + i;
        id = 3 * vId;

        let ang1 = 2 * Math.PI * i / nRows;
        norm1.copy(center).scale(Math.cos(ang1));
        norm1.y += Math.sin(ang1);

        pos.copy(norm1).scale(thickness).add(center);


        positions[id] = pos.x;
        positions[id + 1] = pos.y;
        positions[id + 2] = pos.z;

        normals[id] = norm1.x;
        normals[id + 1] = norm1.y;
        normals[id + 2] = norm1.z;

        let uvID = 2 * vId;
        uvs[uvID] = j / nCols;
        uvs[uvID + 1] = i / nRows;
      }
    }

    let nQuads = nVertices - nx;

    let ids = new Uint16Array(6 * nQuads);

    for(i = 0; i < nQuads; i++)
    {
      id = 6 * i;
      let col = i % nx;
      let row = Math.floor(i / nx);
      if(col == nx - 1) continue;
      let nextVertexID = row * nx + ((col + 1) % nx);

      ids[id] = i;
      ids[id + 1] = nextVertexID;
      ids[id + 2] = nextVertexID + nx;

      ids[id + 3] = i;
      ids[id + 4] = nextVertexID + nx;
      ids[id + 5] = i + nx;
    }

    this.drawCallData.setIds(ids);
    this.drawCallData.setAttributes({
      aVertexPosition:positions,
      aVertexNormal:normals,
      aUV:uvs,
    });
  }


  getDrawCallData()
  {
    return this.drawCallData;
  }
}
