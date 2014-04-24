function createThink(w, h) {
    var previousDirection = 'right';
    var out = false;
    return function(game) {
        var head = game.snake[0];
        var food = game.food[0];
        if(out) {
            if(previousDirection === 'down' && game.snake[0].y === h - 1) {
                previousDirection = 'left';
                out = false;
                return previousDirection;
            }
            if(previousDirection === 'down') {
                return previousDirection;
            }
            if(previousDirection === 'left') {
                previousDirection = 'down';
                return previousDirection;
            }
            if(previousDirection === 'up' && game.snake[0].y > game.food[0].y && game.food[0].x === game.snake[0].x) {
                return previousDirection;
            }
            previousDirection = 'left';
            return previousDirection;
        } else {
            if(game.snake[0].x === 0 && game.snake[0].y === 0) {
                previousDirection = 'right';
                return previousDirection;
            }
            if(game.snake[0].x === w - 1 && game.snake[0].y === 0) {
                previousDirection = 'down';
                return previousDirection;
            }
            if(game.snake[0].x === 0 && game.snake[0].y === h - 1) {
                previousDirection = 'up';
                return previousDirection;
            }
            if(game.snake[0].x === w - 1 && game.snake[0].y === h - 1) {
                previousDirection = 'left';
                return previousDirection;
            }
            if(game.snake[0].x === game.food[0].x && game.snake[0].y === h - 1) {
                out = true;
                previousDirection = 'up';
                return previousDirection;
            }
            return previousDirection;
        }
    };
}
