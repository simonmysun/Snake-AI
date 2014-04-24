/*
Team 12
Author: 钱海龙
Version:0.0.0
Time:20140424 22:39
*/
function createThink(w,h) {
	var fourDir = [];
	for(var i = 0;i < 4;i++){
		fourDir[i] = [];
	}
	fourDir[0][0] = 0;
	fourDir[0][1] = -1;
	fourDir[0][2] = "up";

	fourDir[1][0] = 0;
	fourDir[1][1] = 1;
	fourDir[1][2] = "down";

	fourDir[2][0] = -1;
	fourDir[2][1] = 0;
	fourDir[2][2] = "left";

	fourDir[3][0] = 1;
	fourDir[3][1] = 0;
	fourDir[3][2] = "right";

	function solu(w){
		return function(o,p){
			var a = o[w];
			var b = p[w];
			return a < b ? -1 : 1;
		}
	}
	function ran(){
		var a = Math.random();
		var b = Math.random();
		return a < b ? -1 : 1;
	}
	var headtofoodmap = [];
	var headtotailmap = [];
    var headtofoodqueue;
	var foodtotailqueue;

	var headtofoodflag;
	var headtotailflag;

	var virtulgame;
	var virtuldir;
	var minDir;
	var rand;
	
    for(var x = 0; x < w; x ++ ) {
        headtofoodmap[x] = [];
        for(var y = 0; y < h; y ++ ) {
            headtofoodmap[x][y] = 99999999;
        }
    }
	for(var x = 0;x < w;x ++ ){
		headtotailmap[x] = [];
		for(var y = 0;y < h;y++){
			headtotailmap[x][y] = 99999999;
		}
	}


	function legal(x, y){
   		if(x >= w || x <= -1 || y >= h || y <= -1) {
        	return false;
    	}else {
        	return true;
    	}
	}
	function checkCollision(x, y, s) {
		var len = s.length;
    	for(var i = 0;i < len - 1;i++){
        	if(x == s[i].x && y == s[i].y) {
        	    return false;
            }
        }
        return true;
	}
	function checkCover(x, y, s){
		var len = s.length;
		for(var i = 1;i < len - 1;i++){
			if(x == s[i].x && y == s[i].y){
				return false;
			}
		}
		return true;
	}
	function headtofoodbfs(loc, game){
		headtofoodqueue = [];
        headtofoodqueue.push({
            x: loc.x
            ,y: loc.y
            ,dist: 0
        });
   	    for(var x = 0; x < w; x ++ ) {
 	       headtofoodmap[x] = [];
 	       for(var y = 0; y < h; y ++ ) {
 	           headtofoodmap[x][y] = 99999999;
 	       }
 	    }
		headtofoodmap[loc.x][loc.y] = 0;
		while(headtofoodqueue.length > 0){
			loc = headtofoodqueue.shift();
			for(var i = 0;i < 4;i++){
				var temp = [];
				temp = {
					x: loc.x + fourDir[i][0]
					,y: loc.y + fourDir[i][1]
				}
				if(legal(temp.x, temp.y) && checkCover(temp.x, temp.y, game.snake)){
					if(headtofoodmap[temp.x][temp.y] == 99999999){
						headtofoodmap[temp.x][temp.y] = loc.dist + 1;
						headtofoodqueue.push({
							x: temp.x
							,y: temp.y
							,dist: loc.dist + 1
						})
					}
				}
			}
		}
	}
	function virtul(game){
		virtulgame = deepClone(game);
		virtuldir = "right";
		var flag = true;
		var recode = false;

		while(flag){
			var headx = virtulgame.snake[0].x;
			var heady = virtulgame.snake[0].y;
		
			for(var i = 0;i < 4;i++){
				var temp = [];
				temp = {
					x: headx + fourDir[i][0]
					,y: heady + fourDir[i][1]
				}
				if(checkCollision(temp.x, temp.y, virtulgame.snake) && legal(temp.x, temp.y)){
					if(headtofoodmap[temp.x][temp.y] < headtofoodmap[headx][heady]){
						virtulgame.snake.unshift({
							x: temp.x
							,y: temp.y
						});
						if(recode == false){
							recode = true;
							virtuldir = fourDir[i][2];
						}
						if(headtofoodmap[temp.x][temp.y] == 0){
							flag = false;
							break;
						}
						virtulgame.snake.pop();
						i = 0;
						break;
					}
				}
			}
		}
		minDir = virtuldir;
		headtofoodbfs(virtulgame.snake[virtulgame.snake.length - 1], virtulgame);
		if(headtofoodmap[virtulgame.snake[0].x][virtulgame.snake[0].y] == 99999999){
			return false;
		}
		return true;
	}
	function full(game){
		var maxStep = -1;
		var head = game.snake[0];

		for(var i = 0;i < 4;i++){
			var temp = [];
			temp = {
				x: head.x + fourDir[i][0]
				,y: head.y + fourDir[i][1]
			}
			if(legal(temp.x, temp.y) && checkCollision(temp.x, temp.y, game.snake)){
				virtulgame = deepClone(game);
				virtulgame.snake.unshift({
					x: temp.x
					,y: temp.y
				});
				headtofoodbfs(virtulgame.snake[virtulgame.snake.length - 2], virtulgame);
				if(headtofoodmap[temp.x][temp.y] > maxStep && headtofoodmap[temp.x][temp.y] < 99999999){
					maxStep = headtofoodmap[temp.x][temp.y];
					minDir = fourDir[i][2];
				}
			}
		}
	}
	return function(game){
		var head = game.snake[0];
		var food = game.food[0];
		headtotailflag = false;
		minDir = "right";

		if(game.snake.length < 190){
			headtofoodbfs(food, game);
			if(headtofoodmap[head.x][head.y] != 99999999){
				headtotailflag = virtul(game);
					if(headtotailflag){
						return minDir;
					}
				}
			full(game);
		}else{
			full(game);
		}
		return minDir;
	}
}

