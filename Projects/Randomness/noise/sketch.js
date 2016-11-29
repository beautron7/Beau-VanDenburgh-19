function setup() {
  createCanvas(300,300);
}
var tileSize = 1;

function draw() {
  for(var i= 0;i < width;i+=tileSize){
    for(var j= 0; j< height ; j+=tileSize){
  		fill(floor(map(noise(frameCount/20+1),0,1,0,255)));
  		point(i,j);
	 }
  }
}