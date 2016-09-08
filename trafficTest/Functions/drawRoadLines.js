function drawRoadLines(){
	push();
	noFill();
	for(var drawRoadNumber = 0; drawRoadNumber < addRoadVar; drawRoadNumber++){
		var x1 = roads[drawRoadNumber][0];
		var y1 = roads[drawRoadNumber][1];
		var x2 = roads[drawRoadNumber][2];
		var y2 = roads[drawRoadNumber][3];
		var x3 = roads[drawRoadNumber][4];
		var y3 = roads[drawRoadNumber][5];
		var x4 = roads[drawRoadNumber][6];
		var y4 = roads[drawRoadNumber][7];
		bezier(x1,y1,x2,y2,x3,y3,x4,y4);
	}
	pop();
}//dependant on roads,