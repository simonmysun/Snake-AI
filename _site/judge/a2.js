function createThink(w, h) {
    var nextfood;
    var realsnake = [];

    function legal(x, y, game) {
        if (x >= w || x <= -1 || y >= h || y <= -1) {
            return false;
        } else {
            return true;
        }
    }



    function wangwei(w, h, game) {
        nextfood = game.food[0];
        realsnake = game.snake;
      
        var virtualRoad = [];
        var virtualhead = 0;
        var open = [];
        var openhead = 0;
        open.push({
            x: realsnake[0].x,
            y: realsnake[0].y,
            pointer: -1
        });
        var eatapple = false;
        var circle = false;

        var table1 = [];
        for (var i0 = 0; i0 < w; i0++) {
            table1[i0] = [];
            for (var j0 = 0; j0 < h; j0++) {
                table1[i0][j0] = 1;
            }
        }
        var truesnakelength = realsnake.length;
        for (var i1 = 0; i1 < truesnakelength; i1++) {
            table1[realsnake[i1].x][realsnake[i1].y] = 0;
        }
        if (legal(nextfood.x, nextfood.y - 1, game) && legal(nextfood.x, nextfood.y + 1, game) && legal(nextfood.x + 1, nextfood.y, game) && legal(nextfood.x - 1, nextfood.y, game) && table1[nextfood.x - 1][nextfood.y - 1] === 0 && table1[nextfood.x][nextfood.y - 1] === 0 && table1[nextfood.x + 1][nextfood.y - 1] === 0 && table1[nextfood.x + 1][nextfood.y] === 0 && table1[nextfood.x + 1][nextfood.y + 1] === 0 && table1[nextfood.x][nextfood.y + 1] === 0 && table1[nextfood.x - 1][nextfood.y + 1] === 0 && table1[nextfood.x - 1][nextfood.y] === 0) {
            circle = true;
        }

        while (openhead < open.length) {
            virtualRoad.push({
                x: open[openhead].x,
                y: open[openhead].y,
                pointer: open[openhead].pointer
            });
            openhead++;
            virtualhead++;
            if (openhead % 2 === 0) {
                if (virtualRoad[virtualhead - 1].x === nextfood.x && virtualRoad[virtualhead - 1].y === nextfood.y) {
                    eatapple = true;
                    break;
                }
                if (legal(virtualRoad[virtualhead - 1].x, virtualRoad[virtualhead - 1].y - 1, game) &&

                table1[virtualRoad[virtualhead - 1].x][virtualRoad[virtualhead - 1].y - 1] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x,
                        y: virtualRoad[virtualhead - 1].y - 1,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }
                if (legal(virtualRoad[virtualhead - 1].x, virtualRoad[virtualhead - 1].y + 1, game) &&

                table1[virtualRoad[virtualhead - 1].x][virtualRoad[virtualhead - 1].y + 1] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x,
                        y: virtualRoad[virtualhead - 1].y + 1,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }
                if (legal(virtualRoad[virtualhead - 1].x + 1, virtualRoad[virtualhead - 1].y, game) &&

                table1[virtualRoad[virtualhead - 1].x + 1][virtualRoad[virtualhead - 1].y] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x + 1,
                        y: virtualRoad[virtualhead - 1].y,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }
                if (legal(virtualRoad[virtualhead - 1].x - 1, virtualRoad[virtualhead - 1].y, game) &&

                table1[virtualRoad[virtualhead - 1].x - 1][virtualRoad[virtualhead - 1].y] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x - 1,
                        y: virtualRoad[virtualhead - 1].y,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }
            } else {
                if (virtualRoad[virtualhead - 1].x === nextfood.x && virtualRoad

                [virtualhead - 1].y === nextfood.y) {
                    eatapple = true;
                    break;
                }
                if (legal(virtualRoad[virtualhead - 1].x - 1, virtualRoad[virtualhead - 1].y, game) &&

                table1[virtualRoad[virtualhead - 1].x - 1][virtualRoad[virtualhead - 1].y] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x - 1,
                        y: virtualRoad[virtualhead - 1].y,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }
                if (legal(virtualRoad[virtualhead - 1].x + 1, virtualRoad[virtualhead - 1].y, game) &&

                table1[virtualRoad[virtualhead - 1].x + 1][virtualRoad[virtualhead - 1].y] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x + 1,
                        y: virtualRoad[virtualhead - 1].y,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }
                if (legal(virtualRoad[virtualhead - 1].x, virtualRoad[virtualhead - 1].y - 1, game) &&

                table1[virtualRoad[virtualhead - 1].x][virtualRoad[virtualhead - 1].y - 1] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x,
                        y: virtualRoad[virtualhead - 1].y - 1,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }
                if (legal(virtualRoad[virtualhead - 1].x, virtualRoad[virtualhead - 1].y + 1, game) &&

                table1[virtualRoad[virtualhead - 1].x][virtualRoad[virtualhead - 1].y + 1] === 1) {
                    open.push({
                        x: virtualRoad[virtualhead - 1].x,
                        y: virtualRoad[virtualhead - 1].y + 1,
                        pointer: virtualhead - 1
                    });
                    table1[open[open.length - 1].x][open[open.length - 1].y] = 0;
                }


            }





        }
        table1 = 0;
        open = 0;
      

            if (eatapple === false) {
                //吃不到苹果分为两步：1.找到尾巴则追着尾巴跑；2找不到尾巴则以最长路径逃生。
                return "false";
            }
            if (circle === false) {
                var virtualtable = [];
                var virtualsnakelength = realsnake.length + 1;
                var tail;
                var ww = virtualhead - 1;
                var j3 = 0;
                for (var i2 = 0; i2 < w; i2++) {
                    virtualtable[i2] = [];
                    for (var j2 = 0; j2 < h; j2++) {
                        virtualtable[i2][j2] = 1;
                    }
                }
                for (j3 = 0; j3 < virtualsnakelength; j3++) {
                    virtualtable[virtualRoad[ww].x][virtualRoad[ww].y] = 0;
                    if (j3 === virtualsnakelength - 1) {
                        tail = virtualRoad[ww];
                        break;
                    }
                    ww = virtualRoad[ww].pointer;
                    if (ww === -1) break;
                }
                if (virtualsnakelength - 1 > j3) {
                    tail = realsnake[virtualsnakelength - j3 - 1];
                    for (var hh = 0; hh <= virtualsnakelength - j3 - 1; hh++) {
                        virtualtable[realsnake[hh].x][realsnake[hh].y] = 0;
                    }
                }
                virtualtable[tail.x][tail.y] = 1;
                var arrivetail = false;
                var open2 = [];
                var open2head = 0;
                open2.push({
                    x: nextfood.x,
                    y: nextfood.y
                });
                while (open2.length > open2head) {
                    if (open2[open2head].x === tail.x && open2[open2head].y === tail.y) {
                        arrivetail = true;
                        break;
                    }
                    if (legal(open2[open2head].x, open2[open2head].y - 1, game) && virtualtable[open2

                    [open2head].x][open2[open2head].y - 1] === 1) {
                        open2.push({
                            x: open2[open2head].x,
                            y: open2[open2head].y - 1
                        });
                        virtualtable[open2[open2head].x][open2[open2head].y - 1] = 0;
                    }
                    if (legal(open2[open2head].x, open2[open2head].y + 1, game) && virtualtable[open2

                    [open2head].x][open2[open2head].y + 1] === 1) {
                        open2.push({
                            x: open2[open2head].x,
                            y: open2[open2head].y + 1
                        });
                        virtualtable[open2[open2head].x][open2[open2head].y + 1] = 0;
                    }
                    if (legal(open2[open2head].x + 1, open2[open2head].y, game) && virtualtable[open2

                    [open2head].x + 1][open2[open2head].y] === 1) {
                        open2.push({
                            x: open2[open2head].x + 1,
                            y: open2[open2head].y
                        });
                        virtualtable[open2[open2head].x + 1][open2[open2head].y] = 0;
                    }
                    if (legal(open2[open2head].x - 1, open2[open2head].y, game) && virtualtable[open2

                    [open2head].x - 1][open2[open2head].y] === 1) {
                        open2.push({
                            x: open2[open2head].x - 1,
                            y: open2[open2head].y
                        });
                        virtualtable[open2[open2head].x - 1][open2[open2head].y] = 0;
                    }
                    open2head++;
                }
                virtualtable = 0;
                open2 = 0;
                if (arrivetail === false) { //最长路径逃生
                    return "false";
                }

            }

      


        var headpointer = virtualRoad.length - 1;
        while (virtualRoad[headpointer].pointer > 0) {
            headpointer = virtualRoad[headpointer].pointer;
        }
        if (virtualRoad[headpointer].x === realsnake[0].x) {
            if (virtualRoad[headpointer].y === realsnake[0].y - 1) return "up";
            else return "down";
        } else {
            if (virtualRoad[headpointer].x === realsnake[0].x - 1) return "left";
            else return "right";
        }
    }

    return function(game) {
        realsnake = game.snake;
        var flag = wangwei(w, h, game);
        if (flag === "false") {
            var arrivertail2 = false;
            //找尾巴
            var virtualRoad1 = [];
            var virtualhead1 = 0;
            var open1 = [];
            var openhead1 = 0;
            open1.push({
                x: realsnake[0].x,
                y: realsnake[0].y,
                pointer: -1
            });
            var table2 = [];
            for (var i4 = 0; i4 < w; i4++) {
                table2[i4] = [];
                for (var j4 = 0; j4 < h; j4++) {
                    table2[i4][j4] = 1;
                }
            }
            var truesnakelength1 = realsnake.length;
            for (var i5 = 0; i5 < truesnakelength1 - 1; i5++) {
                table2[realsnake[i5].x][realsnake[i5].y] = 0;
            }
            var truesnaketail = realsnake[realsnake.length - 1];
            while (openhead1 < open1.length) {
                virtualRoad1.push({
                    x: open1[openhead1].x,
                    y: open1[openhead1].y,
                    pointer: open1[openhead1].pointer
                });
                openhead1++;
                virtualhead1++;
                if (virtualRoad1[virtualhead1 - 1].x === truesnaketail.x && virtualRoad1

                [virtualhead1 - 1].y === truesnaketail.y) {
                    arrivertail2 = true;
                    break;
                }
                if (legal(virtualRoad1[virtualhead1 - 1].x, virtualRoad1[virtualhead1 - 1].y - 1,

                game) && table2[virtualRoad1[virtualhead1 - 1].x][virtualRoad1[virtualhead1 - 1].y - 1] === 1) {
                    open1.push({
                        x: virtualRoad1[virtualhead1 - 1].x,
                        y: virtualRoad1[virtualhead1 - 1].y - 1,
                        pointer: virtualhead1 - 1
                    });
                    table2[open1[open1.length - 1].x][open1[open1.length - 1].y] = 0;
                }
                if (legal(virtualRoad1[virtualhead1 - 1].x, virtualRoad1[virtualhead1 - 1].y + 1,

                game) && table2[virtualRoad1[virtualhead1 - 1].x][virtualRoad1[virtualhead1 - 1].y + 1] === 1) {
                    open1.push({
                        x: virtualRoad1[virtualhead1 - 1].x,
                        y: virtualRoad1[virtualhead1 - 1].y + 1,
                        pointer: virtualhead1 - 1
                    });
                    table2[open1[open1.length - 1].x][open1[open1.length - 1].y] = 0;
                }
                if (legal(virtualRoad1[virtualhead1 - 1].x + 1, virtualRoad1[virtualhead1 - 1].y,

                game) && table2[virtualRoad1[virtualhead1 - 1].x + 1][virtualRoad1[virtualhead1 - 1].y] === 1) {
                    open1.push({
                        x: virtualRoad1[virtualhead1 - 1].x + 1,
                        y: virtualRoad1[virtualhead1 - 1].y,
                        pointer: virtualhead1 - 1
                    });
                    table2[open1[open1.length - 1].x][open1[open1.length - 1].y] = 0;
                }
                if (legal(virtualRoad1[virtualhead1 - 1].x - 1, virtualRoad1[virtualhead1 - 1].y,

                game) && table2[virtualRoad1[virtualhead1 - 1].x - 1][virtualRoad1[virtualhead1 - 1].y] === 1) {
                    open1.push({
                        x: virtualRoad1[virtualhead1 - 1].x - 1,
                        y: virtualRoad1[virtualhead1 - 1].y,
                        pointer: virtualhead1 - 1
                    });
                    table2[open1[open1.length - 1].x][open1[open1.length - 1].y] = 0;
                }
            }
            open1 = 0;
            table2 = 0;
            var headpointer1 = virtualRoad1.length - 1;
            while (virtualRoad1[headpointer1].pointer > 0) {
                headpointer1 = virtualRoad1[headpointer1].pointer;
            }
            if (virtualRoad1[headpointer1].x === realsnake[0].x) {
                if (virtualRoad1[headpointer1].y === realsnake[0].y - 1) return "up";
                else return "down";
            } else {
                if (virtualRoad1[headpointer1].x === realsnake[0].x - 1) return "left";
                else return "right";
            }


        } else {
            return flag;
        }
    };
}