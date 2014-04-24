function createThink(w,h) 
{
    var Map_f = [];//找食物
	var Map_t = [];//找尾巴
    var nextFood;
    var bfsqueue;
	var length_s = 4;
    for(var x = 0; x < w; x ++ ) 
	{
        Map_f[x] = [];
		Map_t[x]=[];
        for(var y = 0; y < h; y ++ ) 
		{
            Map_f[x][y] = 99999999;
			Map_t[x][y] = 99999999;
        }
   }

    function clearMap() 
	{
		for(var x = 0; x < w; x ++ ) 
		{
			for(var y = 0; y < h; y ++ ) 
			{
				Map_f[x][y] = 99999999;
			}
		}
    }
	function clearMap_t() 
	{
		for(var x = 0; x < w; x ++ ) 
		{
			for(var y = 0; y < h; y ++ ) 
			{
				Map_t[x][y] = 99999999;
			}
		}
    }

    function legal(x, y) 
	{
		if(x >= w || x <= -1 || y >= h || y <= -1) 
		{
			return false;
		} 
		else 
		{
			return true;
		}
    }
    function checkCollision(x, y, s) 
	{
        for(var p in s) 
		{
            if(x === s[p].x && y === s[p].y) 
			{
                return true;
            }
        }
        return false;
    }
    
    function bfs(start,snake_c,minMap) 
	{
		var loc;
        bfsqueue = [];
        bfsqueue.push({
            x: start.x
            ,y: start.y
            ,dist: 0
        });
        while(bfsqueue.length > 0)
		{
            loc = bfsqueue.shift();
            if(legal(loc.x, loc.y) == false) //不合法
			{
                continue;
            }
            if(checkCollision(loc.x, loc.y, snake_c) && !(loc.x == start.x && loc.y == start.y)) //碰撞 且不是自身 PS 防止找尾巴时 尾巴本来就是是自身
			{
				minMap[loc.x][loc.y] = -1;//88888888
                continue;
            }
            if(minMap[loc.x][loc.y] != 99999999) //
			{
                continue;
            }
			
            minMap[loc.x][loc.y] = loc.dist;
			
            bfsqueue.push({
                x: loc.x + 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
			bfsqueue.push({
                x: loc.x - 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
			bfsqueue.push({
                x: loc.x
                ,y: loc.y + 1
                ,dist: loc.dist + 1
            });
			bfsqueue.push({
                x: loc.x
                ,y: loc.y - 1
                ,dist: loc.dist + 1
            });
        }
    }
    function IsFind(loc,game,minMap)
	{
		if(legal(loc.x+1, loc.y) == true)
		{
			if(minMap[loc.x+1][loc.y] != -1&&minMap[loc.x+1][loc.y] != 99999999)
			return true;
		}
		if(legal(loc.x, loc.y+1) == true)
		{
			if(minMap[loc.x][loc.y+1] != -1 && minMap[loc.x][loc.y+1] != 99999999)
			return true;
		}
		if(legal(loc.x-1, loc.y) == true)
		{
			if(minMap[loc.x-1][loc.y] != -1&&minMap[loc.x-1][loc.y] != 99999999)
			return true;
		}
		if(legal(loc.x, loc.y-1) == true)
		{
			if(minMap[loc.x][loc.y-1] != -1 && minMap[loc.x][loc.y-1] != 99999999)
			return true;
		}
		return false;
	}
	function is_tail(x,y,game)
	{
		if(x == game.snake[game.snake.length -1].x && y == game.snake[game.snake.length -1].y)
			return true;
		else
			return false;
	}
	function find_snake_cnt(x,y,game)
	{
		var cnt = 0;
		if((legal(x+1,y) == true && checkCollision(x+1,y)) == true ||(legal(x-1,y) == true && checkCollision(x-1,y) == true))
			cnt++;
		if((legal(x,y+1) == true && checkCollision(x,y+1) == true)||(legal(x,y-1) == true && checkCollision(x,y-1) == true))
			cnt++;
		return cnt;
	}
	function average_s(x,y,game)
	{
		var cnt = 0;
		for(var i = 0;i < game.snake.length;i++)
		{
			cnt = cnt + (Math.abs(game.snake[i].x - x) + Math.abs(game.snake[i].y - y));
		}
		return 0;
		return cnt / ( 2*game.snake.length);
	}
	function snake_struct(x,y){this.x=x;this.y = y;}
	
	function find_path_former(game,head,tail)
	{
		var arry = [100000000,100000000,100000000,100000000];//
		var arry_x = [-1,-1,-1,-1];
		var arry_y = [-1,-1,-1,-1];
		var minDirect = "right";
		var distance1;//蛇头与食物的直线距离的平方 用来区分四周折线距离相同时 谁更近 防止套圈
		var distance2;
		if(legal(head.x + 1, head.y) && (is_tail(head.x + 1, head.y,game) == true ||checkCollision(head.x + 1, head.y, game.snake) == false ))//不检查尾巴冲突 因为移动后它就不算了
		{
			if(Map_f[head.x + 1][head.y] == -1)//蛇尾
				Map_f[head.x + 1][head.y] = 99999999;
			
			arry[0] = Map_f[head.x + 1][head.y];
			arry_x[0] = head.x + 1;  
			arry_y[0] = head.y;  
		}
		if(legal(head.x - 1, head.y) && (is_tail(head.x - 1, head.y,game) == true ||checkCollision(head.x - 1, head.y, game.snake) == false ))
		{
			if(Map_f[head.x - 1][head.y] == -1)//蛇尾
				Map_f[head.x - 1][head.y] = 99999999;
			for(var i = 0;i < 4;i++)
			{
				if(Map_f[head.x - 1][head.y] < arry[i])
				{
					for(var j = 2; j >= i;j--)
					{
						arry[j + 1]  = arry[j];
						arry_x[j + 1]  = arry_x[j];
						arry_y[j + 1]  = arry_y[j];
					}
					arry[i]  = Map_f[head.x - 1][head.y];
					arry_x[i] = head.x - 1;  
					arry_y[i] = head.y;  
					break;
				}
				else if(Map_f[head.x - 1][head.y] == arry[i])//与食物距离想等 比较与尾巴距离 远离尾巴走 接近食物以防套圈
				{
					distance1 = (head.x - 1 - tail.x) * (head.x - 1 - tail.x) + (head.y - tail.y) * (head.y - tail.y);
					distance2 = (arry_x[i] - tail.x) * (arry_x[i] - tail.x) + (arry_y[i] - tail.y) * (arry_y[i] - tail.y);
					if(distance1 > distance2)
					{
						for(var j = 2; j >= i;j--)
						{
							arry[j + 1]  = arry[j];
							arry_x[j + 1]  = arry_x[j];
							arry_y[j + 1]  = arry_y[j];
						}
						arry[i]  = Map_f[head.x - 1][head.y];
						arry_x[i] = head.x - 1;  
						arry_y[i] = head.y;  
					break;
					}
				}
			}
		}
		if(legal(head.x, head.y + 1) && (is_tail(head.x, head.y + 1,game) == true ||checkCollision(head.x, head.y + 1, game.snake) == false ))
		{
			if(Map_f[head.x][head.y + 1] == -1)//蛇尾
				Map_f[head.x][head.y + 1] = 99999999;
			for( i = 0;i < 4;i++)
			{
				if(Map_f[head.x][head.y + 1] < arry[i])
				{
					for(j = 2; j >= i;j--)
					{
						arry[j + 1]  = arry[j];
						arry_x[j + 1]  = arry_x[j];
						arry_y[j + 1]  = arry_y[j];
					}
					arry[i]  = Map_f[head.x][head.y + 1];
					arry_x[i] = head.x;  
					arry_y[i] = head.y + 1; 
					break;
				}
				else if(Map_f[head.x ][head.y + 1] == arry[i])//与食物距离想等 比较与尾巴距离 远离尾巴走 接近食物以防套圈
				{
					distance1 = (head.x - tail.x) * (head.x - tail.x) + (head.y + 1 - tail.y) * (head.y + 1- tail.y);
					distance2 = (arry_x[i] - tail.x) * (arry_x[i] - tail.x) + (arry_y[i] - tail.y) * (arry_y[i] - tail.y);
					if(distance1 > distance2)
					{
						for(var j = 2; j >= i;j--)
						{
							arry[j + 1]  = arry[j];
							arry_x[j + 1]  = arry_x[j];
							arry_y[j + 1]  = arry_y[j];
						}
						arry[i]  = Map_f[head.x][head.y + 1];
						arry_x[i] = head.x;  
						arry_y[i] = head.y + 1;  
						break;
						}
				}
			}
		}
		if(legal(head.x, head.y - 1) && (is_tail(head.x, head.y - 1,game) == true ||checkCollision(head.x, head.y - 1, game.snake) == false ))
		{
			if(Map_f[head.x][head.y - 1] == -1)//蛇尾
				Map_f[head.x][head.y -1 ] = 99999999;
			for(i = 0;i < 4;i++)
			{
				if(Map_f[head.x][head.y - 1] < arry[i])
				{
					for(j = 2; j >= i;j--)
					{
						arry[j + 1]  = arry[j];
						arry_x[j + 1]  = arry_x[j];
						arry_y[j + 1]  = arry_y[j];
					}
					arry[i]  = Map_f[head.x][head.y - 1];
					arry_x[i] = head.x;  
					arry_y[i] = head.y - 1; 
					break;
				}
				else if(Map_f[head.x ][head.y - 1] == arry[i])//与食物距离想等 比较与尾巴距离 远离尾巴走 接近食物以防套圈
				{
					distance1 = (head.x - tail.x) * (head.x - tail.x) + (head.y - 1 - tail.y) * (head.y - 1- tail.y);
					distance2 = (arry_x[i] - tail.x) * (arry_x[i] - tail.x) + (arry_y[i] - tail.y) * (arry_y[i] - tail.y);
					if(distance1 > distance2)
					{
						for(var j = 2; j >= i;j--)
						{
							arry[j + 1]  = arry[j];
							arry_x[j + 1]  = arry_x[j];
							arry_y[j + 1]  = arry_y[j];
						}
						arry[i]  = Map_f[head.x][head.y - 1];
						arry_x[i] = head.x;  
						arry_y[i] = head.y - 1;  
					break;
					}
				}
			}
		}
		var snake_c = [];
		snake_c[0] = new snake_struct(0,0);
		for(j = 1;j < game.snake.length;j++)//假设蛇前进一步 
		{
			snake_c[j] = new snake_struct(game.snake[j - 1].x,game.snake[j - 1].y);
		}
		for(i = 0;i < 4 && arry[i]<100000000;i++)
		{
			clearMap_t();
			snake_c[0].x = arry_x[i];
			snake_c[0].y = arry_y[i];
			if(arry_x[i] == nextFood.x && arry_y[i] == nextFood.y)//下一步是食物！！蛇尾不前进！！
			{
				snake_c[game.snake.length] = new snake_struct(game.snake[game.snake.length - 1].x,game.snake[game.snake.length - 1].y);
				bfs(game.snake[game.snake.length - 1], snake_c,Map_t);//找尾巴 最后一个 尾巴未动！
			}
			else
			{
				snake_c[game.snake.length] = new snake_struct(1000000,1000000);//最后一个节点不管有没有 都放在图外面 使之补位蛇身
				bfs(game.snake[game.snake.length - 2], snake_c,Map_t);//找尾巴
			}
	
			if(IsFind(snake_c[0],game,Map_t)==true)//能找到尾巴 首先确定他不是蛇身（蛇尾除外）
			{
				if(snake_c[0].x > game.snake[0].x)
					minDirect = "right";
				if (snake_c[0].x < game.snake[0].x)
					minDirect = "left";
				if(snake_c[0].y > game.snake[0].y)
					minDirect = "down";
				if (snake_c[0].y < game.snake[0].y)
					minDirect = "up";
				break;
			}

		}
		return minDirect;
	}
	
	function find_path(game,head,tail)
	{
		var arry = [200000000,200000000,200000000,200000000];//
		var arry_x = [-1,-1,-1,-1];
		var arry_y = [-1,-1,-1,-1];
		var minDirect = "right";
		var distance1;//蛇头与食物的直线距离的平方 用来区分四周折线距离相同时 谁更近 防止套圈
		var distance2;
		var m_d = 0;
		if(legal(head.x + 1, head.y) && (is_tail(head.x + 1, head.y,game) == true ||checkCollision(head.x + 1, head.y, game.snake) == false ))//不检查尾巴冲突 因为移动后它就不算了
		{
			if(Map_f[head.x + 1][head.y] == -1)//蛇尾
				Map_f[head.x + 1][head.y] = 99999999;
			arry[0] = Map_f[head.x + 1][head.y] + average_s(head.x + 1,head.y,game) - 50 * find_snake_cnt(head.x + 1,head.y) * find_snake_cnt(head.x + 1,head.y);//靠近蛇身优先走
			arry_x[0] = head.x + 1;  
			arry_y[0] = head.y;  
		}
		if(legal(head.x - 1, head.y) && (is_tail(head.x - 1, head.y,game) == true ||checkCollision(head.x - 1, head.y, game.snake) == false ))
		{
			if(Map_f[head.x - 1][head.y] == -1)//蛇尾
				Map_f[head.x - 1][head.y] = 99999999;
			m_d = Map_f[head.x - 1][head.y] + average_s(head.x - 1,head.y,game) - 50 * find_snake_cnt(head.x - 1,head.y) * find_snake_cnt(head.x - 1,head.y);
			for(var i = 0;i < 4;i++)
			{
				if(m_d < arry[i])
				{
					for(var j = 2; j >= i;j--)
					{
						arry[j + 1]  = arry[j];
						arry_x[j + 1]  = arry_x[j];
						arry_y[j + 1]  = arry_y[j];
					}
					arry[i]  = m_d;
					arry_x[i] = head.x - 1;  
					arry_y[i] = head.y;  
					break;
				}
				else if(Map_f[head.x - 1][head.y] == arry[i])//与食物距离想等 比较与尾巴距离 远离尾巴走 接近食物以防套圈
				{
					distance1 = (head.x - 1 - tail.x) * (head.x - 1 - tail.x) + (head.y - tail.y) * (head.y - tail.y);
					distance2 = (arry_x[i] - tail.x) * (arry_x[i] - tail.x) + (arry_y[i] - tail.y) * (arry_y[i] - tail.y);
					if(distance1 > distance2)
					{
						for(var j = 2; j >= i;j--)
						{
							arry[j + 1]  = arry[j];
							arry_x[j + 1]  = arry_x[j];
							arry_y[j + 1]  = arry_y[j];
						}
						arry[i]  = Map_f[head.x - 1][head.y];
						arry_x[i] = head.x - 1;  
						arry_y[i] = head.y;  
					break;
					}
				}
			}
		}
		if(legal(head.x, head.y + 1) && (is_tail(head.x, head.y + 1,game) == true ||checkCollision(head.x, head.y + 1, game.snake) == false ))
		{
			if(Map_f[head.x][head.y + 1] == -1)//蛇尾
				Map_f[head.x][head.y + 1] = 99999999;
				
			m_d = Map_f[head.x][head.y + 1] + average_s(head.x,head.y + 1,game) - 50 * find_snake_cnt(head.x,head.y + 1) * find_snake_cnt(head.x,head.y + 1);
			for( i = 0;i < 4;i++)
			{
				if(m_d < arry[i])
				{
					for(j = 2; j >= i;j--)
					{
						arry[j + 1]  = arry[j];
						arry_x[j + 1]  = arry_x[j];
						arry_y[j + 1]  = arry_y[j];
					}
					arry[i]  = m_d;
					arry_x[i] = head.x;  
					arry_y[i] = head.y + 1; 
					break;
				}
				else if(Map_f[head.x ][head.y + 1] == arry[i])//与食物距离想等 比较与尾巴距离 远离尾巴走 接近食物以防套圈
				{
					distance1 = (head.x - tail.x) * (head.x - tail.x) + (head.y + 1 - tail.y) * (head.y + 1- tail.y);
					distance2 = (arry_x[i] - tail.x) * (arry_x[i] - tail.x) + (arry_y[i] - tail.y) * (arry_y[i] - tail.y);
					if(distance1 > distance2)
					{
						for(var j = 2; j >= i;j--)
						{
							arry[j + 1]  = arry[j];
							arry_x[j + 1]  = arry_x[j];
							arry_y[j + 1]  = arry_y[j];
						}
						arry[i]  = Map_f[head.x][head.y + 1];
						arry_x[i] = head.x;  
						arry_y[i] = head.y + 1;  
						break;
						}
				}
			}
		}
		if(legal(head.x, head.y - 1) && (is_tail(head.x, head.y - 1,game) == true ||checkCollision(head.x, head.y - 1, game.snake) == false ))
		{
			if(Map_f[head.x][head.y - 1] == -1)//蛇尾
				Map_f[head.x][head.y -1 ] = 99999999;
			m_d = Map_f[head.x][head.y - 1] +  average_s(head.x,head.y - 1,game) - 50 * find_snake_cnt(head.x,head.y - 1) * find_snake_cnt(head.x,head.y - 1);
			for(i = 0;i < 4;i++)
			{
				if(m_d < arry[i])
				{
					for(j = 2; j >= i;j--)
					{
						arry[j + 1]  = arry[j];
						arry_x[j + 1]  = arry_x[j];
						arry_y[j + 1]  = arry_y[j];
					}
					arry[i]  = m_d;
					arry_x[i] = head.x;  
					arry_y[i] = head.y - 1; 
					break;
				}
				else if(Map_f[head.x ][head.y - 1] == arry[i])//与食物距离想等 比较与尾巴距离 远离尾巴走 接近食物以防套圈
				{
					distance1 = (head.x - tail.x) * (head.x - tail.x) + (head.y - 1 - tail.y) * (head.y - 1- tail.y);
					distance2 = (arry_x[i] - tail.x) * (arry_x[i] - tail.x) + (arry_y[i] - tail.y) * (arry_y[i] - tail.y);
					if(distance1 > distance2)
					{
						for(var j = 2; j >= i;j--)
						{
							arry[j + 1]  = arry[j];
							arry_x[j + 1]  = arry_x[j];
							arry_y[j + 1]  = arry_y[j];
						}
						arry[i]  = Map_f[head.x][head.y - 1];
						arry_x[i] = head.x;  
						arry_y[i] = head.y - 1;  
					break;
					}
				}
			}
		}
		var snake_c = [];
		snake_c[0] = new snake_struct(0,0);
		for(j = 1;j < game.snake.length;j++)//假设蛇前进一步 
		{
			snake_c[j] = new snake_struct(game.snake[j - 1].x,game.snake[j - 1].y);
		}
		for(i = 0;i < 4 && arry[i]<200000000;i++)
		{
			clearMap_t();
			snake_c[0].x = arry_x[i];
			snake_c[0].y = arry_y[i];
			if(arry_x[i] == nextFood.x && arry_y[i] == nextFood.y)//下一步是食物！！蛇尾不前进！！
			{
				snake_c[game.snake.length] = new snake_struct(game.snake[game.snake.length - 1].x,game.snake[game.snake.length - 1].y);
				bfs(game.snake[game.snake.length - 1], snake_c,Map_t);//找尾巴 最后一个 尾巴未动！
			}
			else
			{
				snake_c[game.snake.length] = new snake_struct(1000000,1000000);//最后一个节点不管有没有 都放在图外面 使之补位蛇身
				bfs(game.snake[game.snake.length - 2], snake_c,Map_t);//找尾巴
			}
			

			if(IsFind(snake_c[0],game,Map_t)==true)//能找到尾巴 首先确定他不是蛇身（蛇尾除外）
			{
				if(snake_c[0].x > game.snake[0].x)
					minDirect = "right";
				if (snake_c[0].x < game.snake[0].x)
					minDirect = "left";
				if(snake_c[0].y > game.snake[0].y)
					minDirect = "down";
				if (snake_c[0].y < game.snake[0].y)
					minDirect = "up";
				break;
			}
		}
		return minDirect;
	}
    return function(game) 
	{
		head = game.snake[0];
		length_s = game.snake.length;
		var tail = game.snake[game.snake.length-1];
        if(nextFood == undefined) 
		{
            nextFood = game.food[0];
        }
        if(Map_f == undefined) 
		{
            Map_f = [];
            for(var x = 0; x < game.width; x ++ ) 
			{
                Map_f[x] = [];
                for(var y = 0; y < game.height; y ++ ) 
				{
                    Map_f[x][y] = 99999999;
                }
            }
        }

			clearMap();
			bfs(game.food[0], game.snake,Map_f);//找食物
			nextFood = game.food[0];


			if(IsFind(head,game,Map_f)==true)//可以找到食物
			{
				if(game.snake.length > 150)
					return find_path(game,head,tail);
				else
					return find_path_former(game,head,tail);
			}
			else //未找到食物  to远离食物且追着尾巴跑
			{	
	
				var a,flag = 0;//检测一下是否找到下一步
				var f_x,f_y,h_x,h_y;
				arry = [0,0,0,0];
				var arry_x = [-1,-1,-1,-1];
				var arry_y = [-1,-1,-1,-1];
				minDirect = "right";
				f_x = game.food[0].x;
				f_y = game.food[0].y;
				h_x = head.x + 1;
				h_y = head.y;
				if(legal(h_x,h_y) == true && (is_tail(h_x,h_y,game)== true ||checkCollision(h_x,h_y,game.snake) == false))//去掉尾巴 因为移动后就不算了
				{
					arry[0] = (h_x - f_x)*(h_x - f_x) + (h_y - f_y)*(h_y - f_y);
					arry_x[0] = h_x;
					arry_y[0] = h_y;
				}
				h_x = head.x - 1;
				h_y = head.y;
				if(legal(h_x,h_y) == true && (is_tail(h_x,h_y,game)== true ||checkCollision(h_x,h_y,game.snake) == false))
				{
					a = (h_x - f_x)*(h_x - f_x) + (h_y - f_y)*(h_y - f_y);
					for(i = 0;i < 4;i++)
					{
						if(a > arry[i])
						{
							for(j = 2; j >= i;j--)
							{
								arry[j + 1]  = arry[j];
								arry_x[j + 1]  = arry_x[j];
								arry_y[j + 1]  = arry_y[j];
							}
							arry[i]  = a;
							arry_x[i] = h_x;  
							arry_y[i] = h_y;  
							break;
						}
					}
				}
				h_x = head.x;
				h_y = head.y + 1;
				if(legal(h_x,h_y) == true && (is_tail(h_x,h_y,game)== true ||checkCollision(h_x,h_y,game.snake) == false))
				{
					a = (h_x - f_x)*(h_x - f_x) + (h_y - f_y)*(h_y - f_y);
					for(i = 0;i < 4;i++)
					{
						if(a > arry[i])
						{
							for(j = 2; j >= i;j--)
							{
								arry[j + 1]  = arry[j];
								arry_x[j + 1]  = arry_x[j];
								arry_y[j + 1]  = arry_y[j];
							}
							arry[i]  = a;
							arry_x[i] = h_x;  
							arry_y[i] = h_y;  
							break;
						}
					}
				}
				h_x = head.x;
				h_y = head.y - 1;
				if(legal(h_x,h_y) == true && (is_tail(h_x,h_y,game)== true ||checkCollision(h_x,h_y,game.snake) == false))
				{
					a = (h_x - f_x)*(h_x - f_x) + (h_y - f_y)*(h_y - f_y);
					for(i = 0;i < 4;i++)
					{
						if(a > arry[i])
						{
							for(j = 2; j >= i;j--)
							{
								arry[j + 1]  = arry[j];
								arry_x[j + 1]  = arry_x[j];
								arry_y[j + 1]  = arry_y[j];
							}
							arry[i]  = a;
							arry_x[i] = h_x;  
							arry_y[i] = h_y;  
							break;
						}
					}
				}
				var snake_c = [];
				snake_c[0] = new snake_struct(0,0);
				for(j = 1;j < game.snake.length;j++)//假设蛇前进一步 
				{
					snake_c[j] = new snake_struct(game.snake[j - 1].x,game.snake[j - 1].y);
				}
				for(i = 0;i < 4 && arry[i] > 0;i++)
				{
					clearMap_t();
					snake_c[0].x = arry_x[i];
					snake_c[0].y = arry_y[i];
					bfs(game.snake[game.snake.length - 2], snake_c,Map_t);//找尾巴
					if( IsFind(snake_c[0],game,Map_t)==true)//能找到尾巴
					{
						if(snake_c[0].x > game.snake[0].x)
							minDirect = "right";
						if (snake_c[0].x < game.snake[0].x)
							minDirect = "left";
						if(snake_c[0].y > game.snake[0].y)
							minDirect = "down";
						if (snake_c[0].y < game.snake[0].y)
							minDirect = "up";
						break;
					}
				}
			}
			return minDirect;
	
		
	}
}
