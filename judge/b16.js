function createThink(w,h){
	function initMG(start,end,game){
		var mg = [];
		for(var i=0; i<h; i++){
			mg[i] = [];
			for(var j=0; j<w; j++){
				if(i==end.y && j==end.x)
					mg[i][j]=0;
				else
					mg[i][j]=w*h;
			}
		}
		for(var i=1; i<game.snake.length-1; i++){
			var x = game.snake[i].x;
			var y = game.snake[i].y;
			mg[y][x] = -1;
		}
		return mg;
	}

	function createDPMG(mg,end){//构造路径深度图
		for(var tag=1, i=1; tag==1; i++){
			tag = 0;
			for(var l=0; l<=h-1; l++){
				for(var m=0; m<=w-1; m++){
					if(l==end.y && m==end.x || mg[l][m]==-1)
						continue;
					var temp = mg[l][m];
					if(l-1>=0 && mg[l-1][m]!=-1 && mg[l-1][m]<temp){
						temp = mg[l-1][m];
					}
					if(l+1<h && mg[l+1][m]!=-1 && mg[l+1][m]<temp){
						temp = mg[l+1][m];
					}
					if(m-1>=0 && mg[l][m-1]!=-1 && mg[l][m-1]<temp){
						temp = mg[l][m-1];
					}
					if(m+1<w && mg[l][m+1]!=-1 && mg[l][m+1]<temp){
						temp = mg[l][m+1];
					}
					if(mg[l][m]>temp+1){
						tag = 1;
						mg[l][m] = temp+1;
					}
				}
			}
		}
		return mg;
	}

	function createFuturePath(mg,game){//尝试去吃一个苹果，构造相应的路径尝试图
		start = game.snake[0];
		x = start.y;
		y = start.x;
		var snake = [];
		tail = game.snake[game.snake.length-1];
		var count = mg[x][y];
		var i;
		
		
		for(i=0; i<count; i++){
			snake[i] = deepClone(game.snake[0]);
			if(y-1>=0 && mg[x][y-1]==mg[x][y]-1){
				mg[x][y]=-1;
				snake[i].x = y;
				snake[i].y = x;
				y--;
				
			}
			else if(x-1>=0 && mg[x-1][y]==mg[x][y]-1){
				mg[x][y]=-1;
				snake[i].x = y;
				snake[i].y = x;
				x--;
			}
			else if(x+1<h && mg[x+1][y]==mg[x][y]-1){
				mg[x][y]=-1;
				snake[i].x = y;
				snake[i].y = x;
				x++;
				
			}
			else if(y+1<w && mg[x][y+1]==mg[x][y]-1){
				mg[x][y]=-1;
				snake[i].x = y;
				snake[i].y = x;
				y++;
			}
			
			if(i!=count-1){
				mg[tail.y][tail.x]=w*h;
				if(game.snake.length-2-i>=0)
					tail = game.snake[game.snake.length-2-i];
				else
					tail = snake[i-game.snake.length+2];
			}
		}
		mg[tail.y][tail.x]=0;
		
		for(var i=0; i<h; i++){
			for(var j=0; j<w; j++){
				if((i!=tail.y || j!=tail.x) && mg[i][j]!=-1)
					mg[i][j] = w*h;
			}
		}
		mg = createDPMG(mg,tail);
		
		return mg;
	}
	
	function createCircleOne(){//构造第一种无尽循环
		var mg = [];
			
		for(var i=0; i<h; i++){
			mg[i] = [];
			for(var j=0; j<w; j++){
				mg[i][j]=0;
			}
		}
		for(var i=1; i<h; i++){
			for(var j=1; j<w; j+=2){
				mg[i][j] = 2;
				if(i==h-1)
					mg[i][j] = 3;
			}
		}
		for(var i=1; i<h; i++){
			for(var j=0; j<w; j+=2){
				mg[i][j] = 0;
				if(i==1 && j!=0)
					mg[i][j] = 3;
			}
		}
		for(var i=0; i<w; i++){
			mg[0][i] = 1;
			if(i==w-1)
				mg[0][i] = 2;
		}	
		return mg;
	}
	function createCircleTwo(){//构造第二种无尽循环
		var mg = [];
			
		for(var i=0; i<h; i++){
			mg[i] = [];
			for(var j=0; j<w; j++){
				mg[i][j]=0;
			}
		}
		for(var i=1; i<h; i++){
			for(var j=1; j<w; j+=2){
				mg[i][j] = 0;
				if(i==1 && j!= w-1)
					mg[i][j] = 1;
			}
		}
		for(var i=1; i<h; i++){
			for(var j=0; j<w; j+=2){
				mg[i][j] = 2;
				if(i==h-1)
					mg[i][j] = 1;
			}
		}
		for(var i=0; i<w; i++){
			mg[0][i] = 3;
			if(i==0)
				mg[0][i] = 2;
		}
		return mg;
	}
	return function(game){
		
		start = game.snake[0];
		end = game.food[0];
		tail = game.snake[game.snake.length-1];
		var x = start.y;
		var y = start.x;
		if(game.snake.length>180){//如果蛇长大于一定长度，那就无脑循环吧
			
			var mg = createCircleOne();//创建第一种无尽循环
			var mmg = createCircleTwo();//创建第二种无尽循环（第一种走不通还能走第二种）

			var mmmg = initMG(start, tail, game);
			mmmg[x][y] = -1;
			mmmg = createDPMG(mmmg, tail);

			if(y+1<w && mmmg[x][y+1]!=-1 && mmmg[x][y+1]!=w*h && mg[x][y]==1){
				return "right";
			}
			else if(x+1<h && mmmg[x+1][y]!=-1 && mmmg[x+1][y]!=w*h && mg[x][y]==2){
				return "down";
			}
			else if(x-1>=0 && mmmg[x-1][y]!=-1 && mmmg[x-1][y]!=w*h && mg[x][y]==0){
				return "up";
			}
			else if(y-1>=0 && mmmg[x][y-1]!=-1 && mmmg[x][y-1]!=w*h && mg[x][y]==3){
				return "left";
			}

			if(y+1<w && mmmg[x][y+1]!=-1 && mmmg[x][y+1]!=w*h && mmg[x][y]==1){
				return "right";
			}
			else if(x+1<h && mmmg[x+1][y]!=-1 && mmmg[x+1][y]!=w*h && mmg[x][y]==2){
				return "down";
			}
			else if(x-1>=0 && mmmg[x-1][y]!=-1 && mmmg[x-1][y]!=w*h && mmg[x][y]==0){
				return "up";
			}
			else if(y-1>=0 && mmmg[x][y-1]!=-1 && mmmg[x][y-1]!=w*h && mmg[x][y]==3){
				return "left";
			}
		}
		var mg = initMG(start,end,game);
		//构造路径深度图（一个二维数组），根据该图能找到蛇头到食物的最短路径（或者没有）的方向
		mg = createDPMG(mg,end);
		
		//如果能吃到苹果
		if(mg[start.y][start.x]!=w*h){
			var mmg = deepClone(mg);
			mmg = createFuturePath(mmg,game);
			//尝试去吃苹果，若吃完苹果还能找到尾巴的路就去吃苹果
			if(mmg[end.y][end.x]!=w*h){
				if(y-1>=0 && mg[x][y-1]==mg[x][y]-1)
					return "left";
				else if(x-1>=0 && mg[x-1][y]==mg[x][y]-1)
					return "up";
				else if(x+1<h && mg[x+1][y]==mg[x][y]-1)
					return "down";
				else if(y+1<w && mg[x][y+1]==mg[x][y]-1)
					return "right";
			}
			else{//如果尝试去吃苹果后，找不到自己的尾巴，就绕路，优先选择远离苹果的方向
				start = game.snake[0];
				end = game.snake[game.snake.length-1];
				var mmmg = initMG(start, end, game);
				mmmg[x][y] = -1;
				mmmg = createDPMG(mmmg, tail);
				if(y+1<w && mmmg[x][y+1]!=-1 && mmmg[x][y+1]!=w*h && mg[x][y+1]>mg[x][y]){
					return "right";
				}
				else if(x+1<h && mmmg[x+1][y]!=-1 && mmmg[x+1][y]!=w*h && mg[x+1][y]>mg[x][y]){
					return "down";
				}
				else if(x-1>=0 && mmmg[x-1][y]!=-1 && mmmg[x-1][y]!=w*h && mg[x-1][y]>mg[x][y]){
					return "up";
				}
				else if(y-1>=0 && mmmg[x][y-1]!=-1 && mmmg[x][y-1]!=w*h && mg[x][y-1]>mg[x][y]){
					return "left";
				}
				if(y+1<w && mmmg[x][y+1]!=-1 && mmmg[x][y+1]!=w*h){
					return "right";
				}
				else if(x+1<h && mmmg[x+1][y]!=-1 && mmmg[x+1][y]!=w*h){
					return "down";
				}
				else if(x-1>=0 && mmmg[x-1][y]!=-1 && mmmg[x-1][y]!=w*h){
					return "up";
				}
				else if(y-1>=0 && mmmg[x][y-1]!=-1 && mmmg[x][y-1]!=w*h){
					return "left";
				}
			}
		}
		//如果不能吃到苹果，找一个方向，该方向能到达蛇尾就行
		else{
			var mmmg = initMG(start, tail, game);
			mmmg[x][y] = -1;
			mmmg = createDPMG(mmmg, tail);
			
			if(y+1<w && mmmg[x][y+1]!=-1 && mmmg[x][y+1]!=w*h){
				return "right";
			}
			else if(x+1<h && mmmg[x+1][y]!=-1 && mmmg[x+1][y]!=w*h){
				return "down";
			}
			else if(x-1>=0 && mmmg[x-1][y]!=-1 && mmmg[x-1][y]!=w*h){
				return "up";
			}
			else if(y-1>=0 && mmmg[x][y-1]!=-1 && mmmg[x][y-1]!=w*h){
				return "left";
			}
		}
	}
}