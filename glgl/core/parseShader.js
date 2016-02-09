var identifier = "[a-zA-Z0-9_]+";
var type = `struct|void|boolean|int|float|vec2|bvec2|vec3|bvec3|vec4|bvec4|mat2|mat3|mat4|sampler2D|samplerCube`;
var customType = `${identifier}`;
var declaration = `(${type}|${customType})\\s+(${identifier})\\s*(\\[(\\d+)\\]){0,1}\\s*;`;
var struct = `struct\\s*(${identifier})\\s*{\\s*((${declaration})\\s*)+\\s*}`;
var input = `(attribute|uniform)\\s+(${declaration})`;

function extract(expSrc, string, func){
  var structRegExp = new RegExp(expSrc, "g");
  var arr = [];
  var result = [];
  while ((arr = structRegExp.exec(string)) !== null) {
    result.push(func(arr));
  }
  return result;
}

function getStructs(src)
{
  var structs = extract(struct, src, arr => {
    return {
      "src":arr[0],
      "name":arr[1]
    };
  });

  structs.forEach(function(struct){
    struct.inputs = extract(declaration, struct.src, arr => {
      return {
        "type":arr[1],
        "name":arr[2],
        "quantity":parseInt(arr[4] || "-1")
      };
    });
  });
  return structs;
}

function getInputs(src){
  return extract(input, src, arr => {
    return {
      "inputType":arr[1],
      "type":arr[3],
      "name":arr[4],
      "quantity":parseInt(arr[6] || "-1")
    };
  });
}


function cloneInput(input){
  var clone = {};
  for(var k in input) clone[k] = input[k];
  return clone;
}


function removeArrays(inputs)
{
  var n = inputs.length;
  for(var i = 0; i < n; i++) {
    var input = inputs[i];
    if(input.quantity === -1) continue;
    var nClones = input.quantity - 1;
    input.quantity = -1;
    for(var j = 0; j < nClones; j++){
      var clone = cloneInput(input);
      clone.name +="[" + (j + 1) + "]";
      inputs.push(clone);
    }
    input.name +="[0]";
  }
}


function removeStructs(inputs, structsList)
{
  var n = inputs.length;
  for(var i = 0; i < n; i++){
    var input = inputs[i];
    var struct = structsList.filter(struct => struct.name === input.type)[0];
    if(struct === undefined){
      continue;
    }
    var nClones = struct.inputs.length - 1;
    for(var j = 0; j < nClones; j++){
      var clone = cloneInput(input);
      var structInput = struct.inputs[j];
      clone.name += "." + structInput.name;
      clone.type = structInput.type;
      inputs.push(clone);
    }
    input.name += "." + struct.inputs[0].name;
  }
}



export default function parseShader(src)
{
  var structs = getStructs(src);
  structs.forEach(struct => {
    removeArrays(struct.inputs);
    removeStructs(struct.inputs, structs);
  });

  var inputs = getInputs(src);
  removeArrays(inputs);
  removeStructs(inputs, structs);

  var result = {
    "uniform":[],
    "attribute":[],
  };
  inputs.forEach(input => result[input.inputType].push(input));
  return result;
}
