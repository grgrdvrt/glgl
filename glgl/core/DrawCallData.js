import IdsAttribute from "./IdsAttribute";
import consts from "./consts";
import AttributeBuffer from "./AttributeBuffer";

export default class DrawCallData
{
  constructor(attributes, uniforms, ids)
  {
    this.defines = {};
    this.attributes = {};
    this.uniforms = {};

    if(attributes){
      this.setAttributes(attributes);
    }
    if(uniforms){
      this.setUniforms(uniforms);
    }
    if(ids){
      this.setIds(ids);
    }

    this.ids = undefined;
    this.enableCulling = undefined;
    this.cullingMode = undefined;
    this.drawMethod = undefined;
    this.program = undefined;
  }


  setIds(data)
  {
    if(this.ids === undefined){
      this.ids = new IdsAttribute();
    }
    this.ids.setData(data);
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


  clearCache(...names)
  {
    if(names.length > 0) {
      names.forEach(name => {
        let attr = this.attributes[name];
        if(attr !== undefined) {
          attr.needsUpdate = true;
        }
      });
    }
    else {
      for(let name in attributes){
        this.attributes[name].needsUpdate = true;
      }
    }
  }


  dispose()
  {
    //to be implemented
  }
}
