var justiceLeague = [];
var superheroNames = ["javascript man","[]!=[]","(function undefined(){alert('nope')})();","0.1+0.2 != 0.3", "typeof Nan //number"];

(function undefined() {console.log(typeof null);console.log(null instanceof Object)})();
//yes, i did just declare undefined as a function and run it.

function setup() {
	/*for(var i = 0; i < 5; i++){
		justiceLeague[i] = {
			name: superheroNames[i],
			health: random(9,110),
			enemy: {
				name: "HTML5",
				weakness: null
			},
			sustainHit: function(inte){
				this.health-=inte;
			},
			checkHealth: function(){
				if(this.health<20){
				console.log(this.name+", seek medical attention");
				}
			}
		}
	}*/
	for(var i = 0; i < superheroNames.length; i++){
		justiceLeague[i] = new Superhero(superheroNames[i]);
	}
	console.log( 0.1+0.2 - 0.3 );
}



function Superhero(nameer){
	this.name= nameer,
	this.health = random(99,101),
	this.enemy = {
		name: "HTML5",
		weakness: null
	},
	this.sustainHit = function(inte){
		this.health-=inte;
	},
	this.checkHealth = function(){
		if(this.health<20){
			console.log(this.name+", seek medical attention");
		}
	}
}

