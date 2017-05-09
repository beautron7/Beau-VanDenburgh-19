var pokeJSON;
var heavier_than_bulb = 0;
var lighter_than_bulb = 0;
var foo;

function preload(){
  pokeJSON = loadJSON("https:/raw.githubusercontent.com/Isidore-Newman-School/Creative-Coding-F2016/master/Classwork/unit1_data/data/pokemon.json");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i = 0; i < pokeJSON.pokemon.length; i++){
    if(pokeJSON.pokemon[i].base_happiness<pokeJSON.pokemon[0].base_happiness){
      lighter_than_bulb++;
    } else {
      heavier_than_bulb++;
    }
    console.log(i);
  }
  if(width>height){
    foo = height;
  } else {
    foo = width;
  }
}

function draw() {
  background(200)
  fill(0)
  arc(width/2,height/2,foo,foo,0,heavier_than_bulb/(lighter_than_bulb+heavier_than_bulb)*2*PI,PIE)
  fill(128)
  arc(width/2,height/2,foo,foo,heavier_than_bulb/(lighter_than_bulb+heavier_than_bulb)*2*PI,2*PI,PIE)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(width>height){
    foo = height;
  } else {
    foo = width;
  }
}
