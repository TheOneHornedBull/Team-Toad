(function() {
	var canvas = document.getElementById('canvas-box'),
		ctx = canvas.getContext("2d");
	var isAnimationOn = true;
	var endOfGame = false;
	//use that array to pause explosions
	var fire = [];
	canvas.style.display = 'none';
	document.getElementById("pause").style.display = 'none';
	function getRandomNum (min, max) {
    return Math.round(Math.random() * (max - min) + min);
	}
	function Hero(x, y, speed, name, img) {
		this.numOfDynamites = 1;
		this.fireRange = 3;
		this.name = name;
		heroH = 40;
		heroW = 40;
		this.canImove = 1;
		this.lives = 4;
		this.x = x;
		this.y = y;
		this.explosionNumber = 0;
		//amIHit added in order ot avoid multiple hitting by the same dynamite
		this.amIHit = 0;
		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, heroW, heroH);
			};
			heroimg.src = img;
		}
		this.moveUp = function(){
			///onsole.log('moveUp');
			if(mapObjects[x/40][y/40 - 1].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40][y/40 - 1].img != 'Images/destroyable box.png' && mapObjects[x/40][y/40 -1].img != 'Images/Dynamite ready.png' && mapObjects[x/40][y/40 -1].img != 'Images/Dynamite ready.png'){
			this.canImove = 0;
			y -= speed;
			this.y -= speed;
			}
		}
		this.moveDown = function(){
			//console.log('moveDown');
			if(mapObjects[x/40][y/40 + 1].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40][y/40 + 1].img != 'Images/destroyable box.png' && mapObjects[x/40][y/40 +1].img != 'Images/Dynamite ready.png' && mapObjects[x/40][y/40 +1].img != 'Images/live.png'){
			this.canImove = 0;
			y += speed;
			this.y += speed;
			}
		}
		this.moveLeft = function(){
			//console.log('moveLeft');
			if(mapObjects[x/40 -1][y/40].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40 -1][y/40].img != 'Images/destroyable box.png' && mapObjects[x/40 -1][y/40].img != 'Images/Dynamite ready.png' && mapObjects[x/40 -1][y/40].img != 'Images/live.png'){
				this.canImove = 0;
				x -= speed;
				this.x -= speed;
			}
		}
		this.moveRight = function(){
			//console.log('moveRight');
			if(mapObjects[x/40 +1][y/40].img != 'Images/undistroyable box.png' && this.canImove == 1 && mapObjects[x/40 +1][y/40].img != 'Images/destroyable box.png' && mapObjects[x/40 +1][y/40].img != 'Images/Dynamite ready.png' && mapObjects[x/40 +1][y/40].img != 'Images/live.png'){
			this.canImove = 0;
			x += speed;
			this.x += speed;
			}
		}
		this.fire = function(){
			//create dynamite if one doesnt already exist at this squere
			var i = this.x/40;
			var j = this.y/40;
			if(this.numOfDynamites > 0){
				explosion(i,j,this.fireRange,this.name,this.explosionNumber);
				this.numOfDynamites -= 1;
				//set that nth explosion is fired
				this.explosionNumber += 1;
				fire.push(false);
			}
		}
		this.clearPos = function(pos){
			//console.log('clean' + pos);
			if(pos == "up"){
				mapChange(x/40,y/40 + 1);
			} else if (pos == "down") {
						mapChange(x/40,y/40 - 1);
			} else if (pos == "left") {
					mapChange(x/40 + 1,y/40);
			} else {
					mapChange(x/40 - 1,y/40);
			}
			this.canImove = 1;
		}
		this.amIHitted = function(i,j){
			//cannot move if hitted while the explosion is active
			var lives = this.lives;
			if((i == x/40)&&(j == y/40) && this.amIHit == 0){
				this.canImove = 0;
				this.amIHit = 1;
				if(this.name == "hero"){
					mapObjects[lives-1][14] = new mapObject('Images/undistroyable box.png',(lives-1)*40,14*40, false);
					mapChange(lives-1,14);
				}
				if(this.name == "comp"){
					mapObjects[21-lives][14] = new mapObject('Images/undistroyable box.png',(21-lives)*40,14*40, false);
					mapChange(21-lives,14);
				}
				lives-=1;
				if(lives==0){
					//will have to do sth else but for now is ok
					alert('Player ' + this.name + ' lost the game!');
					endOfGame = true;
					isAnimationOn = false;
				}
				this.lives = lives;
			}
		}
		this.increaseFireRange = function(){
				this.fireRange += 1;
		}
		this.increaseDynamites = function(){
				this.numOfDynamites += 1;
		}
		this.increaseLives = function(){
				//max number of lives - 7
				if(this.lives < 7)
					this.lives += 1;
		}
	}
	function mapChange(i,j){
		mapObjects[i][j].draw(ctx);
	}
	function explosion1(i,j,fireRange,name,number){
		setTimeout(function(){
				//if paused wait until unpaused
				if(!isAnimationOn){
						setTimeout(explosion1(i,j,fireRange,name,number),100);
				}
				else{
					fire[number] = true;
					//middle fire
					mapObjects[i][j] = new mapObject('Images/fire_c.png',i*40,j*40, false);
					mapChange(i,j);
					//fire down
					for(var k=1;k<fireRange;k++)
					{
						if(j+k>=15){
							break;
						}
						if(mapObjects[i][j+k].img == 'Images/undistroyable box.png' || mapObjects[i][j+k].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i][j+k].img == 'Images/destroyable box.png'){
							mapObjects[i][j+k] = new mapObject('Images/fire_v.png',i*40,(j+k)*40, true);
							mapChange(i,j+k);
							break;
						}
						if(mapObjects[i][j+k].img != 'Images/Dynamite ready.png'){
							mapObjects[i][j+k] = new mapObject('Images/fire_v.png',i*40,(j+k)*40, false);
							mapChange(i,j+k);
						}
					}
					//fire up
					for(var k=1;k<fireRange;k++)
					{
						if(j-k<0){
							break;
						}
						if(mapObjects[i][j-k].img == 'Images/undistroyable box.png' || mapObjects[i][j-k].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i][j-k].img == 'Images/destroyable box.png'){
							mapObjects[i][j-k] = new mapObject('Images/fire_v.png',i*40,(j-k)*40, true);
							mapChange(i,j-k);
							break;
						}
						if(mapObjects[i][j-k].img != 'Images/Dynamite ready.png'){
							mapObjects[i][j-k] = new mapObject('Images/fire_v.png',i*40,(j-k)*40, false);
							mapChange(i,j-k);
						}
					}
					//fire right
					for(var k=1;k<fireRange;k++)
					{
						if(i+k>20){
							break;
						}
						if(mapObjects[i+k][j].img == 'Images/undistroyable box.png' || mapObjects[i+k][j].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i+k][j].img == 'Images/destroyable box.png'){
							mapObjects[i+k][j] = new mapObject('Images/fire_h.png',(i+k)*40,j*40, true);
							mapChange(i+k,j);
							break;
						}
						if(mapObjects[i+k][j].img != 'Images/Dynamite ready.png'){
							mapObjects[i+k][j] = new mapObject('Images/fire_h.png',(i+k)*40,j*40, false);
							mapChange(i+k,j);
						}
					}
					//fire left
					for(var k=1;k<fireRange;k++)
					{
						if(i-k<0){
							break;
						}
						if(mapObjects[i-k][j].img == 'Images/undistroyable box.png' || mapObjects[i-k][j].img == 'Images/live.png'){
							break;
						}
						if(mapObjects[i-k][j].img == 'Images/destroyable box.png'){
							mapObjects[i-k][j] = new mapObject('Images/fire_h.png',(i-k)*40,j*40, true);
							mapChange(i-k,j);
							break;
						}
						if(mapObjects[i-k][j].img != 'Images/Dynamite ready.png'){
							mapObjects[i-k][j] = new mapObject('Images/fire_h.png',(i-k)*40,j*40, false);
							mapChange(i-k,j);
						}
					}
					//amount of your dynamites increases by 1
					if(name == "hero")
						hero.numOfDynamites += 1;
					if(name == "comp")
						compHero.numOfDynamites += 1;
				}
							
		}, 3000);
	}
	function explosion2(i,j,fireRange,name,number){
		setTimeout(function(){
					//if paused wait until unpaused and wait fot the first part to be done (here the array fire[] does its main job :D)
					if(!isAnimationOn || !fire[number]){
						setTimeout(explosion2(i,j,fireRange,name,number),100);
				}
				else{
					fire[number] = false;

		console.log(fire[number]);
		console.log(number);
					//clear up, down, left and right
					for(var k=1;k<fireRange;k++){
						if(i-k>=0)
							if(mapObjects[i-k][j].img == 'Images/fire_h.png'){
								//33% chance to give a buff
								var isThereBuff = getRandomNum(1,9);
								if(isThereBuff <= 3 && mapObjects[i-k][j].destroyable == true){
									//50% chnace to transform the live buff into another
									var changeLive =getRandomNum(0,1);
									if(changeLive == 1 && isThereBuff == 2){
										while(isThereBuff == 2)
											isThereBuff = getRandomNum(1,3);
									}
									var buff = new Buff('Images/buff' + isThereBuff + '.png',isThereBuff);
									mapObjects[i-k][j] = new mapObject(buff.img,(i-k)*40,j*40, false);
								}
								else
									mapObjects[i-k][j] = new mapObject('Images/Background.png',(i-k)*40,j*40, false);
								
								mapChange(i-k,j);
							}
						if(i+k<=20)						
							if(mapObjects[i+k][j].img == 'Images/fire_h.png'){
								//33% chance to give a buff
								var isThereBuff = getRandomNum(1,9);
								if(isThereBuff <= 3 && mapObjects[i+k][j].destroyable == true){
									//50% chnace to transform the live buff into another
									var changeLive =getRandomNum(0,1);
									if(changeLive == 1 && isThereBuff == 2){
										while(isThereBuff == 2)
											isThereBuff = getRandomNum(1,3);
									}
									var buff = new Buff('Images/buff' + isThereBuff + '.png',isThereBuff);
									mapObjects[i+k][j] = new mapObject(buff.img,(i+k)*40,j*40, false);
								}
								else
									mapObjects[i+k][j] = new mapObject('Images/Background.png',(i+k)*40,j*40, false);
								mapChange(i+k,j);
							}
						if(j-k>=0)
							if(mapObjects[i][j-k].img == 'Images/fire_v.png'){
								//33% chance to give a buff
								var isThereBuff = getRandomNum(1,9);
								if(isThereBuff <= 3 && mapObjects[i][j-k].destroyable == true){
									//50% chnace to transform the live buff into another
									var changeLive =getRandomNum(0,1);
									if(changeLive == 1 && isThereBuff == 2){
										while(isThereBuff == 2)
											isThereBuff = getRandomNum(1,3);
									}
									var buff = new Buff('Images/buff' + isThereBuff + '.png',isThereBuff);
									mapObjects[i][j-k] = new mapObject(buff.img,i*40,(j-k)*40, false);
								}
								else
									mapObjects[i][j-k] = new mapObject('Images/Background.png',i*40,(j-k)*40, false);
								mapChange(i,j-k);
							}
						if(j+k<=14)	
							if(mapObjects[i][j+k].img == 'Images/fire_v.png'){
								//33% chance to give a buff
								var isThereBuff = getRandomNum(1,9);
								if(isThereBuff <= 3 && mapObjects[i][j+k].destroyable == true){
									//50% chnace to transform the live buff into another
									var changeLive =getRandomNum(0,1);
									if(changeLive == 1 && isThereBuff == 2){
										while(isThereBuff == 2)
											isThereBuff = getRandomNum(1,3);
									}
									var buff = new Buff('Images/buff' + isThereBuff + '.png',isThereBuff);
									mapObjects[i][j+k] = new mapObject(buff.img,i*40,(j+k)*40, false);
								}
								else
									mapObjects[i][j+k] = new mapObject('Images/Background.png',i*40,(j+k)*40, false);
								mapChange(i,j+k);
							}
					}
					//clear middle
					mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
					mapChange(i,j);
					//explosion edned so if someone was hit, he can move again
					for(var k=1;k<fireRange;k++){
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
			}, 4000);
	}
	function explosion(i,j,fireRange,name,number){
		//got it as different functions to add the pause functionality 
		if(mapObjects[i][j].img != 'Images/Dynamite ready.png'){
			mapObjects[i][j] = new mapObject('Images/Dynamite ready.png',i*40,j*40, false);
			mapChange(i,j);
			// 3 secs after creation of the dynamite--> explosion
	 		explosion1(i,j,fireRange,name,number);
	 		//one second after the explosion the fire is cleared (4 seconds after the creation of the dynamite)
	 		explosion2(i,j,fireRange,name,number);
		}
	}
	function mapObject(img, x, y, destroyable){
		this.img = img;
		this.destroyable = destroyable;
		this.draw = function(ctx) {
			var heroimg = new Image();
			heroimg.onload = function(){
				ctx.drawImage(heroimg, x, y, 40, 40);
			};
			heroimg.src = img;
		}
	}
	function Buff(img,type){
		this.img = img;
		this.type = type;
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
	var hero = new Hero(40, 40, 40, "hero" ,'Images/super_ninja.png');
	window.addEventListener("keydown", function(e) {
		if(isAnimationOn){
			switch(e.keyCode){
				case 37: {
					if(mapObjects[hero.x/40 - 1][hero.y/40].img != 'Images/destroyable box.png' && mapObjects[hero.x/40 - 1][hero.y/40].img != 'Images/undistroyable box.png' && mapObjects[hero.x/40 - 1][hero.y/40].img != 'Images/live.png' && mapObjects[hero.x/40 - 1][hero.y/40].img != 'Images/Dynamite ready.png'){
						hero.moveLeft();
						hero.clearPos("left");
					}
					break;
				}
				case 38: {
					if(mapObjects[hero.x/40][hero.y/40 - 1].img != 'Images/destroyable box.png' && mapObjects[hero.x/40][hero.y/40 - 1].img != 'Images/undistroyable box.png' && mapObjects[hero.x/40][hero.y/40 - 1].img != 'Images/live.png' && mapObjects[hero.x/40][hero.y/40 - 1].img != 'Images/Dynamite ready.png'){
						hero.moveUp();
						hero.clearPos("up");
					}
					break;
				}
				case 40: {
					if(mapObjects[hero.x/40][hero.y/40 + 1].img != 'Images/destroyable box.png' && mapObjects[hero.x/40][hero.y/40 + 1].img != 'Images/undistroyable box.png' && mapObjects[hero.x/40][hero.y/40 + 1].img != 'Images/live.png' && mapObjects[hero.x/40][hero.y/40 + 1].img != 'Images/Dynamite ready.png'){
						hero.moveDown();
						hero.clearPos("down");
					}
					break;
				}
				case 39: {
					if(mapObjects[hero.x/40 + 1][hero.y/40].img != 'Images/destroyable box.png' && mapObjects[hero.x/40 + 1][hero.y/40].img != 'Images/undistroyable box.png' && mapObjects[hero.x/40 + 1][hero.y/40].img != 'Images/live.png' && mapObjects[hero.x/40 + 1][hero.y/40].img != 'Images/Dynamite ready.png'){
						hero.moveRight();
						hero.clearPos("right");
					}
					break;
				}
				case 32 : {
					hero.fire(ctx);
				}
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
	var compHero = new Hero(760,520,40,"comp" ,'Images/super_ninja2.png');
	var compHeroMove = selectPosition(compHero);
	var compHerox = compHero.x/40;
	var compHeroy = compHero.y/40;
	var sec = 1000;
	for(var i in mapObjects)
			for(var j in mapObjects[i])
					mapObjects[i][j].draw(ctx);
	function animationFrame(){
		for(var i in mapObjects){
			for(var j in mapObjects[i]){
					//check if hitted
					if(mapObjects[i][j].img == 'Images/fire_v.png' || mapObjects[i][j].img == 'Images/fire_h.png' || mapObjects[i][j].img == 'Images/fire_c.png'){
						hero.amIHitted(i,j);
						compHero.amIHitted(i,j);
					}
					//check if dynamite is taken
					if(mapObjects[i][j].img == 'Images/buff1.png'){
						if(hero.x == i*40 && hero.y == j*40){
							hero.increaseDynamites();
							mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
							mapChange(i,j);
						}
						if(compHero.x == i*40 && compHero.y == j*40){
							compHero.increaseDynamites();
							mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
							mapChange(i,j);
						}
					}
					//check if live is taken
					if(mapObjects[i][j].img == 'Images/buff2.png'){
						if(hero.x == i*40 && hero.y == j*40){
							hero.increaseLives();
							mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
							mapChange(i,j);
							//add live to the map
							mapObjects[hero.lives - 1][14] = new mapObject('Images/live.png',(hero.lives - 1)*40,14*40, false);
							mapChange(hero.lives - 1,14);
						}
						if(compHero.x == i*40 && compHero.y == j*40){
							compHero.increaseLives();
							mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
							mapChange(i,j);
							//add live to the map
							mapObjects[21-compHero.lives][14] = new mapObject('Images/live.png',(21-compHero.lives)*40,14*40, false);
							mapChange(21-compHero.lives,14);
						}
					}
					//check if fire buff is taken
					if(mapObjects[i][j].img == 'Images/buff3.png'){
						if(hero.x == i*40 && hero.y == j*40){
							hero.increaseFireRange();
							mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
							mapChange(i,j);
						}
						if(compHero.x == i*40 && compHero.y == j*40){
							compHero.increaseFireRange();
							mapObjects[i][j] = new mapObject('Images/Background.png',i*40,j*40, false);
							mapChange(i,j);	
						}
					}
			}
		}	
		hero.draw(ctx);
		compHero.draw(ctx);
		setTimeout(function(){
			compHerox = compHero.x/40;
			compHeroy = compHero.y/40;
			compHeroMove = selectPosition(compHero);
			if(isAnimationOn){
				if(compHeroMove == 1){
					compHero.moveUp();
					compHero.clearPos("up");
				}
				if(compHeroMove == 2){
					compHero.moveLeft();
					compHero.clearPos("left");
				}
				if(compHeroMove == 3){
					compHero.moveDown();
					compHero.clearPos("down");
				}
				if(compHeroMove == 4){
					compHero.moveRight();
					compHero.clearPos("right");
				}
			}
		},sec);
		sec += 500;
		if(isAnimationOn){
			requestAnimationFrame(animationFrame);
		}
	}
	function onButtonStartGame() {
		if(!endOfGame){
			isAnimationOn = true;
			canvas.style.display = 'block';
			document.getElementById("pause").style.display = '';
			requestAnimationFrame(animationFrame);
		}
	}

	function onButtonStopGame() {
		isAnimationOn = false;
	}
	document.getElementById("play")
		.addEventListener("click", onButtonStartGame);
	document.getElementById("pause")
		.addEventListener("click", onButtonStopGame);
}())