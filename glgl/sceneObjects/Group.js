import SceneNode from "./SceneNode";

export default class Group extends SceneNode
{
  constructor()
  {
    super();
    this.children = [];
  }


  add(node)
  {
    node.detach();
    this.children.push(node);
    node.parent = this;
  }


  remove(node)
  {
    var id = this.children.indexOf(node);
    if(id === -1){
      return;
    }

    this.children.splice(id, 1);
    node.parent = undefined;
  }

}
