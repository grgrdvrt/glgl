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
      -1,-1,-1, -1,-1,1, -1,1,1, -1,1,-1,//left
      -1,-1,1, 1,-1,1, 1,1,1, -1,1,1,//front
      1,-1,1, 1,-1,-1, 1,1,-1, 1,1,1,//right
      1,-1,-1, -1,-1,-1, -1,1,-1, 1,1,-1,//back
      -1,1,-1, 1,1,-1, 1,1,1, -1,1,1,//top
      -1,-1,1, 1,-1,1, 1,-1,-1, -1,-1,-1//bottom
    ]);

    let ids = new Uint16Array([
      0,1,2, 0,2,3,//left
      4,5,6, 4,6,7,//front
      8,9,10, 8,10,11,//right
      12,13,14, 12,14,15,//back
      16,18,17, 16,19,18,//top
      20,22,21, 20,23,22//bottom
    ]);

    let normals = new Float32Array([
      -1,0,0, -1,0,0, -1,0,0, -1,0,0,//left
      0,0,1, 0,0,1, 0,0,1, 0,0,1,//front
      1,0,0, 1,0,0, 1,0,0, 1,0,0, //right
      0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, //back
      0,1,0, 0,1,0, 0,1,0, 0,1,0, //top
      0,-1,0, 0,-1,0 ,0,-1,0, 0,-1,0,//bottom
    ]);

    let uvs = new Float32Array([
      0,0, 1,0, 1,1, 0,1,//left
      0,0, 1,0, 1,1, 0,1,//front
      0,0, 1,0, 1,1, 0,1,//right
      0,0, 1,0, 1,1, 0,1,//back
      0,0, 1,0, 1,1, 0,1,//top
      0,0, 1,0, 1,1, 0,1,//bottom
   ]);

    this.drawCallData.setIds(ids);
    this.drawCallData.setAttributes({
      aVertexPosition:positions,
      aVertexNormal:normals,
      aUV:uvs
    });
  }


  getDrawCallData()
  {
    return this.drawCallData;
  }
}

