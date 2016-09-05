var roads = [];
var addRoadVar = 0;

function setup() {
	createCanvas(1200,700);
	fullscreen();
	addRoad(50,50,
}

function draw() {
	background(128);
	drawRoadLines();
	
}

function mousePressed(){
	console.log("X:");console.log(mouseX);
	console.log("Y:");console.log(mouseY);
}

function addRoad(x1,y1,x2,y2,x3,y3,x4,y4){
	roads[addRoadVar] = [];
	roads[addRoadVar][0] = x1;
	roads[addRoadVar][1] = y1;
	roads[addRoadVar][2] = x2;
	roads[addRoadVar][3] = y2;
	roads[addRoadVar][4] = x3;
	roads[addRoadVar][5] = y3;
	roads[addRoadVar][6] = x4;
	roads[addRoadVar][7] = y4;
	addRoadVar++;
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