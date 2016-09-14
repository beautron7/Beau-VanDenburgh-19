function getRoadLength(roadX){
	var detail = roads[roadX][12];
	var previousXValue = roads[roadX][0];
	var previousYValue = roads[roadX][1];
	var totalXYvalue = 0;
	for(var k = 0; k <= detail; k++){
		var Xchange = abs(previousXValue-bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],k/detail));
		previousXValue = bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],k/detail);
		var Ychange = abs(previousYValue-bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],k/detail));
		previousYValue = bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],k/detail);
	  totalXYvalue += sqrt(Xchange*Xchange+Ychange*Ychange);
	  ellipse(previousXValue,previousYValue,10);
		//11 values of k
	}
	return totalXYvalue;
} //dependant on roads[], p5

/*function  getSegmentLength(roadX){
	var detail = roads[roadX][12];
	// var detail = 10;
	var previousXValue = roads[roadX][0];
	var previousYValue = roads[roadX][1];
	for(var k = 0; k <= detail; k++){
		var Xchange = abs(previousXValue-bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],k/detail));
		previousXValue = bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],k/detail);
		var Ychange = abs(previousYValue-bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],k/detail));
		previousYValue = bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],k/detail);
	  roads[roadX][11][k]=sqrt(Xchange*Xchange*Ychange*Ychange);
	}
}*/
function getSegmentLength(roadX){
	var detail = roads[roadX][12];
	for(var k = 0; k < detail; k++){
		var Xchange = abs(bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],k/detail)-bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],(k+(1/detail))/detail) );
		var Ychange = abs(bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],k/detail)-bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],(k+(1/detail))/detail) );
	  var totalXYChange = sqrt(Xchange*Xchange+Ychange*Ychange);
		roads[roadX][11][k]=abs(totalXYChange);
	}
} //dependant on roads[], p5
