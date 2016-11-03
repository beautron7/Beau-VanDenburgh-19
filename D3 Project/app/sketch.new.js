var minWidth = 10;
var maxWidth = window.innerWidth - minWidth;
var width = maxWidth - minWidth;
var ssv = d3.dsv("", "text/plain");
var interval_passthrus = [];


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.isArray = true;

// Math normalize - By Beau Vandenburgh
Math.normalize = function(value, min, max) { //converts range from min - max to 0 - 1
    return (value - min) / (max - min)
}

Math.map = function(value, minin, maxin, minout, maxout) { //convers value from range minin,maxin to range minout,maxout
    return Math.denormalize(Math.normalize(value, minin, maxin), minout, maxout);
}

Math.denormalize = function(value, start, stop) { //converts range from 0 - 1 to start - stop
        return value * (stop - start) + start;
}
//end

function TransitioningTranscript(transcripts) {
    var ThisTT = this;
    this.transcripts = transcripts
    this.sourcetext = {};
    this.sourcetext.words = [];
    if (!transcripts.isArray) {
        console.warn(transcripts)
        throw "error: combinetranscripts was not an array"
    }
    if (transcripts.length != 2) {
        throw "error: combinetranscripts was not given 2 values"
    }
    for (var i = 0; i < transcripts.length; i++) {
        if (transcripts[i].words == undefined) throw "error: transcript #" + (i + 1) + " missing method words"
        if (transcripts[i].highestnumber == undefined) throw "error: transcript #" + (i + 1) + " missing method highestnumber"
    }
    for (var i = 0; i < transcripts[0].words.length; i++) {
        var matchfound = false;
        for (var j = 0;((!matchfound) && (j < transcripts[1].words.length)); j++) {
            if (transcripts[0].words[i].word == transcripts[1].words[j].word) {
                matchfound = true;
                this.sourcetext.words.push({
                    word: transcripts[0].words[i].word,
                    startcount: transcripts[0].words[i].count,
                    endcount: transcripts[1].words[j].count
                });
            }
        }
        if (!matchfound) {
            this.sourcetext.words.push({
                word: transcripts[0].words[i].word,
                startcount: transcripts[0].words[i].count,
                endcount: 0
            });
        }
    }
    for (var i = 0; i < transcripts[1].words.length; i++) {
        var notfoundyet = true;
        for (var j = 0; j < this.sourcetext.words.length; j++) {
            if (transcripts[1].words[i].word == this.sourcetext.words[j].word) {
                notfoundyet = false;
            }
        }
        if (notfoundyet) {
            this.sourcetext.words.push({
                word: transcripts[1].words[i].word,
                startcount: 0,
                endcount: transcripts[1].words[i].count
            })
        }
    }
    for (var i = 0; i < this.sourcetext.words.length; i++) {
      this.sourcetext.words[i].color = "hsl("+(Math.random()*255)+",100%, 75%)";
    }
    this.transcript = {
      isA: "synth_transcript",
      words: []
    };
    this.update_transcript = function(time) {
        this.transcript.highestnumber = 0;
        this.transcript.words = [];
        for (var i = 0; i < this.sourcetext.words.length; i++) {
            this.transcript.words[this.transcript.words.length] = {
                word: this.sourcetext.words[i].word,
                count: Math.denormalize(time,this.sourcetext.words[i].startcount, this.sourcetext.words[i].endcount),
                color:this.sourcetext.words[i].color,
                tooltip:"the frequency (relative to the most common word) of "+this.sourcetext.words[i].word+" went from "+this.sourcetext.words[i].startcount/this.transcripts[0].highestnumber*100+"% to "+this.sourcetext.words[i].endcount/this.transcripts[1].highestnumber*100+"%"
            }
            if (this.transcript.words[this.transcript.words.length - 1].count > this.transcript.highestnumber) {
                this.transcript.highestnumber = this.transcript.words[this.transcript.words.length - 1].count;
            }
        }
        for (var j = 0; j < this.transcript.words.length; j++) {
            for (var i = 0; i < this.transcript.words.length - 1; i++) {
                if (this.transcript.words[i].count < this.transcript.words[i + 1].count) {
                    var temp;
                    temp = this.transcript.words[i]
                    this.transcript.words[i] = this.transcript.words[i + 1]
                    this.transcript.words[i + 1] = temp;
                    i--
                }
            }
        }
    }
}

