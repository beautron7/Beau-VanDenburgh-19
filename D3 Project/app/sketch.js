var minWidth = 10;
var maxWidth = window.innerWidth - minWidth;
var width = maxWidth - minWidth;
var ssv = d3.dsv("", "text/plain");


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.isArray = true;

// Math normalize - By Beau Vandenburgh (MIT Licensed)
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

function sortarr(arrtosort, index) {
    //sortarr(arr,"arr[i].index")
    //sortarr(arr,"arr[i]")
    console.log("sorting")
    console.log(arrtosort.length)
    for (var j = 0; j < arrtosort.length; j++) {
        for (var i = 0; i < arrtosort.length - 1; i++) {
            if (eval(index) < (() => {
                    i++;
                    return eval(index)
                })()) {
                console.log("foo")
                i--
                var temp;
                temp = arrtosort[i]
                arrtosort[i] = arrtosort[i + 1]
                arrtosort[i + 1] = temp;
                i++
            }
            i--;
        }
    }
}

function interpet_transcript(href, variable, cutoff) {
    variable.isA = "transcript"
    var returnData = "foobar";
    variable.highestnumber = 0
    variable.words = [];
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
            for (var j = 0; j < variable.words.length; j++) {
                if (actualdata[i] == variable.words[j].word) {
                    variable.words[j].count++;
                    if (variable.highestnumber < variable.words[j].count) {
                        variable.highestnumber = variable.words[j].count;
                    }
                    datawasfound = true;
                    break;
                }
            }
            if (!datawasfound) {
                if (actualdata[i] == " ") {
                    continue;
                }
                variable.words.push({
                    word: actualdata[i],
                    count: 1
                })
            }
        }
        for (var eye = 0; eye < variable.words.length; eye++) {
            if (variable.words[eye].count < cutoff) {
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
            for (var i = 0; i < variable.words.length - 1; i++) {
                if (variable.words[i].count < variable.words[i + 1].count) {
                    var temp;
                    temp = variable.words[i]
                    variable.words[i] = variable.words[i + 1]
                    variable.words[i + 1] = temp;
                    i--
                }
            }
        }``
    })
}

function getPointOnCombinedTranscipt(combined_transcript, time, varnamestr) {
    var synth_transcript = {
        isA: "synth_transcript",
        words:[]
    };
    var highest_value = 0;
    if (combined_transcript.isA != "combined_transcript") {
        console.warn(combined_transcript);
        throw "error: not a combined transcript"
    }
    for (var i = 0; i < combined_transcript.words.length; i++) {
        synth_transcript.words[synth_transcript.words.length] = {
            word: combined_transcript.words[i].word,
            count: Math.denormalize(time, combined_transcript.words[i].startcount, combined_transcript.words[i].endcount)
        }
        if (synth_transcript.words[synth_transcript.words.length-1].count > highest_value) {
            highest_value = synth_transcript.words[synth_transcript.words.length-1].count;
        }
    }
    synth_transcript.global_refrence = varnamestr;
    synth_transcript.highestnumber = highest_value;
    return synth_transcript;
}

function BubblegraphTranscript(datae) {
    this.isA = "transcript_graph"
    this.svg = d3.select("body").append("svg");
    this.previousradpos = 0;
    this.ypos_circle = 70;
    this.longest_rad = 0;
    this.datae = datae //to clarify between d3.data() and BubblegraphTranscript.datae,
    this.groups = this.svg.selectAll("g").data(datae.words).enter().append("g"); //used so that new groups are not appended
    this.circles = this.groups.append("circle"); //used to ensure no new appendings
    this.lables = this.groups.append("text"); //used to ensure no new appendings
    if (this.datae.isA == "synth_transcript") {
        this.update = function() {
            sortarr(this.datae, this.datae.global_refrence + ".words[i].count")
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
                .attr("fill", "white");
            this.lables
                .attr("dx", d => 0)
                .attr("dy", d => (d.count / this.datae.highestnumber))
                .text(d => d.word)
                .attr("text-anchor", "middle")
                .style("font", (d, i) => (d.count / this.datae.highestnumber) * 30 + 5 + "px sans-serif");
        }
    } else if (this.datae.isA == "transcript") {
        this.update = function() {
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
                .attr("fill", "white");
            this.lables
                .attr("dx", d => 0)
                .attr("dy", d => (d.count / this.datae.highestnumber))
                .text(d => d.word)
                .attr("text-anchor", "middle")
                .style("font", (d, i) => (d.count / this.datae.highestnumber) * 30 + 5 + "px sans-serif");
        }
    }
}

function combinetranscripts(transcripts, varnamestr) {
    this.words = [];
    this.global_refrence = varnamestr;
    this.isA = "combined_transcript"
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
        for (var j = 0;
            ((!matchfound) && (j < transcripts[1].words.length)); j++) {
            if (transcripts[0].words[i].word == transcripts[1].words[j].word) {
                matchfound = true;
                this.words.push({
                    word: transcripts[0].words[i].word,
                    startcount: transcripts[0].words[i].count,
                    endcount: transcripts[1].words[j].count
                });
            }
        }
        if (!matchfound) {
            this.words.push({
                word: transcripts[0].words[i].word,
                startcount: transcripts[0].words[i].count,
                endcount: 0
            });
        }
    }
    for (var i = 0; i < transcripts[1].words.length; i++) {
        var notfoundyet = true;
        for (var j = 0; j < this.words.length; j++) {
            if (transcripts[1].words[i].word == this.words[j].word) {
                notfoundyet = false;
            }
        }
        if (notfoundyet) {
            this.words.push({
                word: transcripts[1].words[i].word,
                startcount: 0,
                endcount: transcripts[1].words[i].count
            })
        }
    }
}

var trump_data = {};
interpet_transcript("data/other.txt", trump_data, 10);
sortarr(trump_data.words, "trump_data.words[i].count")

// var trump_data_2 = {};
// interpet_transcript("data/secondary.txt",trump_data_2,10);
// sortarr(trump_data_2.words,"trump_data_2.words[i].count")

var repub_data = {};
interpet_transcript("data/repub_primary.txt", repub_data, 10);
sortarr(repub_data.words, "repub_data.words[i].count")

var new_trump_data = {};
interpet_transcript("data/trumpnewspeech.txt", new_trump_data, 10);
sortarr(new_trump_data.words, "new_trump_data.words[i].count")

var playback_controlls = function(BubblegraphTranscript,combined_transcript){
  this.BubblegraphTranscript = BubblegraphTranscript;
  this.combined_transcript = combined_transcript;
  this.synth_transcript = synth_transcript;
  this.js_tracker;
  this.playback_progress;
  this.playback_speed;
  this.play(){

  }
  this.update(){
    if(this.playback_progress+this.playback_speed>1){
      this.playback_progress=1;
      this.stopPlayback();
    } else if (this.playback_progress+this.playback_speed<0){
      this.playback_progress=0;
      this.stopPlayback();
    } else {
      this.playback_progress+=this.playback_speed;
    }
    this.synth_transcript = getPointOnCombinedTranscipt(this.)
    $(".progress-bar").css("width",Math.floor(playback_progress*100)+"px");
  }
  this.stopPlayback(){

  }
}
