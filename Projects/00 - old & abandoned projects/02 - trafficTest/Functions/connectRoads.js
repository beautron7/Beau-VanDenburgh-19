function connectRoads(roadA,roadB,verbose){
	//check to see if roads intersect
	verbose = verbose || false;
	if(roads[roadA][6]===roads[roadB][0] && roads[roadA][7]===roads[roadB][1]) //is the end of roadA equal to the starto f roadB
	{
		roads[roadA][9][roads[roadA][8]] = roadB;
		roads[roadA][8]++;
		roads[roadB][9][roads[roadB][8]] = roadA;
		roads[roadB][8]++;
		return true;
	} else if (verbose) {
		if
		(
			roads[roadA][0]===roads[roadB][0]||
		   roads[roadA][0]===roads[roadB][6]||
		   roads[roadA][6]===roads[roadB][0]||
		   roads[roadA][6]===roads[roadB][6]&&
		   roads[roadA][1]===roads[roadB][1]||
		   roads[roadA][1]===roads[roadB][7]||
		   roads[roadA][7]===roads[roadB][1]||
		   roads[roadA][7]===roads[roadB][7]
		)
		{
			if(roadA===roadB){
				console.log("connectRoads: The Roads Are the same");
				console.log(roadA);
			} else {
				console.log("connectRoads: The Roads (see next line) are not oriented correctly");
				console.log(roadA);
				console.log(roadB);
			}
		} else  {
			console.log("connectRoads: The Roads (see next line) share no common endpoints");
			console.log(roadA);
			console.log(roadB);
		}
		
		return false;
	}
} //dependant on roads