function Transcript(href, cutoff) {
    this.isA = "transcript"
    var returnData = "foobar";
    this.highestnumber = 0
    this.words = [];
    ssv(href, data => {
        var actualdata = [];
        for (var i = 0; i < data.length; i++) {
            data[i].speechcontents = data[i].speechcontents.toUpperCase();
            for (var j = 0; j < data[i].speechcontents.length; j++) {
                if ((data[i].speechcontents.charAt(j) == " ") || (data[i].speechcontents.charAt(j) == ".")) {
                    actualdata[actualdata.length] = " ";
                } else {
                    actualdata[actualdata.length - 1] += data[i].speechcontents.charAt(j);
                }
            }
        }
        for (var i = 0; i < actualdata.length; i++) {
            var datawasfound = false; //does data already exist
            for (var j = 0; j < this.words.length; j++) {
                if (actualdata[i] == this.words[j].word) {
                    this.words[j].count++;
                    if (this.highestnumber < this.words[j].count) {
                        this.highestnumber = this.words[j].count;
                    }
                    datawasfound = true;
                    break;
                }
            }
            if (!datawasfound) {
                if (actualdata[i] == " ") {
                    continue;
                }
                this.words.push({
                    word: actualdata[i],
                    count: 1
                })
            }
        }
        for (var i = 0; i < this.words.length; i++) {
            if (this.words[i].count < cutoff) {
                this.words.remove(i);
                i--;
            } else {}
        }
        for (var j = 0; j < this.words.length; j++) {
            for (var i = 0; i < this.words.length - 1; i++) {
                if (this.words[i].count < this.words[i + 1].count) {
                    var temp;
                    temp = this.words[i]
                    this.words[i] = this.words[i + 1]
                    this.words[i + 1] = temp;
                    i--
                }
            }
        }
        for (var i = 0; i < this.words.length; i++) {
          this.words[i].color = "hsl("+(Math.random()*255)+",100%, 75%)";
        }
    })
}

function BubblegraphTranscript(datae) {
    this.selectedBubble = 0;
    this.isA = "transcript_graph"
    this.mainDiv = d3.select("body").append("div");
    this.mainDiv.classed("temporary",true)
    $(".temporary").css({ marginTop : "90px"})
    this.mainDiv.classed("temporary",false)
    this.svg = this.mainDiv.append("svg");
    $( window ).resize(this, function(This) {
      This.data.svg.style("width", window.innerWidth-30).style("height", window.innerHeight);
      This.data.update();
    })
    this.previousradpos = 0;
    this.ypos_circle = 70;
    this.longest_rad = 0;
    this.datae = datae //to clarify between d3.data() and BubblegraphTranscript.datae,
    this.update = function() {
        this.svg.selectAll("g").remove()
        this.groups = this.svg.selectAll("g").data(this.datae.words).enter().append("g"); //used so that new groups are not appended
        this.circles = this.groups.append("circle"); //used to ensure no new appendings
        this.lables = this.groups.append("text"); //used to ensure no new appendings
        this.previousradpos = 0;
        this.ypos_circle = 70;
        this.longest_rad = 0;
        this.groups.attr("transform", (d, i) => //anon funct def in method chain
            ('translate(' + Math.floor(this.previousradpos + d.count / this.datae.highestnumber * 60 + 10) /*x*/ + "," + Math.floor(this.ypos_circle) /*y*/ +
                (() => { //anon funct def in anon funct def
                    this.previousradpos += (d.count / this.datae.highestnumber * 60 + 10) * 2;
                    if (this.previousradpos > innerWidth - 70) {
                        this.ypos_circle += this.longest_rad + d.count / this.datae.highestnumber * 60 + 10
                        this.longest_rad = 0;
                        this.previousradpos = 0;
                    }
                    if (this.longest_rad == 0) {
                        this.longest_rad = d.count / this.datae.highestnumber * 60 + 10;
                    }
                    return ")"
                })()
            )
        );
        this.circles
            .attr("r", (d, i) => (d.count / this.datae.highestnumber) * 60 + 10 + "px")
            .attr("stroke", "black")
            .attr("fill", (d,i)=>(d.color))
            .append("svg:title")
            .text( (d,i)=>(d.tooltip));
        this.lables
            .attr("dx", d => 0)
            .attr("dy", d => (d.count / this.datae.highestnumber))
            .text(d => d.word)
            .attr("text-anchor", "middle")
            .style("font", (d, i) => (d.count / this.datae.highestnumber) * 30 + 5 + "px sans-serif")
            .append("svg:title")
            .text( (d,i)=>(d.tooltip));
    }
    this.svg.style("width", window.innerWidth-30).style("height", window.innerHeight);
    this.update();
}

