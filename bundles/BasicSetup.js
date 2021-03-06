import Context from "../glgl/core/Context";

import LightMaterial from "../glgl/materials/LightMaterial";

import Camera from "../glgl/sceneObjects/Camera";
import DirectionalLight from "../glgl/lights/DirectionalLight";
import AmbientLight from "../glgl/lights/AmbientLight";

import Mesh from "../glgl/sceneObjects/Mesh";
import Group from "../glgl/sceneObjects/Group";
import SceneRenderer from "../glgl/sceneVisitors/SceneRenderer";

import Loop from "../glgl/utils/Loop";

import MouseControl from "../glgl/controllers/MouseControl";


export default class BasicSetup
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

    this.directionalLight = new DirectionalLight();
    this.scene.add(this.directionalLight);

    this.ambientLight = new AmbientLight(0x888888);
    this.scene.add(this.ambientLight);

    this.context.resized.add((w, h) => this.camera.aspect = w / h);

  }


  setUniforms(uniforms)
  {
    this.sceneRenderer.setUniforms(uniforms);
  }


  start(updateCallback)
  {
    this.updateCallback = updateCallback;
    new MouseControl(this.canvas, this.camera);
    this.loop = new Loop(this.update.bind(this));
  }


  create(geometry, material)
  {
    let mesh = new Mesh(geometry, material || this.defaultMaterial);
    this.scene.add(mesh);
    return mesh;
  }


  update(frameId)
  {
    if(this.updateCallback !== undefined){
      this.updateCallback(frameId);
    }
    this.sceneRenderer.setUniforms({time:frameId});
    this.render();
  }


  render()
  {
    return this.sceneRenderer.render(this.scene, this.camera);
  }


  get backgroundColor() { return this.context.clearColor;}
  set backgroundColor(value)
  {
    this.context.clearColor.set(value);
  }


  debug()
  {
    this.loop.pause();
    let drawCalls = this.render();
  }
}

