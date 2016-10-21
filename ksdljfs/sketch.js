var prevMouseX;
var prevMouseY;
var graphBorders = [-10,10,-10,10];
var graphXspan = graphBorders[1]-graphBorders[0];
var graphYspan = graphBorders[3]-graphBorders[2];
var equation;

function setup() {
 createCanvas(800,800);
 stroke(0)
 background(128);
  textSize(25)
  textAlign(RIGHT)
 equation = prompt("Y= (use lowercase x, use x*x or Math.pow(x,2) instead of x^2, parinthesees OK)")
}

function draw() {
  fill(0);
  background(128);
  if(mouseIsPressed){
  		graphBorders[0]-=(mouseX-prevMouseX)/width*graphXspan;
  		graphBorders[1]=graphBorders[0]+graphXspan;
  		graphBorders[2]+=(mouseY-prevMouseY)/height*graphYspan;
  		graphBorders[3]=graphBorders[2]+graphYspan;
  } 
  prevMouseX=mouseX;
  prevMouseY=mouseY;
  drawGraph([10,-21,6,63,3,1],graphBorders);
  fill(255,128,128);
  text("X:"+floor(map(mouseX,0,width,graphBorders[0],graphBorders[1])*1000)/1000+" Y:"+floor(map(mouseY,0,height,graphBorders[3],graphBorders[2])*1000)/1000,width,height)
}

function keyPressed(){
	console.log("key:"+keyCode+" pressed")
	//189 = -
	//187 = +
	if(keyCode == 187){
		graphBorders[0]+=graphXspan/8;
		graphXspan*=3/4;
		graphBorders[1]=graphBorders[0]+graphXspan;
		graphBorders[2]+=graphYspan/8;
		graphYspan*=3/4;
		graphBorders[3]=graphBorders[2]+graphYspan;
	} else if(keyCode == 189){
		graphBorders[0]-=graphXspan/8;
		graphXspan*=5/4;
		graphBorders[1]=graphBorders[0]+graphXspan;
		graphBorders[2]-=graphYspan/8;
		graphYspan*=5/4;
		graphBorders[3]=graphBorders[2]+graphYspan;
	} else if(keyCode == 219){
		graphBorders[0]-=graphXspan/8;
		graphXspan*=5/4;
		graphBorders[1]=graphBorders[0]+graphXspan;
	} else if(keyCode == 221){
		graphBorders[0]+=graphXspan/8;
		graphXspan*=3/4;
		graphBorders[1]=graphBorders[0]+graphXspan;
	} else if(keyCode == 48){
		graphBorders = [-10,10,-10,10];
		graphXspan = graphBorders[1]-graphBorders[0];
		graphYspan = graphBorders[3]-graphBorders[2];
	}
}

function drawGraph(coeffs,borders){
	borders = borders || [-10,10,-10,10];
	// var OrderOfmagnitudeX = 0;
	// var OrderOfmagnitudeY = 0;
	// if(graphXspan>1){
	// 	while(graphXspan>Math.pow(10,OrderOfmagnitudeX+1)){
	// 		OrderOfmagnitudeX++;
	// 	}
	// } else {
	// 	while(graphXspan<Math.pow(10,OrderOfmagnitudeX)){
	// 		OrderOfmagnitudeX--;
	// 	}
	// 	for(var i = floor(borders[0]*Math.pow(10,OrderOfmagnitudeX))/Math.pow(10,OrderOfmagnitudeX); i < borders[1]; i+=Math.pow(10,OrderOfmagnitudeX)){
	// 		line(map(i,borders[0],borders[1],0,width),height-height/20,map(i,borders[0],borders[1],0,width),height)
	// 	}
	// }
	// console.log(OrderOfmagnitudeX)
	incriment = (borders[1]-borders[0])/width;
	line(map(0,borders[0],borders[1],0,width),0,map(0,borders[0],borders[1],0,width),height);
	line(0,map(0,borders[2],borders[3],height,0),width,map(0,borders[2],borders[3],height,0));
	var prevpt=createVector(0,0);
	for(var x = borders[0]; x < borders[1]; x+= incriment){
		var yval = 0;
		// for(var i = 0; i < coeffs.length; i++){
		// 	yval += coeffs[i]*Math.pow(x,i);
		// }
		yval = eval(equation);
		line(map(x,borders[0],borders[1],0,width),map(yval,borders[2],borders[3],height,0),prevpt.x,prevpt.y)
		prevpt = createVector(map(x,borders[0],borders[1],0,width),map(yval,borders[2],borders[3],height,0));
	}
}