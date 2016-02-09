import dataLoader from "./dataLoader";

export default function objLoader(url)
{
    function load(){
        var deferred = Q.defer();
        var loader = dataLoader(url);
        loader.load().then(function(data){
            deferred.resolve(parseObj(data));
        });
        return deferred.promise;
    }

    return {
        load:load
    };
}

function parseObj(objData){
    var lines = objData.split("\n");
    var geoms = [];
    for(var i = 0, ii = lines.length; i < ii; i++){
        var line = lines[i];
        var items = line.split(" ");
        var positions, ids;
        switch(items[0]){
            case "o":
                positions = [];
                ids = [];
                geoms.push({
                    positions:positions,
                    ids:ids
                });
                break;
            case "v":
                positions.push(items[1], items[2], items[3]);
                break;
            case "f":
                ids.push(items[1] - 1, items[2] - 1, items[3] - 1);
                break;
            default:break;
        }
    }

    return geoms.map(function(g){
        var geom = new THREE.BufferGeometry();
        geom.addAttribute("position", new THREE.BufferAttribute(new Float32Array(g.positions), 3));
        geom.addAttribute("index", new THREE.BufferAttribute(new Uint16Array(g.ids), 1));
        geom.computeVertexNormals();
        return geom;
    });
}
