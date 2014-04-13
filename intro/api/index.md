---
layout: default
title: �ӿ��ĵ�
---
## ȫ�ֱ���
*ȫ�ֱ���**������**�Ƽ�ѡ��ʹ��. *
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
����Ϊ��������õ�ȫ�ֱ���. ���� `Worker` ��ȫ�ֱ��������صļ���������, �Լ���ƽ̨ר�ñ���������޸���Ϸ���޷���������, ���Բ��ڴ��г�. 
## ��Ϸ����
�ƶ������ `w` �͸߶� `h` ��ѡ�ֽű���ʼ��ʱ��Ϊ��������. 
```
	var think = createThink(w, h); // ��Ϸƽ̨�ڳ�ʼ��ѡ�ֽű�ʱʹ�õ��﷨. 
```
## ��Ϸ״̬
��Ϸ״̬����ѡ�ֵĽű�������ʱ�� `Object` ����ʽ��Ϊ��������. 
```
	var result = think(game); // ��Ϸƽ̨����ʱʹ�õ��﷨. 
```
### �����ʾ
��������˵�������Ϊ����ʽ
```
	var location = {
	    x: {{������}}
	    ,y: {{������}}
	};
```
### ̰����״̬
̰����״̬Ϊһ�������������, �� `0` ��, ����Ϊ̰���߳���. 
```
	game.snake: [{{̰���߹ؽ�����}}, ... ]
```
#### ����
��ѯ̰����ͷ����β��������: 
```
	var head = game.snake[0];
	var tail = game.snake[game.snake.length - 1]
```
### ʳ��״̬
ʳ��״̬Ϊһ�������������, �� `0` ��, ����Ϊʳ�����. 
```
	game.food: [{{ʳ������}}]
```
*ע��: `game.food` Ϊһ������. ���ڱ��α�����ֻ������һ��ʳ�����. *
#### ����
��ѯʳ���*������*: 
```
	var foodX = game.food[0].x;
```
## ѡ�ֿ��Ե��õĽӿ�
1. ���λ���Ƿ�Ϸ��Ľӿ�
```
	check: check(loc, game) { [native code] }
```
�� `loc` ��������λ�����ƶ������Ҳ���̰���������ͻ, �򷵻� `true` , ���򷵻� `false`(���߽�Ϊ JavaScript �ı�����). ����: 
```
	console.log(check({
	    x: -1
	    ,y: -1
	}), game); // false;
	console.log(check(game.snake[3], game); // false;
```

## �Ƽ�ʹ�õĵ����ú���
�����õĺ�������Ӱ������Ч�ʵ��³�ʱ, ���ύ����ʱɾ����ע�͵��������. 

1. ��ӡ����������̨�ĺ���
```
	console.log({{Ҫ����ı���}});
```
1. ��ӡ����������̨�ĺ���
```
	console.table({{Ҫ���������}});
```