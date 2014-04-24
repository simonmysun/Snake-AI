function createThink(w, h) {
	var FIELD_SIZE = h * w;
	var HEAD = 0;
	var FOOD = 0;
	var UNDEFINED = (h + 1) * (w + 1);
	var SNAKE = 2 * UNDEFINED;
	var LEFT = -1;
	var RIGHT = 1;
	var UP = -w;
	var DOWN = w;
	var ERR = -1111;
	var board = [];
	for (var i = 0; i < FIELD_SIZE; i++)
		board[i] = UNDEFINED;
	var snake = [];
	for (var i = 0; i < FIELD_SIZE + 1; i++)
		snake[i] = UNDEFINED;
	var tmpboard = [];
	for (var i = 0; i < FIELD_SIZE; i++)
		tmpboard[i] = UNDEFINED;
	var tmpsnake = [];
	for (var i = 0; i < FIELD_SIZE + 1; i++)
		tmpsnake[i] = UNDEFINED;
	var best_move = ERR;
	var mov = [LEFT, RIGHT, UP, DOWN];
	function is_cell_free(idx, psize, psnake) {
		for (var i = 0; i < psize; i++)
			if (idx == psnake[i])
				return false;
		return true;
	}
	function is_move_possible(idx, move) {
		var flag = false;
		if (move == LEFT) {
			if (idx % w > 0)
				flag = true;
			else
				flag = false;
		} else if (move == RIGHT) {
			if (idx % w < (w - 1))
				flag = true;
			else
				flag = false;
		} else if (move == UP) {
			if (idx > w - 1)
				flag = true;
			else
				flag = false;
		} else if (move == DOWN) {
			if (idx < FIELD_SIZE - w)
				flag = true;
			else
				flag = false;
		}
		return flag;
	}
	function board_reset(psnake, psize, pboard) {
		for (var i = 0; i < FIELD_SIZE; i++) {
			if (i == food)
				pboard[i] = FOOD;
			else if (is_cell_free(i, psize, psnake)) 
				pboard[i] = UNDEFINED;
			else 
				pboard[i] = SNAKE;
		}
	}
	function board_refresh(pfood, psnake, pboard) {
		var queue = [];
		queue.push(pfood);
		var inqueue = [];
		for (var i = 0; i < FIELD_SIZE; i++)
			inqueue[i] = 0;
		var found = false;
		while (queue.length > 0) {
			var idx = queue.shift();
			if (inqueue[idx] == 1)
				continue;
			inqueue[idx] = 1;
			for (var i = 0; i < 4; i++) {
				if (is_move_possible(idx, mov[i])) {
					if (idx + mov[i] == psnake[HEAD])
						found = true;
					if (pboard[idx + mov[i]] < SNAKE) {
						if (pboard[idx + mov[i]] > pboard[idx] + 1)
							pboard[idx + mov[i]] = pboard[idx] + 1;
						if (inqueue[idx + mov[i]] == 0)
							queue.push(idx + mov[i]);
					}
				}
			}
		}
		return found;
	}
	function choose_shortest_safe_move(psnake, pboard) {
		var best_move = ERR;
		var min = SNAKE;
		for (var i = 0; i < 4; i++) {
			if (is_move_possible(psnake[HEAD], mov[i]) && pboard[psnake[HEAD] + mov[i]] < min) {
				min = pboard[psnake[HEAD] + mov[i]];
				best_move = mov[i];
			}
		}
		return best_move;
	}
	function choose_longest_safe_move(psnake, pboard) {
		var best_move = ERR;
		var max = -1;
		for (var i = 0; i < 4; i++) {
			if (is_move_possible(psnake[HEAD], mov[i]) && pboard[psnake[HEAD] + mov[i]] < UNDEFINED && pboard[psnake[HEAD] + mov[i]] > max) {
				max = pboard[psnake[HEAD] + mov[i]];
				best_move = mov[i];
			}
		}
		return best_move;
	}
	function is_tail_inside() {
		tmpboard[tmpsnake[tmpsnake_size - 1]] = 0;
		tmpboard[food] = SNAKE;
		result = board_refresh(tmpsnake[tmpsnake_size - 1], tmpsnake, tmpboard);
		for (var i = 0; i < 4; i++) {
			if (is_move_possible(tmpsnake[HEAD], mov[i]) && tmpsnake[HEAD] + mov[i] == tmpsnake[tmpsnake_size - 1] && tmpsnake_size > 3)
				result = false;
		}
		return result;
	}
	function follow_tail() {
		tmpsnake_size = snake_size;
		tmpsnake = snake.slice(0);
		board_reset(tmpsnake, tmpsnake_size, tmpboard); 
		tmpboard[tmpsnake[tmpsnake_size - 1]] = FOOD; 
		tmpboard[food] = SNAKE; 
		board_refresh(tmpsnake[tmpsnake_size - 1], tmpsnake, tmpboard); 
		tmpboard[tmpsnake[tmpsnake_size - 1]] = SNAKE; 
		return choose_longest_safe_move(tmpsnake, tmpboard); 
	}
	function any_possible_move() {
		best_move = ERR;
		board_reset(snake, snake_size, board);
		board_refresh(food, snake, board);
		var min = SNAKE;
		for (var i = 0; i < 4; i++) {
			if (is_move_possible(snake[HEAD], mov[i]) && board[snake[HEAD] + mov[i]] < min) {
				min = board[snake[HEAD] + mov[i]];
				best_move = mov[i];
			}
		}
		return best_move;
	}
	function shift_array(arr, size) {
		for (var i = size; i > 0; i--)
			arr[i] = arr[i - 1];

	}
	function virtual_shortest_move() {
		tmpsnake_size = snake_size;
		tmpsnake = snake.slice(0);
		tmpboard = board.slice(0); 
		board_reset(tmpsnake, tmpsnake_size, tmpboard);
		var food_eated = false;
		while (!food_eated) {
			board_refresh(food, tmpsnake, tmpboard);
			move = choose_shortest_safe_move(tmpsnake, tmpboard);
			shift_array(tmpsnake, tmpsnake_size);
			tmpsnake[HEAD] += move; 
			if (tmpsnake[HEAD] == food) {
				tmpsnake_size += 1;
				board_reset(tmpsnake, tmpsnake_size, tmpboard); 
				tmpboard[food] = SNAKE;
				food_eated = true;
			} else { 
				tmpboard[tmpsnake[HEAD]] = SNAKE;
				tmpboard[tmpsnake[tmpsnake_size]] = UNDEFINED;
			}
		}
	}
	function find_safe_way() {
		var safe_move = ERR;
		virtual_shortest_move(); 
		if (is_tail_inside()) 
			return choose_shortest_safe_move(snake, board);
		safe_move = follow_tail();
		return safe_move;
	}
	return function (game) {
		snake_size = game.snake.length;
		for (var i = 0; i < snake_size; i++) {
			snake[i] = game.snake[i].y * w + game.snake[i].x;
		}
		tmpsnake_size = game.snake.length;
		for (var i = 0; i < tmpsnake_size; i++) {
			tmpsnake[i] = game.snake[i].y * w + game.snake[i].x;
		}
		food = (game.food[0].y) * w + (game.food[0].x);
		board_reset(snake, snake_size, board);
		if (board_refresh(food, snake, board)) {
			best_move = find_safe_way(); 
		} else
			best_move = follow_tail();
			
		if (best_move == ERR)
			best_move = any_possible_move();

		if (best_move == LEFT)
			return 'left';
		else if (best_move == RIGHT)
			return 'right';
		else if (best_move == UP)
			return 'up';
		else if (best_move == DOWN)
			return 'down';

	}
}
