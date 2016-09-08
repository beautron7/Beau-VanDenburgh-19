function addRoad(x1,y1,x2,y2,x3,y3,x4,y4){
	roads[addRoadVar] = [];
	roads[addRoadVar][0] = x1;  //endpts
	roads[addRoadVar][1] = y1;
	roads[addRoadVar][2] = x2;  //ctrl pts
	roads[addRoadVar][3] = y2;
	roads[addRoadVar][4] = x3;  //ctrl pts
	roads[addRoadVar][5] = y3;
	roads[addRoadVar][6] = x4;  //endpts
	roads[addRoadVar][7] = y4;
	roads[addRoadVar][8] = 0;   //num of connected roads
	roads[addRoadVar][9] = [];  //connected roads
	roads[addRoadVar][10] = getRoadLength(addRoadVar); //length of road
	addRoadVar++;
}
//dependant on roads[], addRoadVar, getRoadLength