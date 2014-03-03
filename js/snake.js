function init() {
    keyboardDirection = "right";
    createSnake();
    createFood();
    score = 0;
    tick = 0;
    window.eval($("#ai").val());
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
    
    for(p in snake) {
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
    action = think({snake:snake,food:food,width:w,height:h});
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
    setTimeout(loop, 60);
}

function checkCollision(x, y, arr) {
    for(p in arr) {
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

function think(snake, food, width, height) {
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
