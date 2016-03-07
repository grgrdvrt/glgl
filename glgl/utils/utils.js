import "./polyfills";

export function isFunction(functionToCheck)
{
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}


export function defaultOptions(options, defaults){
    if(options === undefined){
        options = {};
    }
    for(var key in defaults){
        if(options[key] === undefined){
            options[key] = defaults[key];
        }
    }
    return options;
}


export function wait(test, callback)
{
    (function check() {
        if(test()) {
            callback();
        }
        else {
            requestAnimationFrame(check);
        }
    })();
}
