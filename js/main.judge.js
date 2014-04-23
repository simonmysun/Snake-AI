var sourceList = [
    'team0.js'
    ,'team1.js'
    ,'team2.js'
    ,'team3.js'
    ,'team4.js'
    ,'team5.js'
]

var delay = 90;

var worker;
var time;
var running = false;
var countup;
var lastScore = 0;

var nanobar = new Nanobar();

var snake = new Snake();

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

function finish(snake) {
    running = false;
    snake.kill();
    refreshDisplay();
    clearTimeout(time);
    console.log(snake.totScore);
    snake.init('game');
}

function refreshDisplay() {
    if(lastScore !== snake.totScore) {
        countup.stop();
        countup = new countUp("score", lastScore, snake.totScore, 0, 2.5, {
            useEasing : true
            ,useGrouping : true
            ,separator : ','
            ,decimal : '.'
        });
        lastScore = snake.totScore;
        countup.start();
    }
}

function loop() {
    if(running) {
        if(snake.tick <= 10000) {
            setTimeout(function() {
                var state = {
                    snake: snake.snake
                    ,food: snake.food
                };
                worker.postMessage({
                    type: 'game state'
                    ,data: deepClone(state)
                });
            }, delay);
        } else {
            finish(snake);
            worker.terminate();
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
        ctx.fillStyle = "rgba(225, 220, 0, " + (1 - 0.7 * (p / snake.snake.length)).toString() + ")";
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

function loadGame(code) {
    finish(snake);
    var src = 'data:text/javascript;base64,' + Base64.encode(code);
    worker.terminate();
    worker = new Worker('./../js/worker.js');
    worker.postMessage({
        type: 'url'
        ,data: src
    });
    worker.onmessage = function(sdata) {
        var data = sdata.data;
        if(data.type === 'result') {
            snake.loop(data.data);
            refreshDisplay();
            paint();
            loop();
        }
    }
    worker.onerror = function(e){
        console.log(e.message);
        console.log(e.lineno);
        console.log(e.filename);
    };
}

function startGame() {
    finish(snake);
    countup = new countUp("score", 0, snake.totScore, 0, 0.5, {
        useEasing : true
        ,useGrouping : true
        ,separator : ','
        ,decimal : '.'
    });
    lastScore = 0;
    running = true;
    worker.postMessage({
        type: 'init'
        ,data: {
            w: 20
            ,h: 15
        }
    });
    snake.init('game');
    time = setTimeout(function() {
        finish(snake);
        worker.terminate();
        console.log('Time out. ');
    }, 30 * 1000);
    loop();
}

$(document).ready(function() {
    canvas = $('#playground')[0];
    ctx = canvas.getContext("2d");
    width = $('#playground').width();
    height = $('#playground').height();
    worker = new Worker('./../js/worker.js');

    $('#btn-reset').click(function() {
        finish(snake);
        worker.terminate();
    });
    $('#btn-mode').click(function() {
        delay ^= 90;
    });
    paint();

    $('#btn-test').click(startTest);

    setInterval(function() {
        nanobar.go(snake.tick * 100 / 10000);
    }, 300);
});


function startTest() {
    var index = 0;
    var runGame = function() {
        var cb = function(result) {
            //console.log(result);
            loadGame(result);
            startGame();
            index ++ ;
            setTimeout(runGame, 1 * 60 * 1000);
        };
        if(sourceList[index] === undefined) {
            return;
        }
        $.get(sourceList[index], cb, 'text');
    }
    runGame();
}
