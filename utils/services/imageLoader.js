import utils from "../utils";
import servicesUtils from "./servicesUtils";

export default function imageLoader(url, options)
{
    options = utils.defaultOptions(options, {
        useCache : true
    });

    function load(){
        var deferred = Q.defer();

        if(url === undefined){
            deferred.reject(new Error("imageLoader : no URL provided"));
        }

        var getUrl = url;

        if(!options.useCache) {
            getUrl = servicesUtils.urlAppendVars(url, "t=" + new Date().getTime());
        }


        var image = new Image();

        image.addEventListener("progress", function(evt){
            deferred.notify();
        });

        image.addEventListener("load", function(evt) {
            deferred.resolve(image);
        });

        image.addEventListener("error", function(evt){
            deferred.reject(new Error("imageLoader : loadingError"));
        });
        image.addEventListener("abort", function(evt){
            deferred.reject(new Error("imageLoader : loading aborted"));
        });

        image.src = getUrl;

        return deferred.promise;
    }

    return {load:load};
}
