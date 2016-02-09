import Mat4 from "../math/Mat4";

export default class TransformsVisitor
{
  constructor()
  {
    this.transform = new Mat4();
    this.transforms = [];
  }


  enterNode(node)
  {
    this.transform = node.transform.multiplyMat(this.transform);
    this.transforms.push(this.transform);
    node._globalTransform.copy(this.transform);
    return true;
  }


  exitNode(node)
  {
    this.transforms.pop();
    this.transform = this.transforms[this.transforms.length - 1];
  }


  getResult()
  {
    return;
  }
}