var playback_controlls = function(transitioningTranscript,bubblegraphTranscript){
  this.isA = "PBcontrols"
  this.bubblegraphTranscript = bubblegraphTranscript;
  this.unique_identifier = Math.random()*100000000000000000;
  this.transitioningTranscript = transitioningTranscript;
  this.isplaying;
  console.log(this.transitioningTranscript)
  this.js_tracker;
  this.playback_progress = 0;
  this.playback_speed = 0.003;
  $(".chart").append(`
    <div style="padding-top: 0px;padding-right: 0px;padding-bottom: 10px;padding-left: 10px;" class = "col-sm-12 `+this.unique_identifier+`">
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:0%;transition:none">
          Playback progress
        </div>
      </div>
      <div class = btn-group>
        <button type="button" class="btn btn-info rewind"><<</button>
        <button type="button" class="btn btn-info slower">Slower</button>
      </div>
      <div class = btn-group>
        <button type="button" class="btn btn-success play">Play</button>
        <button type="button" class="btn btn-danger stop">Stop</button>
      </div>
      <div class = btn-group>
        <button type="button" class="btn btn-info faster">Faster</button>
        <button type="button" class="btn btn-info fastfw">>></button>
      </div>
    </div>
  `);
  $("."+this.unique_identifier).find(".play").click(this,function(This){
    This.data.play();
  });
  $("."+this.unique_identifier).find(".faster").click(this,function(This){
    This.data.playback_speed+=0.001;
    console.info("speed up to: "+This.data.playback_speed)
  });
  $("."+this.unique_identifier).find(".slower").click(this,function(This){
    This.data.playback_speed-=0.001;
    console.info("slowed to: "+This.data.playback_speed);
  });
  $("."+this.unique_identifier).find(".fastfw").click(this,function(This){
    var pbspeed = This.data.playback_speed;
    This.data.playback_speed = 0;
    This.data.playback_progress+=0.1;
    This.data.update();
    This.data.playback_speed = pbspeed;
  });
  $("."+this.unique_identifier).find(".rewind").click(this,function(This){
    var pbspeed = This.data.playback_speed;
    This.data.playback_speed = 0;
    This.data.playback_progress-=0.1;
    This.data.update();
    This.data.playback_speed = pbspeed;
  });
  $("."+this.unique_identifier).find(".stop").click(this,function(This){
    This.data.stop();
  });
  this.play = function(){
    if(this.isplaying){throw "Already Playing"};
    this.isplaying = true;
    clearInterval(this.js_tracker);
    this.js_tracker = setInterval(function(This){This.update()},10,this);
    $("."+this.unique_identifier).find(".progress-bar").toggleClass("progress-bar-striped")
  }
  this.update = function(){
    if(this.playback_progress+this.playback_speed>1){
      this.playback_progress=1;
      this.stop();
    } else if (this.playback_progress+this.playback_speed<0){
      this.playback_progress=0;
      this.stop();
    } else {
      this.playback_progress+=this.playback_speed;
    }
    // this.synth_transcript = getPointOnCombinedTranscipt(this.)
    this.transitioningTranscript.update_transcript(this.playback_progress);
    this.bubblegraphTranscript.update();
    $(".progress-bar").css("width",Math.floor(this.playback_progress*100)+"%");
  }
  this.stop = function(){
    if(this.isplaying == false){
      throw "Already stoped"
    }
    this.isplaying = false;
    console.log(this.playback_progress+" + "+this.playback_speed+"="+(this.playback_progress+this.playback_speed))
    clearInterval(this.js_tracker);
    $("."+this.unique_identifier).find(".progress-bar").toggleClass("progress-bar-striped")
  }
}

var trump_data = new Transcript("data/other.txt", 10);

var trumpnewspeech = new Transcript("data/trumpnewspeech.txt", 10);

$(".begin").click(()=>{
  TT = new TransitioningTranscript([trump_data,trumpnewspeech])
  TT.update_transcript(0)
  Graph = new BubblegraphTranscript(TT.transcript)
  Graph.update();
  PBctrls = new playback_controlls(TT,Graph)
  $(".begin").remove();
});

console.info("foo = new TransitioningTranscript([trump_data,repub_data])")
console.info("foo.update_transcript()");
console.info("bar = new BubblegraphTranscript(foo.transcript)")
console.info("bar.update()");
