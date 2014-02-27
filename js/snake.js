function init() {
    console.log("init");
    d = "right";
    createSnake();
    createFood();
    score = 0;
    step = 0;
    loop();
}

function createSnake() {
    console.log("create snake");
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
    console.log("create food");
    food = {
	x: Math.round(Math.random() * (w - cw) / cw)
	,y: Math.round(Math.random() * (h - cw) / cw)
    };
    if(checkCollision(food.x, food.y, snake)) {
	createFood();
    }
}

function paint() {
    console.log("paint");
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
    console.log("loop, " + step);
    step ++ ;
    action = think();
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

$(document).keydown(function(e) {
    var key = e.which;
    if(key == "66" && res!= "right") {
	d = "left";
    } else if(key == "80" && res!= "down") {
	d = "up";
    } else if(key == "70" && res!= "left") {
	d = "right";
    } else if(key == "78" && res!= "up") {
	d = "down";
    }
});

function think() {
    eval($("#ai").val());
    return res;
}

function manual() {
    res = d;
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
    step = 0;

    res = 0;

    snake = [];

    $('#btn-start').click(function() {
	init();
    });
    $('#btn-clear').click(function() {
	$('#ai').val('');
    });

    codeExample = [
	'		manual();\n		// use p, n, b, f to control (just like emacs)'
	,''
	,''
    ]

    $('#ai-examples').change(function() {
	$('#ai').val(codeExample[$('#ai-examples').get(0).selectedIndex]);
    })

    paint();
})
