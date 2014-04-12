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
