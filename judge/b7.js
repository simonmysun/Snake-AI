function createThink(w, h) 
{
    var dir = 'right';
	var right_limit,left_limit;
	var head;
    return function(game) 
	{	
		head = game.snake[0];
		//if(game.snake.length == 5) dir = 'right';
		if(head.y != h-1)
		{
			if(head.y == 0 && dir == 'right') {right_limit = w-2;left_limit = 0;}
			if(head.y == 0 && dir == 'left')  {right_limit = w-1;left_limit = 1;}
			
			if(dir == 'right' && !check({x:head.x + 1,y:head.y},game)) dir = 'down';
			else if(dir == 'right' && head.x != right_limit ) dir = 'right';
			else if(dir == 'right' && head.x === right_limit ) dir = 'down';
			
			else if(dir == 'left' && !check({x:head.x - 1,y:head.y},game)) dir = 'down';
			else if(dir == 'left' && head.x != left_limit) dir = 'left';
			else if(dir == 'left' && head.x == left_limit) dir = 'down';
			
			else if(dir == 'down' && head.x > w/2) dir = 'left';
			else if(dir == 'down' && head.x < w/2) dir = 'right';
			
			else if(dir == 'up' && head.y != 0) dir = 'up';
			else if(dir == 'up' && head.y == 0 && head.x == 0) dir = 'right';
			else if(dir == 'up' && head.y == 0 && head.x == w-1) dir = 'left';
		}
		else if(head.y == h-1)
		{
			if     (dir == 'down' && head.x < w/2) dir = 'right';
			else if(dir == 'down' && head.x > w/2) dir = 'left';	
				
			else if(dir == 'right' && head.x != w-1) dir = 'right';
			else if(dir == 'right' && head.x == w-1) dir = 'up';
				
			else if(dir == 'left' && head.x != 0) dir = 'left';
			else if(dir == 'left' && head.x == 0) dir = 'up';
		}
		return dir;
    }
}