(function() {
	var canvas = document.getElementById('canvas-box'),
		ctx = canvas.getContext("2d");

	function Hero(x, y, speed) {
		heroH = 40;
		heroW = 40;
		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, heroW, heroH);
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
		this.clearPos = function(){
			ctx.clearRect(x,y, heroW, heroH);
		}
	}

	function mapObject(img, x, y, destroyable){

		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, heroW, heroH);
			};
			heroimg.src = img;
		}
	}
	var hero = new Hero(0, 0, 40);

	window.addEventListener("keypress", function(e) {
		switch(e.keyCode){
			case 37: {
				hero.clearPos();
				hero.moveLeft();
				break;
			}
			case 38: {
				hero.clearPos();
				hero.moveUp();
				break;
			}
			case 39: {
				hero.clearPos();
				hero.moveRight();
				break;
			}
			case 40: {
				hero.clearPos();
				hero.moveDown();
				break;
			}
		}
	});
	function animationFrame(){
		hero.draw(ctx);
		requestAnimationFrame(animationFrame);
	}
	requestAnimationFrame(animationFrame);
}())