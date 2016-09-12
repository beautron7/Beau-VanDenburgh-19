function quickRoad(x1,y1,x2,y2){
	// allows for you to create a straight road without needing to add ctrl (curve) pts.
	var slope1 = (y1-y2)/(x1-x2);
	console.log(slope1);
	addRoad(x1,y1,x1,y1,x2,y2,x2,y2);
} //dependant on addRoads