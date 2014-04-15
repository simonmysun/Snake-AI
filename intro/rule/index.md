---
layout: page
title: 规则
---

## 1

游戏由各个回合组成, 选手的 AI 脚本将被一共调用 `10000` 次和最多共 `300` 秒的时间. "回合分数"和"总分数"将被用来评价选手的 AI 脚本. 

	var steps = 10000;
	var time = 300 * 1000;
	var score = 0;
	var totScore = 0;


## 2

每回合由一个移动场, 一个方格的食物和一条蛇组成, 回合开始时, 回合分数奖杯设为 `0`. 

	score = 0;
	createSnake();
	createFood();
	loop();


## 3

移动场(贪吃蛇的活动)范围是一个宽为 `w`, 高为 `h` 的网格平面. 

	var w, h;


## 4

游戏过程中一直会有 `1` 个格子放置食物. 食物的位置不与贪吃蛇占用的位置冲突. 

	var newFood = {
	    x: Math.round(Math.random() * (self.w - 1))
	    ,y: Math.round(Math.random() * (self.h - 1))
	};
	while(self.check(newFood) === false && snake.length != w * h) {
	    newFood = {
	        x: Math.round(Math.random() * (self.w - 1))
	        ,y: Math.round(Math.random() * (self.h - 1))
            };
	}
	food.push(newFood);


## 5

选手控制的蛇被定义为一个格子链. 回合开始时蛇的长度为 5 个格子. 蛇头放置于 `(4, 0)` 蛇尾放置于 `(0, 0)`, 

	var snake = [];
	for(var i = 5 - 1; i >= 0 ; i -- ) {
	    snake.push({
	        x: i
	        ,y: 0
	    });
	}


## 5

在每一步选手选择一个不与当前方向相反的方向, 蛇头将沿此方向前进, 蛇身跟随着. 

	var action = think(game);
	var res = move(action);
	var tail = snake.pop();
	snake.unshift({
	    x: res.x
	    ,y: res.y
	});


## 6

如果蛇头占用了食物方格, 蛇长将增加 `1`, 即蛇尾将不前进, 回合得分增加 `1`. 

	if(res.x === food.x && res.y === food.y) {
	    score ++ ;
	    snake.push(tail);
	    snake.food.pop();
	    createFood();
	}


## 7

如果蛇尝试走进自己的身体或移动场外或进行第 100001 次移动或时间超过 `300` 秒蛇将死亡. 一旦蛇死亡回合将结束, 总分增加回合得分的平方. 

	if(check(res) || tick > steps) {
	    totScore += score * score;
	    if(snake.length === w * h) {
	         totScore += score * score;
	    }
	    if(tick <= steps) {
	        score = 0;
	        init();
	        if(tick >= steps) {
	            showShare();
	        }
	    }
	    return;
	}

