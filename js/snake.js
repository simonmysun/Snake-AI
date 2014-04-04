var think;

function init() {
    keyboardDirection = "right";
    createSnake();
    createFood();
    //createThink = undefined;
    //think = undefined;

    window.eval($('#ai').val());

    if(typeof createThink != 'function') {
	alert('Bad AI');
	return;
    }

    $('#results').each(function() {
	$(this).attr('id','');
	$(this).after('<div id="results"></div>');
    });

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
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#333';
    ctx.font = h + 'px Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(score.toString(), w / 2, h * .9);
    
    for(var p in snake) {
	x = snake[p].x;
	y = snake[p].y;
	ctx.fillStyle = '#FFDC00';
	ctx.fillRect(x * cw, y * cw, cw, cw);
	ctx.strokeStyle = 'white';
	ctx.strokeRect(x * cw, y * cw, cw, cw);
    }
	
    ctx.fillStyle = '#0074D9';
    ctx.fillRect(food.x * cw, food.y * cw, cw, cw);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(food.x * cw, food.y * cw, cw, cw);
    
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
    
    if(nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || checkCollision(nx, ny, snake) || tick > steps) {
	console.log("Finished at " + score.toString());
        totScore += score * score;
        if(tick <= steps) {
            score = 0;
            init();
        }
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
    strLog = strLog.concat('Total Score: ' + totScore.toString() + '\n');
    $('#results').text(strLog);
}

