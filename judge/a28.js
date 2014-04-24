/*team 28
Author: yuanhuliang
Version:0.0.0
Time:20140424 23:50*/
function createThink(w, h) 
{
    var dir= 'right';

    return function(game) 
	{
        	var head = game.snake[0];
        	var food = game.food[0];
			if((dir==='down'||dir==='up')&&head.y>0&&head.y<h-1)
				return dir;
			if(head.x<food.x)
			{
			if(food.y>7&&head.y>0)
			{
				dir='up';
				return dir;
			}
			if(food.y<8&&head.y<h-1)
			{
				dir='down';
				return dir;
			}
			}
			if(head.x===food.x)
			{
				if(head.y<food.y)
				{
					dir='down';
					return dir;
				}
				if(head.y>food.y)
				{
					dir='up';
					return dir;
				}
				else
					return dir;
			}
			if(head.x>food.x)
			{
				if(dir==='right'&&head.y<h-1)
				{
					dir='down';
					return dir;
				}
			}

			//在（h-1,w-1)处
        	if(dir==='down'&&head.y===h-1&&head.x===w-1)
			{
				dir='left';
				return dir;
			}
			if(dir==='right'&&head.y===h-1&&head.x===w-1)
			{
				dir='up';
				return dir;
			}
			//在（0，0）处
			if(dir==='left'&&head.y===0&&head.x===0)
			{
				dir='down';
				return dir;
			}
			if(dir==='up'&&head.y===0&&head.x===0)
			{
				dir='right';
				return dir;
			}
			//在（h-1,0）处
			if(dir==='left'&&head.y===h-1&&head.x===0)
			{
				dir='up';
				return dir;
			}
			if(dir==='down'&&head.y===h-1&&head.x===0)
			{
				dir='right';
				return dir;
			}
			//在（0，w-1）处
			if(dir==='right'&&head.y===0&&head.x===w-1)
			{
				dir='down';
				return dir;
			}
			if(dir==='up'&&head.y===0&&head.x===w-1)
			{
				dir='left';
				return dir;
			}
			//在特定的一行
			if(dir==='down'&&head.y===h-1&&head.x<food.x)
			{
				dir='right';
				return dir;
			}
			if(dir==='down'&&head.y===h-1&&head.x>food.x)
			{
				dir='left';
				return dir;
			}
			if(dir==='up'&&head.y===0&&head.x<food.x)
			{
				dir='right';
				return dir;
			}
			if(dir==='up'&&head.y===0&&head.x>food.x)
			{
				dir='left';
				return dir;
			}
			if(dir==='right'&&head.x===w-1)
			{
				dir='down';
				return dir;
			}
			if(dir==='left'&&head.x===0)
			{
				dir='down';
				return dir;
			}
			else
				return dir;
	};
}