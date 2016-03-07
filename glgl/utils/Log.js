export default function Log()
{
  var isActivated = false;
  var prefix;

  var log = function()
  {
    if(!isActivated)return;
    var args = Array.prototype.slice.call(arguments);
    if(prefix !== undefined) {
      args.unshift(prefix);
    }

    if(console.log.apply !== undefined ) {
      console.log.apply(console, args);
    }
    else {
      console.log(args.join(", "));
    }

  };

  log.activate = function(prefixStr)
  {
    if(prefixStr !== undefined) {
      prefix = prefixStr;
    }
    isActivated = true;
  };
  return log;
}
