var svg = d3.select("body").append("svg");
var minWidth = 10;
var maxWidth = window.innerWidth-minWidth;
var width = maxWidth-minWidth;
var ssv = d3.dsv("", "text/plain");
var canvas = d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",500);

var numrows = 3
var numcollums = 10

function interpet_transcript(href,variable){
  var returnData = "foobar";
  variable.highestnumber=0
  variable.words=[];
  ssv(href, data => {
    var actualdata = [];
    for(var i = 0; i < data.length; i++){
      for(var j = 0; j < data[i].speechcontents.length; j++){
        if((data[i].speechcontents.charAt(j)==" ")||(data[i].speechcontents.charAt(j)==".")){
          actualdata[actualdata.length] = " ";
        } else {
          actualdata[actualdata.length-1] += data[i].speechcontents.charAt(j);
        }
      }
    }
    for(var i = 0; i < actualdata.length; i++){
      var datawasfound = false; //does data already exist
      for(var j = 0; j < variable.words.length; j++){
        if(actualdata[i]==variable.words[j].word){
          variable.words[j].count++;
          if (variable.highestnumber < variable.words[j].count){
            variable.highestnumber = variable.words[j].count;
          }
          datawasfound = true;
          break;
        }
      }
      if(!datawasfound){
        variable.words.push({word:actualdata[i],count:1})
      }
    }
  })
  console.log(variable)
}
function jointranscripts(arr_of_transcripts,new_transcript){
  var highestcount = 0;
  new_transcript.words = [];
  for(var i = 0; i < arr_of_transcripts.length; i++){
    if (highestcount < arr_of_transcripts[i].highestcount){
      highestcount = arr_of_transcripts[i].highestcount;
    }
    for(var j = 0; j<arr_of_transcripts[i].words.length; j++){
      new_transcript.words.push(arr_of_transcripts[i].words[j]);
    }
  }
  new_transcript.highestcount = highestcount
}
var trump_data = {};
interpet_transcript("data/other.txt",trump_data);
var trump_data_2 = {};
interpet_transcript("data/other.txt",trump_data_2);
// var repub_data = interpet_transcript("data/repub_primary.txt");
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
