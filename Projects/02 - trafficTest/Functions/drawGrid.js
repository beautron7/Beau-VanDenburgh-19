function drawGrid(gridDivision){
	for(var i = 0; i < width; i+= gridDivision){
		line(i,0,i,height);
	}
	for(var i = 0; i < height; i+= gridDivision){
		line(0,i,width,i);
	}
}