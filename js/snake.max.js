function Snake(w, h) {
    var self = this;
    self.w = 20;
    self.h = 15;
    self.playground = [];    
    self.snake = [];
    self.food = [];
    self.score = 0;
    self.totScore = 0;
    self.tick = 0;
    self.think = function() {
        return 'left';
    };
}

Snake.prototype.init = function(arg) {
    var self = this;
    self.playground = [];    
    self.snake = [];
    self.food = [];
    self.score = 0;
    if(arg === 'game') {
        self.tick = 0;
        self.totScore = 0;
    }
    self.createSnake();
    self.createFood();
}

Snake.prototype.createSnake = function() {
    var self = this;
    var length = 5;
    self.snake = [];
    for(var i = length - 1; i >= 0 ; i -- ) {
        self.snake.push({
            x: i
            ,y: 0
        });
    }
}

Snake.prototype.createFood = function() {
    var self = this;
    var food = {
        x: -1
        ,y: -1
    };
    if(self.w * self.h == self.snake.length) {
        self.kill();
        return;
    }
    while(self.check(food) == false) {
        food = {
            x: Math.round(Math.random() * (self.w - 1))
            ,y: Math.round(Math.random() * (self.h - 1))
        };
    }
    self.food.push(food);
}

Snake.prototype.check = function(loc) {
    var self = this;
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

Snake.prototype.loop = function(direction) {
    var self = this;
    var next = deepClone(self.snake[0]);
    if(direction === 'up' && self.snake[0].y - 1 != self.snake[1].y) {
        next.y -= 1;
    } else if(direction === 'down' && self.snake[0].y + 1 != self.snake[1].y) {
        next.y += 1;
    } else if(direction === 'left' && self.snake[0].x - 1 != self.snake[1].x) {
        next.x -= 1;
    } else {
        next.x += 1;
    }
    self.tick ++ ;
    var tail = self.snake.pop();
    if(self.check(next) == false) {
        self.kill();
    } else {
        self.snake.unshift(next);
        if(next.x == self.food[0].x && next.y == self.food[0].y) {
            self.score += 1;
            self.food.pop();
            self.snake.push(tail);
            self.createFood();
        }
    }
}

Snake.prototype.kill = function() {
    var self = this;
    self.totScore += self.score * self.score;
    if(self.w * self.h == self.snake.length) {
        self.totScore += self.score * self.score;
    }
    self.init();
}


