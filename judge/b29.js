function createThink(w,h) {
  //  var dir[i][0] = [1,0,-1,0];
  //  var diry = [0,1,0,-1];
	var dir = [[1,0],[0,1],[-1,0],[0,-1]];
    var dir_table = ['right','down','left','up'];
    var dir_Char = ['r','d','l','u'];
    var minMap = new Array(w);
    var markMap = new Array(w);
    var goDir;
    var path,movePath = null;
	function init(){
		for(var i=0;i<w;i++){
			markMap[i] = new Array(h);
			minMap[i] = new Array(h);
		}
	}
    function clearMap(game)
    {
         for(var i = 0;i< w;i++)
        {
            for(var j = 0;j< h;j++)
            {
                  markMap[i][j] = false;
		          minMap[i][j] = 2*w*h;
            }
        }
        for(var i = 0;i < game.snake.length;i++)
        {
            markMap[game.snake[i].x][game.snake[i].y] = true;
        }
    }

    SearchState = (function() {
           function SearchState(x,y, cmd, parent) {
               this.x = x;
               this.y = y;
               this.cmd = (cmd != null) ? cmd : '';
               this.parent = (parent != null) ? parent : null;
           }

           SearchState.prototype.traceCmd = function() {  
               if (this.parent == null) {
                   return this.cmd;
               } else {
                   return this.parent.traceCmd() + this.cmd;
               }
           };

          return SearchState;

   })();

    HeapSnake = (function() {
         function HeapSnake(x,y,snake,cmd,parent) {
           this.x = x;
           this.y = y;
           this.cmd = (cmd != null) ? cmd : '';
           this.parent = (parent != null) ? parent : null;
           this.snake = snake;
         }

         HeapSnake.prototype.traceCmd = function() {  
             if (this.parent == null) {
                 return this.cmd;
             } else {
               return this.parent.traceCmd() + this.cmd;
             }
         };


    return HeapSnake;

  })();

    return function(game)
    {

		init();
		if(game.snake.length > w*h/2)
		{
			path = findPathBfs(game);	
			if(path != null && path.length > 0)
			{
			   var tmpGame = deepClone(game);
			   var tempSnakeX = [];
			   var tempSnakeY = [];
			   var head = deepClone(tmpGame.snake[0]);
			   tmpGame.snake.unshift(head);
			   var x0 = 0,y0 = 0;
			   for(var i = 0;i < path.length;i++)
			   {
				switch(path[i])
				{
					case 'u': 
						x0 = 0;y0 = -1;break;
					case 'd': 
						x0 = 0;y0 = 1;break;
					case 'l': 
						x0 = -1;y0 = 0;break;
					case 'r': 
						x0 = 1;y0 = 0;break;
				}
				tempSnakeX[i] = head.x + x0;
				tempSnakeY[i] = head.y + y0;
				head.x = tempSnakeX[i];
				head.y = tempSnakeY[i];
			   }
			   var len = game.snake.length + 1;
			   var fuck = 0,i;
			   if(len > tempSnakeX.length)
			   {
				  for(i = tempSnakeX.length - 1;i >= 0;i--)
			      {
				        tmpGame.snake[fuck].x = tempSnakeX[i];
					    tmpGame.snake[fuck].y = tempSnakeY[i];
					    fuck++;
			   	  }
				  for(i = 0;fuck < len;fuck++,i++)
				  {
				    	tmpGame.snake[fuck].x = game.snake[i].x;
					    tmpGame.snake[fuck].y = game.snake[i].y;
			   	  }
			   }
			   else 
			   {
				for(i = tempSnakeX.length - 1;i >= tempSnakeX.length - len;i--)
			   	{
					tmpGame.snake[fuck].x = tempSnakeX[i];
					tmpGame.snake[fuck].y = tempSnakeY[i];
					fuck++;
			   	}
			   }
			    var gg = followTail(tmpGame);
			    if(gg != null && path.length == 1 && gg.length == 1)
			    {
			
			    }
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
				movePath = findTheOtherPath(game);
				if(movePath != null)
				{
			      		switch(movePath[0])
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
				movePath = dfsFindTheTail(game);
				if(movePath != null)
				{
			      		switch(movePath[0])
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
				
				goDir = findFarthestPath(game);

				if(goDir == -1) goDir = 0;
				return  dir_table[goDir];
			}

			return dir_table[findTailPath];		
			      
		}  
	      
		path = findPathBfs(game);

		if(path != null && path.length > 0)
		{
			   var tmpGame = deepClone(game);
			   var tempSnakeX = [];
			   var tempSnakeY = [];
			   var head = deepClone(tmpGame.snake[0]);
			   tmpGame.snake.unshift(head);
			   var x0 = 0,y0 = 0;
			   for(var i = 0;i < path.length;i++)
			   {
				switch(path[i])
				{
					case 'u': 
						x0 = 0;y0 = -1;break;
					case 'd': 
						x0 = 0;y0 = 1;break;
					case 'l': 
						x0 = -1;y0 = 0;break;
					case 'r': 
						x0 = 1;y0 = 0;break;
				}
				tempSnakeX[i] = head.x + x0;
				tempSnakeY[i] = head.y + y0;
				head.x = tempSnakeX[i];
				head.y = tempSnakeY[i];
			   }
			   var len = game.snake.length + 1;
			   var fuck = 0,i;
			   if(len > tempSnakeX.length)
			    {
				for(i = tempSnakeX.length - 1;i >= 0;i--)
			   	{
					tmpGame.snake[fuck].x = tempSnakeX[i];
					tmpGame.snake[fuck].y = tempSnakeY[i];
					fuck++;
			   	}
				for(i = 0;fuck < len;fuck++,i++)
				{
					tmpGame.snake[fuck].x = game.snake[i].x;
					tmpGame.snake[fuck].y = game.snake[i].y;
				}
			    }
			   else 
			   {
				for(i = tempSnakeX.length - 1;i >= tempSnakeX.length - len;i--)
			   	{
					tmpGame.snake[fuck].x = tempSnakeX[i];
					tmpGame.snake[fuck].y = tempSnakeY[i];
					fuck++;
			   	}
			   }
			   var gg = followTail(tmpGame);

			   if(gg != null) 
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
				movePath = dfsFindTheTail(game);
				if(movePath != null)
				{
			      		switch(movePath[0])
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
				movePath = findTheOtherPath(game);
				if(movePath != null)
				{
		
			      		switch(movePath[0])
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
					clearMap(game);    
					movePath = dfsFindTheTail(game);
					if(movePath != null)
					{
			      			switch(movePath[0])
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
                x1 = node.x + dir[i][0];
                y1 = node.y + dir[i][1];
		        if(x1 == game.snake[len - 1].x && y1 == game.snake[len - 1].y)
                {
                      return node.traceCmd() + dir_Char[i];
                }
		        if(legal(x1,y1) == true)  
		        {
		        	markMap[x1][y1] = true;       	
			        queue.push(new SearchState(x1,y1, dir_Char[i], node)); 
                }
            }
        }
        return null;
    }
     function lastFollowTail(game) {  
	 var  found, head, i, j, max, move, next, node, queue, tail ,x1,y1;
      	 head = game.snake[0];
     	 tail = game.snake[game.snake.length - 1];
      	 clearMap(game);
      	 queue = [new SearchState(head.x,head.y)];
	     minMap[head.x][head.y] = 0;
      	 found = false;
      	 while (queue.length > 0) {
        	node = queue.shift();
        	for(i = 0;i < 4;i++){
			    x1 = node.x + dir[i][0];
                y1 = node.y + dir[i][1];
			    if(x1 == tail.x && y1 == tail.y){
                        	found = true;
                }
			    if(legal(x1,y1) == true)  
			    {
			        minMap[x1][y1] = minMap[node.x][node.y] + 1;
				    markMap[x1][y1] = true;       	
				    queue.push(new SearchState(x1,y1, dir_Char[i], node)); 
                }
		    }
        }
      move = null;
      if (found) {     
        max = -1;
        for (i = 0; i < 4; i++) {
	
         	 x1 = head.x + dir[i][0];
   	  	     y1 = head.y + dir[i][1];
	
          	if (legal(x1,y1) || (x1 == tail.x && y1 == tail.y)) { 
               		if (minMap[x1][y1] > max) {
                   		max = minMap[x1][y1];			   
                  	 	move = i;
               		}
          	}
         }
       }
        return move;
    };

    function dfsTheFarsetPathToTheTail(endx,endy,x0,y0,s,sign,curPath)
     {
	 var i,x1,y1;
	 for(i = 0;i < 4;i++)
	 {
		x1 = x0 + dir[i][0];
            	y1 = y0 + dir[i][1];
		if(x1 == endx && y1 == endy)
		{
			if(curPath == null) curPath = dir_Char[i];
			else  curPath = curPath + dir_Char[i];
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
	     for(i = 0;i < 4;i++){
	     	x1 = game.snake[0].x + dir[i][0];
            y1 = game.snake[0].y + dir[i][1];
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
				if(curPath == null) curPath = dir_Char[i];
				else  curPath += dir_Char[i];
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
        var tmp,tail,x1,y1,j,i,len;
	    for(i = 0;i < 4;i++)
	    {
		    x1 = game.snake[0].x + dir[i][0];
            y1 = game.snake[0].y + dir[i][1];
          	if (legal(x1, y1) == true) { 
			tmp =  deepClone(game);
			len = tmp.snake.length;
			tail = game.snake[len - 1];
			markMap[tail.x][tail.y] = false;
			for(j = len - 1;j > 0;j--)
			{
				tmp.snake[j].x = game.snake[j - 1].x;
				tmp.snake[j].y = game.snake[j - 1].y;
			}
			tmp.snake[0].x = x1;
			tmp.snake[0].y = y1;
			sign  =  followTail(tmp);
			if(sign != null)
			{
				return dir_Char[i] + sign;
			}
			markMap[x1][y1] = true;
			var gg = dfsFindTheTail(game);
			if(gg != null)
			{
			     return  dir_Char[i] + gg;
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
       frankSnakeQueue = [new HeapSnake(head.x,head.y,game.snake)];
       var tmp;
       while (frankSnakeQueue.length > 0) {
         	node = frankSnakeQueue.shift();     	
        	for (var i = 0; i < 4; i++) {
 	   		var x1 = node.x + dir[i][0];
            		var y1 = node.y + dir[i][1];
          		if (legal(x1, y1)) { 
				    markMap[x1][y1] = true;
				    tmp =  deepClone(node);
			        len = tmp.snake.length;
				for(var j = len - 1;j > 0;j--)
				{
					tmp.snake[j].x = node.snake[j - 1].x;
					tmp.snake[j].y = node.snake[j - 1].y;
				}
				tmp.snake[0].x = x1;
				tmp.snake[0].y = y1;
				sign  =  followTail(tmp);
				if(sign != null)
				{
					return node.traceCmd() + dir_Char[i] + sign;
				}
            			frankSnakeQueue.push(new HeapSnake(x1,y1,tmp.snake,dir_Char[i], node)); 
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
 	       var x1 = node.x + dir[i][0];
           var y1 = node.y + dir[i][1];
	   if(x1 == game.food[0].x && y1 == game.food[0].y){
		return node.traceCmd() + dir_Char[i];
	   } 
          if (legal(x1, y1)) { 
	          markMap[x1][y1] = true;      
             queue.push(new SearchState(x1,y1, dir_Char[i], node)); 
          }
        }
      } 
      return null;       
    }
    function findFarthestPath(game)
    {
        var max = 0;
        var goDir = -1;
        var x1 = game.food[0].x;
        var y1 = game.food[0].y;
        clearMap(game);
        for(var i = 0;i< 4;i++)
        {
            var x = game.snake[0].x + dir[i][0];
            var y = game.snake[0].y + dir[i][1];
            if(legal(x,y) == true && max < (x - x1) * (x - x1) + (y - y1) * (y - y1))
            {
		        max = (x - x1) * (x - x1) + (y - y1) * (y - y1);
		        goDir = i;
            }
        }
        return goDir;
    }
    function legal(x,y)
    {
        if(x < 0 || x >= w|| y < 0 || y >= h)  return false;
        if(markMap[x][y] == true) 
            return false;
        return true;
    }
}