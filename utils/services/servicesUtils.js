import "../../q";
export default {
    varsToString : function(vars)
    {
        var str = "";
        var i = 0;
        for(var key in vars) {
            if(i++) {
                str += "&";
            }
            str += key + "=" + vars[key];
        }
        return str;
    },


    urlAppendVars : function(url, vars)
    {
        return url + ((/\?/).test(url) ? "&" : "?") + vars;
    }
};
