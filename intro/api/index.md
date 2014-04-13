---
layout: page
title: 接口文档
---
## 全局变量
*全局变量**几乎不**推荐选手使用. *
```
	Infinity: Infinity
	Array: function Array() { [native code] }
	ArrayBuffer: function ArrayBuffer() { [native code] }
	Blob: function Blob() { [native code] }
	Boolean: function Boolean() { [native code] }
	DataView: function DataView() { [native code] }
	Date: function Date() { [native code] }
	Error: function Error() { [native code] }
	EvalError: function EvalError() { [native code] }
	EventSource: function EventSource() { [native code] }
	FileError: function FileError() { [native code] }
	FileException: function FileException() { [native code] }
	FileReader: function FileReader() { [native code] }
	FileReaderSync: function FileReaderSync() { [native code] }
	Float32Array: function Float32Array() { [native code] }
	Float64Array: function Float64Array() { [native code] }
	Function: function Function() { [native code] }
	JSON: JSON
	Math: MathConstructor
	MessageChannel: function MessageChannel() { [native code] }
	MessageEvent: function MessageEvent() { [native code] }
	NaN: NaN
	Number: function Number() { [native code] }
	Object: function Object() { [native code] }
	RangeError: function RangeError() { [native code] }
	ReferenceError: function ReferenceError() { [native code] }
	RegExp: function RegExp() { [native code] }
	String: function String() { [native code] }
	SyntaxError: function SyntaxError() { [native code] }
	TEMPORARY: 0
	TypeError: function TypeError() { [native code] }
	URIError: function URIError() { [native code] }
	URL: function URL() { [native code] }
	WebSocket: function WebSocket() { [native code] }
	WorkerLocation: function WorkerLocation() { [native code] }
	XMLHttpRequest: function XMLHttpRequest() { [native code] }
	addEventListener: function addEventListener() { [native code] }
	clearInterval: function clearInterval() { [native code] }
	clearTimeout: function clearTimeout() { [native code] }
	close: function close() { [native code] }
	constructor: function DedicatedWorkerContext() { [native code] }
	decodeURI: function decodeURI() { [native code] }
	decodeURIComponent: function decodeURIComponent() { [native code] }
	dispatchEvent: function dispatchEvent() { [native code] }
	encodeURI: function encodeURI() { [native code] }
	encodeURIComponent: function encodeURIComponent() { [native code] }
	escape: function escape() { [native code] }
	eval: function eval() { [native code] }
	hasOwnProperty: function hasOwnProperty() { [native code] }
	importScripts: function importScripts() { [native code] }
	isFinite: function isFinite() { [native code] }
	isNaN: function isNaN() { [native code] }
	isPrototypeOf: function isPrototypeOf() { [native code] }
	location: WorkerLocation
	navigator: WorkerNavigator
	parseFloat: function parseFloat() { [native code] }
	parseInt: function parseInt() { [native code] }
	postMessage: function postMessage() { [native code] }
	propertyIsEnumerable: function propertyIsEnumerable() { [native code] }
	removeEventListener: function removeEventListener() { [native code] }
	self: DedicatedWorkerContext
	setInterval: function setInterval() { [native code] }
	setTimeout: function setTimeout() { [native code] }
	toLocaleString: function toLocaleString() { [native code] }
	toString: function toString() { [native code] }
	undefined: undefined
	unescape: function unescape() { [native code] }
	valueOf: function valueOf() { [native code] }
```
以上为浏览器内置的全局变量. 另有 `Worker` 等全局变量有严重的兼容性问题, 以及本平台专用变量如果被修改游戏将无法继续运行, 所以不在此列出. 
## 游戏环境
移动场宽度 `w` 和高度 `h` 在选手脚本初始化时作为参数给出. 
```
	var think = createThink(w, h); // 游戏平台在初始化选手脚本时使用的语法. 
```
## 游戏状态
游戏状态均在选手的脚本被调用时以 `Object` 的形式作为参数给出. 
```
	var result = think(game); // 游戏平台调用时使用的语法. 
```
### 坐标表示
下文中所说的坐标均为此形式
```
	var location = {
	    x: {{横坐标}}
	    ,y: {{纵坐标}}
	};
```
### 贪吃蛇状态
贪吃蛇状态为一包含坐标的数组, 从 `0` 计, 长度为贪吃蛇长度. 
```
	game.snake: [{{贪吃蛇关节坐标}}, ... ]
```
#### 例子
查询贪吃蛇头部和尾部的坐标: 
```
	var head = game.snake[0];
	var tail = game.snake[game.snake.length - 1]
```
### 食物状态
食物状态为一包含坐标的数组, 从 `0` 计, 长度为食物个数. 
```
	game.food: [{{食物坐标}}]
```
*注意: `game.food` 为一个数组. 但在本次比赛中只允许有一个食物格子. *
#### 例子
查询食物的*横坐标*: 
```
	var foodX = game.food[0].x;
```
## 选手可以调用的接口
1. 检查位置是否合法的接口
```
	check: check(loc, game) { [native code] }
```
若 `loc` 中描述的位置在移动场内且不与贪吃蛇身体冲突, 则返回 `true` , 否则返回 `false`(二者皆为 JavaScript 的保留字). 例子: 
```
	console.log(check({
	    x: -1
	    ,y: -1
	}), game); // false;
	console.log(check(game.snake[3], game); // false;
```

## 推荐使用的调试用函数
调试用的函数可能影响评测效率导致超时, 请提交代码时删除或注释掉此类代码. 

1. 打印变量至控制台的函数
```
	console.log({{要输出的变量}});
```
1. 打印数组至控制台的函数
```
	console.table({{要输出的数组}});
```