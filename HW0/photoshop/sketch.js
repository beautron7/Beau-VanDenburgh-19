function setup() {
	createCanvas(600,600);
	
}

var strokes = [];
var writeToStroke = 0;
var mouseIsBeingDragged = false;
var strokeMode = 0;
var newStrokeX = 0;
var newStrokeY = 0;
var strokeInProgress = false;

function draw() {
  background(128);
  if(strokeInProgress){
  	 renderStrokePreview();
  	 frameRate(30);
  } else {
  	 frameRate(15);
  }
  renderStoredStrokes();
}

function keyPressed() {
	console.log(keyCode);
	if (keyCode===32){ //Space
		strokeMode++;
		if(strokeMode > 1){strokeMode=0;}
	} else if (keyCode===27){
		strokeInProgress=false;
	}
}

function mouseClicked(){
	if (strokeInProgress === false){
		newStrokeX = mouseX;
		newStrokeY = mouseY;
		strokeInProgress = true;
	} else{
		addStroke(strokeMode,newStrokeX,newStrokeY,mouseX,mouseY);
		strokeInProgress = false;
	}
}

function addStroke(AS_type,AS_1,AS_2,AS_3,AS_4){
	strokes[writeToStroke] = [];
	strokes[writeToStroke][0]=AS_type;
	strokes[writeToStroke][1]=AS_1;
	strokes[writeToStroke][2]=AS_2;
	strokes[writeToStroke][3]=AS_3;
	strokes[writeToStroke][4]=AS_4;
	writeToStroke++;
}

function renderStrokePreview(){
	     	 if(strokeMode===1){
			line(newStrokeX,newStrokeY,mouseX,mouseY);
		} else if(strokeMode===0){
			UE4(newStrokeX,newStrokeY,mouseX,mouseY);
		}
}

function renderStoredStrokes(){
	for(var i = 0; i < strokes.length; i++){
	        	 if(strokes[i][0]===1){
			line(strokes[i][1],strokes[i][2],strokes[i][3],strokes[i][4]);
		} else if(strokes[i][0]===0){
			UE4(strokes[i][1],strokes[i][2],strokes[i][3],strokes[i][4]);
		}
	}
}

function UE4(startX,startY,endX,endY){
  push();
  noFill();
  var x1=startX+abs((endY-startY)/2)+abs((endX-startX)/2);
  var y1=startY
  var x2=endX-abs((endY-startY)/2)-abs((endX-startX)/2);
  var y2=endY;
  //ellipse(x1,y1,10);
  //ellipse(x2,y2,10);
  ellipse(startX,startY,50);
  ellipse(endX,endY,50);
  bezier(startX,startY,		x1,y1,x2,y2,		endX,endY);
  pop();
}

