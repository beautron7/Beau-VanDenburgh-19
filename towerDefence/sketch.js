var tileSize = 25;
var runners = [];
var towers = [];
var newRunnerType = "runner.generic";

var Grid = {
	routeDirs: [], //1 right, 0 left, 2 up, 3 down
	routeHopsToEnd: [],
	spawns: [],
	despawns: [],
	borders: {
		Xcoord: 800,
		Ycoord: 600,
	},
	addSpawn: function(gridX, gridY) {
		Grid.spawns[Grid.spawns.length] = {
			x: gridX,
			y: gridY,
			Xcoord: gridX * tileSize,
			Ycoord: gridY * tileSize
		}
	},
	addDespawn: function(gridX, gridY) {
		Grid.despawns[Grid.despawns.length] = {
			x: gridX,
			y: gridY,
			Xcoord: gridX * tileSize,
			Ycoord: gridY * tileSize
		}
	},
	getRandomSpawnCoords: function() {
		return createVector(Grid.spawns[floor(random(0, Grid.spawns.length))].x, Grid.spawns[floor(random(0, Grid.spawns.length - 1))].y)
	},
	visualizeSpawns: function() {
		push();
		fill(0, 256, 0);
		for (var i = 0; i < Grid.spawns.length; i++) {
			rect(Grid.spawns[i].Xcoord, Grid.spawns[i].Ycoord, tileSize, tileSize);
		}
		pop();
	},
	visualizeDespawns: function() {
		push();
		fill(256, 0, 0);
		for (var i = 0; i < Grid.despawns.length; i++) {
			rect(Grid.despawns[i].Xcoord, Grid.despawns[i].Ycoord, tileSize, tileSize);
		}
		pop();
	},
	renderAllRunners: function() {
		for (var i = 0; i < runners.length; i++) {
			runners[i].render();
		}
	},
	renderAllTowers: function() {
		for (var i = 0; i < towers.length; i++) {
			towers[i].render();
		}
	},
	drawGrid: function() {
		for (var i = 0; i < Grid.borders.Xcoord; i += tileSize) {
			line(i, 0, i, Grid.borders.Ycoord);
		}
		for (var i = 0; i < Grid.borders.Ycoord; i += tileSize) {
			line(0, i, Grid.borders.Xcoord, i);
		}
	},
	generateRoute: function(arrayToMod) {
		// when working, the npc's will try and move to a lower numbered tile. 2048 is so high it *should* never be lower
		if (!(arrayToMod instanceof Array)) {
			arrayToMod = [];
		}
		for (var i = 0; i <= this.borders.x; i++) {
			if (!(arrayToMod[i] instanceof Array)) {
				arrayToMod[i] = [];
			}
			for (var j = 0; j <= this.borders.y; j++) {
				arrayToMod[i][j] = 2048;
			}
		}
		for (var i = 0; i < towers.length; i++) {
			arrayToMod[towers[i].gridX][towers[i].gridY] = 2049; //if a tile is trapped, it would be 2048. to prevent wall climbing, 2049 is used just in case an npc is on tile 2048.
		}
		var modTheseValues = [];
		var i = 0;
		var k = 0;
		for (var DSvar = 0; DSvar < this.despawns.length; DSvar++) { //despawns are most desireable, ergo number 0.
				arrayToMod[this.despawns[DSvar].x][this.despawns[DSvar].y] = 0;
				modTheseValues[DSvar]=[];
				modTheseValues[DSvar][0] = this.despawns[DSvar].x;
				modTheseValues[DSvar][1] = this.despawns[DSvar].y;
		}
		console.log(modTheseValues+"foo");

		for (var k = 0; k < this.borders.x * this.borders.y; k++) { //k is the value of hops
			var newValuesToMod = [];
			for(var q = 0; q < modTheseValues.length; q++){ //q is the array value of modTheseValues
				i=modTheseValues[q][0];
				j=modTheseValues[q][1];
				if (i !== 0) { //left
					if (arrayToMod[i - 1][j] === 2048) {
						arrayToMod[i - 1][j] = k + 1;
						newValuesToMod[newValuesToMod.length] = [];
						newValuesToMod[newValuesToMod.length-1][0]=i-1;
						newValuesToMod[newValuesToMod.length-1][1]=j;
					}
				}
				if (i !== this.borders.x) { //right
					if (arrayToMod[i + 1][j] === 2048) {
						arrayToMod[i + 1][j] = k + 1;
						newValuesToMod[newValuesToMod.length] = [];
						newValuesToMod[newValuesToMod.length-1][0]=i+1;
						newValuesToMod[newValuesToMod.length-1][1]=j;
					}
				}
				if (j !== 0) { //up
					if (arrayToMod[i][j - 1] === 2048) {
						arrayToMod[i][j - 1] = k + 1;
						newValuesToMod[newValuesToMod.length] = [];
						newValuesToMod[newValuesToMod.length-1][0]=i;
						newValuesToMod[newValuesToMod.length-1][1]=j-1;
					}
				}
				if (j !== this.borders.y) { //down
					if (arrayToMod[i][j + 1] === 2048) {
						arrayToMod[i][j + 1] = k + 1;
						newValuesToMod[newValuesToMod.length] = [];
						newValuesToMod[newValuesToMod.length-1][0]=i;
						newValuesToMod[newValuesToMod.length-1][1]=j+1;
					}
				}
			}
			modTheseValues.length = 0; //is allowable in strict JS
			arrayCopy(newValuesToMod,modTheseValues);
		}

			/*for (var i = 0; i <= this.borders.x; i++) {
				for (var j = 0; j <= this.borders.y; j++) {
					if (arrayToMod[i][j] == k) {
						if (i !== 0) { //left
							if (arrayToMod[i - 1][j] === 2048) {
								arrayToMod[i - 1][j] = k + 1;
							}
						}
						if (i !== this.borders.x) { //right
							if (arrayToMod[i + 1][j] === 2048) {
								arrayToMod[i + 1][j] = k + 1;
							}
						}
						if (j !== 0) { //up
							if (arrayToMod[i][j - 1] === 2048) {
								arrayToMod[i][j - 1] = k + 1;
							}
						}
						if (j !== this.borders.y) { //down
							if (arrayToMod[i][j + 1] === 2048) {
								arrayToMod[i][j + 1] = k + 1;
							}
						}
					}
				}
			} */
		return arrayToMod;
	},
	initialize: function() {
		this.borders.x = floor(this.borders.Xcoord / tileSize) - 1;
		this.borders.y = floor(this.borders.Ycoord / tileSize) - 1;
		for (var i = 0; i <= this.borders.x; i++) {
			Grid.routeDirs[i] = [];
			Grid.routeHopsToEnd[i] = [];
		}
	},
	visualizeHops: function() {
		push();
		colorMode(HSB, 256);
		for (var i = 0; i < Grid.borders.x + 1; i++) {
			for (var j = 0; j < Grid.borders.y + 1; j++) {
				fill(this.routeHopsToEnd[i][j] * 5 % 255)
				rect(i * tileSize + tileSize / 4, j * tileSize + tileSize / 4, tileSize / 2, tileSize / 2);
			}
		}
		pop();
	},
	verifyRoute: function(array_to_verify) {
		var is_valid_route = true;
		for (var i = 0; i < this.spawns.length; i++) {
			if (array_to_verify[this.spawns[i].x][this.spawns[i].y] >= 2048) { //basically, if the distance is over 2048, its not vaid, so return false
				is_valid_route = false
			}
		}
		return is_valid_route
	},
};

