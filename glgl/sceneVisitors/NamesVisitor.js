export default class NamesVisitor
{
  constructor()
  {
    this.result = [];
    this.tabs = [];
  }

  enterNode(node)
  {
    this.result.push(this.tabs.join("") + node.type + (node.name ? " : " + node.name + " " :""));
    this.tabs.push("\t");
    return true;
  }

  exitNode(node)
  {
    this.tabs.pop();
  }

  getResult()
  {
    return this.result.join("\n");
  }
}
