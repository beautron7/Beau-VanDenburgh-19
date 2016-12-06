function autoConnectRoads(){
	for(var i = 0; i < addRoadVar; i++){
		for(var j = 0; j < addRoadVar; j++){
			connectRoads(i,j,false);
		}
	}
}