function createThink(w,h) {
    var minMap = [];
    var tmpMap = [];
    var nextFood;
    var tmpGame;
    var bfsqueue;
    for(var x = 0; x < w; x ++ ) {
        minMap[x] = [];
	tmpMap[x] = [];
        for(var y = 0; y < h; y ++ ) {
            minMap[x][y] = 99999999;
	    tmpMap[x][y] = 99999999;
        }
    }

    function clearMap(minMap) {
    for(var x in minMap) {
        for(var y in minMap[x]) {
        minMap[x][y] = 99999999;
        }
    }
    }

    function legal(x, y, game) {
    if(x >= w || x <= -1 || y >= h || y <= -1) {
        return false;
    } else {
        return true;
    }
    }
    function checkCollision(x, y, s) {
        for(var p in s) {
            if(x === s[p].x && y === s[p].y) {
                return true;
            }
        }
        return false;
    }
    
    //广度优先搜索整个场地，找出每个不是蛇身的位置到食物的距离
    function bfs(loc,minMap ,game) {
        bfsqueue = [];
	found = false;
        bfsqueue.push({
            x: loc.x
            ,y: loc.y
            ,dist: 0
        });
        while(bfsqueue.length > 0) {
            loc = bfsqueue.shift();
	    if(loc.x == game.snake[0].x && loc.y == game.snake[0].y)
		found = true;
            if(legal(loc.x, loc.y, game) == false) {
                continue;
            }
            if(checkCollision(loc.x, loc.y, game.snake)) {
                minMap[loc.x][loc.y] = -1;
                continue;
            }
            if(minMap[loc.x][loc.y] != 99999999) {
                continue;
            }
            minMap[loc.x][loc.y] = loc.dist;
            bfsqueue.push({
                x: loc.x
                ,y: loc.y - 1
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x
                ,y: loc.y + 1
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x - 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x + 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
        }
	return found;
    }
    
    //在蛇头的四周找出一个最短路径
    function choose_shortest_move(minMap,game) {
	head = game.snake[0];
	var direct = "error";
        var minDist = 99999999;
        if(legal(head.x + 1, head.y, game)) {
            if(checkCollision(head.x + 1, head.y, game.snake) == false) {
                if(minDist > minMap[head.x + 1][head.y] && minMap[head.x + 1][head.y] != -1) {
                    direct = "right";
                    minDist = minMap[head.x + 1][head.y];
                }
            }
        }
        if(legal(head.x - 1, head.y, game)) {
            if(checkCollision(head.x - 1, head.y, game.snake) == false) {
                if(minDist > minMap[head.x - 1][head.y] && minMap[head.x - 1][head.y] != -1) {
                    direct = "left";
                    minDist = minMap[head.x - 1][head.y];
                }
            }
        }
        if(legal(head.x, head.y + 1, game)) {
            if(checkCollision(head.x, head.y + 1, game.snake) == false) {
                if(minDist > minMap[head.x][head.y + 1] && minMap[head.x][head.y + 1] != -1) {
                    direct = "down";
                    minDist = minMap[head.x][head.y + 1];
                }
            }
        }
        if(legal(head.x, head.y - 1, game)) {
            if(checkCollision(head.x, head.y - 1, game.snake) == false) {
                if(minDist > minMap[head.x][head.y - 1] && minMap[head.x][head.y - 1] != -1) {
                    direct = "up";
                    minDist = minMap[head.x][head.y - 1];
                }
            }
        }
	return direct;
    }

    //当蛇头与食物间不存在路径时，让蛇头追着尾巴走
    function follow_tail(tmpGame) {
	clearMap(tmpMap);
	var tail = tmpGame.snake.pop();
	tmpGame.snake.push(tmpGame.food[0]);
	tmpGame.food[0] = deepClone(tail);

	bfs(tmpGame.food[0],tmpMap,tmpGame);
	tmpGame.snake.pop();
	tmpGame.snake.push(tmpGame.food[0]);
	return 	choose_shortest_move(tmpMap,tmpGame);
    }

    return function(game) {
	var minDirect;
        
        if(nextFood == undefined) {
            nextFood = game.food[0];
        }
	
        if(minMap == undefined) {
            minMap = [];
            for(var x = 0; x < game.width; x ++ ) {
                minMap[x] = [];
                for(var y = 0; y < game.height; y ++ ) {
                    minMap[x][y] = 99999999;
                }
            }
            
        }
	
        if(game.food[0].x != nextFood.x || game.food[0].y != nextFood.y) {

            nextFood = game.food[0];
        }
	clearMap(minMap);
	if(bfs(game.food[0], minMap, game)) {
	    minDirect = choose_shortest_move(minMap,game);
	}
	else {
	    minDirect = follow_tail(deepClone(game));
	}

        return minDirect;
    };
}
