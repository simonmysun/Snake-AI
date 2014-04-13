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
