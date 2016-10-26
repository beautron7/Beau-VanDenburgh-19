var minWidth = 10;
var maxWidth = window.innerWidth-minWidth;
var width = maxWidth-minWidth;
var ssv = d3.dsv("", "text/plain");


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
//end of borrowed code

function sortarr(arrtosort,index){
  //sortarr(arr,"arr[i].index")
  //sortarr(arr,"arr[i]")
  console.log("sorting")
  console.log(arrtosort.length)
  for (var j = 0; j < arrtosort.length; j++) {
    for (var i = 0; i < arrtosort.length-1; i++) {
      if(eval(index)<(()=>{i++;return eval(index)})()){
        console.log("foo")
        i--
        var temp;
        temp = arrtosort[i]
        arrtosort[i] = arrtosort[i+1]
        arrtosort[i+1] = temp;
        i++
      }
      i--;
    }
  }
}

function interpet_transcript(href,variable,cutoff){
  var returnData = "foobar";
  variable.highestnumber=0
  variable.words=[];
  ssv(href, data => {
    var actualdata = [];
    for(var i = 0; i < data.length; i++){
      data[i].speechcontents=data[i].speechcontents.toUpperCase();
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
        if(actualdata[i]==" "){
          continue;
        }
        variable.words.push({word:actualdata[i],count:1})
      }
    }
    for (var eye = 0; eye < variable.words.length;eye++){
      if(variable.words[eye].count < cutoff){
        variable.words.remove(eye);
        eye--;
      } else {
        // console.log(variable.words[eye].count)
      }
    }
    // console.log("sorting")
    // console.log(variable.words.length)
    for (var j = 0; j < variable.words.length; j++) {
      // console.info("sorting"+Math.floor(j/variable.words.length*100)+"%")
      for (var i = 0; i < variable.words.length-1; i++) {
        if(variable.words[i].count<variable.words[i+1].count){
          var temp;
          temp = variable.words[i]
          variable.words[i] = variable.words[i+1]
          variable.words[i+1] = temp;
          i--
        }
      }
    }
  })
}

function BubblegraphTranscript(datae){
  this.svg = d3.select("body").append("svg");
  this.previousradpos=0;
  this.ypos_circle = 70;
  this.longest_rad = 0;
  this.datae = datae //to clarify between d3.data() and BubblegraphTranscript.datae,
  this.groups = this.svg.selectAll("g").data(datae.words).enter().append("g");//used so that new groups are not appended
  this.circles = this.groups.append("circle");//used to ensure no new appendings
  this.lables = this.groups.append("text");//used to ensure no new appendings

  this.update=function(){
    this.previousradpos=0;
    this.ypos_circle = 70;
    this.longest_rad = 0;
    this.groups.attr("transform",(d,i) => //anon funct def in method chain
        ('translate('+Math.floor(this.previousradpos+d.count/this.datae.highestnumber*60+10)/*x*/+","+Math.floor(this.ypos_circle) /*y*/+
          (() => { //anon funct def in anon funct def
            this.previousradpos+=(d.count/this.datae.highestnumber*60+10)*2;
            if (this.previousradpos>innerWidth-70) {
              this.ypos_circle+=this.longest_rad+d.count/this.datae.highestnumber*60+10
              this.longest_rad=0;
              this.previousradpos=0;
            }
            if(this.longest_rad==0){
              this.longest_rad = d.count/this.datae.highestnumber*60+10;
            }
            return ")"
          })()
        )
      );
      this.circles
        .attr("r", (d,i) => (d.count/this.datae.highestnumber)*60+10+"px")
        .attr("stroke","black")
        .attr("fill", "white");
      this.lables
        .attr("dx", d => 0)
        .attr("dy", d => (d.count/this.datae.highestnumber))
        .text(d => d.word)
        .attr("text-anchor","middle")
        .style("font",(d,i) => (d.count/this.datae.highestnumber)*30+5+"px sans-serif");
  };//end this.update
}

var trump_data = {};
interpet_transcript("data/other.txt",trump_data,10);
sortarr(trump_data.words,"trump_data.words[i].count")

// var trump_data_2 = {};
// interpet_transcript("data/secondary.txt",trump_data_2,10);
// sortarr(trump_data_2.words,"trump_data_2.words[i].count")

var repub_data = {};
interpet_transcript("data/repub_primary.txt",repub_data,10);
sortarr(repub_data.words,"repub_data.words[i].count")

var new_trump_data = {};
interpet_transcript("data/trumpnewspeech.txt",new_trump_data,10);
sortarr(new_trump_data.words,"new_trump_data.words[i].count")
