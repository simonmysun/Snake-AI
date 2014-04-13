var delay = 60;
var keyboardDirection = '';
var codeExample = [
    ''
];

var worker;
var time;
var running;
var think;

var snake = new Snake();

function showShare() {
    getUrl(window.location.href, function(res) {
        $('#share-qr').attr('src',res + '.qr');
        var msgEn = "My AI script scored " + snake.totScore + " on snake game. Someone challenging me? -> " + res;
        $('#share-en').text(msgEn);
        var msgCn = '#贪吃蛇AI#我的贪吃蛇 AI 脚本刚刚得了 ' + snake.totScore + ' 分, 有人来围观/挑战我的代码么?  -> ' + res;
        $('#share-cn').text(msgCn);
        $('#modal-share').modal('show');
    });
}

function deepClone(obj) {
    var buffer;
    if(obj instanceof Array) {
        buffer = [];
        var i = obj.length;
        while(i--) {
            buffer[i] = deepClone(obj[i]);
        }
        return buffer;
    } else if (obj instanceof Object) {
        buffer = {};
        for(var k in obj) {
            buffer[k] = deepClone(obj[k]);
        }
        return buffer;
    } else {
        return obj;
    }
}

$(document).keydown(function(e) {
    var key = e.which;
    if(key == '66' || key == 'h' || key == '37') {
	keyboardDirection = 'left';
    } else if(key == '80' || key == '75' || key == '38') {
	keyboardDirection = "up";
    } else if(key == "70" || key == "76" || key == "39") {
	keyboardDirection = "right";
    } else if(key == "78" || key == "74" || key == "40") {
	keyboardDirection = "down";
    }
});

function updateUrl() {
    var js = $('#ai').val();
    document.location.hash = Base64.encode([js].join("\x7f"));
};

onkeyup = updateUrl;

function finish(snake) {
    console.log(snake.totScore);
}

function loop() {
    if(running) {
        if(snake.tick < 10000) {
            setTimeout(function() {
                var state = {
                    snake: snake.snake
                    ,food: snake.food
                };
                var result = think(deepClone(state));
                snake.loop(result);
                paint();
                $('#score').html(snake.totScore);
                loop();
            }, delay);
        } else {
            snake.kill();
            clearTimeout(time);
            finish(snake);
        }
    }
}

function paint() {
    var cw = width / 20;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#333';
    ctx.font = height + 'px Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(snake.score.toString(), width / 2, height * .9);
    for(var p in snake.snake) {
	var x = snake.snake[p].x;
	var y = snake.snake[p].y;
	ctx.fillStyle = '#FFDC00';
	ctx.fillRect(x * cw, y * cw, cw, cw);
	ctx.strokeStyle = 'white';
	ctx.strokeRect(x * cw, y * cw, cw, cw);
    }
    for(var p in snake.food) {
	var x = snake.food[p].x;
	var y = snake.food[p].y;
        ctx.fillStyle = '#0074D9';
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }
}

$(document).ready(function() {
    canvas = $('#playground')[0];
    ctx = canvas.getContext("2d");
    width = $('#playground').width();
    height = $('#playground').height();

    $('#btn-start').click(function() {
        running = true;
        think = createThink(w, h);
        snake.init('game');
        time = setTimeout(function() {
            snake.kill();
            finish(snake);
            console.log('Time out. ');
            running = false;
            snake.init();
        }, 300 * 1000);
        loop();
    });
    
    $('#btn-reset').click(function() {
	$('#ai').val('');
        running = false;
    });

    $('#btn-mode').click(function() {
	delay ^= 60;
    });

    $('#ai-examples').change(function() {
	$('#ai').val(codeExample[$('#ai-examples').get(0).selectedIndex]);
        updateUrl();
    });

    $('#ai').val(Base64.decode(unescape((location).hash).split("\x7F")[0]||""));
    
    paint();
});
