
    function createThink(w, h) {


        //把蛇头节点加入到open中
        function aInitial(open, snakeHead) {

            open.push({ cost: 0, predict_value: 0, x: snakeHead.x, y: snakeHead.y, parent: null });
        }

        //把邻节点加入到openRear中(真实找尾巴的过程)
        function joinNodesRear(tNode, openRear, closedRear, snakeRear, game) {
            var res;
            if (isInClosed(tNode.x, tNode.y - 1, closedRear) === false) {
                if (tNode.y - 1 === snakeRear.y && tNode.x === snakeRear.x) {
                    openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y - 1, snakeRear), x: tNode.x, y: tNode.y - 1, parent: tNode });
                }
                else {
                    if (check({ x: tNode.x, y: tNode.y - 1 }, game)) {
                        res = isInOpen(tNode.x, tNode.y - 1, openRear);
                        if (res.r === false) {
                            openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y - 1, snakeRear), x: tNode.x, y: tNode.y - 1, parent: tNode });
                        }

                    }
                }


            }
            if (isInClosed(tNode.x + 1, tNode.y, closedRear) === false) {
                if (tNode.x + 1 === snakeRear.x && tNode.y === snakeRear.y) {
                    openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x + 1, tNode.y, snakeRear), x: tNode.x + 1, y: tNode.y, parent: tNode });
                }
                else {
                    if (check({ x: tNode.x + 1, y: tNode.y }, game)) {
                        res = isInOpen(tNode.x + 1, tNode.y, openRear);
                        if (res.r === false) {
                            openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x + 1, tNode.y, snakeRear), x: tNode.x + 1, y: tNode.y, parent: tNode });
                        }

                    }
                }


            }
            if (isInClosed(tNode.x, tNode.y + 1, closedRear) === false) {
                if (tNode.y + 1 === snakeRear.y && tNode.x === snakeRear.x) {
                    openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y + 1, snakeRear), x: tNode.x, y: tNode.y + 1, parent: tNode });
                }
                else {
                    if (check({ x: tNode.x, y: tNode.y + 1 }, game)) {
                        res = isInOpen(tNode.x, tNode.y + 1, openRear);
                        if (res.r === false) {
                            openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y + 1, snakeRear), x: tNode.x, y: tNode.y + 1, parent: tNode });
                        }

                    }
                }


            }
            if (isInClosed(tNode.x - 1, tNode.y, closedRear) === false) {
                if (tNode.x - 1 === snakeRear.x && tNode.y === snakeRear.y) {
                    openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x - 1, tNode.y, snakeRear), x: tNode.x - 1, y: tNode.y, parent: tNode });
                }
                else {
                    if (check({ x: tNode.x - 1, y: tNode.y }, game)) {
                        res = isInOpen(tNode.x - 1, tNode.y, openRear);
                        if (res.r === false) {
                            openRear.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x - 1, tNode.y, snakeRear), x: tNode.x - 1, y: tNode.y, parent: tNode });
                        }

                    }
                }


            }
        }

        //把邻节点加入到open中(真实找食物的过程)
        function joinNodes(tNode, open, closed, foodloc, game) {
            var res;

            if (tNode.y - 1 >= 0 && isInClosed(tNode.x, tNode.y - 1, closed) === false && check({ x: tNode.x, y: tNode.y - 1 }, game) === true) {
                res = isInOpen(tNode.x, tNode.y - 1, open);
                if (res.r === false) {
                    open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y - 1, foodloc), x: tNode.x, y: tNode.y - 1, parent: tNode });
                }
                else {
                    if (open[res.index].cost + 1 < tNode.cost) {
                        tNode.cost = open[res.index].cost + 1;
                        tNode.parent = open[res.index];
                    }
                }

            }
            if (tNode.x + 1 <= w && isInClosed(tNode.x + 1, tNode.y, closed) === false && check({ x: tNode.x + 1, y: tNode.y }, game) === true) {
                res = isInOpen(tNode.x + 1, tNode.y, open);
                if (res.r === false) {
                    open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x + 1, tNode.y, foodloc), x: tNode.x + 1, y: tNode.y, parent: tNode });
                }
                else {
                    if (open[res.index].cost + 1 < tNode.cost) {
                        tNode.cost = open[res.index].cost + 1;
                        tNode.parent = open[res.index];
                    }
                }

            }
            if (tNode.y + 1 <= h && isInClosed(tNode.x, tNode.y + 1, closed) === false && check({ x: tNode.x, y: tNode.y + 1 }, game) === true) {
                res = isInOpen(tNode.x, tNode.y + 1, open);
                if (res.r === false) {
                    open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y + 1, foodloc), x: tNode.x, y: tNode.y + 1, parent: tNode });
                }
                else {
                    if (open[res.index].cost + 1 < tNode.cost) {
                        tNode.cost = open[res.index].cost + 1;
                        tNode.parent = open[res.index];
                    }
                }

            }
            if (tNode.x - 1 >= 0 && isInClosed(tNode.x - 1, tNode.y, closed) === false && check({ x: tNode.x - 1, y: tNode.y }, game) === true) {
                res = isInOpen(tNode.x - 1, tNode.y, open);
                if (res.r === false) {
                    open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x - 1, tNode.y, foodloc), x: tNode.x - 1, y: tNode.y, parent: tNode });
                }
                else {
                    if (open[res.index].cost + 1 < tNode.cost) {
                        tNode.cost = open[res.index].cost + 1;
                        tNode.parent = open[res.index];
                    }
                }

            }
        }

        //把邻节点加入到open中(虚拟找食物的过程)
        function VirFoodjoinNodes(tNode, open, closed, foodloc, virMap) {
            var res;
            if (tNode.y - 1 >= 0 && isInClosed(tNode.x, tNode.y - 1, closed) === false) {
                if (virMap[tNode.y - 1][tNode.x] !== "snakeBody") {
                    res = isInOpen(tNode.x, tNode.y - 1, open);
                    if (res.r === false) {
                        open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y - 1, foodloc), x: tNode.x, y: tNode.y - 1, parent: tNode });
                    }

                }
                else {
                    if (tNode.y - 1 === foodloc.y && tNode.x === foodloc.x) {
                        res = isInOpen(tNode.x, tNode.y - 1, open);
                        if (res.r === false) {
                            open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y - 1, foodloc), x: tNode.x, y: tNode.y - 1, parent: tNode });
                        }
                    }
                }


            }
            if (tNode.x + 1 < w && isInClosed(tNode.x + 1, tNode.y, closed) === false) {
                if (virMap[tNode.y][tNode.x + 1] !== "snakeBody") {
                    res = isInOpen(tNode.x + 1, tNode.y, open);
                    if (res.r === false) {
                        open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x + 1, tNode.y, foodloc), x: tNode.x + 1, y: tNode.y, parent: tNode });
                    }

                }
                else {
                    if (tNode.y === foodloc.y && tNode.x + 1 === foodloc.x) {
                        res = isInOpen(tNode.x + 1, tNode.y, open);
                        if (res.r === false) {
                            open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x + 1, tNode.y, foodloc), x: tNode.x + 1, y: tNode.y, parent: tNode });
                        }
                    }
                }

            }
            if (tNode.y + 1 < h && isInClosed(tNode.x, tNode.y + 1, closed) === false) {
                if (virMap[tNode.y + 1][tNode.x] !== "snakeBody") {
                    res = isInOpen(tNode.x, tNode.y + 1, open);
                    if (res.r === false) {
                        open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y + 1, foodloc), x: tNode.x, y: tNode.y + 1, parent: tNode });
                    }

                }
                else {
                    if (tNode.y + 1 === foodloc.y && tNode.x === foodloc.x) {
                        res = isInOpen(tNode.x, tNode.y + 1, open);
                        if (res.r === false) {
                            open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y + 1, foodloc), x: tNode.x, y: tNode.y + 1, parent: tNode });
                        }
                    }
                }

            }
            if (tNode.x - 1 >= 0 && isInClosed(tNode.x - 1, tNode.y, closed) === false) {
                if (virMap[tNode.y][tNode.x - 1] !== "snakeBody") {
                    res = isInOpen(tNode.x - 1, tNode.y, open);
                    if (res.r === false) {
                        open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x - 1, tNode.y, foodloc), x: tNode.x - 1, y: tNode.y, parent: tNode });
                    }
                }
                else {
                    if (tNode.y === foodloc.y && tNode.x - 1 === foodloc.x) {
                        res = isInOpen(tNode.x - 1, tNode.y, open);
                        if (res.r === false) {
                            open.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x - 1, tNode.y, foodloc), x: tNode.x - 1, y: tNode.y, parent: tNode });
                        }
                    }
                }


            }
        }

        //把邻节点加入到virOpen中(虚拟运行后找尾巴的过程)
        function joinNodesVir(tNode, virOpen, virClosed, virRear, virMap) {
            var res;
            if (tNode.y - 1 >= 0 && isInClosed(tNode.x, tNode.y - 1, virClosed) === false) {
                if (tNode.y - 1 === virRear.y && tNode.x === virRear.x) {
                    virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y - 1, virRear), x: tNode.x, y: tNode.y - 1, parent: tNode });
                }
                else {
                    if (virMap[tNode.y - 1][tNode.x] !== "snakeBody") {
                        res = isInOpen(tNode.x, tNode.y - 1, virOpen);
                        if (res.r === false) {
                            virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y - 1, virRear), x: tNode.x, y: tNode.y - 1, parent: tNode });
                        }

                    }
                }


            }
            if (tNode.x + 1 < w && isInClosed(tNode.x + 1, tNode.y, virClosed) === false) {
                if (tNode.x + 1 === virRear.x && tNode.y === virRear.y) {
                    virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x + 1, tNode.y, virRear), x: tNode.x + 1, y: tNode.y, parent: tNode });
                }
                else {
                    if (virMap[tNode.y][tNode.x + 1] !== "snakeBody") {
                        res = isInOpen(tNode.x + 1, tNode.y, virOpen);
                        if (res.r === false) {
                            virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x + 1, tNode.y, virRear), x: tNode.x + 1, y: tNode.y, parent: tNode });
                        }

                    }
                }


            }
            if (tNode.y + 1 < h && isInClosed(tNode.x, tNode.y + 1, virClosed) === false) {
                if (tNode.y + 1 === virRear.y && tNode.x === virRear.x) {
                    virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y + 1, virRear), x: tNode.x, y: tNode.y + 1, parent: tNode });
                }
                else {
                    if (virMap[tNode.y + 1][tNode.x] !== "snakeBody") {
                        res = isInOpen(tNode.x, tNode.y + 1, virOpen);
                        if (res.r === false) {
                            virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x, tNode.y + 1, virRear), x: tNode.x, y: tNode.y + 1, parent: tNode });
                        }

                    }
                }


            }
            if (tNode.x - 1 >= 0 && isInClosed(tNode.x - 1, tNode.y, virClosed) === false) {
                if (tNode.x - 1 === virRear.x && tNode.y === virRear.y) {
                    virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x - 1, tNode.y, virRear), x: tNode.x - 1, y: tNode.y, parent: tNode });
                }
                else {
                    if (virMap[tNode.y][tNode.x - 1] !== "snakeBody") {
                        res = isInOpen(tNode.x - 1, tNode.y, virOpen);
                        if (res.r === false) {
                            virOpen.push({ cost: tNode.cost + 1, predict_value: prevalue(tNode.x - 1, tNode.y, virRear), x: tNode.x - 1, y: tNode.y, parent: tNode });
                        }

                    }
                }


            }
        }

        //对open按f值从大到小排序
        function sort(list, type) {
            var len = list.length;
            for (var m = 0; m < len - 1; m++) {
                for (var n = 0; n < len - m - 1; n++) {
                    if ((list[n].cost + list[n].predict_value) < (list[n + 1].cost + list[n + 1].predict_value)) {
                        var temp = list[n];
                        list[n] = list[n + 1];
                        list[n + 1] = temp;
                    }
                    else if ((list[n].cost + list[n].predict_value) === (list[n + 1].cost + list[n + 1].predict_value)) {
                        if (list[n].predict_value < list[n + 1].predict_value) {
                            var temp = list[n];
                            list[n] = list[n + 1];
                            list[n + 1] = temp;
                        }
                    }
                }
            }
        }

        //判断open,closed openRear closedRear中是否包含目标节点
        function hasObj(list, obj) {
            for (var i = 0, l = list.length; i < l; i++) {
                if (list[i].x === obj.x && list[i].y === obj.y) {
                    return { res: true, index: i };
                }
            }
            return { res: false, index: -1 };
        }

        //根据路径初步获得方向，但此方向有可能冲突
        function getDirection(list, head) {

            var len = list.length;
            var adjNode = getAdjNode(list[len - 1], head);
            if (adjNode.y < head.y) {
                return 'up';
            }
            else if (adjNode.x > head.x) {
                return 'right';
            }
            else if (adjNode.y > head.y) {
                return 'down';
            }
            else {
                return 'left';
            }

        }

        //得到蛇头的邻节点
        function getAdjNode(Node, head) {
            while (Node.parent.x !== head.x || Node.parent.y !== head.y) {
                Node = Node.parent;

            }

            return Node;

        }

        //确认路径是否合理
        function confirmDir(dir, snakeHead, Node, game) {
            var directionArr;
            if (dir === 'left') {
                if (check({ x: snakeHead.x - 1, y: snakeHead.y }, game) === false) {
                    directionArr = DirectionPrior(snakeHead, Node);
                    for (var m1 = 0; m1 < 4; m1++) {
                        dir = directionArr[m1];
                        if (checkDir(dir, game) === true) {
                            return dir;
                        }
                    }
                }
                return dir;

            }
            else if (dir === 'up') {
                if (check({ x: snakeHead.x, y: snakeHead.y - 1 }, game) === false) {
                    directionArr = DirectionPrior(snakeHead, Node);
                    for (var m2 = 0; m2 < 4; m2++) {
                        dir = directionArr[m2];
                        if (checkDir(dir, game) === true) {
                            return dir;
                        }
                    }
                }
                return dir;
            }

            else if (dir === 'right') {
                if (check({ x: snakeHead.x + 1, y: snakeHead.y }, game) === false) {
                    directionArr = DirectionPrior(snakeHead, Node);
                    for (var m3 = 0; m3 < 4; m3++) {
                        dir = directionArr[m3];
                        if (checkDir(dir, game) === true) {
                            return dir;
                        }

                    }
                }
                return dir;
            }
            else if (dir === 'down') {
                if (check({ x: snakeHead.x, y: snakeHead.y + 1 }, game) === false) {
                    directionArr = DirectionPrior(snakeHead, Node);
                    for (var m4 = 0; m4 < 4; m4++) {
                        dir = directionArr[m4];
                        if (checkDir(dir, game) === true) {
                            return dir;
                        }

                    }
                }
                return dir;
            }
        }

        //判断节点是否在open列表中
        function isInOpen(px, py, list) {
            for (var j = 0, l = list.length; j < l; j++) {
                if (px === list[j].x && py === list[j].y) {
                    return { index: j, r: true };
                }
            }
            return { index: -1, r: false };
        }

        //判断节点是否在closed列表中
        function isInClosed(px, py, list) {
            for (var j = 0, l = list.length; j < l; j++) {
                if (px === list[j].x && py === list[j].y) {
                    return true;
                }
            }
            return false;
        }

        //计算H值
        function prevalue(px, py, node) {
            return (Math.abs(node.x - px) + Math.abs(node.y - py));
        }

        //得到优先方向数组
        function DirectionPrior(snakeHead, node) {
            var Array = ['up', 'down', 'left', 'right'];
            if (node.y > snakeHead.y && node.x <= snakeHead.x) {
                Array[0] = 'down';
                Array[1] = 'left';
                Array[2] = 'up';
                Array[3] = 'right';
            }
            else if (node.y < snakeHead.y && node.x <= snakeHead.x) {
                Array[0] = 'up';
                Array[1] = 'left';
                Array[2] = 'down';
                Array[3] = 'right';
            }
            else if (node.y > snakeHead.y && node.x >= snakeHead.x) {
                Array[0] = 'down';
                Array[1] = 'right';
                Array[2] = 'up';
                Array[3] = 'left';
            }
            else if (node.y < snakeHead.y && node.x >= snakeHead.x) {
                Array[0] = 'up';
                Array[1] = 'right';
                Array[2] = 'down';
                Array[3] = 'left';
            }
            else if (node.x > snakeHead.x) {
                Array[0] = 'right';
                Array[1] = 'left';
                Array[2] = 'down';
                Array[3] = 'up';
            }
            else if (node.x < snakeHead.x) {
                Array[1] = 'right';
                Array[0] = 'left';
                Array[2] = 'down';
                Array[3] = 'up';
            }
            return Array;
        }

        //判断方向是否合理，合理返回true
        function checkDir(dir, game) {
            var snakeHead = { x: game.snake[0].x, y: game.snake[0].y}//得到蛇头的位置
            if (dir === 'left') {
                return check({ x: snakeHead.x - 1, y: snakeHead.y }, game);
            }

            else if (dir === 'up') {
                return check({ x: snakeHead.x, y: snakeHead.y - 1 }, game);

            }
            else if (dir === 'right') {

                return check({ x: snakeHead.x + 1, y: snakeHead.y }, game);
            }
            else if (dir === 'down') {

                return check({ x: snakeHead.x, y: snakeHead.y + 1 }, game);

            }

        }

        function checkRamDir(dir , game) {
            var snakeHead = { x: game.snake[0].x, y: game.snake[0].y}//得到蛇头的位置
            if (dir === 'left') {
                if (check({ x: snakeHead.x - 1, y: snakeHead.y }, game)) {
                    if (!check({ x: snakeHead.x - 1, y: snakeHead.y - 1 }, game) && !check({ x: snakeHead.x - 1, y: snakeHead.y + 1 }, game)) {
                        return false;
                    }
                    else {
                        return true;;
                    }
                }
                else {
                    return false;
                }
            }

            else if (dir === 'up') {
            if (check({ x: snakeHead.x, y: snakeHead.y - 1 }, game)) {
                if (!check({ x: snakeHead.x - 1, y: snakeHead.y - 1 }, game) && !check({ x: snakeHead.x + 1, y: snakeHead.y - 1 }, game)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }

            }
            else if (dir === 'right') {

            if (check({ x: snakeHead.x + 1, y: snakeHead.y }, game)) {
                if (!check({ x: snakeHead.x + 1, y: snakeHead.y - 1 }, game) && !check({ x: snakeHead.x + 1, y: snakeHead.y + 1 }, game)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
            }
            else if (dir === 'down') {

            if (check({ x: snakeHead.x, y: snakeHead.y + 1 }, game)) {
                if (!check({ x: snakeHead.x - 1, y: snakeHead.y + 1 }, game) && !check({ x: snakeHead.x + 1, y: snakeHead.y + 1 }, game)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }

            }
        }

        //判断头到食物之间是否有路径
        function findPathToFood(open, snakeHead, closed, foodloc, game, type) {
            var bFindPath = false;
            var searchDeep = 0;
            aInitial(open, snakeHead); //初始化 
            while (!bFindPath && searchDeep <= 500) {
                var tempNode;
                if (open.length == 1) {
                    tempNode = open.pop();
                }
                else {
                    //对open按f值从大到小排序
                    if (open.length > 0) {
                        sort(open);
                        if (type === '0') {
                            tempNode = open.pop();
                        }
                        if (type === '1') {
                            tempNode = open.shift();
                        }

                    }
                    else {

                        return { res: false, direction: "none" };
                    }

                }
                closed.push(tempNode);
                joinNodes(tempNode, open, closed, foodloc, game);
                searchDeep++;
                //如果open中包含食物节点
                var r = hasObj(open, foodloc);
                if (r.res === true) {
                    //从食物开始回溯找出路径
                    var bFindPath = true;
                    var id = r.index;
                    closed.push(open[id]);
                    var dir = getDirection(closed, snakeHead);
                    dir = confirmDir(dir, snakeHead, foodloc, game);

                    return { res: true, direction: dir };
                }
            }
            if (!bFindPath) {

                return { res: false, direction: "none" };
            }

        }

        //判断虚拟头和食物之间是否有路径
        function findVirPathToFood(virHead, foodloc, virMap) {
            var bFindPath = false;
            var searchDeep = 0;
            var virOpen = [];
            var virClosed = [];
            virOpen.push({ cost: 0, predict_value: 0, x: virHead.x, y: virHead.y, parent: null }); //初始化
            while (!bFindPath && searchDeep <= 500) {
                var tempNode;
                if (virOpen.length == 1) {
                    tempNode = virOpen.pop();
                }
                else {
                    //对open按f值从大到小排序
                    if (virOpen.length > 0) {
                        sort(virOpen);
                        tempNode = virOpen.pop();
                    }
                    else {

                        return { result: false, direction: "none" }
                    }

                }
                virClosed.push(tempNode);
                VirFoodjoinNodes(tempNode, virOpen, virClosed, foodloc, virMap);
                searchDeep++;
                //如果openRear中包含蛇尾节点
                var r = hasObj(virOpen, foodloc);
                if (r.res === true) {
                    //从食物开始回溯找出路径
                    var bFindPath = true;
                    var id = r.index;
                    virClosed.push(virOpen[id]);
                    var dir = getDirection(virClosed, virHead);
                    //dir = confirmDir(dir, virHead, foodloc, game);

                    return { res: true, direction: dir };

                }
            }
            if (!bFindPath) {

                return { res: true, direction: "none" };
            }

        }

        //判断头到尾是否有路径
        function findPathToSnakeRear(openRear, snakeHead, closedRear, snakeRear, game) {
            var bFindPath = false;
            var searchDeep = 0;
            aInitial(openRear, snakeHead); //初始化
            while (!bFindPath && searchDeep <= 500) {
                var tempNode;
                if (openRear.length == 1) {
                    tempNode = openRear.shift();
                }
                else {
                    //对open按f值从大到小排序
                    if (openRear.length > 0) {
                        sort(openRear);
                        tempNode = openRear.shift();
                    }
                    else {
                        closedRear = [];
                        return { res: false, direction: "none" };
                    }

                }
                closedRear.push(tempNode);
                joinNodesRear(tempNode, openRear, closedRear, snakeRear, game);
                searchDeep++;
                //如果openRear中包含蛇尾节点
                var r = hasObj(openRear, snakeRear);
                if (r.res === true) {
                    //从食物开始回溯找出路径
                    var bFindPath = true;
                    var id = r.index;
                    closedRear.push(openRear[id]);
                    var dir = getDirection(closedRear, snakeHead);
                    dir = confirmDir(dir, snakeHead, snakeRear, game);
                    openRear = [];
                    closedRear = [];
                    return { res: true, direction: dir };
                }
            }
            if (!bFindPath) {
                openRear = [];
                closedRear = [];
                return { res: false, direction: "none" };
            }

        }

        //判断虚拟头和虚拟尾之间是否有路径
        function findVirPath(virHead, virRear, virMap) {
            var bFindPath = false;
            var searchDeep = 0;
            var virOpen = [];
            var virClosed = [];
            virOpen.push({ cost: 0, predict_value: 0, x: virHead.x, y: virHead.y, parent: null }); //初始化
            while (!bFindPath && searchDeep <= 500) {
                var tempNode;
                if (virOpen.length == 1) {
                    tempNode = virOpen.shift();
                }
                else {
                    //对open按f值从大到小排序
                    if (virOpen.length > 0) {
                        sort(virOpen);
                        tempNode = virOpen.shift();
                    }
                    else {
                        virClosed = [];
                        return false;
                    }

                }
                virClosed.push(tempNode);
                joinNodesVir(tempNode, virOpen, virClosed, virRear, virMap);
                searchDeep++;
                //如果openRear中包含蛇尾节点
                var r = hasObj(virOpen, virRear);
                if (r.res === true) {
                    virClosed = [];
                    virOpen = [];

                    return true;
                }
            }
            if (!bFindPath) {
                virClosed = [];
                virOpen = [];
                return false;
            }

        }

        //初始化虚拟地图
        function InitialVirMap(foodloc, virtualSnake) {
            var virMap = [];
            for (var i = 0; i < h; i++) {
                virMap[i] = [];
                for (var j = 0; j < w; j++) {
                    virMap[i][j] = "ground";
                }
            }
            for (var j = 0, l = virtualSnake.length; j < l; j++) {
                virMap[virtualSnake[j].y][virtualSnake[j].x] = "snakeBody";
            }
            virMap[foodloc.y][foodloc.x] = "food";

            return virMap;

        }

        //派出虚拟社探路 看是否安全
        function isSafe(game, direction) {
            var foodloc = { x: game.food[0].x, y: game.food[0].y}//得到食物的位置
            var body = deepClone(game.snake); //得到蛇的信息(副本)
            var virMap = InitialVirMap(foodloc, body);
            var virHead = { x: body[0].x, y: body[0].y };
            var virRear = { x: body[body.length - 1].x, y: body[body.length - 1].y };
            var getFood = false;
            //存储蛇身节点

            while (!getFood) {
                if (body[0].x  === foodloc.x && body[0].y === foodloc.y) {
                   
                    break;
                }
                var res = findVirPathToFood(body[0], foodloc, virMap);
                if (res.direction !== "none") {
                    //根据方向移动蛇，设置蛇对应的标志
                    if (res.direction === "up") {
                        virMap[body[0].y - 1][body[0].x] = "snakeBody";
                        body.unshift({ x: body[0].x, y: body[0].y - 1 });
                    }
                    else if (res.direction === "right") {
                        virMap[body[0].y][body[0].x + 1] = "snakeBody";
                        body.unshift({ x: body[0].x + 1, y: body[0].y });
                    }
                    else if (res.direction === "down") {
                        virMap[body[0].y + 1][body[0].x] = "snakeBody";
                        body.unshift({ x: body[0].x, y: body[0].y + 1 });
                    }
                    else if (res.direction === "left") {
                        virMap[body[0].y][body[0].x - 1] = "snakeBody";
                        body.unshift({ x: body[0].x - 1, y: body[0].y });
                    }
                    virMap[body[body.length - 1].y][body[body.length - 1].x] = "ground";
                    body.pop();
                    virRear.x = body[body.length - 1].x;
                    virRear.y = body[body.length - 1].y;

                }

            }
            if ((check({ x: foodloc.x, y: foodloc.y - 1 }, game) === false || virMap[foodloc.y - 1][foodloc.x] === "snakeBody") && (check({ x: foodloc.x, y: foodloc.y + 1 }, game) === false || virMap[foodloc.y + 1][foodloc.x] === "snakeBody") && (check({ x: foodloc.x + 1, y: foodloc.y }, game) === false || virMap[foodloc.y][foodloc.x + 1] === "snakeBody") && (check({ x: foodloc.x - 1, y: foodloc.y }, game) === false || virMap[foodloc.y][foodloc.x - 1] === "snakeBody")) {

                return false;
            }
           
            //根据虚拟蛇的状态判断虚拟头和虚拟尾巴找路径路径(此时的蛇头就是食物的位置)
            if (!isSiWei(foodloc.x, foodloc.y - 1, virMap) || !isSiWei(foodloc.x + 1, foodloc.y, virMap) || !isSiWei(foodloc.x, foodloc.y + 1, virMap) || !isSiWei(foodloc.x - 1, foodloc.y, virMap)) {
                if (isAdjoin(foodloc, virRear, game)) {
                    //蛇头蛇尾相邻
                    return false;
                }
                else {
                    return findVirPath(body[0], virRear, virMap);
                }
            }
            else {
                return false;
            }

        }

        //判断一个坐标点是不是死位（周围不是墙就是蛇身(包括蛇尾)称之为死位）
        function isSiWei(x, y, virMap) {
            if (x < 0 || x >= w || y < 0 || y >= h || virMap[y][x] === "snakeBody") {
                return true;
            }
            else {
                return false;
            }
        }

        //判断两点是否相邻
        function isAdjoin(node1, node2, game) {
            if (check({ x: node1.x - 1, y: node1.y }, game)) {
                if ((node1.x - 1 === node2.x && node1.y === node2.y)) {
                    return true;
                }

            }
            if (check({ x: node1.x, y: node1.y - 1 }, game)) {
                if ((node1.x === node2.x && node1.y - 1 === node2.y)) {
                    return true;
                }
            }
            if (check({ x: node1.x + 1, y: node1.y }, game)) {
                if ((node1.x + 1 === node2.x && node1.y === node2.y)) {
                    return true;
                }
            }
            if (check({ x: node1.x, y: node1.y + 1 }, game)) {
                if ((node1.x === node2.x && node1.y + 1 === node2.y)) {
                    return true;
                }
            }
            return false;

        }
        //得到1-4的随机数
        function getRandomNum(n) {
            return parseInt(Math.random() * n + 1);
        }

        //随机得到一个方向
        function getRandomDirection() {
            var dir = ['right', 'down', 'left', 'up'];
            return dir[getRandomNum(4) - 1];
        }


        var think = function (game) {
            var foodloc;
            if (foodloc === undefined) {
                foodloc = { x: game.food[0].x, y: game.food[0].y}//得到食物的位置
            }
            var snakeHead;
            if (snakeHead === undefined) {
                snakeHead = { x: game.snake[0].x, y: game.snake[0].y}//得到蛇头的位置
            }
            var snakeRear;
            if (snakeRear === undefined) {
                snakeRear = { x: game.snake[game.snake.length - 1].x, y: game.snake[game.snake.length - 1].y}//得到蛇尾的位置
            }
            var open = [];
            var closed = [];
            var openRear = [];
            var closedRear = [];




         
            var res = findPathToFood(open, snakeHead, closed, foodloc, game, '0');
            if (res.direction !== "none") {
                //蛇头和食物之间有路径,派出虚拟蛇去吃食物 判断假设吃到食物后头到尾是否有路径
                var safe = isSafe(game, res.direction);
                if (safe === true) {
                    open = [];
                    closed = [];
                    openRear = [];
                    closedRear = [];

                    return res.direction;
                }
                else {
                    //追着蛇尾跑
                    var res1 = findPathToSnakeRear(openRear, snakeHead, closedRear, snakeRear, game);
                    if (res1.res === true) {
                        //蛇头和蛇尾之间有路径,蛇头追蛇尾
                        open = [];
                        closed = [];
                        openRear = [];
                        closedRear = [];

                        return res1.direction;
                    }
                    else {
                        //随机走几步
                        var count = 0;
                        var dir = getRandomDirection();
                        while (!checkDir(dir, game) && count < 50) {
                            dir = getRandomDirection();
                            count++;
                        }

                        return dir;
                    }
                }

            }
            else {
                //如果蛇头和食物之间没有路径,判断蛇头与蛇尾是否有路径
                var res1 = findPathToSnakeRear(openRear, snakeHead, closedRear, snakeRear, game);
                if (res1.res === true) {
                    //蛇头和蛇尾之间有路径,蛇头追蛇尾
                    open = [];
                    closed = [];
                    openRear = [];
                    closedRear = [];

                    return res1.direction;
                }
                else {
                    //随机移动
                    var count = 0;
                    var dir = getRandomDirection();
                    while (!checkDir(dir, game) && count < 50) {
                        count++;
                        dir = getRandomDirection();
                    }

                    return dir;
                }
            }

        };
        return think;
    };


 


     