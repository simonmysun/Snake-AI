---
layout: default
title: 主页
---
贪吃蛇人工智能算法评测平台
========

一个可以评测应用于贪吃蛇的智能算法的沙箱程序. (限 Chrome 浏览)

## 背景
一条贪婪的蛇被困在有限大小的矩形空间内, 

## 规则
游戏规则与传统贪吃蛇近似, 不过蛇将被允许 `10000` 次, `300` 秒的时间用来移动. 计分方式为每一次死亡计当前一回合分数的平方. 若贪吃蛇能够占满整个空间, 则当前回合计分加倍. 

点击查看[详细规则]. 

## 参赛入门
本评测平台接收 JavaScript 代码, 点击[此处]({{ site.baseurl }}/intro/api)查看详细文档
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
#### 例子
写一个向右向下行进的 AI 脚本: 
```
	function createThink(w, h) {
	    var dir = 'right'
	    return function(game) {
	        if(dir === 'right') {
	            dir = 'down';
	            return dir;
	        } else {
	            dir = 'right';
	            return dir;
	        }
	    }
	}
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
	        ...
	    ]
	    ,food: [
	        {
	            x: ...
	            ,y: ...
	        }
	    ]
	}
```
详见[接口文档]({{ site.baseurl }}/intro/api). 
## 评测沙箱使用方法
### 界面布局
左侧为显示游戏状态的区域, 上半部分显示移动场, 贪吃蛇和食物, 背景分数为当前回合得分, 下方数字为游戏总得分. 

右侧为代码输入和控制面板, `Toggle mode` 按钮切换运行速度, `Load` 按钮装载代码, `Start` 按钮开始运行, `Reset` 重置游戏和代码

### 操作说明
选手将自己的代码输入至文本框之后, 点击 `Load` 按钮, 随后点击 `Start` 按钮即可开始运行. 

### 调试
请使用调试版本进行调试, 调试时打开 Chrome 开发者工具, 装载代码完毕后, 在 `Sources` 标签中的右侧点击 `Workers` 即可调试自己的脚本. 点击此处下载调试版本程序. 

评测环境与调试环境几乎相同, 但有一些变量被占用, 为防止运行结果出现偏差请提交代码前在[在线沙箱]({{ site.baseurl }}/game/)中运行. 
## FAQ
1. 使用什么语言编写脚本? 
> Javascript. 
1. 如何提交代码
> 发送邮件至主办方. 
## 关于
作者: Simonmysun

<!--鸣谢: Friends-->

## Licience
MIT