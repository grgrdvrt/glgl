import Context from "../glgl/core/Context";

import LightMaterial from "../glgl/materials/LightMaterial";

import Camera from "../glgl/sceneObjects/Camera";
import Light from "../glgl/lights/Light";

import Mesh from "../glgl/sceneObjects/Mesh";
import Group from "../glgl/sceneObjects/Group";
import SceneRenderer from "../glgl/sceneVisitors/SceneRenderer";

import Loop from "../utils/Loop";


export default class Giggle
{
  constructor()
  {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.context = new Context(this.canvas);

    this.sceneRenderer = new SceneRenderer(this.context);

    this.scene = new Group();

    this.defaultMaterial = new LightMaterial(0xeeeeee);


    this.camera = new Camera(75, this.context.width / this.context.height, 1, 10000);
    this.camera.position.z = 10;
    this.scene.add(this.camera);

    this.light = new Light();
    this.scene.add(this.light);


    this.context.viewport.resized.add((w, h) => this.camera.aspect = w / h);

  }


  set(data)
  {
    this.sceneRenderer.set(data);
  }


  start(updateCallback)
  {
    this.updateCallback = updateCallback;
    this.loop = new Loop(this.update.bind(this));
  }


  create(geometry)
  {
    let mesh = new Mesh(geometry, this.defaultMaterial);
    this.scene.add(mesh);
    return mesh;
  }


  update(frameId)
  {
    if(this.updateCallback !== undefined){
      this.updateCallback(frameId);
    }
    this.sceneRenderer.set({time:frameId});
    this.render();
  }


  render()
  {
    this.sceneRenderer.render(this.scene, this.camera);
  }


  debug()
  {
    this.loop.pause();
    let drawCalls = this.sceneRenderer.render(this.scene, this.camera);
    drawCalls.forEach(dc => dc.logInputs());
  }
}

