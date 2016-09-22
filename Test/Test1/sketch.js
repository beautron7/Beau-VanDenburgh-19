function setup() {
	createCanvas(400, 400);
	//didGreeniesWin("Pope John Paul", 10, 101);
	sumRange(10, 12)
	colorMode(HSB, 10);
}

function draw() {
	background(128);
	checker();
}

function didGreeniesWin(opponent, newmanScore, opposingScore) {
	console.log((function() {
		if (newmanScore > opposingScore) {
			return "Yay! Newman has aquired more points than the opposition! (" + opponent + ")";
		} else {
			return "Eheu! Newman has not aquired more points than the opposition! (" + opponent + ")";
		}
	})());
}

function sumRange(startNUM, endNUM) {
	var Q = 0;
	var myStr = "";
	for (var i = startNUM; i <= endNUM; i++) {
		Q += i;
		myStr += (i + "+");
	}
	myStr += ("0=" + Q);
	console.log(myStr)
}

function checker() {
	for (var i = 0; i < 10; i++) {
		stroke(i, 10, 10);
		fill(i % 2 * 10);
		rect(i * 40, abs((5*frameCount%(360*2))-360), 40, 40);
	}
}