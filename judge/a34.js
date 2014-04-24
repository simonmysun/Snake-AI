/*
Team 34
Author: ZhangXiang
Version:1.0.0
Time 20140424 2226
*/

function createThink(w, h) {
    var previousDirection = 'right';
    var out = false;
    return function (game) {
        var head = game.snake[0];
        var food = game.food[0];


        if (previousDirection === 'up' && game.snake[0].y === 0 && game.snake[0].x < game.food[0].x) {
            previousDirection = 'right';
            return previousDirection;
        }
        if (previousDirection === 'up' && game.snake[0].y === 0 && game.snake[0].x > game.food[0].x) {
            previousDirection = 'left';
            return previousDirection;
        }
        if (previousDirection === 'down' && game.snake[0].y === h - 1 && game.snake[0].x < game.food[0].x) {
            previousDirection = 'right';
            return previousDirection;
        }
        if (previousDirection === 'down' && game.snake[0].y === h - 1 && game.snake[0].x > game.food[0].x) {
            previousDirection = 'left';
            return previousDirection;
        }
        if (game.snake[0].y < game.food[0].y && game.snake[0].x === game.food[0].x) {
            previousDirection = 'down';
            return previousDirection;
        }
        if (game.snake[0].y > game.food[0].y && game.snake[0].x === game.food[0].x) {
            previousDirection = 'up';
            return previousDirection;
        }
        if (game.snake[0].y === game.food[0].y && game.snake[0].x < game.food[0].x) {
            previousDirection = 'right';
            return previousDirection;
        }
        if (game.snake[0].y === game.food[0].y && game.snake[0].x > game.food[0].x) {
            previousDirection = 'left';
            return previousDirection;
        }
        if (previousDirection === 'left' && game.snake[0].x === 0 && game.snake[0].y < game.food[0].y) {
            previousDirection = 'down';
            return previousDirection;
        }
        if (previousDirection === 'left' && game.snake[0].x === 0 && game.snake[0].y > game.food[0].y) {
            previousDirection = 'up';
            return previousDirection;
        }
        if (previousDirection === 'right' && game.snake[0].x === w - 1 && game.snake[0].y < game.food[0].y) {
            previousDirection = 'down';
            return previousDirection;
        }
        if (previousDirection === 'right' && game.snake[0].x === w - 1 && game.snake[0].y > game.food[0].y) {
            previousDirection = 'up';
            return previousDirection;
        }




        return previousDirection;
    }
}
