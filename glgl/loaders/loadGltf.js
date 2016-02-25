import Mesh from "../SceneObject/Mesh";
import Group from "../SceneObject/Group";
import Texture from "../core/Texture";

//log.activate("progressiveLoader");

module.exports = function(url){
  var directoryPath = url.split("/");
  directoryPath.length--;
  directoryPath = directoryPath.join("/") + "/";
  function load(){
    var deferred = new Q.defer();

    var modelInfosPromise = promiseAllProgress([
      dataLoader(url + ".json").load(),
      dataLoader(url + ".bin", {responseType:"blob"}).load()
    ]).progress(function(progressInfos){
      deferred.notify({
        progress:progressInfos.progress / progressInfos.total,
        total:2
      });
    });

    modelInfosPromise.spread(function(json, bin){
      var descriptor = JSON.parse(json);
      log("descriptor", descriptor);
      var next = [
        buildGeometries(descriptor.geometries, bin),
      ];
      if(descriptor.images !== undefined){
        next.push(groupLoader(descriptor.images.map(function(imgUrl){
          return loadTexture(directoryPath + imgUrl);
        })).load().then(function(textures){
          return buildMaterials(descriptor.materials, textures);
        }));
      }
      return promiseAllProgress(next).spread(function(geometries, materials){
        log("geometries & mat complete");
        return buildScene(descriptor.scenes, geometries, materials);
      }).progress(function(progressInfos){
        deferred.notify({
          progress:1 + progressInfos.progress / progressInfos.total,
          total:2
        });
      });
    }).then(function(data){
      deferred.resolve(data);
    });

    return deferred.promise;

  }
  return {
    load : load
  };
};


function loadTexture(url)
{
  if(url === ""){
    return Q(new Texture());
  }
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(url)[1] || '';
  ext = ext.toLowerCase();

  var texture;
  if(ext === "tex"){
    texture = ctLoader(url);
  }
  else {
    log("use", ext);
    texture = textureLoader(url);
  }
  return texture;
}


function buildMaterials(materialsData, textures)
{
  log("buildMaterials");
  var materials = materialsData.map(function(materialData){
    var texture;
    var mData = {};
    if(materialData.emissiveMapId !== undefined){
      texture = textures[materialData.emissiveMapId];
    }
    if(texture) {
      mData.map = texture;
      mData.map.needsUpdate = true;
      //log(mData.map);
    }
    return new BasicFogMaterial(mData);
  });
  return Q(materials);
}





function buildGeometries(geometriesData, bin)
{
  log("buildGeometries");
  var geomPromises = [];
  geometriesData.forEach(function(geometryData){
    var geometry = new Geometry();
    var buffersData = geometryData.buffers;
    var reads = [];
    for(var l in buffersData){
      var infos = buffersData[l];
      reads.push(readBuffer(infos, bin, geometry).then(addBuffer.bind(null, geometry, infos)));
    }
    geomPromises.push(Q.all(reads).then(function(){
      //console.time("normal");
      //geometry.computeVertexNormals();
      //console.timeEnd("normal");
      return Q(geometry);
    }));
  });
  return Q.all(geomPromises);
}


function addBuffer(geometry, infos, data){
  let namesMap = {
    "ids":"index",
    "VERTEX":"position",
    "TEXCOORD":"uv",
    "NORMAL":"normal"
  };
  let name = namesMap[infos.name] || infos.name;
  if(name === "index"){
    geometry.setIds(undefined, data);
  }
  else{
    let buffer = {};
    buffer[name] = data;
    geometry.setBuffers(buffer);
  }
}


function readBuffer(infos, bin, geom)
{
  log("readBuffer");
  var deferred = Q.defer();
  var reader = new FileReader();
  reader.addEventListener("loadend", function(){
    deferred.resolve(new window[infos.constructorName](reader.result));
  });
  reader.readAsArrayBuffer(bin[bin.slice ? 'slice' : 'webkitSlice'](infos.offset, infos.offset + infos.length));
  return deferred.promise;
}



function buildScene(sceneData, geometries, materials)
{
  log("buildScene");
  var nodes = [];
  sceneData.forEach(function(nodeData){
    var node;
    switch(nodeData.type){
      case "group": node = initGroup(nodeData, nodes); break;
      case "light": node = initLight(nodeData); break;
      case "camera": console.warn("camera not supported"); break;
      case "mesh": node = initMesh(nodeData, geometries, materials); break;
      //case "joint": node = initJoint(nodeData); break;
      case undefined : node = initGroup(nodeData, nodes); break;
      default : throw new Error("unknown type : " + nodeData.type);
    }
    if(node){
      initNode(nodeData, node);
      nodes.push(node);
    }
  });
  var scene = nodes[nodes.length - 1];
  scene.matrix.scale(0.1, 0.1, 0.1);
  return Q(scene);
}


function initNode(nodeData, node)
{
  log("initNode");
  if(nodeData.position){
    node.position.copy(nodeData.position);
  }
  if(nodeData.rotation){
    var r = nodeData.rotation;
    node.rotation.copy(new THREE.Euler(r.x, r.y, r.z));
  }
  if(nodeData.scale){
    node.scale.copy(nodeData.scale);
  }

  node.name = nodeData.name;
  return node;
}


function initGroup(groupData, nodes)
{
  //log("initGroup", nodes);
  var group = new Group();
  if(groupData.children === undefined){
    return group;
  }
  for(var i = 0, ii = groupData.children.length; i < ii; i++){
    var node = nodes[groupData.children[i]];
    if(!node || node.skip) continue;
    if(node.parent)node = node.clone();
    group.add(node);
  }
  return group;
}


function initLight(lightData)
{
  log("initLight", lightData);
  return undefined;
  //return new THREE.PointLight();
}


function initMesh(meshData, geometries, materials)
{
  var geometry = geometries[meshData.geometryId];
  if(!geometry || !geometry.attributes.position){
    return {skip:true};
  }
  var material = materials[meshData.materialId];
  return new Mesh(geometry, material);
}


/*function initJoint(jointData)
{
  var group = new THREE.Group();
  for(var i = 0, ii = jointData.children.length; i < ii; i++){
    var node = nodes[jointData.children[i]];
    if(!node || node.skip) continue;
    if(node.parent)node = node.clone();
    group.add(node);
  }
  return group;
}*/
