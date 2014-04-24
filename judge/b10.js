/*
Team 10
Author: LiHe
Version: 0.0.0
Time: 2014042421.49
*/
function createThink(w, h)
{
	var minMap = [];
	var myFood = [];
	var queue = [];
	var Direction = 'right';

	function clear()
	{
		for (var x = 0; x < w; x++)
		{
			minMap[x] = [];
			for (var y = 0; y < h; y++)
			{
				minMap[x][y] = 1000000;
			}
		}
	}

	function copy()
	{
		for (var x = 0; x < w; x++)
		{
			myFood[x] = [];
			for (var y = 0; y < h; y++)
			{
				myFood[x][y] = minMap[x][y];
			}
		}
	}

	function check(x, y, s)
	{
		if (!(x >= 0 && x < w && y >= 0 && y < h))
		{
			return false;
		}

		for (var i = 0; i < s.length - 1; i++)
		{
			if (x == s[i].x && y == s[i].y)
			{
				return false;
			}
		}

		return true;
	}

	function checkf(x, y, s, ss)
	{
		if (!(x >= 0 && x < w && y >= 0 && y < h))
		{
			return 2;
		}

		if (x == ss.x && y == ss.y)
		{
			return 3;
		}

		for (var i = 0; i < s.length - 1; i++)
		{
			if (x == s[i].x && y == s[i].y)
			{
				return 1;
			}
		}

		return 0;
	}

	function checktoo(x, y, s)
	{
		if (!(x >= 0 && x < w && y >= 0 && y < h))
		{
			return false;
		}

		for (var i = 1; i < s.length; i++)
		{
			if (x == s[i].x && y == s[i].y)
			{
				return false;
			}
		}

		return true;
	}

	function bfs(loc, snake, x, y)
	{
		clear();
		queue = [];
		queue.push({x : loc.x, y : loc.y, dis : 0});
		minMap[loc.x][loc.y] = 0;

		while (queue.length > 0)
		{
			loc = queue.shift();

			if (check(loc.x, loc.y - 1, snake) || (loc.x == x && loc.y - 1 == y))
			{
				if (minMap[loc.x][loc.y - 1] === 1000000)
				{
					minMap[loc.x][loc.y - 1] = loc.dis + 1;
					queue.push({x : loc.x, y : loc.y - 1, dis : loc.dis + 1});
				}
			}

			if (check(loc.x + 1, loc.y, snake) || (loc.x + 1 == x && loc.y == y))
			{
				if (minMap[loc.x + 1][loc.y] === 1000000)
				{
					minMap[loc.x + 1][loc.y] = loc.dis + 1;
					queue.push({x : loc.x + 1, y : loc.y, dis : loc.dis + 1});
				}
			}

			if (check(loc.x, loc.y + 1, snake) || (loc.x == x && loc.y + 1 == y))
			{
				if (minMap[loc.x][loc.y + 1] === 1000000)
				{
					minMap[loc.x][loc.y + 1] = loc.dis + 1;
					queue.push({x : loc.x, y : loc.y + 1, dis : loc.dis + 1});
				}
			}

			if (check(loc.x - 1, loc.y, snake) || (loc.x - 1 == x && loc.y == y))
			{
				if (minMap[loc.x - 1][loc.y] === 1000000)
				{
					minMap[loc.x - 1][loc.y] = loc.dis + 1;
					queue.push({x : loc.x - 1, y : loc.y, dis : loc.dis + 1});
				}
			}
		}
	}

	function move(step, game)
	{
		var newsnake = [];
		Direction = 'right';
		var ok = false, ends = false;
		
		for (var i = game.snake.length - 1; i >= 0; i--)
		{
			newsnake.push(game.snake[i]);
		}

		while (true)
		{
			var cur = newsnake[newsnake.length - 1];
			var que = [];
			var a1 = 0, a2 = 0, a3 = 0, a4 = 0;
			for (var x = 0; x < 4; x++)
			{
				que[x] = 0;
			}
			
			if (checktoo(cur.x, cur.y - 1, newsnake))
			{
				if (checktoo(cur.x, cur.y - 2, newsnake) == false)
				{
					que[0]++;
				}
				if (checktoo(cur.x + 1, cur.y - 1, newsnake) == false)
				{
					que[0]++;
				}
				if (checktoo(cur.x, cur.y, newsnake) == false)
				{
					que[0]++;
				}
				if (checktoo(cur.x - 1, cur.y - 1, newsnake) == false)
				{
					que[0]++;
				}
				a1 = que[0];
			}
			if (checktoo(cur.x + 1, cur.y, newsnake))
			{
				if (checktoo(cur.x + 1, cur.y - 1, newsnake) == false)
				{
					que[1]++;
				}
				if (checktoo(cur.x + 2, cur.y, newsnake) == false)
				{
					que[1]++;
				}
				if (checktoo(cur.x + 1, cur.y + 1, newsnake) == false)
				{
					que[1]++;
				}
				if (checktoo(cur.x, cur.y, newsnake) == false)
				{
					que[1]++;
				}
				a2 = que[1];
			}
			if (checktoo(cur.x, cur.y + 1, newsnake))
			{
				if (checktoo(cur.x, cur.y, newsnake) == false)
				{
					que[2]++;
				}
				if (checktoo(cur.x + 1, cur.y + 1, newsnake) == false)
				{
					que[2]++;
				}
				if (checktoo(cur.x, cur.y + 2, newsnake) == false)
				{
					que[2]++;
				}
				if (checktoo(cur.x - 1, cur.y + 1, newsnake) == false)
				{
					que[2]++;
				}
				a3 = que[2];
			}
			if (checktoo(cur.x - 1, cur.y, newsnake))
			{
				if (checktoo(cur.x - 1, cur.y - 1, newsnake) == false)
				{
					que[3]++;
				}
				if (checktoo(cur.x, cur.y, newsnake) == false)
				{
					que[3]++;
				}
				if (checktoo(cur.x - 1, cur.y + 1, newsnake) == false)
				{
					que[3]++;
				}
				if (checktoo(cur.x - 2, cur.y, newsnake) == false)
				{
					que[3]++;
				}
				a4 = que[3];
			}

			for (var x = 3; x > 0; x--)
			{
				for (var y = 0; y < x; y++)
				{
					if (que[y] < que[y + 1])
					{
						var t = que[y];
						que[y] = que[y + 1];
						que[y + 1] = t;
					}
				}
			}
			if (ends)
			{
				break;
			}

			for (var i = 0; i < 4; i++)
			{
				if (checktoo(cur.x, cur.y - 1, newsnake) && a1 == que[i])
				{
					if (myFood[cur.x][cur.y - 1] == step - 1)
					{
						step -= 1;
						newsnake.push({x : cur.x, y : cur.y - 1});
						f = true;

						if (!ok)
						{
							ok = true;
							Direction = 'up';
						}

						if (step == 0)
						{
							ends = true;
							break;
						}
						var pop = newsnake.shift();
						break;
					}
				}
				if (checktoo(cur.x, cur.y + 1, newsnake) && a3 == que[i])
				{
					if (myFood[cur.x][cur.y + 1] == step - 1)
					{
						step -= 1;
						newsnake.push({x : cur.x, y : cur.y + 1});
						f = true;

						if (!ok)
						{
							ok = true;
							Direction = 'down';
						}
						if (step == 0)
						{
							ends = true;
							break;
						}
						
						var pop = newsnake.shift();
						break;
					}
				}
				if (checktoo(cur.x - 1, cur.y, newsnake) && a4 == que[i])
				{
					if (myFood[cur.x - 1][cur.y] == step - 1)
					{
						step -= 1;
						newsnake.push({x : cur.x - 1, y : cur.y});
						f = true;

						if (!ok)
						{
							ok = true;
							Direction = 'left';
						}
						if (step == 0)
						{
							ends = true;
							break;
						}

						var pop = newsnake.shift();
						break;
					}
				}
				if (checktoo(cur.x + 1, cur.y, newsnake) && a2 == que[i])
				{
					if (myFood[cur.x + 1][cur.y] == step - 1)
					{
						step -= 1;
						newsnake.push({x : cur.x + 1, y : cur.y});
						f = true;

						if (!ok)
						{
							ok = true;
							Direction = 'right';
						}
						if (step == 0)
						{
							ends = true;
							break;
						}

						var pop = newsnake.shift();
						break;
					}
				}
			}
		}

		var ques = [];
		for (var i = newsnake.length - 1; i >= 0; i--)
		{
			ques.push(newsnake[i]);
		}

		bfs(newsnake[0], ques, ques[0].x, ques[0].y);

		if (minMap[game.food[0].x][game.food[0].y] === 1000000)
		{
			return false;
		}

		return true;
	}

	function getACellThatIsFarthestToGoal(game, flag)
	{
		var cur = game.snake[game.snake.length - 2];
		var head = game.snake[0];
		var food = game.food[0];
		var maxT = -1, maT = -1, num = 0;
		var que = [];
		var myFoodIsHere = false;
		
		if (check(head.x, head.y - 1, game.snake))
		{
			que.push({x : head.x, y : head.y - 1});

			for (var i = 0; i < game.snake.length - 1; i++)
			{
				que.push(game.snake[i]);
			}

			bfs(cur, que, head.x, head.y - 1);

			maT += checkf(head.x, head.y - 2, que, food);
			maT += checkf(head.x + 1, head.y - 1, que, food);
			maT += checkf(head.x, head.y, que, food);
			maT += checkf(head.x - 1, head.y, que, food);
			if (head.x == food.x && head.y - 1 == food.y)
			{
				maT += 10;
			}
			if (minMap[head.x][head.y - 1] > maxT && minMap[head.x][head.y - 1] != 1000000)
			{
				maxT = minMap[head.x][head.y - 1];
				Direction = 'up';
			}
		}

		while (que.length > 0)
		{
			var pop = que.shift();
		}

		if (check(head.x, head.y + 1, game.snake))
		{
			que.push({x : head.x, y : head.y + 1});

			for (var i = 0; i < game.snake.length - 1; i++)
			{
				que.push(game.snake[i]);
			}
			bfs(cur, que, head.x, head.y + 1);
			num += checkf(head.x, head.y + 2, que, food);
			num += checkf(head.x + 1, head.y + 1, que, food);
			num += checkf(head.x, head.y, que, food);
			num += checkf(head.x - 1, head.y + 1, que, food);
			if (head.x == food.x && head.y + 1 == food.y)
			{
				num += 10;
			}

			if (minMap[head.x][head.y + 1] > maxT && minMap[head.x][head.y + 1] != 1000000)
			{
				maxT = minMap[head.x][head.y + 1];
				Direction = 'down';
			}
			if (minMap[head.x][head.y + 1] == maxT && num > maT && flag)
			{
				maT = num;
				Direction = 'down';
			}
		}

		while (que.length > 0)
		{
			var pop = que.shift();
		}

		if (check(head.x - 1, head.y, game.snake))
		{
			que.push({x : head.x - 1, y : head.y});

			for (var i = 0; i < game.snake.length - 1; i++)
			{
				que.push(game.snake[i]);
			}

			bfs(cur, que, head.x - 1, head.y);
			num = 0;
			num += checkf(head.x - 2, head.y, que, food);
			num += checkf(head.x, head.y, que, food);
			num += checkf(head.x, head.y + 1, que, food);
			num += checkf(head.x, head.y - 1, que, food);
			if (head.x - 1 == food.x && head.y == food.y)
			{
				num += 10;
			}

			if (minMap[head.x - 1][head.y] > maxT && minMap[head.x - 1][head.y] != 1000000)
			{
				maxT = minMap[head.x - 1][head.y];
				Direction = 'left';
			}
			if (minMap[head.x - 1][head.y] == maxT && num > maT && flag)
			{
				maT = num;
				Direction = 'left';
			}
		}

		while (que.length > 0)
		{
			var pop = que.shift();
		}

		if (check(head.x + 1, head.y, game.snake))
		{
			que.push({x : head.x + 1, y : head.y});

			for (var i = 0; i < game.snake.length - 1; i++)
			{
				que.push(game.snake[i]);
			}
			bfs(cur, que, head.x + 1, head.y);
			num = 0;
			num += checkf(head.x, head.y, que, food);
			num += checkf(head.x + 2, head.y, que, food);
			num += checkf(head.x, head.y + 1, que, food);
			num += checkf(head.x, head.y - 1, que, food);
			if (head.x + 1 == food.x && head.y == food.y)
			{
				num += 10;
			}

			if (minMap[head.x + 1][head.y] > maxT && minMap[head.x + 1][head.y] != 1000000)
			{
				maxT = minMap[head.x + 1][head.y];
				Direction = 'right';
			}
			if (minMap[head.x + 1][head.y] == maxT && num > maT && flag)
			{
				maT = num;
				Direction = 'right';
			}
		}

		return Direction;
	}

    return function(game) 
	{
		var head = game.snake[0];
		var tail = game.snake[game.snake.length - 1];
		var food = game.food[0];
		var canFindFood = false;
		var canFindTail = false;
		var flag = true;
		var num = 0;

		bfs(food, game.snake, head.x, head.y);
		copy();

		if (minMap[head.x][head.y] != 1000000)
		{	
			canFindTail = move(minMap[head.x][head.y], game);

			canFindFood = true;
			
			if (game.snake.length > 190)
			{
				flag = false;
				canFindTail = false;
			}

			if (canFindTail)
			{
				return Direction;
			}
		}
		
		if (!canFindFood || !canFindTail)
		{
			return getACellThatIsFarthestToGoal(game, flag);
		}
    };
}
