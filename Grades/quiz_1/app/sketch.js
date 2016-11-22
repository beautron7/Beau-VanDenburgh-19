function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload(){

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  console.log(clowns[2].name+" was spotted at "+clowns[2].location.spotted)
  console.log("the ratio of sweet to sour is "+ratioSweetFruits(fruits)+" to 1");  // prints 1.5 = 3/2
  politicians[0] = new Politician("Trump","Republican",100);
  politicians[1] = new Politician("Hillary","Democrat",100);

  // random politician has an oopsie
  politicians[Math.floor(random(0,2))].oopsie();

  // print out politicians' ratings
  console.log(politicians[0].nayme + " " + politicians[0].aprov + "%")
  console.log(politicians[1].nayme + " " + politicians[1].aprov + "%")
}

function draw() {
  background(128)
  ellipse(120,120,20)
}

function ratioSweetFruits(arr) {
   var fruitsthatare = {sweet:0,sour:0};

   for(var i = 0; i < fruits.length; i++){
     if(fruits[i].sweet){
       fruitsthatare.sweet++
     } else {
       fruitsthatare.sour++
     }
   }
   return fruitsthatare.sweet/fruitsthatare.sour;
}

function Politician(name,party,rating){
  this.nayme = name;
  this.party = party;
  this.aprov = rating;
  this.runin = true;
  this.oopsie = function(){
    if(this.nayme == "Trump"){
      console.log("Trump made an oppsie, but his approvability was unaffected???")
      return;
    } else {
      if(this.approv<30){
        this.runin = false;
        console.log(this.nayme+"dropped out")
      } else {
        this.aprov-=30;
      }
    }
  }

}

var politicians = [];
var fruits = [{fruit: "apple", sweet: true},{fruit: "tomato", sweet: false},{fruit: "pear", sweet: true}, {fruit:"lemon", sweet: false}, {fruit:"grape", sweet: true}];
var clowns = [{
      name: "Smitty",
      location: {
         current: "City Park",
         spotted: "CircleK"
      }
   }, {
      name: "Big Red",
      location: {
         current: "Uptown",
         spotted: "Mojo"
      }
   }, {
      name: "Bernie",
      location: {
         current: "Unknown",
         spotted: "Wal Mart"
      }
   }];
