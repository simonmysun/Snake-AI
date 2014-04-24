function createThink(w, h) {
    //var previousDirection = 'right';
    // var out = false;
    var sum=0;
  
    var HEAD = 0;
    var FIELD_SIZE =( h) *(w);
    var FOOD = 0;
    var UNDEFINED = (h +1) * (w + 1);
    var SNAKE = 2 * UNDEFINED;
    var LEFT = -1;
    var RIGHT = 1;
    var UP = -w;
    var DOWN = w;
    var ERR = -1111;
    var best_move = ERR;
    var safe_move = ERR;
    var food1;

    var board = new Array(FIELD_SIZE);
    var snake1 = new Array(FIELD_SIZE + 1);
    var snake_size;

    var tmpboard = new Array(FIELD_SIZE);
    var tmpsnake = new Array(FIELD_SIZE + 1);
    var tmpsnake_size;


    var mov = new Array(4);
    mov[0] = LEFT;
    mov[1] = RIGHT;
    mov[2] = UP;
    mov[3] = DOWN;
    function board_reset(psnake, psize, pboard) {
        var i;
        for (i = 0; i < FIELD_SIZE; i++) {
            if (i === food1)
                pboard[i] = FOOD;
            else if (is_cell_free(i, psize, psnake))
                pboard[i] = UNDEFINED;
            else
                pboard[i] = SNAKE;
        }
        
    }
    function is_cell_free(idx, psize, psnake) {
        var i;
        for ( i = 0; i < psize; i++) {
            if (idx === psnake[i]) return false;
        }
        return true;
    }
    function is_move_possible(idx, move) {
        var flag = false;
        if (move === LEFT)
            if (idx % w > 0) flag = true; else flag = false;
        else if (move === RIGHT)
            if (idx % w < (w - 1)) flag = true; else flag = false;
        else if (move === UP)
            if (idx > (w - 1)) flag = true; else flag = false; //即idx/w > 1
        else if (move === DOWN)
            if (idx < (FIELD_SIZE - w)) flag = true; else flag = false;// 即idx/w < HEIGHT-2
        return flag;
    }

    function board_refresh(pfood, psnake, pboard) {
        var queue = new Array();

        queue.push(pfood);
        var inqueue = new Array(FIELD_SIZE);
        var found = false;
        var i;
        // while循环结束后，除了蛇的身体，
        // 其它每个方格中的数字代码从它到食物的路径长度
        while (queue.length !== 0) {
            var idx = queue.pop();
            if (inqueue[idx] === 1) continue;
            inqueue[idx] = 1;
            for ( i = 0; i < 4; i++) {
                if (is_move_possible(idx, mov[i])) {
                    if (idx + mov[i] === psnake[HEAD])
                        found = true;
                    if (pboard[idx + mov[i]] < SNAKE) {// # 如果该点不是蛇的身体

                        if (pboard[idx + mov[i]] > pboard[idx] + 1)
                            pboard[idx + mov[i]] = pboard[idx] + 1;
                        if (inqueue[idx + mov[i]] != 1)
                            queue.push(idx + mov[i]);
                    }
                }
            }
        }
        return found;
    }
    function choose_shortest_safe_move(psnake, pboard) {
        best_move = ERR;
        min = SNAKE;
        var i;
        for ( i = 0; i < 4 ; i++) {
            if (is_move_possible(psnake[HEAD], mov[i]) && pboard[psnake[HEAD] + mov[i]] < min) {
                min = pboard[psnake[HEAD] + mov[i]];
                best_move = mov[i];
            }
        }
        return best_move;
    }
    function choose_longest_safe_move(psnake, pboard) {
        best_move = ERR;
        max = -1;
        var i;
        for (i = 0; i < 4 ; i++) {
            if (is_move_possible(psnake[HEAD], mov[i]) && pboard[psnake[HEAD] + mov[i]] < UNDEFINED && pboard[psnake[HEAD] + mov[i]] > max) {
                max = pboard[psnake[HEAD] + mov[i]];
                best_move = mov[i];
            }
        }
        return best_move;
    }
    function shift_array(arr, size) {
        var i;
        for ( i = size; i > 0; i--) {
            arr[i] = arr[i - 1];
        }
    }
    function is_tail_inside() {

        tmpboard[tmpsnake[tmpsnake_size - 1]] = 0;// 虚拟地将蛇尾变为食物(因为是虚拟的，所以在tmpsnake,tmpboard中进行)
        tmpboard[food1] = SNAKE; //放置食物的地方，看成蛇身
        var result = board_refresh(tmpsnake[tmpsnake_size - 1], tmpsnake, tmpboard) // 求得每个位置到蛇尾的路径长度
        var i;
        for ( i = 0; i < 4 ; i++) { //如果蛇头和蛇尾紧挨着，则返回false。即不能follow_tail，追着蛇尾运动了
            if (is_move_possible(tmpsnake[HEAD], mov[i]) && tmpsnake[HEAD] + mov[i] === tmpsnake[tmpsnake_size - 1] && tmpsnake_size > 3) {
                result = false;
            }
        }
        return result;
    }
    function is_tail_inside1() {
        tmpsnake_size = snake_size;
        //如果直接tmpsnake=snake，则两者指向同一处内存
        var i;
        for (i = 0; i < snake1.length; i++) {
            tmpsnake[i] = snake1[i];
        }
        for (i = 0; i < board.length; i++) {
            tmpboard[i] = board[i];
        }
        //board中已经是各位置到达食物的路径长度了，不用再计算
        board_reset(tmpsnake, tmpsnake_size, tmpboard);

        tmpboard[tmpsnake[tmpsnake_size - 1]] = 0;// 虚拟地将蛇尾变为食物(因为是虚拟的，所以在tmpsnake,tmpboard中进行)
        tmpboard[food1] = SNAKE; //放置食物的地方，看成蛇身
        shift_array(tmpsnake, tmpsnake_size);
        tmpsnake[HEAD] += choose_longest_safe_move(tmpsnake,tmpboard);
        var result = board_refresh(tmpsnake[tmpsnake_size - 1], tmpsnake, tmpboard) // 求得每个位置到蛇尾的路径长度
        var i;
        for ( i = 0; i < 4 ; i++) { //如果蛇头和蛇尾紧挨着，则返回false。即不能follow_tail，追着蛇尾运动了
            if (is_move_possible(tmpsnake[HEAD], mov[i]) && tmpsnake[HEAD] + mov[i] === tmpsnake[tmpsnake_size - 1] && tmpsnake_size > 3) {
                result = false;
            }
        }
        return result;
    }
    function follow_tail() {

        tmpsnake_size = snake_size;
        //如果直接tmpsnake=snake，则两者指向同一处内存
        var i;
        for (i = 0; i < snake1.length; i++) {
            tmpsnake[i] = snake1[i];
        }
        board_reset(tmpsnake, tmpsnake_size, tmpboard); // 重置虚拟board
       
        tmpboard[tmpsnake[tmpsnake_size - 1]] = FOOD;// 让蛇尾成为食物
        tmpboard[food1] = SNAKE;// 让食物的地方变成蛇身
        board_refresh(tmpsnake[tmpsnake_size - 1], tmpsnake, tmpboard);// 求得各个位置到达蛇尾的路径长度
        tmpboard[tmpsnake[tmpsnake_size - 1]] = SNAKE; // 还原蛇尾

        return choose_longest_safe_move(tmpsnake, tmpboard);// 返回运行方向(让蛇头运动1步)
    }
   
    // 在各种方案都不行时，随便找一个可行的方向来走(1步),
    function any_possible_move() {

        best_move = ERR;
        board_reset(snake1, snake_size, board);
        board_refresh(food1, snake1, board);
        min = SNAKE;
        var i;
        for (i = 0; i < 4 ; i++) {
            if (is_move_possible(snake1[HEAD], mov[i]) && board[snake1[HEAD] + mov[i]] < min) {
                min = board[snake1[HEAD] + mov[i]];
                best_move = mov[i];
            }
        }
        return best_move
    }
   
    function virtual_shortest_move() {

        tmpsnake_size = snake_size;
        //如果直接tmpsnake=snake，则两者指向同一处内存
        var i;
        for (i = 0; i < snake1.length; i++) {
            tmpsnake[i] = snake1[i];
        }
        for ( i = 0; i < board.length; i++) {
            tmpboard[i] = board[i];
        }
        //board中已经是各位置到达食物的路径长度了，不用再计算
          board_reset(tmpsnake, tmpsnake_size, tmpboard);

        var food_eated = false;
        while (!food_eated) {
            board_refresh(food1, tmpsnake, tmpboard)
            var move = choose_shortest_safe_move(tmpsnake, tmpboard);
            shift_array(tmpsnake, tmpsnake_size);
            tmpsnake[HEAD] += move; // 在蛇头前加入一个新的位置
            // 如果新加入的蛇头的位置正好是食物的位置
            // 则长度加1，重置board，食物那个位置变为蛇的一部分(SNAKE)
            if (tmpsnake[HEAD] === food1) {
                tmpsnake_size += 1;
                board_reset(tmpsnake, tmpsnake_size, tmpboard);//虚拟运行后，蛇在board的位置(label101010)
                tmpboard[food1] = SNAKE;
                food_eated = true;
            }
            else { // 如果蛇头不是食物的位置，则新加入的位置为蛇头，最后一个变为空格
                tmpboard[tmpsnake[HEAD]] = SNAKE;
                tmpboard[tmpsnake[tmpsnake_size]] = UNDEFINED;
            }
        }
    }
  
    function find_safe_way() {


        // 虚拟地运行一次，因为已经确保蛇与食物间有路径，所以执行有效
        //运行后得到虚拟下蛇在board中的位置，即tmpboard，见label101010
        virtual_shortest_move(); // 该函数唯一调用处
        if (is_tail_inside()) { // 如果虚拟运行后，蛇头蛇尾间有通路，则选最短路运行(1步)
           // console.log("shortset");
            return choose_shortest_safe_move(snake1, board);
        }
        safe_move = follow_tail(); // 否则虚拟地follow_tail 1步，如果可以做到，返回true
        return safe_move;
    }
  
   

    return function (game) {
        
        food1 = game.food[0].x + game.food[0].y * w;
        snake_size = game.snake.length;
     
        var i;
        for (i = 0; i < game.snake.length; i++) {
            snake1[i] = game.snake[i].x + game.snake[i].y * w;
       
        }

        board_reset(snake1, snake_size, board);
      
        // 如果蛇可以吃到食物，board_refresh返回true
        // 并且board中除了蛇身(=SNAKE)，其它的元素值表示从该点运动到食物的最短路径长
      
            if (board_refresh(food1, snake1, board)) {


                best_move = find_safe_way(); // find_safe_way的唯一调用处


            }
            else {
                best_move = follow_tail();

            }

        
      
        if (best_move === ERR)
            best_move = any_possible_move();
      
        if (best_move != ERR) {
            if (best_move === LEFT)
                return 'left';
            if (best_move === RIGHT)
                return 'right';
            if (best_move === UP)
                return 'up';
            if (best_move === DOWN)
                return 'down';
        }
        
    };
}
