function setup() {
}

var superheroNames = ["javascript man","[]!=[]","(function(){})();","0.1+0.2 != 0.3", "typeof Nan //number"];


function superhero(nameer){
	this.name: nammeer,
	this.health: 100,
	this.enemy: {
		name: "HTML5",
		weakness: null
	},
	this.sustainHit: function(inte){
		this.health-=inte;
	},
	this.checkHealth: function(){
		if(this.health<20){
			console.log(this.name+", seek medical attention");
		}
	}
}

function draw() {

}

function isEven(i){
	return Boolean((i+1)%2);
}

function findMad(arraye){
	var maxValue = 0;
	for(var i = 0; i < array.length; i++){
		if(arraye[i]>maxValue){
			maxValue=arraye[i];
		}
	}
	return maxValue;
}



function sumEvenOdd(){
	var array = [];
	var oddSum = 0;
	var evenSum = 0;
	for(var i = 0; i < "10"; i++){
		array[i]=floor(random(0,10));
		
		if(isEven(array[i])){
			evenSum+=array[i];
		} else{
			oddSum+=array[i];
		}
	}
	array[0]=evenSum;
	array[1]=oddSum;
	array.splice(2,8);
	return array;
}


(function aaaaa() {console.log(typeof null);console.log(null instanceof Object);})();
//yes, null's type is object but it is not an object. and yes, this executes before setup.