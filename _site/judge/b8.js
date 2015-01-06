/*
Team: Kernel_Panic
Author:FinalTheory
Version:0.0.1
Time:20140424 22:30
Code:���԰棬��δDebug���
*/

function createThink(w,h) {
    var ERR = -1;
    var FOOD = 0;
    var SNAKE = -1;
    var INF = 999999999;
    var UNDEFINED = 999999999;
    var MOV = [[0, -1], [0, 1], [-1, 0], [1, 0]];
    var MOV_STR = ["up", "down", "left", "right"];


    var MAX_LEN = 220;
    var MAX_DFS = 1000;

    var dfs_times;
    var tmp_stack = [];
    var safe_stack = [];
    var min_holes;
    var vis = [];
    board_init(vis, 0);

    function is_legal(x, y, board) {
        if ( x >= w || x < 0 || y >= h || y < 0 || board[x][y] == SNAKE )
            return false;
        else
            return true;
    }

    function board_init( arr, val ){
        for(var x = 0; x < w; x ++ ) {
            arr[x] = [];
            for(var y = 0; y < h; y ++ ) {
                arr[x][y] = val;
            }
        }
    }

    function board_clear( arr, val ) {
        for(var x = 0; x < w; x ++ ) {
            for(var y = 0; y < h; y ++ ) {
                arr[x][y] = val;
            }
        }
    }

    function board_reset( snake, food, board ) {
        for ( var x = 0; x < w; x++ )
            for ( var y = 0; y < h; y++ )
                board[x][y] = UNDEFINED;
        board[food.x][food.y] = FOOD;
        for ( var i = 0; i < snake.length; i++ ) {
            board[snake[i].x][snake[i].y] = SNAKE;
        }
    }

    function board_BFS( snake, food, board ){
        var head = snake[0];
        var BFSqueue = [];
        var Found = false;
        BFSqueue.push(food);
        board_clear(vis, 0);
        while ( BFSqueue.length > 0 ) {
            var loc = BFSqueue.shift();
            if ( vis[loc.x][loc.y] == 1 ) continue;
            vis[loc.x][loc.y] = 1;
            for ( var i = 0; i < 4; ++i ) {
                var new_x = loc.x + MOV[i][0];
                var new_y = loc.y + MOV[i][1];
                if ( new_x == head.x && new_y == head.y ) Found = true;
                if ( is_legal(new_x, new_y, board) ) {
                    if ( board[new_x][new_y] > board[loc.x][loc.y] + 1 )
                        board[new_x][new_y] = board[loc.x][loc.y] + 1;
                    if ( vis[new_x][new_y] == 0 )
                        BFSqueue.push({x : new_x, y : new_y});
                }
            }
        }
        board_clear(vis, 0);
        return Found;
    }

    function board_DFS( snake, food, board ) {
        if ( dfs_times > MAX_DFS ) return;
        var head = snake[0];
        if ( head.x == food.x && head.y == food.y ) {
            dfs_times++;
            var holes = board_Eval(snake, food, board);
            if ( holes < min_holes && is_tail_inside(snake, food, board) ) {
                safe_stack = deepClone(tmp_stack);
                min_holes = holes;
            }
            return;
        }
        var tail = deepClone(snake[snake.length - 1]);
        board_reset(snake, food, board);
        board_BFS(snake, food, board);
        //���Կ��������������������ʹ�ÿ��Դ���̵����������
        for ( var i = 0; i < 4; ++i ) {
            var new_x = head.x + MOV[i][0];
            var new_y = head.y + MOV[i][1];
            if ( is_legal(new_x, new_y, board) && vis[new_x][new_y] == 0 && board[new_x][new_y] != UNDEFINED ) {
                snake.unshift({x: new_x, y: new_y});
                if ( !(new_x == food.x && new_y == food.y) ) snake.pop();
                tmp_stack.push(i);
                vis[new_x][new_y] = 1;
                board_DFS(snake, food, board);
                vis[new_x][new_y] = 0;
                snake.shift();
                if ( !(new_x == food.x && new_y == food.y) ) snake.push(tail);
                tmp_stack.pop();
            }
        }
    }

    function DFS_tail( snake, food, board, real_food ) {
        if ( dfs_times > MAX_DFS / 10 ) return;
        var head = snake[0];
        var tail = deepClone(snake[snake.length - 1]);
        if ( head.x == food.x && head.y == food.y ) {
            dfs_times++;
            return;
        }
        board_reset(snake, real_food, board);
        var is_reachable = board_BFS(snake, real_food, board);
        if ( is_reachable && find_safe_way( snake, real_food, board ) != ERR ) {
            var holes = board_Eval(snake, food, board);
            if ( holes < min_holes ) {
                safe_stack = deepClone(tmp_stack);
                min_holes = holes;
            }
            return;
        }
        board_reset(snake, food, board);
        board_BFS(snake, food, board);
        for ( var i = 0; i < 4; ++i ) {
            var new_x = head.x + MOV[i][0];
            var new_y = head.y + MOV[i][1];
            if ( is_legal(new_x, new_y, board) && vis[new_x][new_y] == 0 && board[new_x][new_y] != UNDEFINED ) {
                snake.unshift({x: new_x, y: new_y});
                if ( !(new_x == food.x && new_y == food.y) ) snake.pop();
                tmp_stack.push(i);
                vis[new_x][new_y] = 1;
                board_DFS(snake, food, board);
                vis[new_x][new_y] = 0;
                snake.shift();
                if ( !(new_x == food.x && new_y == food.y) ) snake.push(tail);
                tmp_stack.pop();
            }
        }
    }

    function board_Eval( snake, food, board ) {
        board_reset(snake, food, board);
        var idx = 1;
        for ( var x = 0; x < w; x++ )
            for ( var y = 0; y < h; y++ ) {
                if ( is_legal(x, y, board) && board[x][y] == UNDEFINED ) {
                    eval_DFS(x, y, board, idx);
                    idx++;
                }
            }
        return idx - 1;
    }

    function eval_DFS( x, y, board, idx ) {
        board[x][y] = idx;
        for ( var i = 0; i < 4; ++i ) {
            var new_x = x + MOV[i][0];
            var new_y = y + MOV[i][1];
            if ( is_legal(new_x, new_y, board) && board[new_x][new_y] == UNDEFINED )
                eval_DFS(new_x, new_y, board, idx);
        }
    }

    function choose_shortest_safe_move( snake, board ) {
        var head = snake[0];
        var best_move = ERR;
        var _min = INF;
        for ( var i = 0; i < 4; i++ )
        {
            var new_x = head.x + MOV[i][0];
            var new_y = head.y + MOV[i][1];
            if ( is_legal(new_x, new_y, board) && board[new_x][new_y] < _min ) {
                _min = board[new_x][new_y];
                best_move = i;
            }
        }
        return best_move;
    }

    function choose_longest_safe_move( snake, board ) {
        var head = snake[0];
        var best_move = ERR;
        var _max = -1;
        for ( var i = 0; i < 4; i++ )
        {
            var new_x = head.x + MOV[i][0];
            var new_y = head.y + MOV[i][1];
            if ( is_legal(new_x, new_y, board) && board[new_x][new_y] > _max && board[new_x][new_y] < UNDEFINED ) {
                _max = board[new_x][new_y];
                best_move = i;
            }
        }
        return best_move;
    }

    function choose_random_safe_move( snake, board ) {
        var head = snake[0];
        var avaliable = [];
        for ( var i = 0; i < 4; i++ )
        {
            var new_x = head.x + MOV[i][0];
            var new_y = head.y + MOV[i][1];
            if ( is_legal(new_x, new_y, board) && board[new_x][new_y] < UNDEFINED ) {
                avaliable.push(i);
            }
        }
        if ( avaliable.length == 0 ) return ERR;
        var index = parseInt(Math.random() * parseFloat(avaliable.length));
        index %= avaliable.length;
        return avaliable[index];
    }

    function virtual_shortest_move( tmp_snake, food, tmp_board ) {
        board_reset(tmp_snake, food, tmp_board);
        while ( true ) {
            board_BFS(tmp_snake, food, tmp_board);
            var move = choose_shortest_safe_move(tmp_snake, tmp_board);
            var head = deepClone(tmp_snake[0]);
            var tail = deepClone(tmp_snake[tmp_snake.length - 1]);
            head.x += MOV[move][0];
            head.y += MOV[move][1];
            tmp_snake.unshift(head);
            tmp_board[head.x][head.y] = SNAKE;
            if ( head.x == food.x && head.y == food.y ) {
                break;
            } else {
                tmp_snake.pop();
                tmp_board[tail.x][tail.y] = UNDEFINED;
            }
        }
    }
    //����Ƿ����׷����β�˶�������ͷ����β������·���ģ��Ա�����ͷ������·�����Ǹ��������
    function is_tail_inside( tmp_snake, food, tmp_board ){
        board_reset(tmp_snake, food, tmp_board);
        var head = deepClone(tmp_snake[0]);
        var tail = deepClone(tmp_snake[tmp_snake.length - 1]);
        //����ؽ���β�͵���ʳ��
        tmp_board[tail.x][tail.y] = FOOD;
        //��������ʳ��ĵط��������������Ͳ����ߵ�
        tmp_board[food.x][food.y] = SNAKE;
        var result = board_BFS(tmp_snake, tail, tmp_board);
        tmp_board[tail.x][tail.y] = SNAKE;
        for ( var i = 0; i < 4; i++ ) {
            var new_x = head.x + MOV[i][0];
            var new_y = head.y + MOV[i][1];
            if ( tmp_snake.length > 3 &&  (new_x >= 0 && new_x < w && new_y >= 0 && new_y < h) && ( new_x == tail.x && new_y == tail.y ) )
                result = false;
        }
        return result;
    }

    function follow_tail( snake, food, board ) {
        var tmp_board = deepClone(board);
        var tmp_snake = deepClone(snake);
        var tail = deepClone(tmp_snake[tmp_snake.length - 1]);
        board_reset(tmp_snake, food, tmp_board);
        tmp_board[tail.x][tail.y] = FOOD;       //����β����Ϊʳ��
        tmp_board[food.x][food.y] = SNAKE;      //��ʳ������Ϊ����
        board_BFS(tmp_snake, tail, tmp_board);  //BFS�������������
        tmp_board[tail.x][tail.y] = SNAKE;      //����β�ָ�
        return choose_longest_safe_move(tmp_snake, tmp_board);
    }

    function any_possible_move( snake, food, board ) {
        board_reset(snake, food, board);
        board_BFS(snake, food, board);
        var head = deepClone(snake[0]);
        var avaliable = [];
        for ( var i = 0; i < 4; i++ ) {
            var new_x = head.x + MOV[i][0];
            var new_y = head.y + MOV[i][1];
            if ( is_legal(new_x, new_y, board) )
                avaliable.push(i);
        }
        if ( avaliable.length == 0 ) return ERR;
        var rand = Math.random();
        var index = parseInt(rand * parseFloat(avaliable.length));
        if ( index >= avaliable.length ) index = avaliable.length;
        return avaliable[index];
    }

    function find_safe_way( snake, food, board ) {
        var tmp_board = deepClone(board);
        var tmp_snake = deepClone(snake);
        virtual_shortest_move(tmp_snake, food, tmp_board);
        if ( is_tail_inside(tmp_snake, food, tmp_board ) ) {
            return choose_shortest_safe_move(snake, board);
        } else {
            return ERR;
        }
    }

    var think = function(game) {
        var snake = deepClone(game.snake);
        var food = deepClone(game.food[0]);
        var board = [];
        board_init(board, 0);
        board_reset(snake, food, board);
        var is_reachable = board_BFS(snake, food, board);
        //�������ܳ����ͱ���DFS
        var best_move = ERR;
        if ( snake.length > MAX_LEN ) {
            if ( safe_stack.length > 0 ) {
                best_move = safe_stack.shift();
            } else {
                min_holes = INF;
                dfs_times = 0;
                tmp_stack = [];
                board_clear(vis, 0);
                //���ʳ��ɴ����һ�����������ٵ�·��
                //��ΪDFS�д������ƣ����Դ����Ҳ���·�������
                //���򣬾��߲��������ٵ�·��ȥ׷β��
                //ע������Ĳ��Ծͱ��ÿ����һ����ȥ����ܷ�׷β��
                if ( is_reachable ) {
                    board_DFS(snake, food, board);
                } else {
                    var tail = deepClone(snake[snake.length - 1]);
                    DFS_tail(snake, tail, board, food);
                }
                if ( safe_stack.length > 0 ) {
                    best_move = safe_stack.shift();
                }
            }
        } else {
            if ( is_reachable ) {
                best_move = find_safe_way(snake, food, board);
            }
        }
        if ( best_move == ERR ) best_move = follow_tail(snake, food, board);
        if ( best_move == ERR ) best_move = any_possible_move(snake, food, board);
        if ( best_move == ERR ) best_move = 0;
        return MOV_STR[best_move];
    };

    return think;
}
