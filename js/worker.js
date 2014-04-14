onmessage = function(sdata) {
    var data = sdata.data;
    if(data.type === 'url') {
        importScripts(data.data);
    } else if(data.type === 'init') {
        think = createThink(data.data.w, data.data.h);
    } else if(data.type === 'game state') {
        var result = think(data.data);
        postMessage({
            type: 'result'
            ,data: result
        });
    }
}

var check = function(loc, game) {
    var self = game;
    if(loc.x < 0 || loc.y < 0 || loc.x >= self.w || loc.y >= self.h) {
        return false;
    }
    for(var l in self.snake) {
        if(loc.x == self.snake[l].x && loc.y == self.snake[l].y) {
            return false;
        }
    }
    return true;
}
