/*
	Starfield lets you take a div and turn it into a starfield.

*/

//	Define the starfield class.
function Starfield() {
	this.fps = 120;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = 1;
	this.maxVelocity = 15;
	this.stars = window.innerWidth/10;
	this.intervalId = 0;
	this.fontSize = 30;
	this.font = 'px Arial'
	

}





//initialises the starfield.
Starfield.prototype.initialise = function(div) {

	var self = this;

	//	Store the div.
	self.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	

	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.width/4;

		self.fontSize = (self.canvas.width/4)/4;
		
		
		self.draw();
		
		
	});

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.width/4;

	self.fontSize = (self.canvas.width/4)/4;
	
	
	
	
};





Starfield.prototype.start = function() {

	//	Create the stars.
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height/2, Math.random()*3+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;

	for(var i=0; i<this.stars.length; i++) {
		//set star trajectory
		var star = this.stars[i];
		star.x += dt * star.velocity;
		star.y += dt * star.velocity;

		//	If the star has moved from the bottom of the screen, spawn it at the top.
		if((star.y > this.width/4) || (star.x > this.width)) {
			this.stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
	}
};

Starfield.prototype.draw = function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");

	//	Draw the background.
 	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.width/4);

	//	Draw stars
	ctx.fillStyle = '#58dbef';
	for(var i=0; i<this.stars.length;i++) {
		var star = this.stars[i];
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}

	//draw text
	ctx.fillStyle = 'Gold';
	ctx.textBaseline =  'middle';
	ctx.textAlign = 'center';

	console.log(this.fontSize);
	ctx.font = this.fontSize + this.font;
	ctx.fillText('The Proving Grounds', this.width/2 , this.width/8);
	

	
	
	
	

	
};

function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.size = size;
	this.velocity = velocity;
}