var period = 60;

function showShare() {
    getUrl(window.location.href, function(res) {
        $('#share-qr').attr('src',res + '.qr');
        var msgEn = "My AI script scored " + score + " on snake game. Someone challenging me? ";
        $('#twitter-share').attr('href', 'https://twitter.com/intent/tweet?button_hashtag=SnakeAI&text=' + escape(msgEn));
        $('#twitter-share').attr('data-url', res);
        $('#share-en').text(msgEn);
        var msgCn = '#贪吃蛇AI#我的贪吃蛇 AI 脚本刚刚得了 ' + score + ' 分, 有人来围观/挑战我的代码么?  -> ' + res;
        $('#weibo-share').attr('default_text', escape(msgCn));
        $('#share-cn').text(msgCn);
        $('#modal-share').modal('show');
    });
}

$(document).ready(function() {

    canvas = $('#playground')[0];
    ctx = canvas.getContext("2d");
    w = $('#playground').width();
    h = $('#playground').height();

    cw = 16;
    d = "";
    food = {};
    score = 0;
    tick = 0;
    steps = 10000;
    totScore = 0;

    $('#btn-start').click(function() {
        score = 0;
        tick = 0;
        totScore = 0;
	init();
    });
    $('#btn-clear').click(function() {
	$('#ai').val('');
    });
    $('#watch-mode').click(function() {
	period ^= 60;
    });

    codeExample = [
	'function createThink() {\n    var a, b, c;\n    return function(game) {\n	return keyboardDirection;\n    };\n}'
	,'function createThink() {\n    var minMap;\n    var nextFood;\n\n    function clearMap() {\n    for(var x in minMap) {\n        for(var y in minMap[x]) {\n        minMap[x][y] = 99999999;\n        }\n    }\n    }\n\n    function legal(x, y, game) {\n    if(x >= game.width || x <= -1 || y >= game.height || y <= -1) {\n        return false;\n    } else {\n        return true;\n    }\n    }\n\n    function dfs(loc, dist, game) {\n    if(legal(loc.x, loc.y, game) == false) {\n        return -1;\n    }\n    if(checkCollision(loc.x, loc.y, game.snake)) {\n        return -1; \n    }\n    if(minMap[loc.x][loc.y] != 99999999) {\n        return minMap[loc.x][loc.y];\n    }\n    minMap[loc.x][loc.y] = dist + 1;\n    dfs({\n        x: loc.x\n        ,y: loc.y - 1\n    }, dist + 1,  game);\n    dfs({\n        x: loc.x\n        ,y: loc.y + 1\n    }, dist + 1,  game);\n    dfs({\n        x: loc.x - 1\n        ,y: loc.y\n    }, dist + 1,  game);\n    dfs({\n        x: loc.x + 1\n        ,y: loc.y\n    }, dist + 1,  game);\n    }\n\n    return function(game) {\n    head = game.snake[0];\n    if(nextFood == undefined) {\n        nextFood = game.food;\n    }\n    if(minMap == undefined) {\n        minMap = [];\n        for(var x = 0; x < game.width; x ++ ) {\n        minMap[x] = [];\n        for(var y = 0; y < game.height; y ++ ) {\n            minMap[x][y] = 99999999;\n        }\n        }\n        dfs(game.food, 0, game);\n    }\n    if(game.food.x != nextFood.x && game.food.y != nextFood.y) {\n        clearMap();\n        dfs(game.food, 0, game);\n        nextFood = game.food;\n    }\n    var minDirect = "right";\n    var minDist = 99999999;\n    if(legal(head.x + 1, head.y, game)) {\n        if(checkCollision(head.x + 1, head.y, game.snake) == false) {\n        if(minDist >  minMap[head.x + 1][head.y]) {\n            minDirect = "right";\n            minDist = minMap[head.x + 1][head.y];\n        }\n        }\n    }\n    if(legal(head.x - 1, head.y, game)) {\n        if(checkCollision(head.x - 1, head.y, game.snake) == false) {\n        if(minDist >  minMap[head.x - 1][head.y]) {\n            minDirect = "left";\n            minDist = minMap[head.x - 1][head.y];\n        }\n        }\n    }\n    if(legal(head.x, head.y + 1, game)) {\n        if(checkCollision(head.x, head.y + 1, game.snake) == false) {\n        if(minDist >  minMap[head.x][head.y + 1]) {\n            minDirect = "down";\n            minDist = minMap[head.x][head.y + 1];\n        }\n        }\n    }\n    if(legal(head.x, head.y - 1, game)) {\n        if(checkCollision(head.x, head.y - 1, game.snake) == false) {\n        if(minDist >  minMap[head.x][head.y - 1]) {\n            minDirect = "up";\n            minDist = minMap[head.x][head.y - 1];\n        }\n        }\n    }\n    return minDirect;\n    };\n}\n'
	,'function createThink() {\n    var minMap;\n    var nextFood;\n    var bfsqueue;\n\n    function clearMap() {\n    for(var x in minMap) {\n        for(var y in minMap[x]) {\n        minMap[x][y] = 99999999;\n        }\n    }\n    }\n\n    function legal(x, y, game) {\n    if(x >= game.width || x <= -1 || y >= game.height || y <= -1) {\n        return false;\n    } else {\n        return true;\n    }\n    }\n\n    function bfs(loc, game) {\n    bfsqueue = [];\n    bfsqueue.push({\n        x: loc.x\n        ,y: loc.y\n        ,dist: 0\n    });\n    while(bfsqueue.length > 0) {\n        loc = bfsqueue.shift();\n        if(legal(loc.x, loc.y, game) == false) {\n        continue;\n        }\n        if(checkCollision(loc.x, loc.y, game.snake)) {\n        minMap[loc.x][loc.y] = -1;\n        continue;\n        }\n        if(minMap[loc.x][loc.y] != 99999999) {\n        continue;\n        }\n        minMap[loc.x][loc.y] = loc.dist;\n        bfsqueue.push({\n        x: loc.x\n        ,y: loc.y - 1\n        ,dist: loc.dist + 1\n        });\n        bfsqueue.push({\n        x: loc.x\n        ,y: loc.y + 1\n        ,dist: loc.dist + 1\n        });\n        bfsqueue.push({\n        x: loc.x - 1\n        ,y: loc.y\n        ,dist: loc.dist + 1\n        });\n        bfsqueue.push({\n        x: loc.x + 1\n        ,y: loc.y\n        ,dist: loc.dist + 1\n        });\n    }\n    }\n\n    return function(game) {\n    head = game.snake[0];\n    if(nextFood == undefined) {\n        nextFood = game.food;\n    }\n    if(minMap == undefined) {\n        minMap = [];\n        for(var x = 0; x < game.width; x ++ ) {\n        minMap[x] = [];\n        for(var y = 0; y < game.height; y ++ ) {\n            minMap[x][y] = 99999999;\n        }\n        }\n        bfs(game.food, game);\n    }\n    if(game.food.x != nextFood.x || game.food.y != nextFood.y) {\n        clearMap();\n        bfs(game.food, game);\n        nextFood = game.food;\n    }\n    var minDirect = "right";\n    var minDist = 99999999;\n    if(legal(head.x + 1, head.y, game)) {\n        if(checkCollision(head.x + 1, head.y, game.snake) == false) {\n        if(minDist > minMap[head.x + 1][head.y] && minMap[head.x + 1][head.y] != -1) {\n            minDirect = "right";\n            minDist = minMap[head.x + 1][head.y];\n        }\n        }\n    }\n    if(legal(head.x - 1, head.y, game)) {\n        if(checkCollision(head.x - 1, head.y, game.snake) == false) {\n        if(minDist > minMap[head.x - 1][head.y] && minMap[head.x - 1][head.y] != -1) {\n            minDirect = "left";\n            minDist = minMap[head.x - 1][head.y];\n        }\n        }\n    }\n    if(legal(head.x, head.y + 1, game)) {\n        if(checkCollision(head.x, head.y + 1, game.snake) == false) {\n        if(minDist > minMap[head.x][head.y + 1] && minMap[head.x][head.y + 1] != -1) {\n            minDirect = "down";\n            minDist = minMap[head.x][head.y + 1];\n        }\n        }\n    }\n    if(legal(head.x, head.y - 1, game)) {\n        if(checkCollision(head.x, head.y - 1, game.snake) == false) {\n        if(minDist > minMap[head.x][head.y - 1] && minMap[head.x][head.y - 1] != -1) {\n            minDirect = "up";\n            minDist = minMap[head.x][head.y - 1];\n        }\n        }\n    }\n    return minDirect;\n    };\n}\n'
	,''
    ];

    $('#ai-examples').change(function() {
	$('#ai').val(codeExample[$('#ai-examples').get(0).selectedIndex]);
    });
    $('#ai-examples').change();
    
    $('#ai-script').html("<textarea id='ai' placeholder='Your AI Script Here'>" + (unescape((location).hash.slice(1,-1)).split("\x7F")[0]||"") + "</textarea>");
    onload = onkeyup = function(a) {
        var js = $('#ai').val();
        document.location.hash = [js].join("\x7f") + 1;
        Input = js ? "<script>" + js + "<\/script>" : "<pre>You haven\'t input any code yet. </pre>";
    }
    res = 0;

    snake = [];

    paint();
    _log();
});


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
