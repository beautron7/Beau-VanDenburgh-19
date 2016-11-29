var scenes[];

function setup() {
  
}

function draw() {
  
}

function Scene() {
	this.actors=[];
	this.externalfiles=[];
	this.addexternalfile = function(name,type,url){
		if(type==="img"){
			this.externalfiles.push({
				name:name,
				type:"img",
				src:url,
				data:loadImage(url)
			});
		} else if (type==="mus"){
			this.externalfiles.push({
				name:name,
				type:"mus",
				src:url,
				data:loadSound(url)
			});
		} else if (type==="json"){
			
		}
	}
}