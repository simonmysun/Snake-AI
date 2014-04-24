/*
Team 14
Author: lihao
Version:0.0.0
Time:20140424 20.39
*/

function createThink(w,h)
{
    var minMap = [];
    var nextFood;
    var bfsqueue;
    var sx=[];
    var sy=[];
    var sxx=[];
    var syy=[];
    var d1;
    var d2;
    var sx1=[];
    var sy1=[];
    var qq={x:0,y:0};
    for(var x = 0; x < w; x ++ )
    {
        minMap[x] = [];
        for(var y = 0; y < h; y ++ )
        {
            minMap[x][y] = 99999999;
        }
    }

    function clearMap()
    {
        for(var x in minMap)
        {
            for(var y in minMap[x])
            {
                minMap[x][y] = 99999999;
            }
        }
    }

    function legal(x, y)
    {
        if(x >= w || x <= -1 || y >= h || y <= -1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    function checkCollision(x, y, s)
    {
        for(var p=0; p<s.length-1; p++)
        {
            if(x === s[p].x && y === s[p].y)
            {
                return true;
            }
        }
        return false;
    }


    function q(x,y,sx,sy)
    {
        for(var i=0; i<sx.length-1; i++)
            if(x==sx[i]&&y==sy[i])
                return false;
        return true;
    }
    function q3(x,y,sx,sy)
    {
        for(var i=0; i<sx.length-1; i++)
        {
            if(x==sx[i]&&y==sy[i])
                return false;
        }
        return true;
    }
    function q2(x,y,sx1,sy1)
    {
        for(var i=0; i<sx1.length-1; i++)
        {
            if(x==sx1[i]&&y==sy1[i])
                return false;
        }
        return true;
    }
    function q1(x,y,sx1,sy1)
    {
        for(var i=0; i<sx1.length-1; i++)
        {
            if(x==sx1[i]&&y==sy1[i])
                return false;
        }
        return true;
    }
    function check(x,y)
    {
        var dx=[0,0,1,-1];
        var dy=[-1,1,0,0];
        var k=0;
        for(var i=0; i<4; i++)
        {
            var xx=x+dx[i];
            var yy=y+dy[i];
            if(legal(xx,yy)==true)
            {
                for(var j=0; j<sxx.length; j++)
                {
                    if(xx==sxx[j]&&yy==syy[j])
                        k++;
                }

            }
        }
        return k;
    }

    var tailx;
    var taily;
    var s1;
    var s2;
    function move_copy_snake(sx,sy,food)
    {
        var min=99999;
        var flag=0;
        while(sx[0]!=food.x||sy[0]!=food.y)
        {
            flag++;
            if(flag>1111)
                return false;

            var dx=[1,-1,0,0];
            var dy=[0,0,1,-1]
            for(var i=0; i<4; i++)
            {
                var x=sx[0]+dx[i];
                var y=sy[0]+dy[i];
                if(legal(x,y)==true)
                {
                    if(q(x,y,sx,sy)==true)
                    {
                        if(min>minMap[x][y])
                        {
                            min=minMap[x][y];

                            s1=x;
                            s2=y;
                            if(x==food.x&&y==food.y)
                            {
                                tailx=sx[sx.length-1];
                                taily=sy[sy.length-1];
                            }
                        }
                    }
                }
            }
            for(var i=sx.length-1; i>0; i--)
            {
                sx[i]=sx[i-1];
                sy[i]=sy[i-1];
            }
            sx[0]=s1;
            sy[0]=s2;
        }
        return true;

    }

    function move_copy_snake1(endx,endy)
    {
        for(var i=sx1.length-1; i>0; i--)
        {
            sx1[i]=sx1[i-1];
            sy1[i]=sy1[i-1];
        }
        sx1[0]=endx;
        sy1[0]=endy;
    }
    var map=[];
    function bfs_tail(stx,sty,endx,endy)
    {
        var visit=[];
        var x=stx,y=sty;
        var dui=[];
        dui.push(
        {
x:stx,y:sty
        });
        for(var i=0; i<w; i++)
        {
            visit[i]=[];
            for(j=0; j<h; j++)
            {
                visit[i][j]=0;
            }
        }
        visit[x][y]=1;
        while(dui.length>0)
        {
            var p=dui.shift();
            x=p.x;
            y=p.y;
            var dirx=[0,1,0,-1];
            var diry=[-1,0,1,0];
            for(var i=0; i<4; i++)
            {
                var xx=x+dirx[i];
                var yy=y+diry[i];
                if(xx<w&&xx>=0&&yy<h&&yy>=0)
                {
                    if(visit[xx][yy]==0)
                    {
                        if(q3(xx,yy,sx,sy)==true)
                        {
                            dui.push(
                            {
x:xx,y:yy
                            });
                            visit[xx][yy]=1;

                            if(xx==endx&&yy==endy)
                            {
                                return true;
                            }

                        }
                    }
                }
            }
        }
        return false;
    }

    function bfs_tail1(stx,sty,endx,endy)
    {
        var visit=[];
        var x=stx,y=sty;
        var dui=[];
        dui.push(
        {
x:stx,y:sty
        });
        for(var i=0; i<w; i++)
        {
            visit[i]=[];
            for(j=0; j<h; j++)
            {
                visit[i][j]=0;
            }
        }
        visit[x][y]=1;
        while(dui.length>0)
        {
            var p=dui.shift();
            x=p.x;
            y=p.y;
            var dirx=[0,1,0,-1];
            var diry=[-1,0,1,0];
            for(var i=0; i<4; i++)
            {
                var xx=x+dirx[i];
                var yy=y+diry[i];
                if(xx<w&&xx>=0&&yy<h&&yy>=0)
                {
                    if(visit[xx][yy]==0)
                    {
                        if(q2(xx,yy,sx1,sy1)==true)
                        {
                            dui.push(
                            {
x:xx,y:yy
                            });
                            visit[xx][yy]=1;

                            if(xx==endx&&yy==endy)
                            {
                                return true;
                            }

                        }
                    }
                }
            }
        }

        return false;
    }

    var tu=[];
    function bfs1(stx,sty)
    {
        var visit=[];
        var x=stx,y=sty;
        var dui=[];
        dui.push(
        {
x:stx,y:sty
        });
        for(var i=0; i<w; i++)
        {
            visit[i]=[];
            for(j=0; j<h; j++)
            {
                visit[i][j]=0;
            }
        }
        visit[x][y]=1;
        for(var i=0; i<w; i++)
        {
            map[i]=[];
            for(j=0; j<h; j++)
            {
                map[i][j]=99999999;
            }
        }
        map[stx][sty]=0;
        while(dui.length>0)
        {
            var p=dui.shift();
            x=p.x;
            y=p.y;
            var dirx=[0,1,0,-1];
            var diry=[-1,0,1,0];
            for(var i=0; i<4; i++)
            {
                var xx=x+dirx[i];
                var yy=y+diry[i];
                if(xx<w&&xx>=0&&yy<h&&yy>=0)
                {
                    if(visit[xx][yy]==0)
                    {

                        {
                            dui.push(
                            {
x:xx,y:yy
                            });
                            visit[xx][yy]=1;
                            map[xx][yy]=map[x][y]+1;
                        }
                    }
                }
            }
        }


    }

    function mark_map(stx,sty)
    {
        var visit=[];
        var x=stx,y=sty;
        var dui=[];
        dui.push(
        {
x:stx,y:sty
        });
        for(var i=0; i<w; i++)
        {
            visit[i]=[];
            for(j=0; j<h; j++)
            {
                visit[i][j]=0;
            }
        }
        visit[x][y]=1;
        for(var i=0; i<w; i++)
        {
            map[i]=[];
            for(j=0; j<h; j++)
            {
                map[i][j]=99999999;
            }
        }
        var k=1;
        map[stx][sty]=0;
        while(dui.length>0)
        {
            var p=dui.shift();
            x=p.x;
            y=p.y;

            var dirx=[0,1,0,-1];
            var diry=[-1,0,1,0];
            for(var i=0; i<4; i++)
            {
                var xx=x+dirx[i];
                var yy=y+diry[i];
                if(xx<w&&xx>=0&&yy<h&&yy>=0)
                {
                    if(visit[xx][yy]==0)
                    {
                        if(q1(xx,yy,sx1,sy1)==true)
                        {

                            dui.push(
                            {
x:xx,y:yy
                            });
                            visit[xx][yy]=1;
                            map[xx][yy]=map[x][y]+1;
                        }
                    }
                }
            }
        }
    }


    function change(x,y,game)
    {
        var dx=[0,1,0,-1];
        var dy=[-1,0,1,0];
        var sum=0;
        var xx;
        var yy;
        bfs1(game.food[0].x,game.food[0].y);
        for(var i=0; i<4; i++)
        {
            xx=x+dx[i];
            yy=y+dy[i];
            qq.x=xx;
            qq.y=yy;
            for(var j=0; j<sxx.length; j++)
            {
                sx1[j]=sxx[j];
                sy1[j]=syy[j];
            }
            if(legal(xx,yy)==true)
            {
                if(q1(xx,yy,sx1,sy1)==true)
                {
                    move_copy_snake1(xx,yy);
                    {
                        if(bfs_tail1(xx,yy,sx1[sx1.length-1],sy1[sy1.length-1])

                                ==true&&map[xx][yy]>sum)
                        {
                            sum=map[xx][yy];
                            d1=xx;
                            d2=yy;
                        }
                    }

                }
            }
        }
    }
    function change2(x,y,game)
    {
        var dx=[1,-1,0,0];
        var dy=[0,0,-1,1];
        var sum=0;
        var xx;
        var yy;
        var qqq=0;
        mark_map(sx1[sx1.length-1],sy1[sy1.length-1]);
        for(var i=0; i<4; i++)
        {
            xx=x+dx[i];
            yy=y+dy[i];
            for(var j=0; j<sxx.length; j++)
            {
                sx1[j]=sxx[j];
                sy1[j]=syy[j];
            }
            if(legal(xx,yy)==true)
            {
                if(q1(xx,yy,sx1,sy1)==true)
                {
                    move_copy_snake1(xx,yy);
                    {
                        if(bfs_tail1(xx,yy,sx1[sx1.length-1],sy1[sy1.length-1])

==true&&map[xx][yy]>=sum)
                        {
                            qqq=check(xx,yy);
                            sum=map[xx][yy];
                            d1=xx;
                            d2=yy;
                        }
                    }

                }
            }
        }
    }
    function bfs(loc, game)
    {
        bfsqueue = [];
        bfsqueue.push(
        {
x: loc.x
,y: loc.y
            ,dist: 0
        });
        while(bfsqueue.length > 0)
        {
            loc = bfsqueue.shift();
            if(legal(loc.x, loc.y) == false)
            {
                continue;
            }
            if(q(loc.x,loc.y,sxx,syy)==false)
            {
                continue;
            }
            if(minMap[loc.x][loc.y] != 99999999)
            {
                continue;
            }
            minMap[loc.x][loc.y] = loc.dist;
            bfsqueue.push(
            {
x: loc.x
,y: loc.y - 1
,dist: loc.dist + 1
            });
            bfsqueue.push(
            {
x: loc.x
,y: loc.y + 1
,dist: loc.dist + 1
            });
            bfsqueue.push(
            {
x: loc.x - 1
,y: loc.y
,dist: loc.dist + 1
            });
            bfsqueue.push(
            {
x: loc.x + 1
,y: loc.y
,dist: loc.dist + 1
            });
        }
    }
    return function(game)
    {
        head = game.snake[0];
        sx=[];
        sy=[];
        sxx=[];
        syy=[];
        if(game.snake.length==5)
            var o;
        for(var i=0; i<game.snake.length; i++)
        {
            sxx[i]=game.snake[i].x;
            syy[i]=game.snake[i].y;
        }
        for(var i=0; i<game.snake.length; i++)
        {
            sx[i]=game.snake[i].x;
            sy[i]=game.snake[i].y;
        }
        clearMap();
        bfs(game.food[0], game);
        if(nextFood == undefined)
        {
            nextFood = game.food[0];
        }
        if(game.food[0].x != nextFood.x || game.food[0].y != nextFood.y)
        {
            clearMap();
            bfs(game.food[0], game);
            nextFood = game.food[0];
        }
        var minDirect = "right";
        var minDist = 99999999;
        var u= move_copy_snake(sx,sy,game.food[0]);
        sx[sx.length]=tailx;
        sy[sy.length]=taily;
        var k=bfs_tail(sx[0],sy[0],tailx,taily);
        if(game.snake.length<200)
        {
            if(k==true&&u==true)
            {
                if(legal(head.x + 1, head.y))
                {
                    if(checkCollision(head.x + 1, head.y, game.snake) == false)
                    {
                        if(minDist > minMap[head.x + 1][head.y])
                        {
                            minDirect = "right";
                            minDist = minMap[head.x + 1][head.y];
                        }
                    }
                }
                if(legal(head.x - 1, head.y))
                {
                    if(checkCollision(head.x - 1, head.y, game.snake) == false)
                    {
                        if(minDist > minMap[head.x - 1][head.y] )
                        {
                            minDirect = "left";
                            minDist = minMap[head.x - 1][head.y];
                        }
                    }
                }
                if(legal(head.x, head.y + 1))
                {
                    if(checkCollision(head.x, head.y + 1, game.snake) == false)
                    {
                        if(minDist > minMap[head.x][head.y + 1] )
                        {
                            minDirect = "down";
                            minDist = minMap[head.x][head.y + 1];
                        }
                    }
                }
                if(legal(head.x, head.y - 1))
                {
                    if(checkCollision(head.x, head.y - 1, game.snake) == false)
                    {
                        if(minDist > minMap[head.x][head.y - 1] )
                        {
                            minDirect = "up";
                            minDist = minMap[head.x][head.y - 1];
                        }
                    }
                }
            }
            else
            {

                sx1=[];
                sy1=[];
                for(var j=0; j<sxx.length; j++)
                {
                    sx1[j]=sxx[j];
                    sy1[j]=syy[j];
                }

                change(sxx[0],syy[0],game);
                if(d1-game.snake[0].x==1)
                    minDirect="right";
                if(d1-game.snake[0].x==-1)
                    minDirect="left";
                if(d2-game.snake[0].y==1)
                    minDirect="down";
                if(d2-game.snake[0].y==-1)
                    minDirect="up";
            }

        }
        else
            {
                sx1=[];
                sy1=[];
                for(var j=0; j<sxx.length; j++)
                {
                    sx1[j]=sxx[j];
                    sy1[j]=syy[j];
                }
                change2(sxx[0],syy[0],game);
                if(d1-game.snake[0].x==1)
                    minDirect="right";
                if(d1-game.snake[0].x==-1)
                    minDirect="left";
                if(d2-game.snake[0].y==1)
                    minDirect="down";
                if(d2-game.snake[0].y==-1)
                    minDirect="up";
            }
        return minDirect;
    };
}
