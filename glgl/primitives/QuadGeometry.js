import DrawCallData from "../core/DrawCallData";

export default class QuadGeometry
{
  constructor()
  {
    this.drawCallData = new DrawCallData();
    this.setBuffers();
  }

  setBuffers()
  {
    let positions = new Float32Array([
      -1, -1, 0,
      1, -1, 0,
      1, 1, 0,
      -1, 1, 0
    ]);

    let uvs = new Float32Array([
      0, 0,
      1, 0,
      1, 1,
      0, 1
    ]);

    let ids = new Uint16Array([
      0, 2, 1,
      0, 3, 2
    ]);

    this.drawCallData.set({
      aVertexPosition:positions,
      aUV:uvs,
      ids:ids
    });

  }

  getDrawCallData()
  {
    return this.drawCallData;
  }
}
