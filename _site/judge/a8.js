/*
Team: team8 greatboys
Author:魏来张凌云任凯
Version:0.0.0
Time:20140424 22：51
*/



var l=1
var r=0
var d=0	
var u=0

var judge = 0
var judge1 = 0
var out = false
function createThink (w,h) {
        
        var dir = 'right'
        
		return function(game) {
                    var head = game.snake[0]
                    var food = game.food[0]
					if(game.snake.length <= 30)
					{
					    judge = 0
					    judge1 = 0
					}
					if(game.snake.length > 65)
					{
					   if(head.x==0&&head.y==0)
    		{
		   dir='right'
		   l=1
		//   r=0
 		   return dir
		 }
		if(head.y==1&&head.x==0)
                {
		dir='up'
		return dir
		}
		  		

		 if(head.y==0&&check({x:head.x+1,y:head.y},game))

			{   
			    if(head.x>=1&&head.x%2!=0&&food.x<=head.x&&check({x:head.x,y:head.y+1},game))
			      {dir='down'
			       return dir
			      }
			      else
				dir='right'
				return dir
				
			}
		 if(head.x==w-1&&check({x:head.x,y:head.y+1},game))
			{
		
			dir='down'
			return dir
			}
			
		if(check({x:head.x,y:head.y+1},game)==false&&l==1)
				{
					dir='left'
					l=0
					return dir
				}
		
		 if(l==0&&head.y>1)
			{
			    
				dir='up'
				return dir
			}
 		if(l==1&&head.y>1&&check({x:head.x,y:head.y+1},game))
			{
			    
				dir='down'
				return dir
			}

				
		if(head.y==1&&l==0)
				{
				    if( food.x>head.x && r==0&& check({x:head.x,y:head.y-1},game))
				    {
				        dir='up'
				        if(game.snake.length>200)
				        {r=1}
				        l=1
				        return dir
				    }
				    else
				    {
				  dir='left'
				  l=1
				  return dir
				}
				}
		if(head.y==1&&l==1)
		{
			dir='down'
		}
		
		



            return dir

					}
					if(game.snake.length > 30)
					{  
					    if(judge == 0 && head.y!=0)
                        {   if(check({x:head.x-1,y:head.y},game))    //需要优化
                            {
                                dir = 'left'
                                return dir
                            }
                            if(check({x:head.x,y:head.y-1},game))
                            {
                                dir = 'up'
                                return dir
                            }
                        }
                        
                        if(head.y==0&&head.x!=0&&judge1==0)
                        {
                            dir = 'right'
                            judge1 = 1
                            return dir
                        }
                        judge = 1
					    if(out) {
                                if(head.x == 1&&head.y!=0)
                                {
                                    dir = 'up'
                                    return dir
                                }
                                if(head.y == 0)
                                {
                                    dir = 'right'
                                    out = false
                                    return dir
                                }
                                if(dir == 'down' && game.snake[0].y === h - 1) {
                                        dir = 'left';
                                        out = false;
                                        return dir;
                                }
                                if(dir == 'down') {
                                    return dir;
                                }
                                if(dir == 'left') {
                                    dir = 'down';
                                    return dir;
                                }
                                if(dir == 'up' && game.snake[0].y > game.food[0].y && game.food[0].x === game.snake[0].x) {
                                    return dir;
                                }
                                dir = 'left';
                                return dir;
                                } else {
                                    if(game.snake[0].x === 0 && game.snake[0].y === 0) {
                                        dir = 'right';
                                        return dir;
                                    }
                                    if(game.snake[0].x === w - 1 && game.snake[0].y === 0) {
                                        dir = 'down';
                                        return dir;
                                    }
                                    if(game.snake[0].x === 0 && game.snake[0].y === h - 1) {
                                        dir = 'up';
                                        return dir;
                                    }
                                    if(game.snake[0].x === w - 1 && game.snake[0].y === h - 1) {
                                        dir = 'left';
                                        return dir;
                                    }
                                    if(game.snake[0].x === game.food[0].x && game.snake[0].y === h - 1) {
                                        out = true;
                                        dir = 'up';
                                        return dir;
                                    }
                                    return dir;
                                }
					    
					    
					}
					else
					{if(head.y == food.y)
					{
					    if(head.x < food.x && check({x:head.x+1,y:head.y},game))
                                dir = 'right'
                        else if(head.x < food.x && check({x:head.x+1,y:head.y},game) == false)
                            {
                                    if(check({x:head.x,y:head.y+1},game))
                                        dir = 'down'
                                    else if(check({x:head.x,y:head.y-1},game)&&check({x:head.x,y:head.y-2},game))
                                        dir = 'up'
                                    else dir = 'left'
                            }
                        if(head.x > food.x && check({x:head.x-1,y:head.y},game))
                                dir = 'left'
                        else if(head.x > food.x && check({x:head.x-1,y:head.y},game)== false)
                        {
                            if(check({x:head.x,y:head.y+1},game))
                                dir = 'down'
                            else
                                dir = 'up'
                        }
                    }


                    if(head.x==food.x)
                    {
                        if(head.y > food.y &&check({x:head.x,y:head.y-1},game))
                            dir = 'up'
                        else if(head.y > food.y &&check({x:head.x,y:head.y-1},game)==false)
                        {
                            if(check({x:head.x+1,y:head.y},game)&&check({x:head.x+2,y:head.y},game))
                                dir = 'right'
                            if(check({x:head.x-1,y:head.y},game)&&check({x:head.x-2,y:head.y},game))
                                {dir = 'left'}
                            else if(check({x:head.x+1,y:head.y},game))
                                {dir = 'right'}
                            else 
                                dir = 'down'
                        }
                        if(head.y < food.y &&check({x:head.x,y:head.y+1},game))
                            dir = 'down'
                        else if(head.y < food.y &&check({x:head.x,y:head.y+1},game)==false)
                        {
                            if(check({x:head.x-1,y:head.y},game)&&check({x:head.x-2,y:head.y},game))
                                {dir = 'left'}
                            else if(check({x:head.x+1,y:head.y},game))
                                {dir = 'right'}
                            else dir = 'up'
                        }
                    }

                    if(head.x < food.x && head.y < food.y)
                    {
                        if(check({x:head.x,y:head.y-1},game))
                            dir = 'up'
                        if(check({x:head.x+1,y:head.y},game))
                            {dir = 'right'}
                        else if(check({x:head.x,y:head.y+1},game)&&check({x:head.x,y:head.y+2},game)&&check({x:head.x,y:head.y+3},game))
                            {dir = 'down'}
                        else if(check({x:head.x-1,y:head.y},game))
                        {
                            dir = 'left'
                        }
                        else dir = 'up'
                    }
                    if(head.x < food.x && head.y > food.y)
                    {
                        if(check({x:head.x+1,y:head.y},game))
                            {dir = 'right'}
                        else if(check({x:head.x-1,y:head.y},game))
                            {
                                dir = 'left'
                            }
                        else if(check({x:head.x,y:head.y-1},game))
                            {dir = 'up'}
                        else {dir = 'down'}
                    }

                    if(head.x > food.x && head.y > food.y)
                    {  
                        if(check({x:head.x-1,y:head.y},game))
                            {dir = 'left'}
                        else if(check({x:head.x,y:head.y-1},game))
                           {
                               dir = 'up'
                           }
                        else if(check({x:head.x+1,y:head.y},game))
                            {dir = 'right'}
                        else 
                            dir = 'down' 
                    }
                    if(head.x > food.x && head.y < food.y)
                    {
                        if(check({x:head.x-1,y:head.y},game))
                            {dir = 'left'}
                        else if(check({x:head.x,y:head.y+1},game)&&check({x:head.x,y:head.y+2},game))
                            {dir = 'down'}
                        else if(check({x:head.x+1,y:head.y},game)&&check({x:head.x+2,y:head.y},game))
                            {
                                dir = 'right'
                            }
                        else 
                            dir = 'up'
                    }


            return dir
        }

		};

}


var think = createThink(w,h)
