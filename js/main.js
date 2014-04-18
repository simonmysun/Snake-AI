var delay = 90;
var keyboardDirection = '';
var codeExample = [
    ''
];

var worker;
var time;
var running = false;
var countup;
var lastScore = 0;

var _gaq = _gaq || [];

var nanobar = new Nanobar();

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
    running = false;
    snake.kill();
    refreshDisplay();
    clearTimeout(time);
    var totScore = snake.totScore;
    var cb = function(res) {
        ga('send', 'event', 'score', 'all', totScore.toString());
        if(totScore > 50000) {
            ga('send', 'event', 'code', 'high score', Base64.encode(res));
        }
    };
    getUrl(window.location.href, cb);
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
        if(snake.tick < 10000) {
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

$(document).ready(function() {
    canvas = $('#playground')[0];
    ctx = canvas.getContext("2d");
    width = $('#playground').width();
    height = $('#playground').height();
    worker = new Worker('./../js/worker.js');
    
    $('#btn-load').click(function() {
        finish(snake);
        var src = 'data:text/javascript;base64,' + Base64.encode($('#ai').val());
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
    });
    
    $('#btn-start').click(function() {
        finish(snake);
        countup = new countUp("score", 0, snake.totScore, 0, 2.5, {
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
        }, 300 * 1000);
        loop();
    });
    
    $('#btn-reset').click(function() {
        $('#ai').val('');
        finish(snake);
        worker.terminate();
    });

    $('#btn-mode').click(function() {
        delay ^= 90;
    });

    $('#ai-examples').change(function() {
        $('#ai').val(codeExample[$('#ai-examples').get(0).selectedIndex]);
        updateUrl();
    });

    $('#ai').val(Base64.decode(unescape((location).hash).split("\x7F")[0]||""));
    
    paint();
    setInterval(function() {
        nanobar.go(snake.tick * 100 / 10000);
    }, 300);
});
