window.requestAnimationFrame = window.requestAnimationFrame || 
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame || 
              window.msRequestAnimationFrame || 
              function(fn){return setTimeout(fn, 50/3);};



window.cancelAnimationFrame = window.cancelAnimationFrame || 
               window.mozCancelAnimationFrame || 
               window.webkitCancelAnimationFrame || 
               function(id){clearTimeout(id);};



if(!Function.prototype.bind)
{
  Function.prototype.bind = function(scope) 
  {
    if(!method) throw new Error("no method specified");
    var args = Array.prototype.slice.call(arguments, 2);
    return function() 
    {
        var params = Array.prototype.slice.call(arguments);
        method.apply(scope, params.concat(args));
      };
  };
}



if(window.console === undefined || console.log === undefined) {
  window.console = {
    log:function(){}
  };
}


export default {};
