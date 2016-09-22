function setup() {
   var x = 2;
	var y = 3;
	x = (x * 3) - y;
	y = x + x;
	x--;
	y++;
	console.log(x + y);
	/*
	it logs 9, I had comments explaining each variable after
	each line but p5 decided to close without saving
	*/ 
	
	
  //2: width, height (integers of canvas width and height)
  //2: focused is a bool which says whether the game is in focus
  
  //3:
  badNameGenerator("slow","walking","wookie");
  //3
  
  //4
  console.log(cube(10));
  
  //5
  console.log(isEven(10)); //it compiles and it works. yes i double checked.
  createCanvas(400,400);
}

function isEven(O){
	if(O%2){ //not a typo, test it!
		console.log("odd");
	} else {
		console.log("even");
	}
}

function draw() {
	for(var i = height/2; i > 0; i-=20){
		ellipse(200,200,i);
		fill(i,i,i);
	}
}



function badNameGenerator(slow,walking,wookie){
	console.log(slow);  //intentionaly confusing
	console.log(walking);
	console.log(wookie);
	console.log("is your rad band name!");
}
function cube(lake){
	return lake*lake*lake;
}0