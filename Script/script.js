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
			if(mapObjects[x/40][y/40 - 1]==0){
			y -= speed;
			}
		}
		this.moveDown = function(){
			if(mapObjects[x/40][y/40 + 1]==0){
			y += speed;
			}
		}
		this.moveLeft = function(){
			if(mapObjects[x/40 - 1][y/40]==0){
				x -= speed;
			}
		}
		this.moveRight = function(){
			if(mapObjects[x/40 + 1][y/40]==0){
			x += speed;
			}
		}
		this.clearPos = function(){
			ctx.clearRect(x,y, heroW, heroH);
			
			//Doesn't work as expected. Expected: draw bg image where the ninja is.
			var bgimg = new Image();
			bgimg.onload = function(){
				ctx.drawImage(bgimg, x, y, heroW, heroH);
			};
			bgimg.src = 'Images/Background.png';
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
	var mapObjects = [];
	for(var i=0;i<20;i++){
		var mapObjCol = [];
		for(var j=0;j<15;j++){
			if(j==0||i==0||i==19||j==14){
				mapObjCol[j] = new mapObject('Images/undistroyable box.png',i*40,j*40, false);
			}
			else
			{
				if(i%2==0&&j%2==0){
					mapObjCol[j] = new mapObject('Images/undistroyable box.png',i*40,j*40, false);
				}
				else{
					mapObjCol[j] = 0;
				}
			}
		}
		mapObjects[i]=mapObjCol;
	}
	var hero = new Hero(40, 40, 40);
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
			case 97: {
				hero.clearPos();
				hero.moveLeft();
				break;
			}
			case 119: {
				hero.clearPos();
				hero.moveUp();
				break;
			}
			case 100: {
				hero.clearPos();
				hero.moveRight();
				break;
			}
			case 115: {
				hero.clearPos();
				hero.moveDown();
				break;
			}
		}
	});
	terrain.draw(ctx);
	for(var i in mapObjects)
		for(var j in mapObjects[i])
			if(mapObjects[i][j]!=0)
				mapObjects[i][j].draw(ctx);
	function animationFrame(){
		hero.draw(ctx);
		requestAnimationFrame(animationFrame);
	}
	requestAnimationFrame(animationFrame);
}())