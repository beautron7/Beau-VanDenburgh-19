function setup() {
	if([] !== []){
		console.log("Yeah, Javascript is quirky");
	}
	
	console.log(sumEvenOdd());
	console.log(myPlants[1].list[1]);
	superhero.sustainHit(90);
	superhero.checkHealth();
}

var myPlants = [
  { 
    type: "flowers",
    list: [
      "rose",
      "tulip",
      "dandelion"
    ]
  },
  {
    type: "trees",
    list: [
      "fir",
      "pine",
      "birch"
    ]
  }  
];

var superhero = {
	name: "Javascript man",
	health: 100,
	enemy: {
		name: "HTML5",
		weakness: null
	},
	sustainHit: function(inte){
		this.health-=inte;
	},
	checkHealth: function(){
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