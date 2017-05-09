function setup() {

}

function draw() {

}

sodokugrid = {
	contents:[],
	checkGridForcedNums:function(grid){

	}
}

function Grid(){
	this.contents =[//contains horizontals
		[//is a horizontal, contains verticals
			[
				[1,2,3],
				[4,5,6],
				[0,9,7]
			],
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			]
		],
		[
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			]
		],
		[
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			[
				[0,0,0],
				[0,0,0],
				[0,0,0]
			]
		]
	];
	this.checkboxdone=function(boxrow,boxcol){//worksboo
    var box = this.contents[boxrow][boxcol];
    var numofempties = 0;
    var contents = [];
    var emptycoord = [];

		for (var i = 0; i < 3; i++) {
		  for (var j = 0; j < 3; j++) {
		    if(box[i][j]==0){
          numofempties++;
          emptycoord[0]=i;
          emptycoord[1]=j;
        } else {
          contents.push(box[i][j]);
        }
		  }
		}
    console.log(numofempties)
    if(numofempties>1){
      return false;
    } else {
      var found = false;
      for (var j = 1; j < 10; j++) {
        for (var i = 0; i < contents.length; i++) {
          if(j == contents[i]){
            j++;
            i=0;
          }
          if(i == contents.length-1){
            found=true;
            i=contents.length;
          }
        }
        if(found){
          box[emptycoord[0]][emptycoord[1]]=j;
          j=10;
        }
      }
      console.log(contents)
    }
	}
}