function renderAll() {
	Grid.visualizeHops();
	Grid.renderAllTowers();
	Grid.visualizeSpawns();
	Grid.visualizeDespawns();
	Grid.renderAllRunners();
	Grid.drawGrid();
}

function keyPressed() {
	if (keyCode == 32) {
		addRunner(newRunnerType);
	}
	if (keyCode === 80) {
		newRunnerType = prompt("newRunnerType=");
	}
	console.log(keyCode);
}

function runner(construct_type) {
	var tempGridVector = Grid.getRandomSpawnCoords();
	this.identity;
	this.gridX = tempGridVector.x;
	this.gridY = tempGridVector.y;
	this.gridXoff = tileSize/2;
	this.gridYoff = tileSize/2;
	this.type = construct_type;
	this.speed = 1;
	this.render = function() {
		push();
		fill(0, 0, 0);
		rectMode(CENTER);
		rect(this.gridX * tileSize + this.gridXoff, this.gridY * tileSize + this.gridYoff, tileSize / 4, tileSize / 4);
		pop();
	};
	this.pointing_at;
	this.update = function(){
		if(this.gridXoff==0 || this.gridXoff==tileSize || this.gridYoff==0 || this.gridYoff==tileSize){ //if at correct border + next cell , then change to next cell else nothing, regradless re-evalute
		// if(abs(this.gridXoff-tileSize/2)<tileSize){
			if(this.gridXoff==0){
				this.set_pointing_at();
				if(this.pointing_at==1){this.gridX -= 1; this.gridXoff=tileSize-this.speed;} else {this.gridXoff=this.speed;}
			} else

			if(this.gridXoff==tileSize){
				this.set_pointing_at();
				if(this.pointing_at==0){this.gridX += 1; this.gridXoff=this.speed;} else {this.gridXoff=tileSize-this.speed;}
			} else

			if(this.gridYoff==0){
				this.set_pointing_at();
				if(this.pointing_at==3){this.gridY -= 1; this.gridYoff=tileSize-this.speed;} else {this.gridYoff=this.speed;}
			} else

			if(this.gridYoff==tileSize){
				this.set_pointing_at();
				if(this.pointing_at==2){this.gridY += 1; this.gridYoff=this.speed;} else {this.gridYoff=tileSize/2-this.speed;}
			}
			this.set_pointing_at();
		}	//if not at border, keep heading there
      if(this.pointing_at == 0){this.gridXoff+=this.speed}
			else if(this.pointing_at == 1){this.gridXoff-=this.speed}
			else if(this.pointing_at == 2){this.gridYoff+=this.speed}
			else if(this.pointing_at == 3){this.gridYoff-=this.speed}
			if(this.gridXoff<this.speed)         {this.gridXoff=0;}
			if(this.gridXoff>tileSize-this.speed){this.gridXoff=tileSize;}
			if(this.gridYoff<this.speed)         {this.gridYoff=0;}
			if(this.gridYoff>tileSize-this.speed){this.gridYoff=tileSize;}
			//if we heading down
	}
	this.set_pointing_at = function() {
		var arr = [];
		if(this.gridX<Grid.borders.x){
			arr.push(Grid.routeHopsToEnd[this.gridX + 1][this.gridY]); //0 = Right
		} else {arr.push(2048);}
		if (this.gridX>=1){
			arr.push(Grid.routeHopsToEnd[this.gridX - 1][this.gridY]); //1 = left
		} else {arr.push(2048);}
		if(this.gridY<Grid.borders.y){
			arr.push(Grid.routeHopsToEnd[this.gridX][this.gridY+1]); //2 = down
		} else {arr.push(2048);}
		if(this.gridY>=1){
			arr.push(Grid.routeHopsToEnd[this.gridX][this.gridY-1]); //3 = up
		} else {arr.push(2048);}
		this.pointing_at = arr.indexOf(min(arr));
		if(Grid.routeHopsToEnd[this.gridX][this.gridY]===0){killRunner(this.identity);}
		console.log(min(arr));
	}
}
function killRunner(runner_id){
	runners.splice(runner_id,1);
}

