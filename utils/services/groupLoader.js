export default function groupLoader(loaders)
{
    var queueMaxLength = 3;
    function load()
    {
        var deferred = Q.defer();
        var data = {};
        var queue = [];
        for(var k in loaders){
            queue.push({
                id:k,
                loader:loaders[k]
            });
        }

        var nextLoaderId = 0;
        var loaded = 0;
        var total = queue.length;

        function loadNext(){
            var next = queue[nextLoaderId];
            nextLoaderId++;
            next.loader.load().then(function(value){
                loaded++;
                if(nextLoaderId < queue.length){
                    loadNext();   
                }
                else if(loaded === total){
                    deferred.resolve(data);
                }
                data[next.id] = value;
                return value;
            });
        }

        var nFilesInit = Math.min(queueMaxLength, total);
        for(var i = 0; i < nFilesInit; i++){
            loadNext();
        }

        return deferred.promise;
    }
    return {
        load:load
    };
}
