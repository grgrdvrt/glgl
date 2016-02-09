import utils from "../utils";
import servicesUtils from "./servicesUtils";

export default function dataLoader(url, options)
{
    options = utils.defaultOptions(options, {
        useCache : true,
        post : {},
        get : {},
        responseType : "text"
    });

    function load(){
        var deferred = Q.defer();

        if(url === undefined){
            deferred.reject(new Error("dataLoader no URL provided"));
        }


        var getUrl = url;

        var getString = servicesUtils.varsToString(options.GET);
        if(getString.length > 0) {
            getUrl = servicesUtils.urlAppendVars(getUrl, getString);
        }

        if(!options.useCache) {
            getUrl = servicesUtils.urlAppendVars(getUrl, "t=" + new Date().getTime());
        }

        var postVars = servicesUtils.varsToString(options.POST);

        var request = new XMLHttpRequest();

        request.addEventListener("progress", function(evt){
            deferred.notify();
        });

        request.addEventListener("load", function(evt) {
            var response = request.response;
            if(response === undefined) {
                response = request.responseText;
            }
            deferred.resolve(response);
        });

        request.addEventListener("error", function(evt){
            deferred.reject(new Error("dataLoader : loadingError"));
        });
        request.addEventListener("abort", function(evt){
            deferred.reject(new Error("dataLoader : loading aborted"));
        });

        if(postVars !== "") { request.open('POST', getUrl); }
        else { request.open('GET', getUrl); }

        request.responseType = options.responseType;
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send(postVars);

        return deferred.promise;
    }

    return {
        load:load
    };
}

/*
 dataLoader("machin.com", {post:{"msg":"hello world"}}).load().then(function(data){
 console.log(data.machin);
 });

 queueLoader(dataLoader("machin.com", {post:{"msg":"hello world"}}));

 */