function tower(gridX, gridY, tower_type) {
	this.gridX = gridX;
	this.gridY = gridY;
	this.render = function() {
		fill(0, 0, 255);
		rect(this.gridX * tileSize, this.gridY * tileSize, tileSize, tileSize);
	};
}

function addTower(gridX, gridY, tower_type) {
	if ((gridX > Grid.borders.x) || (gridX < 0) || (gridY > Grid.borders.y) || (gridY < 0)) {
		return false;
	}
	towers[towers.length] = new tower(gridX, gridY, tower_type);
	var hypothetical_route;
	if (Grid.verifyRoute(Grid.generateRoute(hypothetical_route))) {
		// Grid.routeHopsToEnd = hypothetical_route.slice(0);
		Grid.generateRoute(Grid.routeHopsToEnd);
		return true;
	} else {
		towers = towers.slice(0, -1); //if not valid, then set the value of the array to itself but without the last element
		return false;
	}
}

function addRunner(typeofrunner) {
	runners[runners.length] = new runner(typeofrunner);
	runners[runners.length-1].identity = runners.length-1;
	runners[runners.length-1].set_pointing_at();
}

function updateRunners(){
	for(var i = 0; i < runners.length; i++){
		runners[i].update();
	}
}

function setup() {
	createCanvas(800, 600);
	Grid.initialize();
	Grid.addSpawn(0, 0);
	Grid.addSpawn(0, 1);
	Grid.addSpawn(0, 2);
	Grid.addDespawn(Grid.borders.x,Grid.borders.y);
	addTower(5, 5, "barrier");
	addRunner(1, 1, "default");
	// Grid.generateRoute(Grid.routeHopsToEnd);
}

function mouseClicked() {
	addTower(floor(mouseX / tileSize), floor(mouseY / tileSize), "generic");
}

function draw() {
	background(250);
	renderAll();
	updateRunners();
}
