(function() {
	var canvas = document.getElementById('canvas-box'),
		ctx = canvas.getContext("2d");
	function getRandomNum (min, max) {
    return Math.round(Math.random() * (max - min) + min);
	}
	var canImove1 = 1;
	var amIHit1 = 0;
	function Hero(x, y, speed, name) {
		this.name = name;
		heroH = 40;
		heroW = 40;
		this.canImove = 1;
		this.lives = 4;
		this.x = x;
		this.y = y;
		//amIHit added in order ot avoid multiple hitting by the same dynamite
		this.amIHit = 0;
		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, heroW, heroH);
			};
			heroimg.src = 'Images/super_ninja.png';
		}
		this.moveUp = function(){
			if(mapObjects[x/40][y/40 - 1].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40][y/40 - 1].img != 'Images/destroyable box.png' && mapObjects[x/40][y/40 -1].img != 'Images/Dynamite ready.png' && mapObjects[x/40][y/40 -1].img != 'Images/Dynamite ready.png'){
			y -= speed;
			this.y -= speed;
			}
		}
		this.moveDown = function(){
			if(mapObjects[x/40][y/40 + 1].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40][y/40 + 1].img != 'Images/destroyable box.png' && mapObjects[x/40][y/40 +1].img != 'Images/Dynamite ready.png' && mapObjects[x/40][y/40 +1].img != 'Images/live.png'){
			y += speed;
			this.y += speed;
			}
		}
		this.moveLeft = function(){
			if(mapObjects[x/40 -1][y/40].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40 -1][y/40].img != 'Images/destroyable box.png' && mapObjects[x/40 -1][y/40].img != 'Images/Dynamite ready.png' && mapObjects[x/40 -1][y/40].img != 'Images/live.png'){
				x -= speed;
				this.x -= speed;
			}
		}
		this.moveRight = function(){
			if(mapObjects[x/40 +1][y/40].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40 +1][y/40].img != 'Images/destroyable box.png' && mapObjects[x/40 +1][y/40].img != 'Images/Dynamite ready.png' && mapObjects[x/40 +1][y/40].img != 'Images/live.png'){
			x += speed;
			this.x += speed;
			}
		}
		this.fire = function(ctx){
			//create dynamite if one doesnt already exist at this squere
			var i = this.x/40;
			var j = this.y/40;
			if(mapObjects[i][j].img != 'Images/Dynamite ready.png'){
				mapObjects[i][j] = new mapObject('Images/Dynamite ready.png',i*40,j*40, false);
				// 3 secs after creation --> explosion
				setTimeout(function(){
					mapObjects[i][j] = new mapObject('Images/fire_c.png',i*40,j*40, false);
					for(var k=1;k<3;k++)
					{
						if(j+k>=15){
							break;
						}
						if(mapObjects[i][j+k].img == 'Images/undistroyable box.png' || mapObjects[i][j+k].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i][j+k].img == 'Images/destroyable box.png'){
							mapObjects[i][j+k] = new mapObject('Images/fire_v.png',i*40,(j+k)*40, false);
							break;
						}
						mapObjects[i][j+k] = new mapObject('Images/fire_v.png',i*40,(j+k)*40, false);
					}
					for(var k=1;k<3;k++)
					{
						if(j-k<0){
							break;
						}
						if(mapObjects[i][j-k].img == 'Images/undistroyable box.png' || mapObjects[i][j-k].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i][j-k].img == 'Images/destroyable box.png'){
							mapObjects[i][j-k] = new mapObject('Images/fire_v.png',i*40,(j-k)*40, false);
							break;
						}
						mapObjects[i][j-k] = new mapObject('Images/fire_v.png',i*40,(j-k)*40, false);
					}
					for(var k=1;k<3;k++)
					{
						if(i+k>20){
							break;
						}
						if(mapObjects[i+k][j].img == 'Images/undistroyable box.png' || mapObjects[i+k][j].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i+k][j].img == 'Images/destroyable box.png'){
							mapObjects[i+k][j] = new mapObject('Images/fire_h.png',(i+k)*40,j*40, false);
							break;
						}
						mapObjects[i+k][j] = new mapObject('Images/fire_h.png',(i+k)*40,j*40, false);
					}
					for(var k=1;k<3;k++)
					{
						if(i-k<0){
							break;
						}
						if(mapObjects[i-k][j].img == 'Images/undistroyable box.png' || mapObjects[i-k][j].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i-k][j].img == 'Images/destroyable box.png'){
							mapObjects[i-k][j] = new mapObject('Images/fire_h.png',(i-k)*40,j*40, false);
							break;
						}
						mapObjects[i-k][j] = new mapObject('Images/fire_h.png',(i-k)*40,j*40, false);
					}
				}, 3000);
				//one second after creation the fire is cleared
				var _this = this;
				setTimeout(function(){
						for(var k=1;k<3;k++){
							if(i-k>=0)
								if(mapObjects[i-k][j].img == 'Images/fire_h.png')
									mapObjects[i-k][j] = new mapObject('Images/Background.png',(i-k)*40,j*40, false);
							if(i+k<=20)						
								if(mapObjects[i+k][j].img == 'Images/fire_h.png')
									mapObjects[i+k][j] = new mapObject('Images/Background.png',(i+k)*40,j*40, false);
							if(j-k>=0)
								if(mapObjects[i][j-k].img == 'Images/fire_v.png')
									mapObjects[i][j-k] = new mapObject('Images/Background.png',i*40,(j-k)*40, false);
							if(j+k<=14)	
								if(mapObjects[i][j+k].img == 'Images/fire_v.png')
									mapObjects[i][j+k] = new mapObject('Images/Background.png',i*40,(j+k)*40, false);
						}
						mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
						//explosion edned so if you were hit, now you can move again
						endOfExplosion(i,j);
				}, 4000);
			}
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
			//cannot move if hitted while the explosion is active
			var lives = this.lives;
			if((i == x/40)&&(j == y/40) && this.amIHit == 0){
				this.canImove = 0;
				this.amIHit = 1;
				if(this.name == "hero")
					mapObjects[lives-1][14] = new mapObject('Images/undistroyable box.png',(lives-1)*40,14*40, false);
				if(this.name == "comp")
					mapObjects[21-lives][14] = new mapObject('Images/undistroyable box.png',(21-lives)*40,14*40, false);
				lives-=1;
				if(lives==0)
					//will have to do sth else but for now is ok
					alert('Player ' + this.name + ' lost the game!');
				this.lives = lives;
			}
		}
	}
	function endOfExplosion(i,j){
		for(var k=1;k<3;k++){
			console.log('Im in !!!');
							if(i-k>=0){
								if((i-k == hero.x/40 && j == hero.y/40)){
									hero.canImove = 1;
									hero.amIHit = 0;
								}
								if((i-k == compHero.x/40 && j == compHero.y/40)){
									compHero.canImove = 1;
									compHero.amIHit = 0;
								}
							}
							if(i+k<=20){						
								if((i+k == hero.x/40 && j == hero.y/40)){
									hero.canImove = 1;
									hero.amIHit = 0;
								}
								if((i+k == compHero.x/40 && j == compHero.y/40)){
									compHero.canImove = 1;
									compHero.amIHit = 0;
								}
							}
							if(j-k>=0){
								if((i == hero.x/40 && j-k == hero.y/40)){
									hero.canImove = 1;
									hero.amIHit = 0;
								}
								if((i == compHero.x/40 && j-k == compHero.y/40)){
									compHero.canImove = 1;
									compHero.amIHit = 0;
								}
							}
							if(j+k<=14){	
								if((i == hero.x/40 && j+k == hero.y/40)){
									hero.canImove = 1;
									hero.amIHit = 0;
								}
								if((i == compHero.x/40 && j+k == compHero.y/40)){
									compHero.canImove = 1;
									compHero.amIHit = 0;
								}
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
			if((i<4 && j == 14) || (j==14 && i>16)){
				mapObjCol[j] = new mapObject('Images/live.png',i*40,j*40, false);
			}
			else {
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
						if(random == 0 && (i > 2 || j > 2) && (i < 18 || j < 12)){
							mapObjCol[j] = new mapObject('Images/destroyable box.png',i*40,j*40, true);
						}
						else{
							mapObjCol[j] = new mapObject('Images/Background.png',i*40,j*40, false);
						}

					}
				}
			}
		}
		mapObjects[i]=mapObjCol;
	}
	var hero = new Hero(40, 40, 40, "hero");
	window.addEventListener("keydown", function(e) {
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
			case 32 : {
				hero.fire(ctx);
			}
		}
	});
	function selectPosition(compHero){
		var freePositions = [1,1,1,1];
		compHero.x = compHero.x/40;
		compHero.y = compHero.y/40;
		if(mapObjects[compHero.x][compHero.y - 1].img == 'Images/undistroyable box.png' || mapObjects[compHero.x][compHero.y - 1].img == 'Images/destroyable box.png' || mapObjects[compHero.x][compHero.y - 1].img == 'Images/Dynamite ready.png' || mapObjects[compHero.x][compHero.y - 1].img == 'Images/live.png')
			freePositions[0] = 0;
		if(mapObjects[compHero.x][compHero.y + 1].img == 'Images/undistroyable box.png' || mapObjects[compHero.x][compHero.y + 1].img == 'Images/destroyable box.png' || mapObjects[compHero.x][compHero.y + 1].img == 'Images/Dynamite ready.png' || mapObjects[compHero.x][compHero.y + 1].img == 'Images/live.png')
			freePositions[2] = 0;
		if(mapObjects[compHero.x - 1][compHero.y].img == 'Images/undistroyable box.png' || mapObjects[compHero.x - 1][compHero.y].img == 'Images/destroyable box.png' || mapObjects[compHero.x - 1][compHero.y].img == 'Images/Dynamite ready.png' || mapObjects[compHero.x - 1][compHero.y].img == 'Images/live.png')
			freePositions[1] = 0;
		if(mapObjects[compHero.x + 1][compHero.y].img == 'Images/undistroyable box.png' || mapObjects[compHero.x + 1][compHero.y].img == 'Images/destroyable box.png' || mapObjects[compHero.x + 1][compHero.y].img == 'Images/Dynamite ready.png' || mapObjects[compHero.x + 1][compHero.y].img == 'Images/live.png')
			freePositions[3] = 0;
		var result = getRandomNum(0,3);
		compHero.x = compHero.x*40;
		compHero.y = compHero.y*40;
		if(freePositions[0] == 0 && freePositions[1] == 0 && freePositions[2] == 0 && freePositions[3] == 0 )
			return 0;
		while(freePositions[result] == 0)
			result = getRandomNum(0,3);
		//compHero.fire();
		return (result+1);
	}
	var compHero = new Hero(760,520,40,"comp");
	var compHeroMove = selectPosition(compHero);
	var compHerox = compHero.x/40;
	var compHeroy = compHero.y/40;
	var sec = 1000;
	function animationFrame(){
		for(var i in mapObjects){
			for(var j in mapObjects[i]){
					mapObjects[i][j].draw(ctx);
					//check if hitted
					if(mapObjects[i][j].img == 'Images/fire_v.png' || mapObjects[i][j].img == 'Images/fire_h.png' || mapObjects[i][j].img == 'Images/fire_c.png'){
						hero.amIHitted(i,j);
						compHero.amIHitted(i,j);
					}
			}
		}	
		hero.draw(ctx);
		compHero.draw(ctx);
		setTimeout(function(){
			compHerox = compHero.x/40;
			compHeroy = compHero.y/40;
			if(compHeroMove == 0)
				compHeroMove = selectPosition(compHero);
			if(compHeroMove == 1 && (mapObjects[compHerox][compHeroy - 1].img == 'Images/undistroyable box.png' || mapObjects[compHerox][compHeroy - 1].img == 'Images/destroyable box.png' || mapObjects[compHerox][compHeroy - 1].img == 'Images/Dynamite ready.png' || mapObjects[compHerox][compHeroy - 1].img == 'Images/live.png'))
				compHeroMove = selectPosition(compHero);
			if(compHeroMove == 3 && (mapObjects[compHerox][compHeroy + 1].img == 'Images/undistroyable box.png' || mapObjects[compHerox][compHeroy + 1].img == 'Images/destroyable box.png' || mapObjects[compHerox][compHeroy + 1].img == 'Images/Dynamite ready.png' || mapObjects[compHerox][compHeroy + 1].img == 'Images/live.png'))
				compHeroMove = selectPosition(compHero);
			if(compHeroMove == 2 && (mapObjects[compHerox - 1][compHeroy].img == 'Images/undistroyable box.png' || mapObjects[compHerox - 1][compHeroy].img == 'Images/destroyable box.png' || mapObjects[compHerox - 1][compHeroy].img == 'Images/Dynamite ready.png' || mapObjects[compHerox - 1][compHeroy].img == 'Images/live.png'))
				compHeroMove = selectPosition(compHero);
			if(compHeroMove == 4 && (mapObjects[compHerox + 1][compHeroy].img == 'Images/undistroyable box.png' || mapObjects[compHerox + 1][compHeroy].img == 'Images/destroyable box.png' || mapObjects[compHerox + 1][compHeroy].img == 'Images/Dynamite ready.png' || mapObjects[compHerox + 1][compHeroy].img == 'Images/live.png'))
				compHeroMove = selectPosition(compHero);
			if(compHeroMove == 1){
				compHero.clearPos("up");
				compHero.moveUp();
			}
			if(compHeroMove == 2){
				compHero.clearPos("left");
				compHero.moveLeft();
			}
			if(compHeroMove == 3){
				compHero.clearPos("down");
				compHero.moveDown();
			}
			if(compHeroMove == 4){
				compHero.clearPos("right");
				compHero.moveRight();
			}
		},sec);
		sec += 500;
		requestAnimationFrame(animationFrame);
	}
	requestAnimationFrame(animationFrame);
}())