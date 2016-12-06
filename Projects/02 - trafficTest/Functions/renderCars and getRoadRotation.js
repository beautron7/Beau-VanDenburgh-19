

function renderCars(){
	for(var i = 0; i < addCarVar; i++){
		
		push();
		var carXY = getPointOnRoad(cars[i][0],cars[i][1]); //its a vector
		var Rotation = getRoadRotation(cars[i][0],cars[i][1])
		translate(carXY.x,carXY.y); //sets origin to the cars position because the origin is also the pt of rotation
		rotate(Rotation); //sets cars rotation to a moving number
		image(carImage,-12,-7,25,15); //sets car
		pop();
	}
}

function getRoadRotation(road,pos){
	var currentCarVector = getPointOnRoad(road,pos);
	var vectorToAimAt = getPointOnRoad(road,pos+0.1)
	return atan((currentCarVector.y - vectorToAimAt.y)/(currentCarVector.x - vectorToAimAt.x))
}