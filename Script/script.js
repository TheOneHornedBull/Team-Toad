(function() {
	var canvas = document.getElementById('canvas-box'),
		ctx = canvas.getContext("2d");

	function Hero(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;

		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y);
			};
			heroimg.src = 'Images/Dynamite ready.png';
		}

		this.moveUp = function(){
			y -= speed;
		}
		this.moveDown = function(){
			y += speed;
		}
		this.moveLeft = function(){
			x -= speed;
		}
		this.moveRight = function(){
			x += speed;
		}
	}

	var hero = new Hero(0, 0, 45);
	window.addEventListener("keypress", function(e) {
		switch(e.keyCode){
			case 37:
				hero.moveLeft();
				break;
			case 38: 
				hero.moveUp();
				break;
			case 39:
				hero.moveRight();
				break;
			case 40: 
				hero.moveDown();
				break;
		}
	});
	function animationFrame(){
		ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
		hero.draw(ctx);
		requestAnimationFrame(animationFrame);
	}
	requestAnimationFrame(animationFrame);
}())