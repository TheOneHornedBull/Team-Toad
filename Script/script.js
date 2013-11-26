(function() {
	var canvas = document.getElementById('canvas-box'),
		ctx = canvas.getContext("2d");

	function Terrain(x, y){
		this.draw = function(ctx){
			var img = new Image();
			img.onload = function(){
				for(var i = 0; i < 15; i++){
					for(var ii = 0; ii < 20; ii++){
						ctx.drawImage(img, x+(ii*40), y, 40, 40);
					}
					y = i*40;
				}
			};
			img.src = 'Images/Background.png';
		}
	}

	function Hero(x, y, speed) {
		heroH = 40;
		heroW = 40;
		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, heroW, heroH);
			};
			heroimg.src = 'Images/super_ninja.png';
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
	var terrain = new Terrain(0, 0);
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
		terrain.draw(ctx);
		hero.draw(ctx);
		requestAnimationFrame(animationFrame);
	}
	requestAnimationFrame(animationFrame);
}())