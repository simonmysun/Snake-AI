var think;

function init() {
    keyboardDirection = "right";
    createSnake();
    createFood();
    score = 0;
    tick = 0;
    window.eval($("#ai").val());
    think = createThink();
    loop();
}

function createSnake() {
    var length = 5;
    snake = [];
    for(var i = length - 1; i >= 0 ; i -- ) {
	snake.push({
	    x: i
	    ,y: 0
	});
    }
}

function createFood() {
    food = {
	x: Math.round(Math.random() * (w - cw) / cw)
	,y: Math.round(Math.random() * (h - cw) / cw)
    };
    if(checkCollision(food.x, food.y, snake)) {
	createFood();
    }
}

function paint() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "grey";
    ctx.strokeRect(0, 0, w, h);
    
    for(var p in snake) {
	x = snake[p].x;
	y = snake[p].y;
	ctx.fillStyle = "yellow";
	ctx.fillRect(x * cw, y * cw, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x * cw, y * cw, cw, cw);
    }
	
    ctx.fillStyle = "blue";
    ctx.fillRect(food.x * cw, food.y * cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(food.x * cw, food.y * cw, cw, cw);
    
    ctx.fillText(score.toString(), 5, h - 5);
}

function loop() {
    tick ++ ;
    action = think({
	snake: snake
	,food: food
	,width: w / cw
	,height: h / cw
    });
    res = action;
    var nx = snake[0].x;
    var ny = snake[0].y;
    
    if(action == "right") {
	nx ++ ;
    }
    if(action == "left") {
	nx -- ;
    }
    if(action == "up") {
	ny -- ;
    }
    if(action == "down") {
	ny ++ ;
    }
    
    if(nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || checkCollision(nx, ny, snake)) {
	console.log("Finished at " + score.toString());
	return;
    }
    
    var tail = snake.pop();
    snake.unshift({
	x: nx
	,y: ny
    });
    if(nx == food.x && ny == food.y) {
	score ++ ;
	createFood();
	snake.push(tail);
    }
    paint();
    _log();
    setTimeout(loop, period);
}

function checkCollision(x, y, arr) {
    for(var p in arr) {
	if(arr[p].x == x && arr[p].y == y) {
	    return true;
	}
    }
    return false;
}

function _log() {
    var strLog = '';
    strLog = strLog.concat('Score: ' + score.toString() + '\n');
    strLog = strLog.concat('Ticks passed: ' + tick.toString() + '\n');
    $('#results').text(strLog);
}

$(document).keydown(function(e) {
    var key = e.which;
    if((key == "66" || key == "h" || key == "37") && res!= "right") {
	keyboardDirection = "left";
    } else if((key == "80" || key == "75" || key == "38") && res!= "down") {
	keyboardDirection = "up";
    } else if((key == "70" || key == "76" || key == "39") && res!= "left") {
	keyboardDirection = "right";
    } else if((key == "78" || key == "74" || key == "40" ) && res!= "up") {
	keyboardDirection = "down";
    }
});

function createThink() {
    var minMap;
    var nextFood;

    function clearMap() {
	for(var x in minMap) {
	    for(var y in minMap[x]) {
		minMap[x][y] = 99999999;
	    }
	}
    }

    function legal(x, y, game) {
	if(x >= game.width || x <= -1 || y >= game.height || y <= -1) {
	    return false;
	} else {
	    return true;
	}
    }

    function bfs(loc, dist, game) {
	if(legal(loc.x, loc.y, game) == false) {
	    return -1;
	}
	if(checkCollision(loc.x, loc.y, game.snake)) {
	    return -1; 
	}
	if(minMap[loc.x][loc.y] != 99999999) {
	    return minMap[loc.x][loc.y];
	}
	minMap[loc.x][loc.y] = dist + 1;
	bfs({
	    x: loc.x
	    ,y: loc.y - 1
	}, dist + 1,  game);
	bfs({
	    x: loc.x
	    ,y: loc.y + 1
	}, dist + 1,  game);
	bfs({
	    x: loc.x - 1
	    ,y: loc.y
	}, dist + 1,  game);
	bfs({
	    x: loc.x + 1
	    ,y: loc.y
	}, dist + 1,  game);
    }

    return function(game) {
	head = game.snake[0];
	if(nextFood == undefined) {
	    nextFood = game.food;
	}
	if(minMap == undefined) {
	    minMap = [];
	    for(var x = 0; x < game.width; x ++ ) {
		minMap[x] = [];
		for(var y = 0; y < game.height; y ++ ) {
		    minMap[x][y] = 99999999;
		}
	    }
	    bfs(game.food, 0, game);
	}
	if(game.food.x != nextFood.x && game.food.y != nextFood.y) {
	    clearMap();
	    bfs(game.food, 0, game);
	    nextFood = game.food;
	}
	var minDirect = "right";
	var minDist = 99999999;
	if(legal(head.x + 1, head.y, game)) {
	    if(checkCollision(head.x + 1, head.y, game.snake) == false) {
		if(minDist >  minMap[head.x + 1][head.y]) {
		    minDirect = "right";
		    minDist = minMap[head.x + 1][head.y];
		}
	    }
	}
	if(legal(head.x - 1, head.y, game)) {
	    if(checkCollision(head.x - 1, head.y, game.snake) == false) {
		if(minDist >  minMap[head.x - 1][head.y]) {
		    minDirect = "left";
		    minDist = minMap[head.x - 1][head.y];
		}
	    }
	}
	if(legal(head.x, head.y + 1, game)) {
	    if(checkCollision(head.x, head.y + 1, game.snake) == false) {
		if(minDist >  minMap[head.x][head.y + 1]) {
		    minDirect = "down";
		    minDist = minMap[head.x][head.y + 1];
		}
	    }
	}
	if(legal(head.x, head.y - 1, game)) {
	    if(checkCollision(head.x, head.y - 1, game.snake) == false) {
		if(minDist >  minMap[head.x][head.y - 1]) {
		    minDirect = "up";
		    minDist = minMap[head.x][head.y - 1];
		}
	    }
	}
	return minDirect;
    };
}

$(document).ready(function() {
    canvas = $('#playground')[0];
    ctx = canvas.getContext("2d");
    w = $('#playground').width();
    h = $('#playground').height();

    cw = 10;
    d = "";
    food = {};
    score = 0;
    tick = 0;

    res = 0;

    snake = [];

    paint();
    _log();
});
