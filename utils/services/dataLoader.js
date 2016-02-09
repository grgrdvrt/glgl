import utils from "../utils";
import servicesUtils from "./servicesUtils";

export default class DataLoader
{
  constructor(url, options)
  {
    this.url = url;
    this.options = utils.defaultOptions(options, {
      useCache : true,
      post : {},
      get : {},
      responseType : "text"
    });
  }


  load()
  {
    var deferred = Q.defer();

    if(this.url === undefined){
      deferred.reject(new Error("dataLoader no URL provided"));
    }

    var getUrl = this.url;

    var getString = servicesUtils.varsToString(this.options.GET);
    if(getString.length > 0) {
      getUrl = servicesUtils.urlAppendVars(getUrl, getString);
    }

    if(!this.options.useCache) {
      getUrl = servicesUtils.urlAppendVars(getUrl, "t=" + new Date().getTime());
    }

    var postVars = servicesUtils.varsToString(this.options.POST);

    var request = new XMLHttpRequest();

    request.addEventListener("progress", evt => {
      deferred.notify();
    });

    request.addEventListener("load", evt => {
      var response = request.response;
      if(response === undefined) {
        response = request.responseText;
      }
      deferred.resolve(this.parse(response));
    });

    request.addEventListener("error", evt => {
      deferred.reject(new Error("dataLoader : loadingError"));
    });

    request.addEventListener("abort", evt => {
      deferred.reject(new Error("dataLoader : loading aborted"));
    });

    if(postVars !== "") { request.open('POST', getUrl); }
    else { request.open('GET', getUrl); }

    request.responseType = this.options.responseType;
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(postVars);

    return deferred.promise;
  }


  parse(response)
  {
    return response;
  }

}

/*
   let loader = new DataLoader("machin.com", {post:{"msg":"hello world"}})
   loader.load().then(function(data){
     console.log(data.machin);
   });

   queueLoader(dataLoader("machin.com", {post:{"msg":"hello world"}}));

*/
