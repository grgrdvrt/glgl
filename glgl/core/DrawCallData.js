import IdsAttribute from "./IdsAttribute";
import AttributeBuffer from "./AttributeBuffer";

export default class DrawCallData
{
  constructor(attributes, uniforms)
  {
    this.params = {};
    this.defines = {};
    this.attributes = {};
    this.uniforms = {};
    if(attributes !== undefined){
      this.setAttributes(attributes);
    }
    if(uniforms !== undefined){
      this.setUniforms(uniforms);
    }
  }


  setIds(data)
  {
    if(this.params.ids === undefined){
      this.params.ids = new IdsAttribute();
    }
    this.params.ids.setData(data);
  }


  setAttributes(data)
  {
    for(let name in data){
      let aBuffer = this.attributes[name];
      if(aBuffer === undefined){
        aBuffer = this.attributes[name] = new AttributeBuffer();
      }
      aBuffer.setData(data[name]);
    }
  }


  setUniforms(data)
  {
    for(let name in data){
      this.uniforms[name] = data[name];
    }
  }
}
