import DrawCallData from "../core/DrawCallData";

export default class CubeGeometry
{
  constructor()
  {
    this.drawCallData = new DrawCallData();
    this.updateBuffers();
  }

  updateBuffers()
  {
    let positions = new Float32Array([
      -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,//back
      -1,-1,-1,    1,-1,-1,    1,-1, 1,    -1,-1, 1,//top
       1,-1,-1,    1,-1, 1,    1, 1, 1,     1, 1,-1,//right
      -1, 1,-1,    1, 1,-1,    1, 1, 1,    -1, 1, 1,//bottom
      -1, 1,-1,   -1, 1, 1,   -1,-1, 1,    -1,-1,-1,//left
      -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1//front
    ]);

    let ids = new Uint16Array([
      0, 1, 3, 1, 2, 3, //back
      4, 5, 7, 5, 6, 7, //top
      8, 9, 11, 9, 10, 11, //right
      12, 13, 15, 13, 14, 15, //bottom
      16, 17, 19, 17, 18, 19, //left
      20, 21, 23, 21, 22, 23 //front
    ]);

    let normals = new Float32Array([
      0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, //back
      0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, //top
      1,0,0, 1,0,0, 1,0,0, 1,0,0, //right
      0,1,0, 0,1,0, 0,1,0, 0,1,0, //bottom
      -1,0,0, -1,0,0, -1,0,0, -1,0,0, //left
      0,0,1, 0,0,1, 0,0,1, 0,0,1 //front
    ]);

    let uvs = new Float32Array([
      0,0, 1,0, 1,1, 0,1, //back
      0,0, 1,0, 1,1, 0,1, //top
      0,0, 1,0, 1,1, 0,1, //right
      0,0, 1,0, 1,1, 0,1, //bottom
      0,0, 1,0, 1,1, 0,1, //left
      0,0, 1,0, 1,1, 0,1 //front
    ]);

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

