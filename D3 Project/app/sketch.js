var svg = d3.select("body").append("svg");
var minWidth = 10;
var maxWidth = window.innerWidth-minWidth;
var width = maxWidth-minWidth;
var ssv = d3.dsv("", "text/plain");
var canvas = d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",500);
var actualdata = [];
var actualactualdata = [];
var actualactualdatacount = [];
var organizedData = []

var numrows = 3
var numcollums = 10
var highestnumber = 0;

ssv("data/other.txt", data => {
  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < data[i].speechcontents.length; j++){
      if((data[i].speechcontents.charAt(j)==" ")||(data[i].speechcontents.charAt(j)==".")){
        actualdata[actualdata.length] = data[i].speechcontents.charAt(j);
      } else {
        actualdata[actualdata.length-1] += data[i].speechcontents.charAt(j);
      }
    }
  }
  for(var i = 0; i < actualdata.length; i++){
    console.log("foo")
    var datawasfound = false; //does data already exist
    for(var j = 0; j < actualactualdata.length; j++){
      if(actualdata[i]==actualactualdata[j].word){
        actualactualdata[i].count++;
        if (highestnumber < actualactualdata[j].count){
          highestnumber = actualactualdata[j].count;
        }
        datawasfound = true;
        break;
      }
    }
    if(!datawasfound){
      actualactualdata.push({data:actualdata[i],count:1})
    }
  }
  delete actualdata;
  for(var r = 0; r < numrows; r++){
    for(var c = 0; c < numcollums; c++){

    }
  }
})

// d3.selectAll("p").style("color", fn => {
//   return "hsl(" + Math.random() * 360 + ",100%,50%)";
// });

svg.append("circle")
  .attr("cx", 100)
  .attr("cy", 50)
  .attr("r", 30);

svg.append("circle")
  .attr("cx", 120)
  .attr("cy", 40)
  .attr("r", 30);

svg.append("text")
  .attr("x", 120)
  .attr("y", 50)
  .text("hi")
  .style("fill","steelblue")
