function preload() {
	song = loadSound('assets/song.mp3');
}

function setup() {
	createCanvas(710, 400);
	noFill();

	mic = new p5.AudioIn();
	// mic.start();
	song.play();
	fft = new p5.FFT();
	// fft.setImput(mic)
	colorMode(HSB,width);
}
var spectrum;

function draw() {
	background (10);
	spectrum = fft.analyze();
	rainbowCircles();
	rainbowBars();
}

function noize(noisepos){
	return noise(noisepos*width);
}

function rainbowCircles(){
	for (i = 0; i < spectrum.length; i += 30) {
		stroke((frameCount*10+i)%width,width,width);
		fill((frameCount*10+i)%width,width,width);
		var thesizeofthething = map(spectrum[i], 0, 255, 5,height/5);
		if(thesizeofthething>27){
			thesizeofthething=27;
		}
		ellipse(i, height/5, thesizeofthething);
	}
}

function rainbowBars(){
	for (i = 0; i < spectrum.length; i += 10) {
		stroke((frameCount*10+i)%width,width,width);
		fill((frameCount*10+i)%width,width,width);
		rect(i, map(spectrum[i], 0, 255, height,0), 10, height);
	}
}