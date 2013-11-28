(function() {
	var canvas = document.getElementById('canvas-box'),
		ctx = canvas.getContext("2d");

	function Terrain(x, y){
		this.draw = function(ctx){
			var img = new Image();
			img.onload = function(){
				for(var i = 0; i < 15; i++){
					for(var ii = 0; ii < 21; ii++){
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
		canImove = 1;
		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, heroW, heroH);
			};
			heroimg.src = 'Images/super_ninja.png';
		}

		this.moveUp = function(){
			if(mapObjects[x/40][y/40 - 1].img == 'Images/Background.png' && canImove == 1){
			y -= speed;
			}
		}
		this.moveDown = function(){
			if(mapObjects[x/40][y/40 + 1].img == 'Images/Background.png' && canImove == 1){
			y += speed;
			}
		}
		this.moveLeft = function(){
			if(mapObjects[x/40 - 1][y/40].img == 'Images/Background.png' && canImove == 1){
				x -= speed;
			}
		}
		this.moveRight = function(){
			if(mapObjects[x/40 + 1][y/40].img == 'Images/Background.png' && canImove == 1){
			x += speed;
			}
		}
		this.fire = function(){
			var i = x/40;
			var j = y/40;
			mapObjects[i][j] = new mapObject('Images/Dynamite ready.png',i*40,j*40, false);
			setTimeout(function(){
				for(var k=0;k<3;k++)
				{
					if(j+k>=15){
						break;
					}
					if(mapObjects[i][j+k].img == 'Images/undistroyable box.png'){
						break;
					}
					if(mapObjects[i][j+k].img == 'Images/destroyable box.png'){
						mapObjects[i][j+k] = new mapObject('Images/fire_demo.png',i*40,(j+k)*40, false);
						break;
					}
					mapObjects[i][j+k] = new mapObject('Images/fire_demo.png',i*40,(j+k)*40, false);
				}
				for(var k=0;k<3;k++)
				{
					if(j-k<0){
						break;
					}
					if(mapObjects[i][j-k].img == 'Images/undistroyable box.png'){
						break;
					}
					if(mapObjects[i][j-k].img == 'Images/destroyable box.png'){
						mapObjects[i][j-k] = new mapObject('Images/fire_demo.png',i*40,(j-k)*40, false);
						break;
					}
					mapObjects[i][j-k] = new mapObject('Images/fire_demo.png',i*40,(j-k)*40, false);
				}
				for(var k=0;k<3;k++)
				{
					if(i+k>20){
						break;
					}
					if(mapObjects[i+k][j].img == 'Images/undistroyable box.png'){
						break;
					}
					if(mapObjects[i+k][j].img == 'Images/destroyable box.png'){
						mapObjects[i+k][j] = new mapObject('Images/fire_demo.png',(i+k)*40,j*40, false);
						break;
					}
					mapObjects[i+k][j] = new mapObject('Images/fire_demo.png',(i+k)*40,j*40, false);
				}
				for(var k=0;k<3;k++)
				{
					if(i-k<0){
						break;
					}
					if(mapObjects[i-k][j].img == 'Images/undistroyable box.png'){
						break;
					}
					if(mapObjects[i-k][j].img == 'Images/destroyable box.png'){
						mapObjects[i-k][j] = new mapObject('Images/fire_demo.png',(i-k)*40,j*40, false);
						break;
					}
					mapObjects[i-k][j] = new mapObject('Images/fire_demo.png',(i-k)*40,j*40, false);
				}
				mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
				setTimeout(function(){
						for(var k=0;k<3;k++){
							if(i-k>=0)
								if(mapObjects[i-k][j].img == 'Images/fire_demo.png')
									mapObjects[i-k][j] = new mapObject('Images/Background.png',(i-k)*40,j*40, false);
							if(i+k<=20)						
								if(mapObjects[i+k][j].img == 'Images/fire_demo.png')
									mapObjects[i+k][j] = new mapObject('Images/Background.png',(i+k)*40,j*40, false);
							if(j-k>=0)
								if(mapObjects[i][j-k].img == 'Images/fire_demo.png')
									mapObjects[i][j-k] = new mapObject('Images/Background.png',i*40,(j-k)*40, false);
							if(j+k<=14)	
								if(mapObjects[i][j+k].img == 'Images/fire_demo.png')
									mapObjects[i][j+k] = new mapObject('Images/Background.png',i*40,(j+k)*40, false);
						}
						canImove = 1;
						console.log('troll');
				}, 1000);
			}, 3000);
		}
		this.clearPos = function(pos){
			if(pos == "up"){
				if(mapObjects[x/40][y/40 - 1].img == 'Images/Background.png'){
					var bgimg = new Image();
					bgimg.onload = function(){
						ctx.drawImage(bgimg, x, y+40, 40, 40);
					}
					bgimg.src = 'Images/Background.png';
				}
			} else if (pos == "down") {	
				if(mapObjects[x/40][y/40 + 1].img == 'Images/Background.png'){
					var bgimg = new Image();
					bgimg.onload = function(){
						ctx.drawImage(bgimg, x, y-40, 40, 40);
					}
					bgimg.src = 'Images/Background.png';
				}
			} else if (pos == "left") {
				if(mapObjects[x/40 - 1][y/40].img == 'Images/Background.png'){
					var bgimg = new Image();
					bgimg.onload = function(){
						ctx.drawImage(bgimg, x+40, y, 40, 40);
					}
					bgimg.src = 'Images/Background.png';
				}
			} else {
				if(mapObjects[x/40 + 1][y/40].img == 'Images/Background.png'){
					var bgimg = new Image();
					bgimg.onload = function(){
						ctx.drawImage(bgimg, x-40, y, 40, 40);
					}
					bgimg.src = 'Images/Background.png';
				}
			}
		}
		this.amIHitted = function(i,j){
			if((i == x/40)&&(j == y/40)){
				canImove = 0;
			}
		}
	}
	function mapObject(img, x, y, destroyable){
		this.img = img;
		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, 40, 40);
			};
			heroimg.src = img;
		}
	}
	var mapObjects = [];
	for(var i=0;i<21;i++){
		var mapObjCol = [];
		for(var j=0;j<15;j++){
			if(j==0||i==0||i==20||j==14){
				mapObjCol[j] = new mapObject('Images/undistroyable box.png',i*40,j*40, false);
			}
			else
			{
				if(i%2==0&&j%2==0){
					mapObjCol[j] = new mapObject('Images/undistroyable box.png',i*40,j*40, false);
				}
				else{
					var random = Math.round(Math.random());
					if(random == 0 && (i > 2 || j > 2)){
						mapObjCol[j] = new mapObject('Images/destroyable box.png',i*40,j*40, true);
					}
					else{
						mapObjCol[j] = new mapObject('Images/Background.png',i*40,j*40, false);
					}

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
				hero.clearPos("left");
				hero.moveLeft();
				break;
			}
			case 38: {
				hero.clearPos("up");
				hero.moveUp();
				break;
			}
			case 39: {
				hero.clearPos("right");
				hero.moveRight();
				break;
			}
			case 40: {
				hero.clearPos("down");
				hero.moveDown();
				break;
			}
			case 97: {
				hero.clearPos("left");
				hero.moveLeft();
				break;
			}
			case 119: {
				hero.clearPos("up");
				hero.moveUp();
				break;
			}
			case 100: {
				hero.clearPos("right");
				hero.moveRight();
				break;
			}
			case 115: {
				hero.clearPos("down");
				hero.moveDown();
				break;
			}
			default : {
				hero.fire();
			}
		}
	});
	terrain.draw(ctx);
	function animationFrame(){
		for(var i in mapObjects){
			for(var j in mapObjects[i]){
					mapObjects[i][j].draw(ctx);
					if(mapObjects[i][j].img == 'Images/fire_demo.png')
					hero.amIHitted(i,j);
			}
		}	
		hero.draw(ctx);
		requestAnimationFrame(animationFrame);
	}
	requestAnimationFrame(animationFrame);
}())