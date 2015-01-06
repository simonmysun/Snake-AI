

/*
Team:Dolphin
Author:Li Dongfang,Yuan Haiwang
Version:0.0.1
Time:20140424 22.40
Code:ZG9waGlu
*/


function createThink(w, h)
{

    var catchtail=1;
    var counterround=1;
    var gridnumber=w*h;
    var walk=[];
    var dx=[],dy=[],dir=[];
    dx[0]=0,dx[1]=0,dx[2]=-1,dx[3]=1;
    dy[0]=-1,dy[1]=1,dy[2]=0,dy[3]=0;
    dir[0]="up",dir[1]="down",dir[2]="left",dir[3]="right";

    function min(x,y)
    {
        if(x<y)
        {
            return x;
        }
        return y;
    }

    function max(x,y)
    {
        if(x>y)
        {
            return x;
        }
        return y;
    }

    function abs(x)
    {
        if(x>=0)
        {
            return x;
        }
        return -x;
    }

    function dist(x1,y1,x2,y2)
    {
        return abs(x1-x2)+abs(y1-y2);
    }

    function cmp1(x,y)
    {
        return (x.step)-(y.step);
    }

    function cmp2(x,y)
    {
        return (x.dist)-(y.dist);
    }

    function cmp3(x,y)
    {
        return (x.step+x.dist)-(y.step+y.dist);
    }

    function cmp4(x,y)
    {
        return (y.val)-(x.val);
    }

    function check1(x,y)
    {
        if(x<0||x>=w||y<0||y>=h)
        {
            return false;
        }
        return true;
    }

    function check2(x,y,z)
    {
        for(var i=0; i<z.length; i++)
        {
            if(x==z[i].x&&y==z[i].y)
            {
                return false;
            }
        }
        return true;
    }

    function check3(x,y,z)
    {
        if(z[x][y]==true)
        {
            return false;
        }
        return true;
    }

    function check4(x1,y1,x2,y2,x3,y3,x4,y4)
    {
        if(check1(x1,y1)&&check1(x2,y2)&&check1(x3,y3)&&check1(x4,y4))
        {
            var minx=min(x1,min(x2,min(x3,x4)));
            var maxx=max(x1,max(x2,max(x3,x4)));
            var miny=min(y1,min(y2,min(y3,y4)));
            var maxy=max(y1,max(y2,max(y3,y4)));

            if(maxx-minx==1&&maxy-miny==1)
            {
                return true;
            }
        }
        else
        {
            return false;
        }
        return false;
    }

    function countcango(snake)
    {
        var counter=0;
        snake.pop();
        for(var i=0; i<4; i++)
        {
            var tempx=snake[0].x+dx[i];
            var tempy=snake[0].y+dy[i];
            if(check1(tempx,tempy)&&check2(tempx,tempy,snake))
            {
                counter++;
            }
        }
        return counter;
    }

    function getdir(x1,y1,x2,y2)
    {
        if(x2==x1+dx[0]&&y2==y1+dy[0])
        {
            return 0;
        }
        if(x2==x1+dx[1]&&y2==y1+dy[1])
        {
            return 1;
        }
        if(x2==x1+dx[2]&&y2==y1+dy[2])
        {
            return 2;
        }
        if(x2==x1+dx[3]&&y2==y1+dy[3])
        {
            return 3;
        }
    }

    /*All of the RP of others will pour into this code ! Amen !*/

    return function (game)
    {
        if(walk.length>0&&catchtail==1)
        {
            var tempwalk=walk.shift();
            return dir[tempwalk];
        }
        /*
        function bfs(initsnake,dfsend,foodorsnake)
        {
            var dp=[];
            var ans=[],method=[],map=[];
            for(var i=0;i<w;i++)
            {
                dp[i]=[];
                for(var j=0;j<h;j++)
                    dp[i][j]=1000000;
            }
            while(ans.length>0)
                ans.pop();
            while(method.length>0)
                method.pop();
            for(var i=0;i<w;i++)
            {
                map[i]=[];
                for(var j=0;j<h;j++)
                    map[i][j]=false;
            }
            for(var i=0;i<initsnake.length-1;i++)
                map[initsnake[i].x][initsnake[i].y]=true;
            function baddfs1(x,y,step)
            {
                if(step>=dp[x][y])
                    return;
                dp[x][y]=step;
                for(var i=0;i<4;i++)
                {
                    var tempx=x+dx[i];
                    var tempy=y+dy[i];
                    if(check1(tempx,tempy)&&
                       check3(tempx,tempy,map))
                       {
                           method.push(i);
                           if(tempx==dfsend.x&&
                              tempy==dfsend.y)
                           {
                               while(ans.length>0)
                                    ans.pop();
                                for(var j=0;j<method.length;j++)
                                    ans.push(method[j]);
                                method.pop();
                               return;
                           }
                           baddfs1(tempx,tempy,step+1);
                           method.pop();
                       }
                }
            }
            baddfs1(initsnake[0].x,initsnake[0].y,0);
            if(ans.length>0)
            {
                if(foodorsnake=="snake")
                {
                    for(var i=initsnake.length-1; i>0; i--)
                        ans.push(getdir(initsnake[i].x,initsnake[i].y,initsnake[i-1].x,initsnake[i-1].y));
                }
            }
            return ans;
        }
        */

        function bfs(initsnake,bfsend,foodorsnake)
        {
            var ans=[],father=[],findsign,map=[],method=[],que=[],vis=[];

            function getmethod(x)
            {
                if(x.x!=-1&&x.y!=-1)
                {
                    getmethod(father[x.x][x.y]);
                    method.push(x);
                }
            }

            function bfs1()
            {
                while(ans.length>0)
                {
                    ans.pop();
                }
                for(var i=0; i<w; i++)
                {
                    father[i]=[];
                    for(var j=0; j<h; j++)
                    {
                        father[i][j]= {x:-1,y:-1};
                    }
                }

                findsign=false;

                for(var i=0; i<w; i++)
                {
                    map[i]=[];
                    for(var j=0; j<h; j++)
                    {
                        map[i][j]=false;
                    }
                }
                for(var i=0; i<initsnake.length-1; i++)
                {
                    map[initsnake[i].x][initsnake[i].y]=true;
                }
                while(method.length>0)
                {
                    method.pop();
                }
                while(que.length>0)
                {
                    que.pop();
                }
                que.push( {x:initsnake[0].x,y:initsnake[0].y});

                for(var i=0; i<w; i++)
                {
                    vis[i]=[];
                    for(var j=0; j<h; j++)
                    {
                        vis[i][j]=false;
                    }
                }

                while(que.length>0&&findsign==false)
                {
                    var quelen=que.length;
                    while(quelen--)
                    {
                        var quefront=que.shift();

                        if(quefront.x==bfsend.x&&
                                quefront.y==bfsend.y)
                        {
                            findsign=true;
                            break;
                        }
                        for(var i=0; i<4; i++)
                        {
                            var tempx=quefront.x+dx[i];
                            var tempy=quefront.y+dy[i];

                            if(check1(tempx,tempy)&&check3(tempx,tempy,map)&&check3(tempx,tempy,vis))
                            {
                                vis[tempx][tempy]=true;
                                que.push( {x:tempx,y:tempy});
                                father[tempx][tempy]= {x:quefront.x,y:quefront.y};
                            }
                        }
                    }
                }
                getmethod(bfsend);
                if(!(method[0].x==initsnake[0].x&&
                        method[0].y==initsnake[0].y&&
                        method[method.length-1].x==bfsend.x
                        &&method[method.length-1].y==bfsend.y))
                {
                    return;
                }
                for(var i=1; i<method.length; i++)
                    ans.push(getdir(method[i-1].x,method[i-1].y,method[i].x,method[i].y));

                if(foodorsnake=="snake")
                {
                    for(var i=initsnake.length-1; i>0; i--)
                        ans.push(getdir(initsnake[i].x,initsnake[i].y,initsnake[i-1].x,initsnake[i-1].y));
                }

            }
            bfs1();
            return ans;
        }

        function makesnake(initsnake,method,foodorsnake)
        {
            var snake=[],tail,tempx,tempy;
            while(snake.length>0)
                snake.pop();
            for(var i=0; i<initsnake.length; i++)
                snake.push(initsnake[i]);
            if(method.length>0)
            {
                for(var i=0; i<method.length; i++)
                {
                    tail=snake.pop();
                    tempx=snake[0].x+dx[method[i]];
                    tempy=snake[0].y+dy[method[i]];
                    snake.unshift( {x:tempx,y:tempy});
                }
                if(foodorsnake=="food")
                    snake.push(tail);
            }
            return snake;
        }

        function judgenow(initsnake)
        {
            var map=[],vis=[];
            for(var i=0; i<w; i++)
            {
                map[i]=[];
                vis[i]=[];
                for(var j=0; j<h; j++)
                {
                    map[i][j]=false;
                    vis[i][j]=false;
                }
            }
            for(var i=0; i<initsnake.length; i++)
            {
                map[initsnake[i].x][initsnake[i].y]=true;
            }
            var ans=0;
            function dfs(x,y)
            {
                vis[x][y]=true;
                for(var i=0; i<4; i++)
                {
                    var tempx=x+dx[i];
                    var tempy=y+dy[i];
                    if(check1(tempx,tempy)&&check3(tempx,tempy,map)&&check3(tempx,tempy,vis))
                    {
                        dfs(tempx,tempy);
                    }
                }
            }
            for(var i=0; i<w; i++)
            {
                for(var j=0; j<h; j++)
                {
                    if(map[i][j]==false&&vis[i][j]==false)
                    {
                        ans++;
                        dfs(i,j);
                    }
                }
            }
            return ans;
        }

        function worst()
        {
            var data=[],snake=[];
            while(snake.length>0)
            {
                snake.pop();
            }
            for(var i=0; i<game.snake.length-1; i++)
            {
                snake.push(game.snake[i]);
            }
            for(var i=0; i<4; i++)
            {
                var tempx=snake[0].x+dx[i];
                var tempy=snake[0].y+dy[i];
                if(check1(tempx,tempy)&&
                   check2(tempx,tempy,snake))
                {
                    var method=[];
                    while(method.length>0)
                    {
                        method.pop();
                    }
                    method.push(i);
                    data.push( {num:i,snake:deepClone(makesnake(game.snake,method,"snake")),val:0});
                }
            }
            for(var i=0; i<data.length; i++)
            {
                var ansfood=bfs(data[i].snake,game.food[0],"food");
                var newsnake=makesnake(data[i].snake,ansfood,"food");
                var anssnake=bfs(data[i].snake,data[i].snake[data[i].snake.length-1],"snake");
                var anssnake_=bfs(newsnake,newsnake[newsnake.length-1],"snake");

                if(ansfood>0&&anssnake_>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=0; i<ansfood.length; i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return data[i].num;
                }
                if(anssnake.length>0)
                {
                    data[i].val=data[i].val+10000;
                }
                if(ansfood.length>0)
                {
                    data[i].val=data[i].val+ansfood.length;
                }
            }

            data.sort(cmp4);

            if(data.length==0)
            {
                return 0;
            }
            return data[0].num;
        }

        function nobrain2(game)
        {
            var best=0;
            var bestdir=4;
            var beautiful=1000000;
            var best_=0;
            var bestdir_=4;
            var beautiful_=1000000;
            var snake=[];
            while(snake.length>0)
            {
                snake.pop();
            }

            for(var i=0;i<game.snake.length-1;i++)
            {
                snake.push(game.snake[i]);
            }
            for(var i=0;i<4;i++)
            {
                var tempx=snake[0].x+dx[i];
                var tempy=snake[0].y+dy[i];

                if(check1(tempx,tempy)&&check2(tempx,tempy,snake))
                {
                    var method=[];
                    method.push(i);
                    var newsnake=[];
                    if(tempx==game.food[0].x&&tempy==game.food[0].y)
                    {
                        newsnake=makesnake(game.snake,method,"food");
                    }
                    else
                    {
                        newsnake=makesnake(game.snake,method,"snake");
                    }
                    var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                    if(anssnake.length>0)
                    {
                        var tempbeautiful=judgenow(newsnake);
                        if(anssnake.length>best_)
                        {
                            best_=anssnake.length;
                            bestdir_=i;
                            beautiful_=tempbeautiful;
                        }
                        else if(anssnake.length==best_)
                        {
                            if(tempbeautiful<beautiful_)
                            {
                                best_=anssnake.length;
                                bestdir_=i;
                                beautiful_=tempbeautiful;
                            }
                        }
                        var tempdist=dist(tempx,tempy,game.food[0].x,game.food[0].y);
                        if(tempdist>best)
                        {
                            best=tempdist;
                            bestdir=i;
                            beautiful=tempbeautiful;
                        }
                        else if(tempdist==best)
                        {
                            if(tempbeautiful<beautiful)
                            {
                                best=tempdist;
                                bestdir=i;
                                beautiful=tempbeautiful;
                            }
                        }
                    }
                }
            }
            if(bestdir==4)
            {
                if(bestdir_==4)
                {
                    for(var i=0;i<4;i++)
                    {
                        var tempx=game.snake[0].x+dx[i];
                        var tempy=game.snake[0].y+dy[i];
                        if(check1(tempx,tempy)&&check2(tempx,tempy,snake))
                        {
                            return i;
                        }
                    }
                }
                else
                {
                    return bestdir_;
                }
            }
            else
            {
                return bestdir;
            }
        }

        function supernobrain(game)
        {
            var best=0;
            var bestdir=4;
            var beautiful=1000000;
            var snake=[];
            while(snake.length>0)
            {
                snake.pop();
            }
            for(var i=0;i<game.snake.length-1;i++)
            {
                snake.push(game.snake[i]);
            }
            for(var i=0;i<4;i++)
            {
                var tempx=snake[0].x+dx[i];
                var tempy=snake[0].y+dy[i];
                if(check1(tempx,tempy)&&check2(tempx,tempy,snake))
                {
                    var method=[];
                    while(method.length>0)
                    {
                        method.pop();
                    }
                    method.push(i);
                    var newsnake=[];
                    if(tempx==game.food[0].x&&tempy==game.food[0].y)
                    {
                        newsnake=makesnake(game.snake,method,"food");
                    }
                    else
                    {
                        newsnake=makesnake(game.snake,method,"snake");
                    }
                    var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                    if(anssnake.length>0)
                    {
                        var tempbeautiful=judgenow(newsnake);
                        if(anssnake.length>best)
                        {
                            best=anssnake.length;
                            bestdir=i;
                            beautiful=tempbeautiful;
                        }
                        else if(anssnake.length==best)
                        {
                            if(tempbeautiful<beautiful)
                            {
                                best=anssnake.length;
                                bestdir=i;
                                beautiful=tempbeautiful;
                            }
                        }
                    }
                }
            }
            if(bestdir==4)
            {
                return nobrain2(game);
            }
            return bestdir;
        }

        function nobrain(game)
        {

            if(game.snake.length>=w*h-90)
            {
                return supernobrain(game);
            }

            var tempjudgenow=judgenow(game.snake);
            if(tempjudgenow<=10&&game.snake.length<=w*h-190)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=9&&game.snake.length<=w*h-180)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=8&&game.snake.length<=w*h-170)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=7&&game.snake.length<=w*h-160)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=6&&game.snake.length<=w*h-150)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=5&&game.snake.length<=w*h-140)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=4&&game.snake.length<=w*h-130)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=3&&game.snake.length<=w*h-120)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=2&&game.snake.length<=w*h-110)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }
            else if(tempjudgenow<=1&&game.snake.length<=w*h-100)
            {
                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");
                if(ansfood.length>0&&anssnake.length>0)
                {
                    catchtail=1;
                    while(walk.length>0)
                    {
                        walk.pop();
                    }
                    for(var i=1;i<ansfood.length;i++)
                    {
                        walk.push(ansfood[i]);
                    }
                    return ansfood[0];
                }
            }

            var best=0;
            var bestdir=4;
            var beautiful=1000000;
            var snake=[];

            while(snake.length>0)
            {
                snake.pop();
            }
            for(var i=0;i<game.snake.length-1;i++)
            {
                snake.push(game.snake[i]);
            }
            for(var i=0;i<4;i++)
            {
                var tempx=snake[0].x+dx[i];
                var tempy=snake[0].y+dy[i];
                if(check1(tempx,tempy)&&check2(tempx,tempy,snake))
                {

                    var method=[];
                    while(method.length>0)
                    {
                        method.pop();
                    }
                    method.push(i);

                    var newsnake=[];
                    if(tempx==game.food[0].x&&tempy==game.food[0].y)
                    {
                        newsnake=makesnake(game.snake,method,"food");
                    }
                    else
                    {
                        newsnake=makesnake(game.snake,method,"snake");
                    }

                    var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");

                    if(tempx==game.food[0].x&&tempy==game.food[0].y&&anssnake.length>0)
                    {
                        return i;
                    }

                    var ansfood=bfs(newsnake,game.food[0],"food");
                    if(anssnake.length>0&&ansfood.length>0)
                    {
                        var tempbeautiful=judgenow(newsnake);
                        if(anssnake.length>best)
                        {
                            best=anssnake.length;
                            bestdir=i;
                            beautiful=tempbeautiful;
                        }
                        else if(anssnake.length==best)
                        {
                            if(tempbeautiful<beautiful)
                            {
                                best=anssnake.length;
                                bestdir=i;
                                beautiful=tempbeautiful;
                            }
                        }
                    }
                }
            }
            if(bestdir==4)
            {
                return nobrain2(game);
            }
            return bestdir;
        }

        function main()
        {
            if(game.snake.length<=w*h/2-32)
            {

                var ansfood=bfs(game.snake,game.food[0],"food");
                var newsnake=makesnake(game.snake,ansfood,"food");
                var anssnake=bfs(newsnake,newsnake[newsnake.length-1],"snake");

                if(catchtail==1)
                {
                    if(ansfood.length>0&&anssnake.length>0)
                    {
                        catchtail=1;
                        while(walk.length>0)
                        {
                            walk.pop();
                        }
                        for(var i=1; i<ansfood.length; i++)
                        {
                            walk.push(ansfood[i]);
                        }
                        return dir[ansfood[0]];
                    }
                    else if(anssnake.length>0)
                    {
                        catchtail=2;
                        while(walk.length>0)
                        {
                            walk.pop();
                        }
                        for(var i=1; i<anssnake.length; i++)
                        {
                            walk.push(anssnake[i]);
                        }
                        return dir[anssnake[0]];
                    }
                    else
                    {
                        return dir[worst()];
                    }
                }
                else if(catchtail==2)
                {
                    if(ansfood.length>0&&anssnake.length>0)
                    {
                        catchtail=1;
                        while(walk.length>0)
                        {
                            walk.pop();
                        }
                        for(var i=1; i<ansfood.length; i++)
                        {
                            walk.push(ansfood[i]);
                        }
                        return dir[ansfood[0]];
                    }
                    else if(anssnake.length>0)
                    {
                        catchtail=2;
                        while(walk.length>0)
                        {
                            walk.pop();
                        }
                        for(var i=1; i<anssnake.length; i++)
                        {
                            walk.push(anssnake[i]);
                        }
                        return dir[anssnake[0]];
                    }
                    else
                    {
                        var tempwalk=walk.shift();
                        return dir[tempwalk];
                    }
                }
            }
            else
            {
                catchtail=1;
                while(walk.length>0)
                {
                    walk.pop();
                }
                return dir[nobrain(game)];
            }
        }
        return main();
    };
}


/*FUCKING SNAKE*/

