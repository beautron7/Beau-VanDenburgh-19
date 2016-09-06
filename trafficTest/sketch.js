var roads = []; 
var addRoadVar = 0;

function setup() {
	createCanvas(600,700);
	frameRate(10);
	quickRoad(120,90,280,90); 
	quickRoad(120,110,280,110);
	quickRoad(290,20,290,80);
	quickRoad(310,20,310,80);
	quickRoad(120,90,120,110);
	console.log(connectRoads(1,4));
}

function draw() {
	background(128);
	stroke(0,255,0);drawRoadLines();
	stroke(0,0,0);drawGrid(100);
}

function drawGrid(gridDivision){
	for(var i = 0; i < width; i+= gridDivision){
		line(i,0,i,height);
	}
	for(var i = 0; i < height; i+= gridDivision){
		line(0,i,width,i);
	}
}

// function mousePressed(){
	// console.log("X:");console.log(mouseX);
	// console.log("Y:");console.log(mouseY);
// }

function quickRoad(x1,y1,x2,y2){
	// allows for you to create a straight road without needing to add ctrl (curve) pts.
	addRoad(x1,y1,x1,y1,x2,y2,x2,y2);
}

function addRoad(x1,y1,x2,y2,x3,y3,x4,y4){
	roads[addRoadVar] = [];
	roads[addRoadVar][0] = x1;  //endpts
	roads[addRoadVar][1] = y1;
	roads[addRoadVar][2] = x2;  //ctrl pts
	roads[addRoadVar][3] = y2;
	roads[addRoadVar][4] = x3;  //ctrl pts
	roads[addRoadVar][5] = y3;
	roads[addRoadVar][6] = x4;  //endpts
	roads[addRoadVar][7] = y4;
	roads[addRoadVar][8] = 0;   //num of connected roads
	roads[addRoadVar][9] = [];  //connected roads
	addRoadVar++;
	
}

function connectRoads(roadA,roadB){
	//check to see if roads intersect
	if(
		roads[roadA][0]===roads[roadB][0]||
	   roads[roadA][0]===roads[roadB][6]||
	   roads[roadA][6]===roads[roadB][0]||
	   roads[roadA][6]===roads[roadB][6] &&
	   roads[roadA][1]===roads[roadB][1]||
	   roads[roadA][1]===roads[roadB][7]||
	   roads[roadA][7]===roads[roadB][1]||
	   roads[roadA][7]===roads[roadB][7]&&
	   !(roadA===roadB) 
	  )
	{
		roads[roadA][9][roads[roadA][8]] = roadB;
		roads[roadA][8]++;
		roads[roadB][9][roads[roadB][8]] = roadA;
		roads[roadB][8]++;
		return true;
	} else {
		return false;
	}
	
}

function drawRoadLines(){
	push();
	noFill();
	for(var drawRoadNumber = 0; drawRoadNumber < addRoadVar; drawRoadNumber++){
		var x1 = roads[drawRoadNumber][0];
		var y1 = roads[drawRoadNumber][1];
		var x2 = roads[drawRoadNumber][2];
		var y2 = roads[drawRoadNumber][3];
		var x3 = roads[drawRoadNumber][4];
		var y3 = roads[drawRoadNumber][5];
		var x4 = roads[drawRoadNumber][6];
		var y4 = roads[drawRoadNumber][7];
		bezier(x1,y1,x2,y2,x3,y3,x4,y4);
	}
	pop();
}