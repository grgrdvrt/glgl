import DrawCallData from "../core/DrawCallData";

export default class CylinderGeometry
{
  constructor(nCols, nRows, radiusTop, radiusBottom, topClosed, bottomClosed)
  {
    this.drawCallData = new DrawCallData();
    this.setBuffers(nCols, nRows, radiusTop, radiusBottom, topClosed, bottomClosed);

  }

  setBuffers(nCols, nRows, radiusTop = 1, radiusBottom = radiusTop, topClosed = false, bottomClosed = topClosed)
  {
    let nx = nCols + 1;
    let ny = nRows + 1;
    let nVertices = nx * ny;

    let totalVertices = nVertices;
    if(topClosed) totalVertices += nx + 1;
    if(bottomClosed) totalVertices += nx + 1;

    let positions = new Float32Array(3 * totalVertices);
    let normals = new Float32Array(3 * totalVertices);
    let uvs = new Float32Array(2 * totalVertices);

    let i, id, col, row;
    for(i = 0; i < nVertices; i++)
    {
      id = 3 * i;
      col = i % nx;
      row = Math.floor(i / nx);

      let ratio = row / nRows;
      let radius = radiusTop + ratio * (radiusBottom - radiusTop);

      let angle = 2 * Math.PI * (col / nCols);
      positions[id] = radius * Math.cos(angle);
      positions[id + 1] = 0.5 - row / nRows;
      positions[id + 2] = radius * Math.sin(angle);

      normals[id] = positions[id];
      normals[id + 1] = 0;
      normals[id + 2] = positions[id + 2];

      let uvID = 2 * i;
      uvs[uvID] = col / nCols;
      uvs[uvID + 1] = row / nRows;
    }

    let nQuads = nVertices - nx;

    let totalTriangles = 2 * nQuads;
    if(topClosed)totalTriangles += nCols;
    if(bottomClosed)totalTriangles += nCols;

    let ids = new Uint16Array(3 * totalTriangles);

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

    let closeSide = (firstId, firstSrcId, firstTriangleId, direction) => {
      for(i = 0; i < nx; i++){
        let id = (firstId + i) * 3;
        positions[id] = positions[firstSrcId + 3 * i];
        positions[id + 1] = positions[firstSrcId + 3 * i + 1];
        positions[id + 2] = positions[firstSrcId + 3 * i + 2]; 

        normals[id] = normals[id + 2] = 0;
        normals[id + 1] = direction;

        let uvID = (firstId + i) * 2;
        uvs[uvID] = i / nCols;
        uvs[uvID + 1] = 0.5 * (direction + 1);
      }

      let centerVertexId = firstId + nx;
      let centerId = 3 * centerVertexId;
      positions[centerId] = positions[centerId + 2] = 0;
      positions[centerId + 1] = -direction * 0.5;

      normals[centerId] = normals[centerId + 2] = 0;
      normals[centerId + 1] = direction;

      let centerUVId = 3 * centerVertexId;
      uvs[centerUVId] = 0.5;
      uvs[centerUVId + 1] = direction;

      for(i = 0; i < nCols; i++)
      {
        let id = 3 * (firstTriangleId + i);
        ids[id] = centerVertexId;
        ids[id + 1] = firstId + i;
        ids[id + 2] = firstId + i + 1;
      }
    };


    if(topClosed){
      closeSide(nVertices, 0, 2 * nQuads, -1);
    }
    if(bottomClosed){
      closeSide(
        nVertices + (topClosed ? (nx + 1) : 0),
        3 * (nVertices - nx),
        2 * nQuads + (topClosed ? nCols : 0),
        1
      );
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
