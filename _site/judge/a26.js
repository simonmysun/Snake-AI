/*team 26
Author xyz
Version ...
Time 20140424
Code: ...
*/

function createThink(w,h) {
    var minMap = [];
    var nextFood;
    var bfsqueue;
    var tmpSnake = [];
    var tmpMinMap =[];
    var tmpSnakeSize = 0;
    var move = ["up","down","left","right"];
    for(var x = 0; x < w; x ++ ) {
        minMap[x] = [];
        for(var y = 0; y < h; y ++ ) {
            minMap[x][y] = 99999999;
        }
    }

    function clearMap(minMaps) {
        for(var x in minMaps) {
            for(var y in minMaps[x]) {
                minMaps[x][y] = 99999999;
            }
        }
    }
//是蛇则为true
function checkCollision(x, y, s) {
    for(var p in s) {
        if(x === s[p].x && y === s[p].y) {
            return true;
        }
    }
    return false;
}

function isMovePossible(x, y, moves) {
    var sign = false;
    if (moves === 'left') {
        if (x > 0)
            sign = true;
    }
    else if (moves === 'right') {
        if (x < w - 1)
            sign = true;
    }
    else if (moves === 'down') {
        if (y < h - 1)
            sign = true;
    }
    else if (moves === 'up') {
        if (y > 0)
            sign = true;
    }
    return sign;
}

function bfs(loc, snakes, minMaps) {
    bfsqueue = [];
    var found = false;
    bfsqueue.push({
        x: loc.x
        ,y: loc.y
        ,dist: 0
    });
    while(bfsqueue.length > 0) {
        loc = bfsqueue.shift();

        if(checkCollision(loc.x, loc.y, snakes)) {
                minMaps[loc.x][loc.y] = -1; //是蛇则为-1
                continue;
            }
            if(minMaps[loc.x][loc.y] != 99999999) {
                continue;
            }
            minMaps[loc.x][loc.y] = loc.dist;
            for(var i = 0; i < 4; i++) {
                if(isMovePossible(loc.x,loc.y,move[i]))
                {
                    var knot = DirOpera(loc,move[i]);
                    if(knot.x == snakes[0].x && knot.y == snakes[0].y)
                        found = true;
                    bfsqueue.push({
                        x: knot.x
                        ,y: knot.y
                        ,dist: loc.dist + 1
                    });
                }   
            }
        }
        return found;
    }

    function DirOpera(knots, moves) {
        var knotx = deepClone(knots);
        if (moves === "up")
            knotx.y -= 1;
        else if (moves === "down")
            knotx.y += 1;
        else if (moves === "left")
            knotx.x -= 1;
        else if (moves === "right")
            knotx.x += 1;
        return knotx;
    }

    function ShortestMove(head,snakes,minMaps) {
        var minDirect = -1;
        var minDist = 99999999;
        for(var i = 0; i < 4; i++) {
            if(isMovePossible(head.x,head.y,move[i])) {
                var knot = DirOpera(head,move[i]);
                if(checkCollision(knot.x,knot.y,snakes) == false) {
                    if(minDist > minMaps[knot.x][knot.y] && minMaps[knot.x][knot.y] != -1) {
                        minDirect = move[i];
                        minDist = minMaps[knot.x][knot.y];
                    }
                }
            }
        }
        return minDirect;
    }

    function LongestMove(head,snakes,minMaps) {
        var maxDirect = -1;
        var maxDist = -1;
        for(var i = 0; i < 4; i++) {
            if(isMovePossible(head.x,head.y,move[i])) {
                var knot = DirOpera(head,move[i]);
                if(checkCollision(knot.x,knot.y,snakes) == false) {
                    if(maxDist < minMaps[knot.x][knot.y] && minMaps[knot.x][knot.y] != -1) {
                        maxDirect = move[i];
                        minDist = minMaps[knot.x][knot.y];
                    }
                }
            }
        }
        return maxDirect;
    }

    function Wonder(game) {
        BestMove = -1;
        var head = game.snake[0];
        clearMap(minMap); 
        bfs(game.food[0],game.snake,minMap); 
        var min = 99999999;
        for(var i = 0; i < 4; i++) {
            if(isMovePossible(head.x,head.y,move[i])) {
                var knot = DirOpera(head,move[i]);
                if(minMap[knot.x][knot.y] < min) {
                    min = minMap[knot.x][knot.y];
                    BestMove = move[i];
                }
            }
        }
        return BestMove;
    }

    function VirtualMove(game) {
        tmpSnakeSize = game.snake.length;
        tmpSnake = deepClone(game.snake);
        tmpMinMap = deepClone(minMap);
        
        var GetFood = false;
        var BestMove;
        BestMove = ShortestMove(tmpSnake[0],tmpSnake,tmpMinMap);
        if(BestMove == -1)
            return false;
        ShiftArray(tmpSnake,tmpSnakeSize);
        tmpSnake[0] = DirOpera(tmpSnake[0],BestMove);
        if(tmpSnake[0].x === game.food[0].x && tmpSnake[0].y === game.food[0].y) {
            tmpSnakeSize += 1;
        }
        else {
            tmpMinMap[tmpSnake[0].x][tmpSnake[0].y] = -1;
            tmpMinMap[(tmpSnake[tmpSnakeSize]).x][(tmpSnake[tmpSnakeSize]).y] = 99999999;
            tmpSnake.pop();
        }
        clearMap(tmpMinMap);
        return true;
    }

    function ShiftArray(tmpSnake,tmpSnakeSize) {
        for(var i = tmpSnakeSize; i > 0; i--)
            tmpSnake[i] = tmpSnake[i-1];
    }

    function IsTailAvaliable(foods) {
        var tmpFood = {
            x:tmpSnake[tmpSnakeSize - 1].x
            ,y:tmpSnake[tmpSnakeSize - 1].y
        };
        clearMap(tmpMinMap);
        tmpMinMap[foods.x][foods.y] = -1;
        var tmpSnakes = deepClone(tmpSnake);
        tmpSnakes.pop();
        var result = bfs(tmpFood,tmpSnakes,tmpMinMap);
        return result;
    }

    function FollowTail(game) {
        tmpSnakeSize = game.snake.length;
        tmpSnake = deepClone(game.snake);
        clearMap(tmpMinMap); //重置虚拟的tmpMinMap
        var temp = tmpSnake[tmpSnakeSize - 1];
        var tmpFood = {
            x: temp.x
            ,y: temp.y
        };
        tmpMinMap[game.food[0].x][game.food[0].y] = -1; //让食物的地方变成蛇身
        var tmpSnakes = deepClone(tmpSnake);
        tmpSnakes.pop();
        bfs(tmpFood, tmpSnakes,tmpMinMap);
        tmpMinMap[tmpSnake[tmpSnakeSize - 1].x][tmpSnake[tmpSnakeSize - 1].y] = -1;  //还原蛇尾
        return LongestMove(tmpSnake[0],tmpSnake,tmpMinMap); //返回运行方向（让蛇头运行一步）
    }

    function FindSafeWay(game) {
        var SafeWay = -1;
        var head = game.snake[0];
        if(VirtualMove(game)) {
            if(IsTailAvaliable(game.food[0]))
                return ShortestMove(head,game.snake,minMap);
        }
        SafeWay = FollowTail(game);
        return SafeWay;
    }
    
    return function(game) {
        head = game.snake[0];
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
            bfs(game.food[0], game.snake,minMap);
        }
        else {
            minMap = [];
            for(var x = 0; x < w; x ++ ) {
                minMap[x] = [];
                for(var y = 0; y < h; y ++ ) {
                    minMap[x][y] = 99999999;
                }
            }
            //bfs(game.food[0], game.snake,minMap);
        }
        if(game.food[0].x != nextFood.x || game.food[0].y != nextFood.y) {
            nextFood = game.food[0];
        }
        var BestMove = "right";
        bfs(game.food[0],game.snake,minMap);
        BestMove = FindSafeWay(game);
        if(BestMove == -1)
            BestMove = Wonder(game);
        if(BestMove == -1)
            BestMove = "right";
        return BestMove;
    };
}