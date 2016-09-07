var roads = []; 
var addRoadVar = 0;

function setup() {
	createCanvas(600,700);
	frameRate(10);
	quickRoad(280,90,120,90); //0
	quickRoad(120,110,280,110);
	quickRoad(290,20,290,80); //2
	quickRoad(310,80,310,20);
	quickRoad(280,110,310,80); //4
	quickRoad(290,120,290,180);
	quickRoad(310,180,310,120); //6
	quickRoad(310,120,310,80);
	quickRoad(310,120,280,90);
	autoConnectRoads();
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
	console.log(getRoadLength(addRoadVar));
	addRoadVar++;
	
}

function connectRoads(roadA,roadB,verbose){
	//check to see if roads intersect
	verbose = verbose || false;
	if(roads[roadA][6]===roads[roadB][0] && roads[roadA][7]===roads[roadB][1]) //is the end of roadA equal to the starto f roadB
	{
		roads[roadA][9][roads[roadA][8]] = roadB;
		roads[roadA][8]++;
		roads[roadB][9][roads[roadB][8]] = roadA;
		roads[roadB][8]++;
		return true;
	} else if (verbose) {
		if
		(
			roads[roadA][0]===roads[roadB][0]||
		   roads[roadA][0]===roads[roadB][6]||
		   roads[roadA][6]===roads[roadB][0]||
		   roads[roadA][6]===roads[roadB][6]&&
		   roads[roadA][1]===roads[roadB][1]||
		   roads[roadA][1]===roads[roadB][7]||
		   roads[roadA][7]===roads[roadB][1]||
		   roads[roadA][7]===roads[roadB][7]
		)
		{
			if(roadA===roadB){
				console.log("connectRoads: The Roads Are the same");
				console.log(roadA);
			} else {
				console.log("connectRoads: The Roads (see next line) are not oriented correctly");
				console.log(roadA);
				console.log(roadB);
			}
		} else  {
			console.log("connectRoads: The Roads (see next line) share no common endpoints");
			console.log(roadA);
			console.log(roadB);
		}
		
		return false;
	}
}

function autoConnectRoads(){
	for(var i = 0; i < addRoadVar; i++){
		for(var j = 0; j < addRoadVar; j++){
			connectRoads(i,j,false);
		}
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
function getRoadLength(roadX){ //Broken rn
	var x1 = roads[roadX][0];
	var y1 = roads[roadX][1];
	var x2 = roads[roadX][2];
	var y2 = roads[roadX][3];
	var x3 = roads[roadX][4];
	var y3 = roads[roadX][5];
	var x4 = roads[roadX][6];
	var y4 = roads[roadX][7];
	var detail = 10;
	var previousValue = x1;
	var totalXvalue = 0;
	var totalYvalue = 0;
	for(var k = 0; k <= detail; k++){
		totalXvalue += abs(previousValue-bezierPoint(x1,x2,x3,x4,k/detail));
		previousValue = bezierPoint(x1,x2,x3,x4,k/detail);
	}
	previousValue = y1;
	for(var k = 0; k <= detail; k++){
		totalYvalue += abs(previousValue-bezierPoint(y1,y2,y3,y4,k/detail));
		previousValue = bezierPoint(y1,y2,y3,y4,k/detail);
	}
	return sqrt(totalYvalue^2+totalXvalue^2);
}