
//http://www.iquilezles.org/www/articles/normals/normals.htm

export default function computeVertexNormals(positions, ids)
{
  let nVertices = positions.length / 3;
  let nFaces = ids.length / 3;

  let normals = new Float32Array(positions.length);

  let v = new Vec3(),
    e1 = new Vec3(),
    e2 = new Vec3();
  let p = positions,
      n = normals;

  for(let i = 0; i < nFaces; i++)
  {
    let faceId = 3 * i;
    let ia = 3 * ids[faceId];
    let ib = 3 * ids[faceId + 1];
    let ic = 3 * ids[faceId + 2];

    v.set(p[ib], p[ib + 1], p[ib + 2]);

    e1.set(p[ia], p[ia + 1], p[ia + 2]).sub(v);
    e2.set(p[ic], p[ic + 1], p[ic + 2]).sub(v);
    e1.cross(e2);

    n[ia] += e1.x;
    n[ia + 1] += e1.y;
    n[ia + 2] += e1.z;

    n[ib] += e1.x;
    n[ib + 1] += e1.y;
    n[ib + 2] += e1.z;

    n[ic] += e1.x;
    n[ic + 1] += e1.y;
    n[ic + 2] += e1.z;
  }


  for(let i = 0; i < nVertices; i++ ){
    let id = i * 3;
    v.set(n[id], n[id + 1], n[id + 2]).normalize();
    n[id] = v.x;
    n[id + 1] = v.y;
    n[id + 2] = v.z;
  }

  return normals;
}
