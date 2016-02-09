import DrawCallData from "../core/DrawCallData";

export default function mergeGeometries(geometries, additionalNames = []){


  let datas = geometries.map(geom => geom.getDrawCallData());
  let inputs = {};



  let mergeIds = () => {

    let bufferLength = datas.reduce((n, data) => {
      return n + data.params.ids.data.length;
    }, 0);
    //console.warn("only Uint16Arrays");
    let resultBuffer = new Uint32Array(bufferLength);

    datas.reduce((result, data) => {
      let buffer = data.params.ids.data;
      let n = buffer.length;
      for(let i = 0; i < n; i++){
        result.buffer[result.indexBegin + i] = result.positionBegin + buffer[i];
      }
      result.indexBegin += n;
      result.positionBegin += data.getInput("aVertexPosition").data.length / 3;
      return result;
    }, {indexBegin:0, positionBegin:0, buffer:resultBuffer});
    inputs.ids = resultBuffer;
  };


  let mergeBuffer = (inputName) => {

    let bufferType = datas[0].getInput(inputName).data.constructor;
    let bufferLength = datas.reduce((n, data) => {
      let buffer = data.getInput(inputName).data;
      return n + buffer.length;
    }, 0);
    let resultBuffer = new bufferType(bufferLength);

    datas.reduce((result, data) => {
      let buffer = data.getInput(inputName).data;
      let n = buffer.length;
      for(let i = 0; i < n; i++){
        result.buffer[result.indexBegin + i] = buffer[i];
      }
      result.indexBegin += n;
      return result;
    }, {indexBegin:0, buffer:resultBuffer});
    inputs[inputName] = resultBuffer;
  };


  mergeIds();

  let names = [ "aVertexPosition", "aUV", "aVertexNormal" ].concat(additionalNames);
  names.forEach(mergeBuffer);

  let drawCallData = new DrawCallData(inputs);

  return {
    getDrawCallData : () => drawCallData
  };
}
