var rotatedscene;
function setup() {
	rotatedscene = Rotate3(verticies,V3(0,0,0),V3(0,0,0));
}

function draw() {
  
}

function Rotate3(geom,neworigin,angle){
	var newgeom = [];
	//first, translate all of the points to be relative to neworigin
	for(var i = 0; i < geom.length;i++){
		newgeom.push({x:geom.x+neworigin.x,y:geom.y+neworigin.y,z:geom.z+neworigin.z})
	}
	//next, rotate all of the points across axis
	//rotate across z axis
	for(var i = 0; i < newgeom.length;i++){
		var newx = asin(newgeom[i].x/newgeom[i].y)*sqrt(newgeom[i].x*newgeom[i].x+newgeom[i].y*newgeom[i].y);
		var newy = acos(newgeom[i].x/newgeom[i].y)*sqrt(newgeom[i].x*newgeom[i].x+newgeom[i].y*newgeom[i].y);
	}
	
	for(var i = 0; i < newgeom.length;i++){
		var newx = asin(newgeom[i].x/newgeom[i].z)*sqrt(newgeom[i].x*newgeom[i].x+newgeom[i].z*newgeom[i].z);
		var newz = acos(newgeom[i].x/newgeom[i].z)*sqrt(newgeom[i].x*newgeom[i].x+newgeom[i].z*newgeom[i].z);
	}
	
}

function V3(x,y,z){
	this.x=x;
	this.y=y;
	this.z=z;
}

var verticies=[
	V3(0,0,0),
	V3(1,0,0),
	V3(1,0,1),
	V3(0,0,1),
	V3(0,1,0),
	V3(1,1,0),
	V3(1,1,1),
	V3(0,1,1)
]