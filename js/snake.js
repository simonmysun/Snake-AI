function Snake(){var c=this;c.w=20,c.h=15,c.playground=[],c.snake=[],c.food=[],c.score=0,c.totScore=0,c.tick=0,c.think=function(){return"left"}}Snake.prototype.init=function(a){var b=this;b.playground=[],b.snake=[],b.food=[],b.score=0,"game"===a&&(b.tick=0,b.totScore=0),b.createSnake(),b.createFood()},Snake.prototype.createSnake=function(){var c,a=this,b=5;for(a.snake=[],c=b-1;c>=0;c--)a.snake.push({x:c,y:0})},Snake.prototype.createFood=function(){var a=this,b={x:-1,y:-1};if(a.w*a.h==a.snake.length)return a.kill(),void 0;for(;0==a.check(b);)b={x:Math.round(Math.random()*(a.w-1)),y:Math.round(Math.random()*(a.h-1))};a.food.push(b)},Snake.prototype.check=function(a){var c,b=this;if(a.x<0||a.y<0||a.x>=b.w||a.y>=b.h)return!1;for(c in b.snake)if(a.x==b.snake[c].x&&a.y==b.snake[c].y)return!1;return!0},Snake.prototype.loop=function(a){var d,b=this,c=deepClone(b.snake[0]);"up"===a&&b.snake[0].y-1!=b.snake[1].y?c.y-=1:"down"===a&&b.snake[0].y+1!=b.snake[1].y?c.y+=1:"left"===a&&b.snake[0].x-1!=b.snake[1].x?c.x-=1:c.x+=1,b.tick++,d=b.snake.pop(),0==b.check(c)?b.kill():(b.snake.unshift(c),c.x==b.food[0].x&&c.y==b.food[0].y&&(b.score+=1,b.food.pop(),b.snake.push(d),b.createFood()))},Snake.prototype.kill=function(){var a=this;a.totScore+=a.score*a.score,a.init()};
