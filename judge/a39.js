/**
 * Created by Sky on 2014/4/24.
 * Team : E.N.D.
 * Version : 2.0.0
 */
function createThink(w,h) {
    var nextFood;
    var head;
    var tail;
    var maxStep = 192;
    var minMap = [];
    var maxMap = [];
    var father = [];
    var lastDirect = "right";
    for (var x = 0; x < w; x++) {
        minMap[x] = [];
        for (var y = 0; y < h; y++) minMap[x][y] = 99999;
    }
    for (var x = 0; x < w; x++) {
        maxMap[x] = [];
        for (var y = 0; y < h; y++) maxMap[x][y] = -88888;
    }
    for (var x = 0; x < w; x++) {
        father[x] = [];
        for (var y = 0; y < h; y++) father[x][y] = {x: x, y: y};
    }

    function clearMinMap() {
        for (var x in minMap) for (var y in minMap[x]) minMap[x][y] = 99999;
    }

    function clearMaxMap() {
        for (var x in maxMap) for (var y in maxMap[x]) maxMap[x][y] = -88888;
    }

    function clearFather() {
        for (var x = 0; x < w; x++) for (var y = 0; y < h; y++) father[x][y] = {x: x, y: y};
    }

    function legal(x, y) {
        return !(x >= w || x <= -1 || y >= h || y <= -1);
    }

    function checkCollision(x, y, s, len) {
        for (var p = 0; p < len; p++) if (x == s[p].x && y == s[p].y) return true;
        return false;
    }

    //当前蛇，往(nextX,nextY)位置走一步后，到达其他位置的最短路径
    //minMap用的是一个"全局"变量
    //该函数返回值是从当前game的蛇头到goal的最短路径(99999代表不可达)
    function calcMinDistance(nextX, nextY, goal, game) {
        clearMinMap();
        bfsqueue = [];
        bfsqueue.push({x: nextX, y: nextY, dist: 1});
        while (bfsqueue.length > 0) {
            var loc = bfsqueue.shift();
            if (legal(loc.x, loc.y) == false) continue;
            if (checkCollision(loc.x, loc.y, game.snake, game.snake.length - loc.dist + 1)) continue;
            if (minMap[loc.x][loc.y] != 99999) continue;
            minMap[loc.x][loc.y] = loc.dist;
            bfsqueue.push({x: loc.x, y: loc.y - 1, dist: loc.dist + 1});
            bfsqueue.push({x: loc.x, y: loc.y + 1, dist: loc.dist + 1});
            bfsqueue.push({x: loc.x - 1, y: loc.y, dist: loc.dist + 1});
            bfsqueue.push({x: loc.x + 1, y: loc.y, dist: loc.dist + 1});
        }
        return minMap[goal.x][goal.y];
    }

    //当前蛇，往(nextX,nextY)位置走一步后，到达其他位置的最长路径
    //maxMap用的是一个"全局"变量
    //该函数返回值是从当前game的蛇头到goal的最长路径(-1代表不可达)
    function calcMaxDistance(nextX, nextY, goal, game) {
        var len = game.snake.length;
        clearMaxMap();
        clearFather();
        bfsqueue = [];
        bfsqueue.push({lastX: nextX, lastY: nextY, x: nextX, y: nextY, dist: 1});
        while (bfsqueue.length > 0) {
            var loc = bfsqueue.shift();
            if (legal(loc.x, loc.y) == false) continue;
            if (checkCollision(loc.x, loc.y, game.snake, len - 1)) continue;
            if (maxMap[loc.x][loc.y] != -88888) {
                if (maxMap[loc.x][loc.y] >= loc.dist) {
                    continue;
                } else if (checkCollision(loc.x, loc.y, game.snake, len)) {
                    return;
                } else {
                    var locIsFatherOfLast = false;//(loc.x, loc.y) 不在 (lastX, lastY) 的父节点序列中
                    var fatherOfLast = father[loc.lastX][loc.lastY];
                    while (!locIsFatherOfLast) {
                        if (fatherOfLast.x == loc.x && fatherOfLast.y == loc.y) locIsFatherOfLast = true;
                        if (fatherOfLast == father[fatherOfLast.x][fatherOfLast.y]) break;
                        else fatherOfLast = father[fatherOfLast.x][fatherOfLast.y];
                    }
                    if (locIsFatherOfLast) continue;
                }
            }
            maxMap[loc.x][loc.y] = loc.dist;
            father[loc.x][loc.y] = {x: loc.lastX, y: loc.lastY};
            bfsqueue.push({lastX: loc.x, lastY: loc.y, x: loc.x, y: loc.y - 1, dist: loc.dist + 1});
            bfsqueue.push({lastX: loc.x, lastY: loc.y, x: loc.x, y: loc.y + 1, dist: loc.dist + 1});
            bfsqueue.push({lastX: loc.x, lastY: loc.y, x: loc.x - 1, y: loc.y, dist: loc.dist + 1});
            bfsqueue.push({lastX: loc.x, lastY: loc.y, x: loc.x + 1, y: loc.y, dist: loc.dist + 1});
        }
    }

    function canFindTail1(nextX, nextY, game) {
        for (var i = game.snake.length - 1; i > 0; i--) {
            if (minMap[game.snake[i].x][game.snake[i].y] != 99999) {
                return true;
            }
        }
        return false;
    }
    function canFindTail2(nextX, nextY, game) {
        for (var i = game.snake.length - 1; i > 0; i--) {
            if (maxMap[game.snake[i].x][game.snake[i].y] != -88888) {
                return true;
            }
        }
        return false;
    }

    function distance(x1, y1, x2, y2) {
        return (Math.abs(x1 - x2) + Math.abs(y1 - y2))
    }

    return function (game) {
        head = game.snake[0];
        tail = game.snake[game.snake.length - 1];
        nextFood = game.food[0];
        var up = calcMinDistance(head.x, head.y - 1, nextFood, game);
        var up2 = distance(head.x, head.y - 1, tail.x, tail.y);
        var upFindTail = canFindTail1(head.x, head.y - 1, game);
        if (upFindTail == false) {
            calcMaxDistance(head.x, head.y - 1, tail, game);
            upFindTail = canFindTail2(head.x, head.y - 1, game);
        }
        var down = calcMinDistance(head.x, head.y + 1, nextFood, game);
        var down2 = distance(head.x, head.y + 1, tail.x, tail.y);
        var downFindTail = canFindTail1(head.x, head.y + 1, game);
        if (downFindTail == false) {
            calcMaxDistance(head.x, head.y + 1, tail, game);
            downFindTail = canFindTail2(head.x, head.y + 1, game);
        }
        var left = calcMinDistance(head.x - 1, head.y, nextFood, game);
        var left2 = distance(head.x - 1, head.y, tail.x, tail.y);
        var leftFindTail = canFindTail1(head.x - 1, head.y, game);
        if (leftFindTail == false) {
            calcMaxDistance(head.x - 1, head.y, tail, game);
            leftFindTail = canFindTail2(head.x - 1, head.y, game);
        }
        var right = calcMinDistance(head.x + 1, head.y, nextFood, game);
        var right2 = distance(head.x + 1, head.y, tail.x, tail.y);
        var rightFindTail = canFindTail1(head.x + 1, head.y, game);
        if (rightFindTail == false) {
            calcMaxDistance(head.x + 1, head.y, tail, game);
            rightFindTail = canFindTail2(head.x + 1, head.y, game);
        }

        var canFindFood = false;
        if (up != 99999 || down != 99999 || left != 99999 || right != 99999) canFindFood = true;
        var minDistance = 99999;
        var maxDistance = -88888;
        var bestDirect;
        if (game.snake.length >= maxStep) canFindFood = false;
        if (canFindFood) {
            if (nextFood.y == 0 || nextFood.y == h - 1) {
                if (leftFindTail && left < minDistance) {
                    minDistance = left;
                    bestDirect = "left";
                }
                if (rightFindTail && right < minDistance) {
                    minDistance = right;
                    bestDirect = "right";
                }
                if (upFindTail && up < minDistance) {
                    minDistance = up;
                    bestDirect = "up";
                }
                if (downFindTail && down < minDistance) {
                    minDistance = down;
                    bestDirect = "down";
                }
            } else if (nextFood.x == 0 || nextFood.x == w - 1) {
                if (upFindTail && up < minDistance) {
                    minDistance = up;
                    bestDirect = "up";
                }
                if (downFindTail && down < minDistance) {
                    minDistance = down;
                    bestDirect = "down";
                }
                if (leftFindTail && left < minDistance) {
                    minDistance = left;
                    bestDirect = "left";
                }
                if (rightFindTail && right < minDistance) {
                    minDistance = right;
                    bestDirect = "right";
                }
            } else if (lastDirect == "right" || lastDirect == "left") {
                if (leftFindTail && left < minDistance) {
                    minDistance = left;
                    bestDirect = "left";
                }
                if (rightFindTail && right < minDistance) {
                    minDistance = right;
                    bestDirect = "right";
                }
                if (upFindTail && up < minDistance) {
                    minDistance = up;
                    bestDirect = "up";
                }
                if (downFindTail && down < minDistance) {
                    minDistance = down;
                    bestDirect = "down";
                }
            } else {
                if (upFindTail && up < minDistance) {
                    minDistance = up;
                    bestDirect = "up";
                }
                if (downFindTail && down < minDistance) {
                    minDistance = down;
                    bestDirect = "down";
                }
                if (leftFindTail && left < minDistance) {
                    minDistance = left;
                    bestDirect = "left";
                }
                if (rightFindTail && right < minDistance) {
                    minDistance = right;
                    bestDirect = "right";
                }
            }
        } else {//找不到食物
            if (upFindTail && up2 > maxDistance) {
                maxDistance = up2;
                bestDirect = "up";
            }
            if (downFindTail && down2 > maxDistance) {
                maxDistance = down2;
                bestDirect = "down";
            }
            if (leftFindTail && left2 > maxDistance) {
                maxDistance = left2;
                bestDirect = "left";
            }
            if (rightFindTail && right2 > maxDistance) {
                maxDistance = right2;
                bestDirect = "right";
            }
        }
        lastDirect = bestDirect;
        return bestDirect;
    }
}