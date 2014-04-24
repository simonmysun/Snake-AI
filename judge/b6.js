/*
* team:Yogurt
* 队长：郭正尧
*
*/

 __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  createThink = function(w, h) {
    var DOWN, ERR, FOOD, HEAD, LEFT, MAP_SIZE, RIGHT, SNAKE, UNDEFINED, UP, bfsLongestMove, bfsShortestMove, bfsUpdate, changeCircle, circleMap, circleMap_2, convert, convertMove, currDir, findSafeWay, followTail, food, i, initMap, isCellFree, isMovePossible, isTailInside, lastLen, map, mov, n, printM, resetMap, shiftArray, snake, snakeSize, stepNoEat, tMap, tSnake, tSnakeSize, virtualShortestMove, wonder, _i, _j;
    LEFT = -1;
    RIGHT = 1;
    UP = -w;
    DOWN = w;
    MAP_SIZE = h * w;
    UNDEFINED = (h + 1) * (w + 1);
    SNAKE = 2 * UNDEFINED;
    FOOD = 0;
    ERR = -199;
    HEAD = 0;
    mov = [LEFT, RIGHT, UP, DOWN];
    map = [];
    snake = [];
    snakeSize = 5;
    snake[HEAD] = 5;
    food = 0;
    currDir = RIGHT;
    tMap = [];
    tSnake = [];
    tSnakeSize = 0;
    tSnake[HEAD] = 0;
    printM = [];
    lastLen = 0;
    stepNoEat = 0;
    circleMap = [];
    circleMap_2 = [];
    n = MAP_SIZE - 1;
    for (i = _i = 0; 0 <= n ? _i <= n : _i >= n; i = 0 <= n ? ++_i : --_i) {
      if (i < 19) {
        circleMap[i] = RIGHT;
      } else if ((i % 20) % 2 === 0) {
        circleMap[i] = UP;
      } else {
        circleMap[i] = DOWN;
      }
      if (i < 39 && i > 21 && i % 2 === 0) {
        circleMap[i] = LEFT;
      } else if (i > 280 && i < 300 && i % 2 === 1) {
        circleMap[i] = LEFT;
      }
    }
    n = MAP_SIZE - 1;
    for (i = _j = 0; 0 <= n ? _j <= n : _j >= n; i = 0 <= n ? ++_j : --_j) {
      if (i % 20 === 19) {
        circleMap_2[i] = DOWN;
      } else if (i % 40 < 19) {
        circleMap_2[i] = RIGHT;
      } else {
        circleMap_2[i] = LEFT;
      }
      if (i % 40 === 18 && i !== 18) {
        circleMap_2[i] = UP;
      }
      if (i % 40 === 20) {
        circleMap_2[i] = UP;
      }
      if (i > 219) {
        if ((i % 20) % 2 === 0) {
          circleMap_2[i] = UP;
        } else {
          circleMap_2[i] = DOWN;
        }
        if (i > 221 && i < 239 && i % 2 === 0) {
          circleMap_2[i] = LEFT;
        }
        if (i > 280 && i < 300 && i % 2 === 1) {
          circleMap_2[i] = LEFT;
        }
      }
    }
    changeCircle = function() {
      var t;
      t = circleMap;
      circleMap = circleMap_2;
      return circleMap_2 = t;
    };
    convert = function(p) {
      return p.y * w + p.x;
    };
    isCellFree = function(p) {
      return !(__indexOf.call(snake, p) >= 0);
    };
    isMovePossible = function(p, move) {
      if (move === LEFT) {
        return p % w >= 1;
      } else if (move === RIGHT) {
        return p % w <= (w - 2);
      } else if (move === UP) {
        return p >= w;
      } else if (move === DOWN) {
        return p <= (h - 1) * w;
      }
    };
    initMap = function(game, psnake, pmap) {
      var num, p, _k, _l;
      num = MAP_SIZE - 1;
      for (i = _k = 0; 0 <= num ? _k <= num : _k >= num; i = 0 <= num ? ++_k : --_k) {
        pmap[i] = UNDEFINED;
      }
      psnake = (function() {
        var _l, _len, _ref, _results;
        _ref = game.snake;
        _results = [];
        for (_l = 0, _len = _ref.length; _l < _len; _l++) {
          p = _ref[_l];
          _results.push(convert(p));
        }
        return _results;
      })();
      snakeSize = psnake.length;
      tSnakeSize = psnake.length;
      food = convert(game.food[0]);
      num = snakeSize - 1;
      for (i = _l = 0; 0 <= num ? _l <= num : _l >= num; i = 0 <= num ? ++_l : --_l) {
        pmap[psnake[i]] = SNAKE;
      }
      pmap[food] = FOOD;
      return psnake;
    };
    resetMap = function(psnake, psize, pmap) {
      var _k, _l, _results;
      n = MAP_SIZE - 1;
      for (i = _k = 0; 0 <= n ? _k <= n : _k >= n; i = 0 <= n ? ++_k : --_k) {
        pmap[i] = UNDEFINED;
      }
      n = psize - 1;
      _results = [];
      for (i = _l = 0; 0 <= n ? _l <= n : _l >= n; i = 0 <= n ? ++_l : --_l) {
        _results.push(pmap[psnake[i]] = SNAKE);
      }
      return _results;
    };
    bfsUpdate = function(pfood, psnake, pmap) {
      var found, idx, inqueue, queue, _k;
      queue = [];
      inqueue = [];
      queue.push(pfood);
      found = false;
      while (queue.length > 0) {
        idx = queue.shift();
        if (inqueue[idx] === 1) {
          continue;
        }
        inqueue[idx] = 1;
        for (i = _k = 0; _k <= 3; i = ++_k) {
          if (isMovePossible(idx, mov[i])) {
            if ((idx + mov[i]) === psnake[HEAD]) {
              found = true;
            }
            if (pmap[idx + mov[i]] < SNAKE) {
              if (pmap[idx + mov[i]] > pmap[idx] + 1) {
                pmap[idx + mov[i]] = pmap[idx] + 1;
              }
              if (inqueue[idx + mov[i]] !== 1) {
                queue.push(idx + mov[i]);
              }
            }
          }
        }
      }
      return found;
    };
    bfsShortestMove = function(pmap, psnake) {
      var min, move, _k;
      move = ERR;
      min = SNAKE;
      for (i = _k = 0; _k <= 3; i = ++_k) {
        if (isMovePossible(psnake[HEAD], mov[i]) && pmap[psnake[HEAD] + mov[i]] < min) {
          min = pmap[psnake[HEAD] + mov[i]];
          move = mov[i];
        }
      }
      return move;
    };
    bfsLongestMove = function(pmap, psnake) {
      var max, move, _k;
      move = ERR;
      max = -1;
      for (i = _k = 0; _k <= 3; i = ++_k) {
        if (isMovePossible(psnake[HEAD], mov[i]) && pmap[psnake[HEAD] + mov[i]] < UNDEFINED && pmap[psnake[HEAD] + mov[i]] > max) {
          max = pmap[psnake[HEAD] + mov[i]];
          move = mov[i];
        }
      }
      return move;
    };
    isTailInside = function(b) {
      var result, _k;
      tMap[tSnake[tSnakeSize - 1]] = FOOD;
      if (b) {
        tMap[food] = SNAKE;
      }
      result = bfsUpdate(tSnake[tSnakeSize - 1], tSnake, tMap);
      for (i = _k = 0; _k <= 3; i = ++_k) {
        if (isMovePossible(tSnake[HEAD], mov[i]) && tSnake[HEAD] + mov[i] === tSnake[tSnakeSize - 1] && tSnakeSize > 3) {
          result = false;
        }
      }
      return result;
    };
    followTail = function(game) {
      tSnakeSize = snakeSize;
      tSnake = deepClone(snake);
      tSnake = initMap(game, tSnake, tMap);
      tMap[tSnake[tSnakeSize - 1]] = FOOD;
      tMap[food] = SNAKE;
      bfsUpdate(tSnake[tSnakeSize - 1], tSnake, tMap);
      tMap[tSnake[tSnakeSize - 1]] = SNAKE;
      return bfsLongestMove(tMap, tSnake);
    };
    shiftArray = function(arr, size) {
      var _k, _results;
      _results = [];
      for (i = _k = size; size <= 1 ? _k <= 1 : _k >= 1; i = size <= 1 ? ++_k : --_k) {
        _results.push(arr[i] = arr[i - 1]);
      }
      return _results;
    };
    virtualShortestMove = function(game) {
      var move, _results;
      tSnakeSize = snakeSize;
      tSnake = deepClone(snake);
      tMap = deepClone(map);
      tSnake = initMap(game, tSnake, tMap);
      _results = [];
      while (true) {
        bfsUpdate(food, tSnake, tMap);
        move = bfsShortestMove(tMap, tSnake);
        shiftArray(tSnake, tSnakeSize);
        tSnake[HEAD] = tSnake[HEAD] + move;
        if (tSnake[HEAD] === food) {
          tSnakeSize += 1;
          resetMap(tSnake, tSnakeSize, tMap);
          tMap[food] = SNAKE;
          break;
        } else {
          tMap[tSnake[HEAD]] = SNAKE;
          tMap[tSnake[tSnakeSize]] = UNDEFINED;
          continue;
        }
      }
      return _results;
    };
    findSafeWay = function(game) {
      var safeMove;
      virtualShortestMove(game);
      if (isTailInside(true)) {
        return bfsShortestMove(map, snake);
      }
      safeMove = followTail(game);
      return safeMove;
    };
    wonder = function(game, idx, dir) {
      if (isMovePossible(idx, circleMap[idx]) && isCellFree(idx + circleMap[idx]) && dir !== (-circleMap[idx])) {
        tSnake = initMap(game, tSnake, tMap);
        tMap[tSnake[HEAD] + circleMap[idx]] = SNAKE;
        tMap[tSnake[tSnakeSize - 1]] = UNDEFINED;
        tMap[food] = UNDEFINED;
        tSnake[HEAD] = tSnake[HEAD] + circleMap[idx];
        if (isTailInside(false)) {
          return circleMap[idx];
        }
      }
      return ERR;
    };
    convertMove = function(m) {
      if (m === LEFT) {
        return "left";
      } else if (m === RIGHT) {
        return "right";
      } else if (m === UP) {
        return "up";
      } else if (m === DOWN) {
        return "down";
      }
    };
    return function(game) {
      var bestMove;
      if (game.snake.length >= 250) {
        return convertMove(circleMap[convert(game.snake[0])]);
      }
      bestMove = ERR;
      snake = initMap(game, snake, map);
      if (snakeSize > 170) {
        if (stepNoEat >= 300) {
          changeCircle();
          stepNoEat = 0;
        }
        if (lastLen === game.snake.length) {
          stepNoEat = stepNoEat + 1;
        } else {
          stepNoEat = 0;
        }
        bestMove = wonder(game, snake[HEAD], currDir);
        if (bestMove !== ERR) {
          lastLen = game.snake.length;
          currDir = bestMove;
          return convertMove(bestMove);
        }
      }
      if (bfsUpdate(food, snake, map)) {
        bestMove = findSafeWay(game);
      } else {
        bestMove = followTail(game);
      }
      currDir = bestMove;
      lastLen = game.snake.length;
      return convertMove(bestMove);
    };
  };
