export function lerp(min, max, t){
  return min + t * (max - min);
}


export function rand(min, max) {
  return lerp(min, max, Math.random());
} 
