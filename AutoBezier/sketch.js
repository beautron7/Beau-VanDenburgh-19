var points = [];

function setup() {
  	createCanvas(600,600);
  	noFill()
}

function draw() {
  background(128);
  noFill();
  var pointsOfTheBlackLine = [];
  for(var i = 0; i < points.length; i++){ //display points
	 stroke(0,0,255);ellipse(points[i][2],points[i][3],4);pointsOfTheBlackLine.push(createVector(points[i][2],points[i][3]))
    stroke(255,0,0);ellipse(points[i][0],points[i][1],10);pointsOfTheBlackLine.push(createVector(points[i][0],points[i][1]))
    stroke(0,255,0);ellipse(points[i][4],points[i][5],4);pointsOfTheBlackLine.push(createVector(points[i][4],points[i][5]))
    stroke(0,0,0);line(points[i][2],points[i][3],points[i][4],points[i][5]);
    stroke(255,255,255);if(i>0)bezier(points[i-1][0],points[i-1][1],points[i-1][4],points[i-1][5],points[i][2],points[i][3],points[i][0],points[i][1])
   }
  stroke(0);
  noFill();
  beginShape();
  for(var i = 0; i < pointsOfTheBlackLine.length; i++){
  		vertex(pointsOfTheBlackLine[i].x,pointsOfTheBlackLine[i].y);
  }
  endShape();
}

function mousePressed(){
	points[points.length] = [];
	points[points.length-1][0]=mouseX;
	points[points.length-1][1]=mouseY;
	points[points.length-1][2]=mouseX;
	points[points.length-1][3]=mouseY;
	points[points.length-1][4]=mouseX;
	points[points.length-1][5]=mouseY;
	//if 2 or more points, calculate the things
	if(points.length>2){
		var avgX = ((points[points.length-1][0]+points[points.length-2][0]+points[points.length-3][0])/3);
		var avgY = ((points[points.length-1][1]+points[points.length-2][1]+points[points.length-3][1])/3);
		var deltaedX = points[points.length-2][0] - avgX; //avg's distance from actual
		var deltaedY = points[points.length-2][1] - avgY;
		var point1X = points[points.length-2][0]+deltaedY;
		var point2X = points[points.length-2][0]-deltaedY;
		var point1Y = points[points.length-2][1]-deltaedX;
		var point2Y = points[points.length-2][1]+deltaedX;
		points[points.length-2][2]=point1X;
		points[points.length-2][3]=point1Y;
		points[points.length-2][4]=point2X;
		points[points.length-2][5]=point2Y;
	}
}

function swapDirection(){
	var tempX = points[points.length-2][2]	
	var tempY = points[points.length-2][3]
	points[points.length-2][2] = points[points.length-2][4]
	points[points.length-2][3] = points[points.length-2][5]
	points[points.length-2][4] = tempX;
	points[points.length-2][5] = tempY;
}


function keyPressed(){
	swapDirection();
}