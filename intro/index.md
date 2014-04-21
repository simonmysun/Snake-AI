---
layout: page
title: 主页
---
贪吃蛇人工智能算法评测平台
========

一个可以评测应用于贪吃蛇的智能算法的沙箱程序. (限 Chrome 浏览)

## 背景

一条贪婪的蛇被困在有限大小的矩形空间内, 吃 295 个食物才能被释放. 可是蛇越吃越长, 越长就越没有空间移动, 请帮助它决定如何移动才能重获自由. 

## 规则

游戏规则与传统贪吃蛇近似, 不过蛇将被允许 `10000` 次, `300` 秒的时间用来移动. 计分方式为每一次死亡计当前一回合分数的平方. 若贪吃蛇能够占满整个空间, 则当前回合计分加倍. 

点击查看[详细规则]({{ site.baseurl }}/intro/rule/). 

## 参赛入门

本评测平台接收 JavaScript 代码, 点击[此处](http://bonsaiden.github.io/JavaScript-Garden/zh/)学习 JavaScript. 

### 选手应该提供什么? 

选手应提供一个闭包函数. 该函数将在游戏开始时被载入并运行. 函数应以运动场的大小信息 `w` 和 `h` 为参数, 函数名应为 `createThink`, 并返回每次移动前调用的思考函数. 返回的函数应以游戏状态为参数, 将在每次移动前调用. 

	function createThink(w, h) {
	    ...
	    var think = function(game) {
	        ...
	    }
	    return think;
	}

或者使用匿名函数. 

	function createThink(w, h) {
	    ...
	    return function(game) {
	        ...
	    }
	}

函数 `createThink` 在游戏开始时将被调用. 

	var think = new createThink(w, h);

#### 例子

写一个向右向下行进的 AI 脚本: 

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


这里返回的函数 `think` 将在每次移动前调用. 

### 选手可以使用什么? 

`w` 和 `h` 将在游戏开始是提供, 游戏状态将在每次调用智能脚本时调用. 

游戏状态是一个对象, 包括蛇的信息, 食物的信息和一些接口函数. 

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


详见[接口文档]({{ site.baseurl }}/intro/api/)和[示例代码]({{ site.baseurl }}/intro/demo/). 

## 评测沙箱使用方法

### 界面布局

左侧为显示游戏状态的区域, 上半部分显示移动场, 贪吃蛇和食物, 背景分数为当前回合得分, 下方数字为游戏总得分. 

右侧为代码输入和控制面板, `Toggle mode` 按钮切换运行速度, `Load` 按钮装载代码, `Start` 按钮开始运行, `Reset` 重置游戏和代码

### 操作说明

选手将自己的代码输入至文本框之后, 点击 `Load` 按钮, 随后点击 `Start` 按钮即可开始运行. 

### 调试

由于我们的评测平台在线版本使用 web worker 机制防止选手作弊, 所以调试时需要在 Chrome 中打开 worker 调试面板, [这里](http://www.nczonline.net/blog/2009/08/25/web-workers-errors-and-debugging/)和[这里](http://blog.csdn.net/donghao526/article/details/9664701)讲述了 web worker 中代码的调试方法. 

调试时打开 Chrome 开发者工具, 装载代码(点击 `Load` )完毕后, 在 `Sources` 标签中的右侧点击 `Workers` 打开 Web Worker 调试窗口, 这里的 `Source` 标签中, `(no domain)` 下的代码即为调试选手提交的脚本. 

_注意: 每次装载都会产生新的 Web Worker 线程, 需要重新打开 Web Worker 调试窗口. _

(不推荐)我们也有[本地调试版本(点击下载)]({{ site.baseurl }}/dev.zip)可供大家进行调试. 评测环境与调试环境几乎相同, 但有一些变量被占用, 为防止运行结果出现偏差请务必在提交代码前在[在线沙箱]({{ site.baseurl }}/game/)中运行. 

## FAQ

1. 使用什么语言编写脚本? 
> Javascript. 

1. 如何提交代码
> 发送邮件至主办方. 

1. 我可以复制 / 修改 Snake-AI 的代码并自己运行吗? 
> 可以. 

## 关于

作者: Simonmysun

<!--鸣谢: Friends-->

## 版权和开放许可 - Copyright & Licience

### 平台代码 - Code of the platform

MIT

### 使用者提交的代码 - Code of participant
使用者提交的内容指从本网站可以下载的所有数据. 

Code of participant are all data that can be downloaded from the website. 

你可以用这些代码在本网站上运行, 也可以缓存或在本地储存. 但除非原作者(们)许可, 你不能出于任何目的修改或重新发布这些代码. 为了本地测试和实验, 你可以使用你自己修改的而非其他人修改的任何版本的 Snake-AI. 

You may use the code to play the original Snake-AI as served from this website, and you may cache or copy it locally. However, you may not modify or redistribute the code for any purpose unless you have a separate license from the owner(s) to do so. To enable local testing and experimenting, you may use the code with versions of Snake-AI that you yourself have modified, but not if the modifications were made by someone else.