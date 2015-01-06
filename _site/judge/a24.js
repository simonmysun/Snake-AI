/*
Team 24
Author: zhangyao
Version:0.0.0
Time:20140424 19.30
*/
function createThink(w,h) {
    var FIELD_SIZE = w * h + 2;
		var EMPTY = (w + 1) * (h + 1);
		var LEFT = -1;
		var RIGHT = 1;
		var UP = -w;
		var DOWN = w;
		var SNAKE = 2 * EMPTY;
		var ERR = -1111;	
		var FOOD = 0;
		var HEAD = 0;	
		var mov = [-1, 1, -w, w];
		var idfood,tmpsnake_size;
    var board = new Array (FIELD_SIZE);
    var tmpboard = new Array (FIELD_SIZE);
		var snake,tmpsnake;
		
		function is_cell_free(idx, psnake)	{
		    for (var i in psnake)
		        if (psnake[i] == idx)
		        		return false;
		    return true;
		}  
		
		function is_move_possible(idx, move)	{
			
		    var flag = false;
		    if (move == LEFT)
		        if (idx % w > 0)	flag = true;
		    if( move == RIGHT)
		    		if (idx % w < w - 1) flag = true;
		    if ( move == UP)
		    		if (idx / w > 0) flag = true;        
		    if (move == DOWN)
		    		if (idx / w < h - 1) flag = true;
		    return flag;
		}
		
		function  board_reset(psnake, pboard) {
				var idx;
				for (var i = 0; i < w * h; i++)
						pboard[i] = EMPTY;
				for (var j in psnake) {
						idx = psnake[j];
						pboard[idx] = SNAKE;
				}
				pboard[idfood] = FOOD;
		}
		//bfs
		function board_refresh(pfood, psnake, pboard)	{
				var idx,found = false;
		    var queue;
		    var inqueue = new Array(w * h + 5);
		    queue = [];
		    
		    if (pfood == psnake[0])
		    		return found;
		    for (var i = 0; i <= w * h; i++)
		    		inqueue[i] = 0;
		    queue.push(pfood);
		    inqueue[pfood] = 1;
		    while (queue.length > 0)	{
		        idx = queue.shift();
		        		        
		        for (var i = 0; i < 4; i++) {
		        	
		            if (is_move_possible(idx, mov[i])) {
		                if (idx + mov[i] == psnake[HEAD]) {
		                    found = true;
		                }
		                if (pboard[idx + mov[i]] < SNAKE) {               
		                    if (pboard[idx + mov[i]] > pboard[idx] + 1)
		                        pboard[idx + mov[i]] = pboard[idx] + 1;
		                    if (inqueue[idx + mov[i]] == 0) {
		                        queue.push(idx + mov[i]);
		                        inqueue[idx + mov[i]] = 1;
		                    }
		                }
		            }
		        }
		    }
		    return found;
		}

		function choose_shortest_safe_move(psnake, pboard) {
		    var idx = psnake[0],best_move = ERR;
		    var min = EMPTY;
		    
		    for (var i = 0; i < 4; i++) {
		        if (is_move_possible(idx, mov[i]) && pboard[idx + mov[i]] < min) {
		            min = pboard[idx+mov[i]];
		            best_move = mov[i];
		        }
		    }
		    return best_move;
		}
	
		function choose_longest_safe_move(psnake, pboard) {
				var idx = psnake[0], best_move = ERR,max = -1;
				
		    for (var i = 0; i < 4; i++) {
		    				if (is_move_possible(idx, mov[i]) && pboard[idx+mov[i]] < EMPTY && pboard[idx+mov[i]] > max) {
		            max = pboard[idx+mov[i]];
		            best_move = mov[i];
		        }
		    }
		    return best_move;
		}
		
		function is_tail_inside() {
		   
		    var idx0,idx,result = true;
		   	
		    idx = tmpsnake[tmpsnake_size - 1];
		    tmpboard[idx] = 0; 
		    tmpboard[idfood] = EMPTY;
		    //tmpboard[idfood] = SNAKE; 
		    
		    result = board_refresh(idx , tmpsnake, tmpboard); 
		    for (var i = 0; i < 4; i++) {
		    	  
		    	  idx0 = tmpsnake[0];
		        if (is_move_possible(idx0, mov[i]) && idx0 + mov[i] == idx && tmpsnake_size > 3)
		            result = false;
		    }
		    tmpboard[idx] = SNAKE;
		    tmpboard[idfood] = 0;
		    return result;
		}
		
		
		function follow_tail() {
		   	var idx;
		   	tmpsnake_size = snake.length;			   	
		   	tmpsnake = snake.slice(0);		   	
		    board_reset(tmpsnake, tmpboard); 
		    
		    idx = tmpsnake[tmpsnake_size-1];		    
		    tmpboard[idx] = FOOD;		   
		    tmpboard[idfood] = SNAKE; 
		    
		    board_refresh(idx, tmpsnake, tmpboard); 
		    tmpboard[idx] = SNAKE; 
		    tmpboard[idfood] = FOOD;
		
		    return choose_longest_safe_move(tmpsnake, tmpboard);
		}
		
		
		function any_possible_move()  {
					    
		    var min,idx0;
		    var best_move = ERR;
		    board_reset(snake, board);
		    board_refresh(idfood, snake, board);
		    min = SNAKE;
		
		    for (var i = 0; i < 4; i++) {
		    		idx = snake[0];
		        if (is_move_possible(idx0, mov[i]) && board[idx0 + mov[i]] < min) {
		            min = board[idx0 + mov[i]];
		            best_move = mov[i];
		        }
		    }
		    return best_move;
		}
		
		function shift_array(arr,size) {
		    for (var i = size; i > 0; i--)
		        arr[i] = arr[i - 1];
		}
		
		function virtual_shortest_move() {
			
		  	var  food_eated;
		  	
		  	tmpsnake_size = snake.length;
		  	tmpsnake = snake.slice(0);
		  	
		    board_reset(tmpsnake, tmpboard);		    
		    
		    food_eated = false;
		    while (!food_eated) {
		        board_refresh(idfood, tmpsnake, tmpboard);    
		        move = choose_shortest_safe_move(tmpsnake, tmpboard);
		        shift_array(tmpsnake,tmpsnake_size);
		        tmpsnake[HEAD] += move; 
		        
		        if (tmpsnake[HEAD] == idfood) {
		            tmpsnake_size += 1;
		            board_reset(tmpsnake, tmpboard); 
		            tmpboard[idfood] = SNAKE;
		            food_eated = true;
		        }
		        else { 
		            tmpboard[tmpsnake[HEAD]] = SNAKE;
		            tmpboard[tmpsnake[tmpsnake_size]] = EMPTY;
		            tmpsnake.pop();
		        }
		    }        
		}
		
		
		function no_think_run() {
				var move = ERR,idx = snake[0];
									
				if (idx < w * (h - 1)) {			
						for (var i = 0; i < 4; i++) { 
								if ((idx + mov[i] >= 0 && idx + mov[i] <= w * (h - 1)) || idx + mov[i] == w * h - 1) {
										if (is_move_possible(idx, mov[i]) && is_cell_free(idx + mov[i], snake))	{
												move = mov[i];			
										}
								}
						}
				}
				else {
						for (var i = 2; i < 4; i++) {
								if (is_move_possible(idx, mov[i]) && is_cell_free(idx + mov[i], snake)) {
										move = mov[i];
								}
						}
						
						for (var i = 0; i < 2; i++) {
								if (is_move_possible(idx, mov[i]) && is_cell_free(idx + mov[i], snake)) {								
										move = mov[i];
								}
						}
			  }
			  
				return move;
		}
		
	
		function think_run() {
				var move = ERR,idx = snake[0],tmp;				
								
				tmpsnake = snake.slice(0);	
				tmpsnake_size = snake.length;		
				shift_array(tmpsnake, tmpsnake_size);		
				tail = tmpsnake.pop();
				tmpsnake_size = tmpsnake.length;
					
				if (idx < w * (h - 1)) {			
						for (var i = 0; i < 4; i++) { 
								if ((idx + mov[i] >= 0 && idx + mov[i] <= w * (h - 1)) || (idx + mov[i] == w * h - 1)) {
										if (is_move_possible(idx, mov[i]) && is_cell_free(idx + mov[i], tmpsnake))	{
												tmpsnake[0] +=  mov[i];												
												board_reset(tmpsnake,tmpboard);
												
												if (is_tail_inside())
														move = mov[i];
												else {
														tmp = tmpsnake[0];
														tmpsnake[0] = tmpsnake[tmpsnake_size - 1];
														tmpsnake[tmpsnake_size - 1] = tmp;
														board_reset(tmpsnake,tmpboard);
														if (is_tail_inside())
																move = mov[i];
														tmp = tmpsnake[0];
														tmpsnake[0] = tmpsnake[tmpsnake_size - 1];
														tmpsnake[tmpsnake_size - 1] = tmp;	
														
														if (tmpsnake[0] < w)	
																move = mov[i];											
												}											
																				
												tmpsnake[0] -=  mov[i];
										}
								}
						}
				}
				else {
						for (var i = 2; i < 4; i++) {
								if (is_move_possible(idx, mov[i]) && is_cell_free(idx + mov[i], tmpsnake)) {
										tmpsnake[0] +=  mov[i];												
										board_reset(tmpsnake, tmpboard);
												
										if (is_tail_inside())
												move = mov[i];
										else {
												tmp = tmpsnake[0];
												tmpsnake[0] = tmpsnake[tmpsnake_size - 1];
												tmpsnake[tmpsnake_size - 1] = tmp;
												board_reset(tmpsnake,tmpboard);
												if (is_tail_inside())
														move = mov[i];
												tmp = tmpsnake[0];
												tmpsnake[0] = tmpsnake[tmpsnake_size - 1];
												tmpsnake[tmpsnake_size - 1] = tmp;													
										}		
																		
										tmpsnake[0] -=  mov[i];
								}
						}
						
						for (var i = 0; i < 2; i++) {
								if (is_move_possible(idx, mov[i]) && is_cell_free(idx + mov[i], tmpsnake)) {
										tmpsnake[0] +=  mov[i];												
										board_reset(tmpsnake, tmpboard);
										if (is_tail_inside())
												move = mov[i];
										else {
												tmp = tmpsnake[0];
												tmpsnake[0] = tmpsnake[tmpsnake_size - 1];
												tmpsnake[tmpsnake_size - 1] = tmp;
												board_reset(tmpsnake,tmpboard);
												if (is_tail_inside())
														move = mov[i];
												tmp = tmpsnake[0];
												tmpsnake[0] = tmpsnake[tmpsnake_size - 1];
												tmpsnake[tmpsnake_size - 1] = tmp;													
										}		
																							
										tmpsnake[0] -=  mov[i];
								}
						}
			  }
			  
				if (move == ERR) {
						move = follow_tail();
				}
				return move;
		}
		

		function find_safe_way() {
		   
		    var safe_move = ERR;
		    
		    if (snake.length <= w * h / 2 +20) {
		    		virtual_shortest_move();
		    		if (is_tail_inside())
		    				safe_move =  choose_shortest_safe_move(snake, board);
		    		else
		    				safe_move = follow_tail();
		    }
		    else if (snake.length <= w * h / 2 + 30){
		    		safe_move = think_run(); 
		    }
		    else
		    		safe_move = no_think_run(); 
		    return safe_move;
		}

		function direction(move)	{
				var best,mov;
				if (move == -1)
        		best = "left";
        else if(move == 1)
        		best = "right";
     		else if(move == -w)
     				best = "up";
      	else if (move == w)
        		best = "down";
     		else    		
     				best = "right";
     		return best;
				
		}
				
    return function(game) {
    		var best,idx,best_move; 
				snake = [];
				tmpsnake = [];
				idfood = game.food[0].x + w * game.food[0].y;						
				tmpsnake_size = game.snake.length;
				for (var i = 0; i < game.snake.length; i++)	{
						idx = game.snake[i].x + w * game.snake[i].y;
						snake[i] = idx;	
				}
				
				board_reset(snake, board);	
									
				if (board_refresh(idfood, snake, board))
						  best = find_safe_way();
				else
						  best = follow_tail();
		   
		   	if (best == ERR)
		        best = any_possible_move();
      	best_move = direction(best);
        return best_move;
    };
}
