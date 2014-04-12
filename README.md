贪吃蛇人工智能算法评测平台
========

一个可以评测应用于贪吃蛇的智能算法的沙箱程序. 

## 背景


## 规则
1. 游戏由各个回合组成, 选手的 AI 脚本将被一共调用 `10000` 次和最多共 `300` 秒的时间. "回合分数"和"总分数"将被用来评价选手的 AI 脚本. 
```
	var steps = 10000;
	var time = 300 * 1000;
	var score = 0;
	var totScore = 0;
```
1. 每回合由一个移动场, 一个方格的食物和一条蛇组成, 回合开始时, 回合分数奖杯设为 `0`. 
```
	score = 0;
	createSnake();
	createFood();
	loop();
```
1. 移动场(贪吃蛇的活动)范围是一个宽为 `w`, 高为 `h` 的网格平面. 
```
	var w, h;
```
1. 游戏过程中一直会有 `1` 个格子放置食物. 食物的位置不与贪吃蛇占用的位置冲突. 
```
	food = {
	    x: -1
	    ,y: -1
	}; // unavailable cordinate. 
	while(check(food) == false) {
	    food = {
	        x: Math.round(Math.random() * w
	        ,y: Math.round(Math.random() * h
	    };
	}
```
1. 选手控制的蛇被定义为一个格子链. 回合开始时蛇的长度为 5 个格子. 蛇头放置于 `(4, 0)` 蛇尾放置于 `(0, 0)`, 
```
	var snake = [];
	for(var i = 5 - 1; i >= 0 ; i -- ) {
	    snake.push({
	        x: i
	        ,y: 0
	    });
	}
```
1. 在每一步选手选择一个不与当前方向相反的方向, 蛇头将沿此方向前进, 蛇身跟随着. 
```
	var action = think(game);
	var res = move(action);
	var tail = snake.pop();
	snake.unshift({
	    x: res.x
	    ,y: res.y
	});
```
1. 如果蛇头占用了食物方格, 蛇长将增加 `1`, 即蛇尾将不前进, 回合得分增加 `1`. 
```
	if(res.x == food.x && res.y == food.y) {
	    score ++ ;
	    snake.push(tail);
	    createFood();
	}
```
1. 如果蛇尝试走进自己的身体或移动场外或进行第 100001 次移动蛇将死亡. 一旦蛇死亡汇合将结束, 总分增加汇合得分的平方. 
```
	if(check(res) || tick > steps) {
	    totScore += score * score;
	    if(tick <= steps) {
	        score = 0;
	        init();
	        if(tick >= steps) {
	            showShare();
	        }
	    }
	    return;
	}
```

## 参赛入门
### 选手应该提供什么? 
选手应提供一个闭包函数. 该函数将在游戏开始时被载入并运行. 函数应以运动场的大小信息 `w` 和 `h` 为参数, 函数名应为 `createThink`, 并返回每次移动前调用的思考函数. 返回的函数应以游戏状态为参数, 将在每次移动前调用. 
```
	function createThink(w, h) {
	    ...
	    var think = function(game) {
	        ...
	    }
	    return think;
	}
```
或者使用匿名函数. 
```
	function createThink(w, h) {
	    ...
	    return function(game) {
	        ...
	    }
	}
```
函数 `createThink` 在游戏开始时将被调用. 
```
	var think = new createThink(w, h);
```
这里返回的函数 `think` 将在每次移动前调用. 
### 选手可以使用什么? 
`w` 和 `h` 将在游戏开始是提供, 游戏状态将在每次调用智能脚本时调用. 

游戏状态是一个对象, 包括蛇的信息, 食物的信息和一些接口函数. 
```
	{
	    snake: [
	        {
	            x: ...
	            ,y: ...
	        }
	        ,{
	            x: ...
	            ,y: ...
	        }
	        ,{
	            x: ...
	            ,y: ...
	        }
	        ...
	    ]
	    ,food: {
	        x: ...
	        ,y: ...
	    }
	}
```
接口函数详见接口文档. 
## FAQ

## 关于
作者: Simonmysun

鸣谢: 

## Licience
MIT