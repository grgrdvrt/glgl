import Geometry from "../geometry/Geometry";

export default function mergeGeometries(geometries, additionalNames = []){

  let datas = geometries.map(geom => geom.getDrawCallData());

  let ids;
  let mergeIds = () => {

    let bufferLength = datas.reduce((n, data) => {
      if(data.ids === undefined) {
        //TODO support geometries without ids
        throw new Error("geometries without not supported yet");
      }
      return n + data.ids.data.length;
    }, 0);
    let resultBuffer = new Uint32Array(bufferLength);

    datas.reduce((result, data) => {
      let buffer = data.ids.data;
      let n = buffer.length;
      for(let i = 0; i < n; i++){
        result.buffer[result.indexBegin + i] = result.positionBegin + buffer[i];
      }
      result.indexBegin += n;
      result.positionBegin += data.attributes.aVertexPosition.data.length / 3;
      return result;
    }, {indexBegin:0, positionBegin:0, buffer:resultBuffer});
    ids = resultBuffer;
  };


  let buffers = {};
  let mergeBuffer = inputName => {

    let sample = datas[0].attributes[inputName];
    if(sample === undefined) return;
    let bufferType = sample.data.constructor;
    let bufferLength = datas.reduce((n, data) => {
      let buffer = data.attributes[inputName].data;
      return n + buffer.length;
    }, 0);
    let resultBuffer = new bufferType(bufferLength);

    datas.reduce((result, data) => {
      let buffer = data.attribute[inputName].data;
      let n = buffer.length;
      for(let i = 0; i < n; i++){
        result.buffer[result.indexBegin + i] = buffer[i];
      }
      result.indexBegin += n;
      return result;
    }, {indexBegin:0, buffer:resultBuffer});
    buffers[inputName] = resultBuffer;
  };


  mergeIds();

  let names = [ "aVertexPosition", "aUV", "aVertexNormal" ].concat(additionalNames);
  names.forEach(mergeBuffer);

  return new Geometry(buffers, ids);
}
