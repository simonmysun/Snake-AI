function createThink(w,h) {
    var dirx = [1,0,-1,0];
    var diry = [0,1,0,-1];
    var dir_table = ['right','down','left','up'];
    var dirJJ = ['r','d','l','u'];
    var DIRECTION = [[0,1],[1,0],[0,-1],[-1,0]];
    var minMap = new Array(w);
    var markMap = new Array(w);
    var goDir;
    var minDist;
    var nextFood;
    var path,frankPath = null;
    var ii;
    var flag = true,frank = false;
    var bb = false;
    var circle = false;
    var cellDistance = new Array(w);
    var cellLastX = new Array(w);
    var cellLastY = new Array(w);
    var cellMark = new Array(w); 
    var g_goalX,g_goalY;
    var startCell = new Cell(0,0);
    var gameMap = new Array(w);
    var CircleDir = new Array(w);
   function initTheCricle()
   {
	var k;
	for(var i = 0;i < w;i++)
	{
	    CircleDir[i] = [];
	    for(var j = 0;j < h;j++)
       	      CircleDir[i][j] = -1;
	}
	CircleDir[0][1] = CircleDir[0][3] =  CircleDir[10][4] = CircleDir[10][2] = 3;
	CircleDir[12][14] = CircleDir[12][12]  = CircleDir[12][10] = CircleDir[18][13] = CircleDir[18][11] = CircleDir[18][9] = 3;
	CircleDir[12][1] = CircleDir[14][1] = CircleDir[16][1] = CircleDir[18][1] = 2;
        for(k = 13;k <= 18;k += 2) 
	{
		CircleDir[k][8] = 2;
	}
	for(k = 1;k <= 11;k += 2)  CircleDir[k][14] = 2;
	for(k = 2;k <= 10;k += 2) CircleDir[k][5] = 2;

        for(var i=0;i<19;i++)  CircleDir[i][0] = 0;
        for(var j=0;j<14;j++)  CircleDir[19][j] = 1;
        for(var j=19;j>12;j--)  CircleDir[j][14] = 2;
	for(var i=1;i<14;i++)   CircleDir[11][i] = 1;



        for(var i=13;i>=9;i = i-2){
            for(var j=12;j<18;j++){
                CircleDir[j][i] = 0;
            }
        }
        for(var i=12;i>=10;i=i-2){
           for(var j=18;j>12;j--){
               CircleDir[j][i] = 2;
           }
        }

        for(var i=12;i<=18;i=i+2){
            for(var j=8;j>=2;j--){
                CircleDir[i][j] = 3;
            }
        }
        for(var i=13;i<=17;i=i+2){
            for(var j=7;j>=1;j--){
                CircleDir[i][j] = 1;
            }
        }
        
        for(var j=0;j<=10;j=j+2){
            for(var i=14;i>=5;i--){
                CircleDir[j][i] = 3;
            }
        }
        for(var j=1;j<10;j+= 2){
            for(var i=5;i<14;i++){
                CircleDir[j][i] = 1;
            }
        }
        for(var i=2;i<=4;i=i+2){
            for(var j=0;j<=9;j++){
                CircleDir[j][i] = 0;
            }
        }
        for(var i=1;i<=3;i=i+2){
            for(var j=1;j<=10;j++){
                CircleDir[j][i] = 2;
            }
        }
	CircleDir[0][1] = CircleDir[0][3] =  CircleDir[10][4] = CircleDir[10][2] = 3;  CircleDir[10][6]= 2;
	CircleDir[12][14] = CircleDir[12][12]  = CircleDir[12][10] = CircleDir[18][13] = CircleDir[18][11] = CircleDir[18][9] = 3;
	CircleDir[12][1] = CircleDir[14][1] = CircleDir[16][1] = CircleDir[18][1] = 2;
	for(k = 1;k <= 11;k += 2)  CircleDir[k][14] = 2;
	for(k = 2;k <= 10;k += 2) CircleDir[k][5] = 2;
	CircleDir[9][5] = 1;
	CircleDir[10][5] = 2;
	CircleDir[10][6] = 3;
   }
   function compareByDistanceBetweenStartAndGoal(c1, c2){
        if(c1 != null && c2 != null){
            var distanceOfC1AndGoal = c1.distance +
                Math.sqrt(Math.pow(g_goalX - c1.x,2) + Math.pow(g_goalY - c1.y,2));

            var distanceOfC2AndGoal = c2.distance +
                Math.sqrt(Math.pow(g_goalX - c2.x,2) + Math.pow(g_goalY - c2.y,2));
            if(distanceOfC1AndGoal <= distanceOfC2AndGoal){
                return false;
            }else{
                return true;
            }
        }
    } 
var MAX_VALUE = 999999;
var Waitingfy = Waitingfy || {};
Waitingfy.Heap = function(data, compareFunction) {
    this.items = [];
    this.items.push(MAX_VALUE);
    this.numCounts = 0;
    this.CompareFunction = compareFunction;
};

Waitingfy.Heap.prototype = {
    initHeap : function(data, n){
        for (var i = 0;i < n; i++){
            this.items.push(data[i]);
            this.numCounts++;
        }
    },
    percolateUp : function(holeIndex, adjustValue){
        var parentIndex = parseInt(holeIndex / 2);
        while(holeIndex > 1 && this.CompareFunction(this.items[parentIndex],adjustValue)){
            this.items[holeIndex] = this.items[parentIndex];
            holeIndex = parentIndex;
            parentIndex /= 2;
        }
        this.items[holeIndex] = adjustValue;
    },
    adjustHeap : function(childTree, adjustValue){
        var holeIndex = parseInt(childTree);
        var secondChid = 2 * holeIndex + 1;
        while(secondChid <= this.numCounts)
        {
            if (this.CompareFunction(this.items[secondChid],this.items[secondChid - 1])){
                --secondChid;
            }
            this.items[holeIndex] = this.items[secondChid];
            holeIndex = secondChid;
            secondChid = 2 * secondChid + 1;
        }
        if (secondChid == this.numCounts + 1){
            this.items[holeIndex] = this.items[secondChid - 1];
            holeIndex = secondChid - 1;
        }
        this.items[holeIndex] = adjustValue;
        this.percolateUp(holeIndex,adjustValue);

    },
    push_heap : function(elem){
        this.items.push(elem);
        this.numCounts++;
        this.percolateUp(this.numCounts,this.items[this.numCounts]);
    },
    pop_heap : function(){
        var adjustValue = this.items[this.numCounts];
        this.items[this.numCounts] = this.items[1];
        this.numCounts--;
        this.adjustHeap(1,adjustValue);
    },
    makeHeap : function(){
        if (this.numCounts < 2)
            return;
        var parent = parseInt(this.numCounts / 2);
        while(1)
        {
            this.adjustHeap(parent,this.items[parent]);
            if (1 == parent)
                return;
            --parent;
        }
    },
    getVec : function(){
        return this.items;
    }
}
    var vecCells = new Waitingfy.Heap([], compareByDistanceBetweenStartAndGoal);

    function clearMap(game)
    {
         for(var i = 0;i< w;i++)
        {
	    markMap[i] = [];
	    minMap[i] = [];
            for(var j = 0;j< h;j++)
            {
                  markMap[i][j] = false;
		  minMap[i][j] = 999999;
            }
        }
        for(var i = 0;i < game.snake.length;i++)
        {
            markMap[game.snake[i].x][game.snake[i].y] = true;
        }
    }//clearMap end

SearchState = (function() {
    function SearchState(x,y, cmd, parent) {
      this.x = x;
      this.y = y;
      this.cmd = (cmd != null) ? cmd : '';
      this.parent = (parent != null) ? parent : null;
    }
    SearchState.prototype.traceCmd = function() {  //记录路径的函数
      if (this.parent == null) {
        return this.cmd;
      } else {
        return this.parent.traceCmd() + this.cmd;
      }
    };

    SearchState.prototype.toString = function() {
      return "" + this.head + ", '" + (this.traceCmd()) + "'";
    };

    return SearchState;

  })();



FFrankSnake = (function() {
    function FFrankSnake(x,y,snake,cmd,parent) {
      this.x = x;
      this.y = y;
      this.cmd = (cmd != null) ? cmd : '';
      this.parent = (parent != null) ? parent : null;
      this.snake = snake;
    }

    FFrankSnake.prototype.traceCmd = function() {  //记录路径的函数
      if (this.parent == null) {
        return this.cmd;
      } else {
        return this.parent.traceCmd() + this.cmd;
      }
    };

    FFrankSnake.prototype.toString = function() {
      return "" + this.head + ", '" + (this.traceCmd()) + "'";
    };

    return FFrankSnake;

  })();

function calTheNum(x,y,game)
{
	for(var i = 0;i < game.snake.length;i++)
	{
		if(game.snake[i].x == x && y == game.snake[i].y)
		return i;
	}
}
 function testThePath(game)
{
	clearMap(game);
	var i,j;
	var head = game.snake[0];
	var xx = head.x;
	var yy = head.y;
	var x1,y1;
	var count = 1;
        var len = game.snake.length;
	while(count <= len)
	{
		xx = xx + dirx[CircleDir[xx][yy]];
		yy = yy + diry[CircleDir[xx][yy]];
		if(markMap[xx][yy] == true)
		{
			var cur = len - calTheNum(xx,yy,game);
			if(count < cur) return false;
		}
		count++;
	}
	return true;
}
    return function(game)
    {
		if(game.snake.length > 160)
		{
			initTheCricle();
			var head = game.snake[0];
			if(circle == true)
			{
			    return dir_table[CircleDir[head.x][head.y]];
			}
			var flag = testThePath(game);
			if(flag == true)
			{
				circle = true;
				return dir_table[CircleDir[head.x][head.y]];
			}
				var nextTheCell,head,x,y,i,tail = game.snake[game.snake.length - 1];
				head = game.snake[0];
				nextTheCell = tryMoveToCellThatIsFarthestToGoal(game);
				if(nextTheCell.x != tail.x || nextTheCell.y != tail.y)
				{
					x = nextTheCell.x - head.x;
					y = nextTheCell.y - head.y;
					for(i = 0;i < 4;i++)
					{
			    			if(x == dirx[i] && y == diry[i])
			    			{
					   	 return  dir_table[i];
			    			}
					}
				}
			path = findPathBfs(game);
			if(path != null && path.length > 0)
			{
			   var newGame = deepClone(game);
			   var tempSnakeX = [];
			   var tempSnakeY = [];
			   var head = deepClone(newGame.snake[0]);
			   newGame.snake.unshift(head);
			   var xx = 0,yy = 0;
			   for(var i = 0;i < path.length;i++)
			   {
				switch(path[i])
				{
					case 'u': 
						xx = 0;yy = -1;break;
					case 'd': 
						xx = 0;yy = 1;break;
					case 'l': 
						xx = -1;yy = 0;break;
					case 'r': 
						xx = 1;yy = 0;break;
				}
				tempSnakeX[i] = head.x + xx;
				tempSnakeY[i] = head.y + yy;
				head.x = tempSnakeX[i];
				head.y = tempSnakeY[i];
			   }
			   var len = game.snake.length + 1;
			   var qq = 0,i;
			   if(len > tempSnakeX.length)
			    {
				for(i = tempSnakeX.length - 1;i >= 0;i--)
			   	{
					newGame.snake[qq].x = tempSnakeX[i];
					newGame.snake[qq].y = tempSnakeY[i];
					qq++;
			   	}
				for(i = 0;qq < len;qq++,i++)
				{
					newGame.snake[qq].x = game.snake[i].x;
					newGame.snake[qq].y = game.snake[i].y;
				}
			    }
			   else 
			   {
				for(i = tempSnakeX.length - 1;i >= tempSnakeX.length - len;i--)
			   	{
					newGame.snake[qq].x = tempSnakeX[i];
					newGame.snake[qq].y = tempSnakeY[i];
					qq++;
			   	}
			   }
			    var gg = followTail(newGame);
			    if(gg != null && ((path.length == 1 && gg.length > 1) || (path.length > 1)))
			    {
			   	switch(path[0])
			   	{	
					case 'u': 
						return "up";
					case 'd': 
						return "down";
					case 'l': 
						return "left";
					case 'r': 
						return "right";
			   	}
			    }    
			}
			var findTailPath  = lastFollowTail(game);
			if(findTailPath == null)
			{	
				frankPath = findTheOtherPath(game);
				if(frankPath != null)
				{
			      		switch(frankPath[0])
			      		{
						case 'u': 
							return "up";
						case 'd': 
							return "down";
						case 'l': 
							return "left";
						case 'r': 
							return "right";
					}
				}
				clearMap(game);   
				frankPath = dfsFindTheTail(game);
				if(frankPath != null)
				{
			      		switch(frankPath[0])
			      		{
							case 'u': 
								return "up";
							case 'd': 
								return "down";
							case 'l': 
								return "left";
							case 'r': 
								return "right";
					}
				}
			}
			else 
			{
				return dir_table[findTailPath];	
			}	
		}


		path = findPathBfs(game);

		if(path != null && path.length > 0)
		{	
			   var newGame = deepClone(game);
			   var tempSnakeX = [];
			   var tempSnakeY = [];
			   var head = deepClone(newGame.snake[0]);
			   newGame.snake.unshift(head);
			   var xx = 0,yy = 0;
			   for(var i = 0;i < path.length;i++)
			   {
				switch(path[i])
				{
					case 'u': 
						xx = 0;yy = -1;break;
					case 'd': 
						xx = 0;yy = 1;break;
					case 'l': 
						xx = -1;yy = 0;break;
					case 'r': 
						xx = 1;yy = 0;break;
				}
				tempSnakeX[i] = head.x + xx;
				tempSnakeY[i] = head.y + yy;
				head.x = tempSnakeX[i];
				head.y = tempSnakeY[i];
			   }
			   var len = game.snake.length + 1;
			   var qq = 0,i;
			   if(len > tempSnakeX.length)
			    {
				for(i = tempSnakeX.length - 1;i >= 0;i--)
			   	{
					newGame.snake[qq].x = tempSnakeX[i];
					newGame.snake[qq].y = tempSnakeY[i];
					qq++;
			   	}
				for(i = 0;qq < len;qq++,i++)
				{
					newGame.snake[qq].x = game.snake[i].x;
					newGame.snake[qq].y = game.snake[i].y;
				}
			    }
			   else 
			   {
				for(i = tempSnakeX.length - 1;i >= tempSnakeX.length - len;i--)
			   	{
					newGame.snake[qq].x = tempSnakeX[i];
					newGame.snake[qq].y = tempSnakeY[i];
					qq++;
			   	}
			   }
			   var gg = followTail(newGame);
			   if(gg != null && ((path.length == 1 && gg.length > 1) || (path.length > 1)))
			    {
			   	switch(path[0])
			   	{	
					case 'u': 
						return "up";
					case 'd': 
						return "down";
					case 'l': 
						return "left";
					case 'r': 
						return "right";
			   	}
			    }    
		}
	          

		var findTailPath  = followTail(game);
		if(findTailPath == null)
		{	
			if(game.snake.length > 120)
			{
				clearMap(game); 
				frankPath = dfsFindTheTail(game);
				if(frankPath != null)
				{
			      		switch(frankPath[0])
			      		{
						case 'u': 
							return "up";
						case 'd': 
							return "down";
						case 'l': 
							return "left";
						case 'r': 
							return "right";
					}
				}
			}		
			else
			{
				frankPath = findTheOtherPath(game);
				if(frankPath != null)
				{
			      		switch(frankPath[0])
			      		{
						case 'u': 
							return "up";
						case 'd': 
							return "down";
						case 'l': 
							return "left";
						case 'r': 
							return "right";
					}
				}
				else
				{
					clearMap(game);    //?????????????
					frankPath = dfsFindTheTail(game);
					if(frankPath != null)
					{
			      			switch(frankPath[0])
			      			{
							case 'u': 
								return "up";
							case 'd': 
								return "down";
							case 'l': 
								return "left";
							case 'r': 
								return "right";
						}
					}
				}
			}
			goDir = findFarthestPath(game);

			if(goDir == -1) goDir = 0;
		}
		else 
		{	
			   switch(findTailPath[0])
			   {
				case 'u': 
					return "up";
				case 'd': 
					return "down";
				case 'l': 
					return "left";
				case 'r': 
					return "right";
			   }
		}
                return dir_table[goDir];
    }
function Cell(_x, _y){
    this.x = _x;
    this.y = _y;
    this.distance = 0;
    this.LastX = -1;
    this.LastY = -1;
}
    function clearPath(game){
	var x,y,i;
        for(x = 0; x < w; x++){
	    gameMap[x] = [];
	    cellMark[x] = [];
            for(y =0; y < h; y++){
		gameMap[x][y] = new Cell(0,0);
		gameMap[x][y].x  = x;
		gameMap[x][y].y  = y;
		gameMap[x][y].LastX = -1;
		gameMap[x][y].LastY = -1;
	    	cellMark[x][y] = false;
            }
        }
	for(i = 0;i < game.snake.length;i++)
	    cellMark[game.snake[i].x][game.snake[i].y] = true;
	
    }
function lastFollowTail(game) {   //跟着尾巴走
      
	 var  found, head, i, j, max, move, next, node, queue, tail ,x1,y1;
      	 head = game.snake[0];
     	 tail = game.snake[game.snake.length - 1];
      	 clearMap(game);
      	 queue = [new SearchState(head.x,head.y)];
	 minMap[head.x][head.y] = 0;
      	 found = false;
      	 while (queue.length > 0) {
        	node = queue.shift();
        	for(i = 0;i < 4;i++)
		{
			x1 = node.x + dirx[i];
                	y1 = node.y + diry[i];
			if(x1 == tail.x && y1 == tail.y)
                	{
                        	found = true;
                	}
			if(legal(x1,y1) == true)  
			{
			        minMap[x1][y1] = minMap[node.x][node.y] + 1;
				markMap[x1][y1] = true;       	//进行标记
				queue.push(new SearchState(x1,y1, dirJJ[i], node)); //node 是父节点
                	}
		}
        }
      move = null;
      if (found) {     	//如果找到尾巴到头部的路径！！！！！！！！！
        max = -1;
        for (i = 0; i < 4; i++) {
	
         	 x1 = head.x + dirx[i];
   	  	 y1 = head.y + diry[i];
	
          	if (legal(x1,y1) || (x1 == tail.x && y1 == tail.y)) {  //下个相邻节点是尾巴或者有效
               		if (minMap[x1][y1] > max && minMap[x1][y1] != 999999) {
                   		max = this.map[x1][y1];			    //寻找的是距离尾巴最远的点的方向
                  	 	move = i;
               		}
          	}
         }//for
       }
        return move;
    };
   function fullFillPathData(goalX, goalY){
	var deqPathCell = [];
        var cell = gameMap[goalX][goalY];
        while(cell.LastX != -1){
            deqPathCell.push(cell);
            cell = gameMap[cell.LastX][cell.LastY];
        }
	return  deqPathCell;
    }
 function legalCell(x,y)
    {
	if(x < 0 || x >= w|| y < 0 || y >= h)  return false;
        if(cellMark[x][y] == true) 
            return false;
        return true;
    }
    function startPathFinding (startX, startY, goalX, goalY,compareMethod,game){
	clearPath(game);
	g_goalX = goalX;
	g_goalX = goalY;
	startCell.x = startX;
	startCell.y = startY;
	startCell.LastX = -1;
	startCell.LastY = -1;
	startCell.distance = 0;
        vecCells.push_heap(startCell);
	cellMark[startX][startY] = true;
	var beforeDistance;
        var nowProcessCell,i,indexX,indexY,cell = new Cell(0,0,0);
        while(vecCells.getVec().length > 1){
		
            vecCells.pop_heap();
            nowProcessCell = vecCells.getVec().pop();
            for(i = 0; i < 4; i++){

                indexX = nowProcessCell.x + DIRECTION[i][0];
                indexY = nowProcessCell.y + DIRECTION[i][1];
		if(nowProcessCell.x == goalX && nowProcessCell.y == goalY){
                       return fullFillPathData(goalX, goalY);
            	}
                if(legalCell(indexX, indexY))
              	{
                    cell.x = indexX;
		    cell.y = indexY;
                    beforeDistance = 1 + nowProcessCell.distance;
                    if(cellMark[cell.x][cell.y] == false){
                        cellMark[cell.x][cell.y] = true;
			cell.setLastX = nowProcessCell.x;
			cell.setLastY = nowProcessCell.y;
			cell.distance = beforeDistance;
                        vecCells.push_heap(cell);
                    }
		    else
		    {
			if(beforeDistance < cell.distance){
                            cell.setLastX = nowProcessCell.x;
			    cell.setLastY = nowProcessCell.y;
                            cell.distance = beforeDistance;
                            vecCells.makeHeap();
                        }
                    }
                }
	    }
	}
return null;
}
    
   
    function tryMoveToCellThatIsFarthestToGoal(game){
        var canFindPath;
        var canFindTail;
	clearPath(game);
        var nextCellX, nextCellY;
	var copyGame;
	var curFood = game.food[0],head = game.snake[0];
        var nextCell = deepClone(head);
        var distanceBetweenGoal;
        var maxDistanceBetweenNextCellAndGoal = 0;
        var maxDistanceCell = null;
        var nextCellIsGoal = false,i,j;
	var len  =  game.snake.length;
	var newGameTail;
        for(i = 0; i < 4; i++){
            nextCellX = head.x + DIRECTION[i][0];
            nextCellY = head.y + DIRECTION[i][1];
            if(legalCell(nextCellX,nextCellY)){
                    nextCell.x = nextCellX;
		    nextCell.y = nextCellY;
		    copyGame = deepClone(game);
                    if(nextCell.x == curFood.x && nextCell.y == curFood.y){
                        copyGame.snake.unshift(nextCell);
                        nextCellIsGoal = true;
                    }
		    else
		    {
                    	for(j = len - 1;j > 0;j--)
		    	{
				copyGame.snake[j].x = copyGame.snake[j - 1].x;
				copyGame.snake[j].y = copyGame.snake[j - 1].y;
		    	}
		    	copyGame.snake[0].x = nextCell.x;
		    	copyGame.snake[0].y = nextCell.y;
		    }
		    newGameTail = copyGame.snake[copyGame.snake.length - 1];
                    canFindTheTail = startPathFinding(nextCell.x, nextCell.y,newGameTail.x,
                        newGameTail.y,compareByDistanceBetweenStartAndGoal,game);
                    if(nextCellIsGoal  == true && canFindTheTail != null){
                        return nextCell;
                    }

                    if(canFindTheTail != null) distanceBetweenGoal = canFindTheTail.length;
		    else  distanceBetweenGoal = 0;

                    canFindPath = startPathFinding(nextCell.x, nextCell.y,
                        curFood.x, curFood.y,compareByDistanceBetweenStartAndGoal,game);
		    
                    if(canFindTheTail != null && canFindPath != null){
                        if(distanceBetweenGoal > maxDistanceBetweenNextCellAndGoal){
                            maxDistanceBetweenNextCellAndGoal = distanceBetweenGoal;
                            maxDistanceCell = deepClone(nextCell);
                        }
                    }
            }
        }
        if(maxDistanceCell != null){
            return maxDistanceCell;
        }else{
            return getACellThatIsFarthestToGoal(game);
        }
    }
    function getACellThatIsFarthestToGoal(game){
        safePathCells = [];
        var nextCellX, nextCellY;
	var canFindPath;
        var canFindTail;
        var nextCell = new Cell(0,0);
	clearPath(game);
	var head = game.snake[0];
   	var maxDistanceBetweenNextCellAndGoal = 0,len = game.snake.length;
        var distanceWithGoal = 0;
	var curFood = game.food[0];
        var maxDistanceCell = null;
	var newGameTail,i,j;
        for(i = 0; i < 4; i++){
            nextCellX = head.x + DIRECTION[i][0];
            nextCellY = head.y + DIRECTION[i][1];
            if(legalCell(nextCellX,nextCellY)){
                    nextCell.x = nextCellX;
		    nextCell.y = nextCellY; 
                    copyGame = deepClone(game);
                    if(nextCell.x == curFood.x && nextCell.y == curFood.y){
                        copyGame.snake.unshift(nextCell);
                    }
		    else
		    {
                    	for(j = len - 1;j > 0;j--)
		    	{
				copyGame.snake[j].x = copyGame.snake[j - 1].x;
				copyGame.snake[j].y = copyGame.snake[j - 1].y;
		    	}
		    	copyGame.snake[0].x = nextCell.x;
		    	copyGame.snake[0].y = nextCell.y;
		    }
		    newGameTail = copyGame.snake[copyGame.snake.length - 1];

                    canFindTheTail = startPathFinding(nextCell.x, nextCell.y,newGameTail.x,
                        newGameTail.y,compareByDistanceBetweenStartAndGoal,game);

                    if(canFindTheTail != null){
                        distanceWithGoal = Math.pow(curFood.x - nextCellX, 2) + Math.pow(curFood.y - nextCellY, 2) ;
                        if(distanceWithGoal > maxDistanceBetweenNextCellAndGoal){
                            maxDistanceBetweenNextCellAndGoal = distanceWithGoal;
                            maxDistanceCell = nextCell;
                        }
                    }
            }
        }
        if(maxDistanceCell == null){
            maxDistanceCell = game.snake[game.snake.length - 1];
        }
        return maxDistanceCell;
    }

    function dfsTheFarsetPathToTheTail(endx,endy,xx,yy,s,sign,curPath)
     {
	 var i,x1,y1;
	 for(i = 0;i < 4;i++)
	 {
		x1 = xx + dirx[i];
            	y1 = yy + diry[i];
		if(x1 == endx && y1 == endy)
		{
			if(curPath == null) curPath = dirJJ[i];
			else  curPath = curPath + dirJJ[i];
			if(sign == null) sign = curPath;
			else if(sign.length < curPath.length)  sign = curPath;
			continue;
		}
          	if (legal(x1, y1) == true) { 
			markMap[x1][y1] = true;
			dfsTheFarsetPathToTheTail(endx,endy,x1,y1,s,sign,curPath);
			markMap[x1][y1] = false;
		}
	 }
     }
    function dfsTheFarestPath(game,farsetPath,curPath)
    {
	var tail,x1,y1,j,i,len,s;
	for(i = 0;i < 4;i++)
	{
		x1 = game.snake[0].x + dirx[i];
            	y1 = game.snake[0].y + diry[i];
          	if (legal(x1, y1) == true) { 
			s =  deepClone(game);
			len = s.snake.length;
			tail = game.snake[len - 1];
			markMap[tail.x][tail.y] = false;
			for(j = len - 1;j > 0;j--)
			{
				s.snake[j].x = game.snake[j - 1].x;
				s.snake[j].y = game.snake[j - 1].y;
			}
			s.snake[0].x = x1;
			s.snake[0].y = y1;
			var sign = null;
			dfsTheFarsetPathToTheTail(s.snake[len - 1].x,s.snake[len - 1].y,x1,y1,s,sign);
			if(sign != null)
			{
				if(curPath == null) curPath = dirJJ[i];
				else  curPath += dirJJ[i];
				if(farsetPath == null) farsetPath = curPath + sign;
				else if(farsetPath.length < (curPath.length + sign.length))  farsetPath = curPath + sign;
				continue;
			}
			markMap[x1][y1] = true;
			dfsFindTheTail(game,farsetPath,curPath);
			markMap[x1][y1] = false;
			markMap[tail.x][tail.y] = true;
         	 }
	}
    }
    function dfsFindTheTail(game)
    {
        var s,tail,x1,y1,j,i,len;
	for(i = 0;i < 4;i++)
	{
		x1 = game.snake[0].x + dirx[i];
            	y1 = game.snake[0].y + diry[i];
          	if (legal(x1, y1) == true) { 
			s =  deepClone(game);
			len = s.snake.length;
			tail = game.snake[len - 1];
			markMap[tail.x][tail.y] = false;
			for(j = len - 1;j > 0;j--)
			{
				s.snake[j].x = game.snake[j - 1].x;
				s.snake[j].y = game.snake[j - 1].y;
			}
			s.snake[0].x = x1;
			s.snake[0].y = y1;
			sign  =  followTail(s);
			if(sign != null)
			{
				return dirJJ[i] + sign;
			}
			markMap[x1][y1] = true;
			var gg = dfsFindTheTail(game);
			if(gg != null)
			{
			     return  dirJJ[i] + gg;
			}
			markMap[x1][y1] = false;
			markMap[tail.x][tail.y] = true;
         	 }
	}
	return null;
    }
    function findTheOtherPath(game)
    {
       clearMap(game);
       var  head,  node,len , count = 0;
       head = game.snake[0];
       frankSnakeQueue = [new FFrankSnake(head.x,head.y,game.snake)];
       var s;
       while (frankSnakeQueue.length > 0) {
         	node = frankSnakeQueue.shift();     	
        	for (var i = 0; i < 4; i++) {
 	   		var x1 = node.x + dirx[i];
            		var y1 = node.y + diry[i];
          		if (legal(x1, y1)) { 
				markMap[x1][y1] = true;
				s =  deepClone(node);
			        len = s.snake.length;
				for(var j = len - 1;j > 0;j--)
				{
					s.snake[j].x = node.snake[j - 1].x;
					s.snake[j].y = node.snake[j - 1].y;
				}
				s.snake[0].x = x1;
				s.snake[0].y = y1;
				sign  =  followTail(s);
				if(sign != null)
				{
					return node.traceCmd() + dirJJ[i] + sign;
				}
            			frankSnakeQueue.push(new FFrankSnake(x1,y1,s.snake,dirJJ[i], node)); //node 是父节点
         	 	}
        	}
	}
	return null;
    }

    function findPathBfs(game)
    {
       clearMap(game);
       var  head,  node, queue,i;
       head = game.snake[0];
       queue = [new SearchState(head.x,head.y)];
       while (queue.length > 0) {
         node = queue.shift();
         for (i = 0; i < 4; i++) {
 	   var x1 = node.x + dirx[i];
           var y1 = node.y + diry[i];
	   if(x1 == game.food[0].x && y1 == game.food[0].y){
		return node.traceCmd() + dirJJ[i];
	   } 
          if (legal(x1, y1)) { 
	     markMap[x1][y1] = true;       	//进行标记
             queue.push(new SearchState(x1,y1, dirJJ[i], node)); //node 是父节点
          }
        }
      } 
      return null;       
    }
  
    function followTail(game)
    {
        var len = game.snake.length;
	var x1,x2,i;
	var head = deepClone(game.snake[0]);
	clearMap(game);
	var queue;
	queue = [new SearchState(head.x,head.y)];
        while(queue.length > 0)
        {
            var node = queue.shift();
            for(i = 0;i < 4;i++)
            {
                x1 = node.x + dirx[i];
                y1 = node.y + diry[i];
		if(x1 == game.snake[len - 1].x && y1 == game.snake[len - 1].y)
                {
                        return node.traceCmd() + dirJJ[i];
                }
		if(legal(x1,y1) == true)  
		{
			markMap[x1][y1] = true;       	//进行标记
			queue.push(new SearchState(x1,y1, dirJJ[i], node)); //node 是父节点
                }
            }
        }
        return null;
    }
    function countTheCell(x,y,game)
    {
	var xx,yy,count = 0;
	markMap[x][y] = true;
	for(var i = 0;i < 4;i++)
	{
		xx = x + dirx[i];
		yy = y + diry[i];
		if(legal(xx,yy)) count++;	
	}
	markMap[x][y] = true;
	return count;
    }
    function findFarthestPath(game)
    {
        var max = 0;
        var FDir = 0;
        var x1 = game.food[0].x;
        var y1 = game.food[0].y;
        clearMap(game);
        for(var i = 0;i< 4;i++)
        {
            var x = game.snake[0].x + dirx[i];
            var y = game.snake[0].y + diry[i];
            if(legal(x,y) == true)
            {
                var count =  countTheCell(x,y,game);
		if(count > max)
		{
			max = count;
			FDir = i;
		}
            }
        }
        return FDir;
    }
    function legal(x,y)
    {
        if(x < 0 || x >= w|| y < 0 || y >= h)  return false;
        if(markMap[x][y] == true) 
            return false;
        return true;
    }
}