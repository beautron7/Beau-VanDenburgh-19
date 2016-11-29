function getPointOnRoad(roadX,time){
	return createVector(bezierPoint(roads[roadX][0],roads[roadX][2],roads[roadX][4],roads[roadX][6],time),bezierPoint(roads[roadX][1],roads[roadX][3],roads[roadX][5],roads[roadX][7],time));
}