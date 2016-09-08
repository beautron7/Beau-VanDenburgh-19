function getRoadLength(roadX){
	var detail = 10;
	var previousXValue = roads[roadX][0];
	var previousYValue = roads[roadX][1];
	var totalXYvalue = 0;
	for(var k = 0; k <= detail; k++){
		var Xchange = abs(previousXValue-bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],k/detail));
		previousXValue = bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],k/detail);
		var Ychange = abs(previousYValue-bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],k/detail));
		previousYValue = bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],k/detail);
	   totalXYvalue += sqrt(Xchange*Xchange+Ychange*Ychange);
	}
	return totalXYvalue;
} //dependant on roads[], p5