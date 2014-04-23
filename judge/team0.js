function createThink(w, h) {
    var obj;
    var x = 0;
    while(x < INF) {
        obj[x] = deepClone(obj);
    }
    return function(game) {
        return 'right';
    }
}
