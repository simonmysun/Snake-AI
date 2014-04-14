---
layout: page
title: 示例代码
---
## 一个向右向下行进的蛇

	function createThink(w, h) {
	    var dir = 'right'
	    return function(game) {
	        if(dir === 'right') {
	            dir = 'down';
	            return dir;
	        } else {
	            dir = 'right';
	            return dir;
	        }
	    }
	}


## 一个简单的智能脚本

	function createThink(w, h) {
	    var previousDirection = 'right';
	    var out = false;
	    return function(game) {
	        var head = game.snake[0];
	        var food = game.food[0];
	        if(out) {
	            if(previousDirection === 'down' && game.snake[0].y === h - 1) {
	                previousDirection = 'left';
	                out = false;
	                return previousDirection;
	            }
	            if(previousDirection === 'down') {
	                return previousDirection;
	            }
	            if(previousDirection === 'left') {
	                previousDirection = 'down';
	                return previousDirection;
	            }
	            if(previousDirection === 'up' && game.snake[0].y > game.food[0].y && game.food[0].x === game.snake[0].x) {
	                return previousDirection;
	            }
	            previousDirection = 'left';
	            return previousDirection;
	        } else {
	            if(game.snake[0].x === 0 && game.snake[0].y === 0) {
	                previousDirection = 'right';
	                return previousDirection;
	            }
	            if(game.snake[0].x === w - 1 && game.snake[0].y === 0) {
	                previousDirection = 'down';
	                return previousDirection;
	            }
	            if(game.snake[0].x === 0 && game.snake[0].y === h - 1) {
	                previousDirection = 'up';
	                return previousDirection;
	            }
	            if(game.snake[0].x === w - 1 && game.snake[0].y === h - 1) {
	                previousDirection = 'left';
	                return previousDirection;
	            }
	            if(game.snake[0].x === game.food[0].x && game.snake[0].y === h - 1) {
	                out = true;
	                previousDirection = 'up';
	                return previousDirection;
	            }
	            return previousDirection;
	        }
	    };
	}


## 一个非常拙劣的基于宽度优先搜索的脚本

	function createThink(w,h) {
	    var minMap = [];
	    var nextFood;
	    var bfsqueue;
	    for(var x = 0; x < w; x ++ ) {
	        minMap[x] = [];
	        for(var y = 0; y < h; y ++ ) {
	            minMap[x][y] = 99999999;
	        }
	    }
	
	    function clearMap() {
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
	    
	    function bfs(loc, game) {
	        bfsqueue = [];
	        bfsqueue.push({
	            x: loc.x
	            ,y: loc.y
	            ,dist: 0
	        });
	        while(bfsqueue.length > 0) {
	            loc = bfsqueue.shift();
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
	            bfs(game.food[0], game);
	        }
	        if(game.food[0].x != nextFood.x || game.food[0].y != nextFood.y) {
	            clearMap();
	            bfs(game.food[0], game);
	            nextFood = game.food[0];
	        }
	        var minDirect = "right";
	        var minDist = 99999999;
	        if(legal(head.x + 1, head.y, game)) {
	            if(checkCollision(head.x + 1, head.y, game.snake) == false) {
	                if(minDist > minMap[head.x + 1][head.y] && minMap[head.x + 1][head.y] != -1) {
	                    minDirect = "right";
	                    minDist = minMap[head.x + 1][head.y];
	                }
	            }
	        }
	        if(legal(head.x - 1, head.y, game)) {
	            if(checkCollision(head.x - 1, head.y, game.snake) == false) {
	                if(minDist > minMap[head.x - 1][head.y] && minMap[head.x - 1][head.y] != -1) {
	                    minDirect = "left";
	                    minDist = minMap[head.x - 1][head.y];
	                }
	            }
	        }
	        if(legal(head.x, head.y + 1, game)) {
	            if(checkCollision(head.x, head.y + 1, game.snake) == false) {
	                if(minDist > minMap[head.x][head.y + 1] && minMap[head.x][head.y + 1] != -1) {
	                    minDirect = "down";
	                    minDist = minMap[head.x][head.y + 1];
	                }
	            }
	        }
	        if(legal(head.x, head.y - 1, game)) {
	            if(checkCollision(head.x, head.y - 1, game.snake) == false) {
	                if(minDist > minMap[head.x][head.y - 1] && minMap[head.x][head.y - 1] != -1) {
	                    minDirect = "up";
	                    minDist = minMap[head.x][head.y - 1];
	                }
	            }
	        }
	        return minDirect;
	    };
	}