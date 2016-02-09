function traverseNode(node, visitors)
{
  //unclear
  var visitNext = true;
  var visitorsToExit = visitors.filter(visitor => {
    if(visitNext){
      visitNext = visitor.enterNode(node) !== false;
      return true;
    }
    else {
      return false;
    }
  });
  if(visitNext && node.children){
    node.children.forEach(child => {
      traverseNode(child, visitors);
    });
  }
  visitorsToExit.forEach(visitor => {
    visitor.exitNode(node);
  });
}

export default function traverseTree(tree, visitors)
{
  traverseNode(tree, visitors);
}
