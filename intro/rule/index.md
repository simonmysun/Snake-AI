---
layout: default
title: ����
---

1. ��Ϸ�ɸ����غ����, ѡ�ֵ� AI �ű�����һ������ `10000` �κ���๲ `300` ���ʱ��. "�غϷ���"��"�ܷ���"������������ѡ�ֵ� AI �ű�. 
```
	var steps = 10000;
	var time = 300 * 1000;
	var score = 0;
	var totScore = 0;
```
1. ÿ�غ���һ���ƶ���, һ�������ʳ���һ�������, �غϿ�ʼʱ, �غϷ���������Ϊ `0`. 
```
	score = 0;
	createSnake();
	createFood();
	loop();
```
1. �ƶ���(̰���ߵĻ)��Χ��һ����Ϊ `w`, ��Ϊ `h` ������ƽ��. 
```
	var w, h;
```
1. ��Ϸ������һֱ���� `1` �����ӷ���ʳ��. ʳ���λ�ò���̰����ռ�õ�λ�ó�ͻ. 
```
	var newFood = {
	    x: Math.round(Math.random() * (self.w - 1))
	    ,y: Math.round(Math.random() * (self.h - 1))
	};
	while(self.check(newFood) == false) {
	    newFood = {
	        x: Math.round(Math.random() * (self.w - 1))
	        ,y: Math.round(Math.random() * (self.h - 1))
            };
	}
	food.push(newFood);
```
1. ѡ�ֿ��Ƶ��߱�����Ϊһ��������. �غϿ�ʼʱ�ߵĳ���Ϊ 5 ������. ��ͷ������ `(4, 0)` ��β������ `(0, 0)`, 
```
	var snake = [];
	for(var i = 5 - 1; i >= 0 ; i -- ) {
	    snake.push({
	        x: i
	        ,y: 0
	    });
	}
```
1. ��ÿһ��ѡ��ѡ��һ�����뵱ǰ�����෴�ķ���, ��ͷ���ش˷���ǰ��, ���������. 
```
	var action = think(game);
	var res = move(action);
	var tail = snake.pop();
	snake.unshift({
	    x: res.x
	    ,y: res.y
	});
```
1. �����ͷռ����ʳ�﷽��, �߳������� `1`, ����β����ǰ��, �غϵ÷����� `1`. 
```
	if(res.x == food.x && res.y == food.y) {
	    score ++ ;
	    snake.push(tail);
	    snake.food.pop();
	    createFood();
	}
```
1. ����߳����߽��Լ���������ƶ��������е� 100001 ���ƶ���ʱ�䳬�� `300` ���߽�����. һ���������غϽ�����, �ܷ����ӻغϵ÷ֵ�ƽ��. 
```
	if(check(res) || tick > steps) {
	    totScore += score * score;
	    if(snake.length == w * h) {
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
```