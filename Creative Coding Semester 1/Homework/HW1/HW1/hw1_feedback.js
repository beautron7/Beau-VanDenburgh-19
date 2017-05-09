
/*

Great work!
58/60 = 97%


0 - 10/10

1 - 14/15 (sum)
Awesome! I was looking for an array to be passed as an argument (see the code snippet below the question) 
so that we can pass an array of arbitrary length. But this is minor. Great job!

2 - 12/15 (max)
very close, but doesn't work with an array of negative numbers. 
set var maxValue = array[0];
also didnt' work becayse of "array.length" instead of "arraye.length"

3 - 5/5 (pine)

4 - 14/15 (superhero)
HA! Just missing an array of powers.



*/



// ???
function setup() {
	if([] !== []){
		
		console.log("Yeah, Javascript is quirky");
	}
}

// very clever!!
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