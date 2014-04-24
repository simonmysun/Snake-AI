/*
Team 15
Author:weijinhua
Version:0.0.0
Time:20140424 20.30
*/
function createThink(w,h) {
    var minMap = [];
    var nextFood;
    var bfsqueue;
    var bl_max=99999999;
	var count=0;
	var TailCont=190;
	var StepNoTailFood=400;
	var StepNoTailCount=0;
	var StepNoHeadFood=35;
	var StepNoHeadCount=0;
	var is_good=false;
    /*
    初始minmap,距离都变成很
    */
    for(var x = 0; x < w; x ++ ) {  
        minMap[x] = [];
        for(var y = 0; y < h; y ++ ) {
            minMap[x][y] = bl_max;
        }
    }
    //回到初始状
    function clearMap(map) { 
        for(var x in map) {
            for(var y in map[x]) {
            map[x][y] = bl_max;
            }
        }
    }
    //位置是否合法
    function legal(x, y) { 
        if(x >= w || x <= -1 || y >= h || y <= -1) {
            return false;
        } else {
            return true;
        }
    }
    //位置是否和蛇发生碰撞
    function checkCollision(x, y, s) { 
        for(var p in s) {
            if(x === s[p].x && y === s[p].y) {
                return true;
            }
        }
        return false;
    }
    //蛇在这一步，是否合法
    function is_move_possible(x,y,snake)  
    {
        if(legal(x,y)) 
        {
            if(!checkCollision(x,y,snake)) return true;
        }
        return false;
    }
    /*
    a.push(n) 将n插入在最后，返回数组长度。可以添加多个数
    a.pop()  移除数组最后一个元素，返回该元
    a.shift() 移除数组第一个元素，返回该元
    a.unshift(n) 将n插入数组开头，返回该数组，可以插入多个
    */
    /*
    用BFS的方法遍历全部路径，记录下以食物中心每个路径长度
    */
    function bfs(loc_k, s,map) {//loc为食
        bfsqueue = [];
        bfsqueue.push({ //三个参数的意义：x作标，Y作标，dist向处辐射的层数，每一次把风本身投进去
            x: loc_k.x
            ,y: loc_k.y
            ,dist: 0
        });
        while(bfsqueue.length > 0) {
            loc = bfsqueue.shift();
            /*
            这是三和不合法的情况
            */
            if(legal(loc.x, loc.y) == false) {
                continue;
            }
            if(checkCollision(loc.x, loc.y, s)) {
                map[loc.x][loc.y] = -1;
                continue;
            }
            if(map[loc.x][loc.y] != bl_max) {//这个是记录已经遍历了
                continue;
            }
            //如果合法，则把他的下一级，放入队列，并把这个复制为最短距
            map[loc.x][loc.y] = loc.dist;
            bfsqueue.push({
                x: loc.x
                ,y: loc.y - 1
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x
                ,y: loc.y + 1
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x - 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
            bfsqueue.push({
                x: loc.x + 1
                ,y: loc.y
                ,dist: loc.dist + 1
            });
        }
    }
    //最长路径方
    function get_longest_dir(snake,minmap)
    {
        var maxDist = -1;
        var head1=snake[0];
        var maxDirect="right";
		 if(is_move_possible(head1.x, head1.y-1,snake))
        {
            if(maxDist < minmap[head1.x][head1.y-1] && minmap[head1.x][head1.y-1] != -1
			  &&minmap[head1.x][head1.y-1]!=bl_max) {
                    maxDirect = "up";
                    maxDist = minmap[head1.x][head1.y-1];
            }
		}
		if(is_move_possible(head1.x - 1, head1.y,snake))
        {
            if(maxDist < minmap[head1.x - 1][head1.y] && minmap[head1.x - 1][head1.y] != -1
			  &&minmap[head1.x - 1][head1.y]!=bl_max) {
                    maxDirect = "left";
                    maxDist = minmap[head1.x - 1][head1.y];
            }
        }
        if(is_move_possible(head1.x + 1, head1.y,snake))
        {
            if(maxDist < minmap[head1.x + 1][head1.y] && minmap[head1.x + 1][head1.y] != -1&&
			   minmap[head1.x + 1][head1.y]!=bl_max) {
                    maxDirect = "right";
                    maxDist = minmap[head1.x + 1][head1.y];
            }
        }
        if(is_move_possible(head1.x, head1.y+1,snake))
        {
            if(maxDist < minmap[head1.x ][head1.y+1] && minmap[head1.x][head1.y+1] != -1
			  &&minmap[head1.x][head1.y+1]!=bl_max) {
                    maxDirect = "down";
                    maxDist = minmap[head1.x][head1.y+1];
            }
        }
        return maxDirect;
    }
    
    //是否有路径，蛇头周围是能否到达食
   function is_path(snake,minmap)
    {
        var head1=snake[0];
        if(is_move_possible(head1.x + 1, head1.y,snake)&&minmap[head1.x + 1][head1.y] != bl_max&& minmap[head1.x + 1][head1.y] != -1) return true;
        if(is_move_possible(head1.x - 1, head1.y,snake)&&minmap[head1.x - 1][head1.y] != bl_max&& minmap[head1.x - 1][head1.y] != -1) return true;
        if(is_move_possible(head1.x, head1.y+1,snake)&&minmap[head1.x][head1.y+1] != bl_max&& minmap[head1.x][head1.y+1] != -1) return true;
        if(is_move_possible(head1.x, head1.y-1,snake)&&minmap[head1.x][head1.y-1] != bl_max&& minmap[head1.x][head1.y-1] != -1) return true;
        return false;
    }
    //寻找到达食物最短的方向
    function get_shortest_dir(snake,minmap)
    {
        var minDist = bl_max;
        var head1=snake[0];
        var minDirect="right";
		if(is_move_possible(head1.x - 1, head1.y,snake))
        {
            if(minDist > minmap[head1.x - 1][head1.y] && minmap[head1.x - 1][head1.y] != -1) {
                    minDirect = "left";
                    minDist = minmap[head1.x - 1][head1.y];
            }
        }
        if(is_move_possible(head1.x + 1, head1.y,snake))
        {
            if(minDist > minmap[head1.x + 1][head1.y] && minmap[head1.x + 1][head1.y] != -1) {
                    minDirect = "right";
                    minDist = minmap[head1.x + 1][head1.y];
            }
        }
        
		 if(is_move_possible(head1.x, head1.y-1,snake))
        {
            if(minDist > minmap[head1.x][head1.y-1] && minmap[head1.x][head1.y-1] != -1) {
                    minDirect = "up";
                    minDist = minmap[head1.x][head1.y-1];
            }
        }
		
        if(is_move_possible(head1.x, head1.y+1,snake))
        {
            if(minDist > minmap[head1.x ][head1.y+1] && minmap[head1.x][head1.y+1] != -1) {
                    minDirect = "down";
                    minDist = minmap[head1.x][head1.y+1];
            }
        }   
        return minDirect;
    }
    //蛇头到蛇尾是否有路径，如果有，则是安全的，反之是不安全的
    function is_save_path(vsnake,vmap)
    {
		var is_save=false;
        var head1=vsnake[0];
        clearMap(vmap);
		var vir_food=vsnake[vsnake.length-1];
        vsnake.pop();//蛇尾为虚拟食物,并且移除
        bfs(vir_food,vsnake,vmap);
        if(is_move_possible(head1.x + 1, head1.y,vsnake)&&vmap[head1.x + 1][head1.y] != bl_max&& vmap[head1.x + 1][head1.y] != -1) is_save=true;
        if(is_move_possible(head1.x - 1, head1.y,vsnake)&&vmap[head1.x - 1][head1.y] != bl_max&& vmap[head1.x - 1][head1.y] != -1) is_save=true;
        if(is_move_possible(head1.x, head1.y+1,vsnake)&&vmap[head1.x][head1.y+1] != bl_max&& vmap[head1.x][head1.y+1] != -1) is_save=true;
        if(is_move_possible(head1.x, head1.y-1,vsnake)&&vmap[head1.x][head1.y-1] != bl_max&& vmap[head1.x][head1.y-1] != -1)  is_save=true;
		vsnake.push(vir_food);
        return is_save;
    }
    //下一步的位置，虚拟蛇行走
    function vir_move_onestep(loc,dir)
    {
		var loc_i=deepClone(loc);//这里区别下，，直接用loc（小心后果）
        if(dir=="down") loc_i.y=loc_i.y+1;
        else if(dir=="up") loc_i.y = loc_i.y-1;
        else if(dir=="left") loc_i.x=loc_i.x-1;
        else loc_i.x=loc_i.x+1;
        return loc_i;
    }
	//根着尾巴走，选取最长的路线（区别选取最短路线）
    function fellow_tail(snake,map)
    {
		var tail_dir;
		var vi_food = snake.pop();
		clearMap(map);
		bfs(vi_food,snake,map);
		if(is_path(snake,map))
		{
			tail_dir=get_longest_dir(snake,map);
		}
		snake.push(vi_food);
		return tail_dir;
    }
    //虚拟的进行移动，并返回最短路径是否安
	//都要虚拟的棋盘内行走
    function vir_shortest_move(food,s,map)
    {
        var eat_food=false;
        var vir_map=deepClone(map);
        var vir_snake=deepClone(s);
        var vir_food=deepClone(food);
        var vir_loc;         
        clearMap(vir_map); //这个bfs的位置得放好，不能在while里面，如果在里面，会导致时间超时
        bfs(vir_food,vir_snake,vir_map);     
        if(!is_path(vir_snake,vir_map)) return false;
        while(!eat_food)
        {
            vir_loc=vir_move_onestep(vir_snake[0],get_shortest_dir(vir_snake,vir_map));
            if(vir_loc.x==vir_food.x&&vir_food.y==vir_loc.y) 
            {
                eat_food=true;
                vir_snake.unshift(vir_loc);
            }else 
            {//虚拟蛇移
                vir_snake.unshift(vir_loc);
                vir_snake.pop();
            }
        }
        if( is_save_path(vir_snake,vir_map)) return true;//get_shortest_dir(s,map);
		return false;//fellow_tail(s,map);
    }
	function ate(re_dir,snake,food)
	{
		var k_loc=vir_move_onestep(snake[0],re_dir);
	//console.log('food',food.x,food.y);
	//	console.log('k_loc',k_loc.x,k_loc.y);
		if(food.x==k_loc.x&&food.y==k_loc.y) return true;
		return false;
	}
	//当其他方法都不行时，随便找一个可行的方向走
    function wander(s)
    {
       	 var wand=s[0];
		 if(is_move_possible(wand.x - 1, wand.y,s)) return "left";
         else if(is_move_possible(wand.x + 1, wand.y,s)) return "right";
         else if(is_move_possible(wand.x, wand.y-1,s)) return  "up";
         else return "down";
    }
	//调用方法
    return function(game) {
        var minDirect = "down";
//console.log(count);//调试时，记下步骤
        if(minMap == undefined) 
		{
            minMap = [];
            for(var x = 0; x < w; x ++ ) {
                minMap[x] = [];
                for(var y = 0; y < h; y ++ ) {
                    minMap[x][y] = bl_max;
                }
            }
            bfs(nextFood, game.snake,minMap);
        }  
		//这段代码，填充走。。
		if(game.snake.length>TailCont) 
		{//防止死循环
			if(is_save_path(game.snake,minMap)&&StepNoTailCount<StepNoTailFood)
			{
				var re_dir;
				StepNoTailCount++;
				re_dir= fellow_tail(game.snake,minMap);
				if(ate(re_dir,game.snake,game.food[0])) StepNoTailCount=0;
				return re_dir;
			}else 
			{
				//调整姿态
					if(is_good) 
					{
						StepNoTailCount=0;
						is_good=false;
					}	
					clearMap(minMap);                         
					bfs(game.food[0], game.snake,minMap);
					//可以直达食物
					if(is_path(game.snake,minMap))
					{
						
						if( vir_shortest_move(game.food[0],game.snake,minMap))
						{
							if(StepNoHeadCount>StepNoHeadFood)
								is_good=true;
						    StepNoHeadCount++;
				//		console.log('fjiefje',StepNoHeadCount);
							return get_shortest_dir(game.snake,minMap);
						}
						return fellow_tail(game.snake,minMap);
					}
					//可以达到蛇尾
					if(is_save_path(game.snake,minMap))
					{
							return fellow_tail(game.snake,minMap);
					}
			}	
			 return wander(game.snake);
		}
        clearMap(minMap);                         
        bfs(game.food[0], game.snake,minMap);
        //可以直达食物
        if(is_path(game.snake,minMap))
        {
			if( vir_shortest_move(game.food[0],game.snake,minMap))
				return get_shortest_dir(game.snake,minMap);
			return fellow_tail(game.snake,minMap);
			//return vir_shortest_move(game.food[0],game.snake,minMap);
		}
		//可以达到蛇尾
		if(is_save_path(game.snake,minMap))
		{
			return fellow_tail(game.snake,minMap);
		}
		//其他情况的都不行时，随便找一个可行的方向走
        return wander(game.snake);
    };
}