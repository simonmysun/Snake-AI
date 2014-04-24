/*team17
Author YEA
Version ...
Time 20140424 1909
Code: ...
*/
function createThink(w, h)
{
    var mp=[];
    var dir="right";
    var vtmp=[];
    var v=[];
    var l=0;
    
    function creatmp(snake, des)
    {
        for(var x=0; x<w; x++)
        {
            mp[x]=[];
            for(var y=0; y<h; y++)
            mp[x][y]=-1;
        }
        for(var x=0; x<l; x++)
        {
            mp[snake[x].x][snake[x].y]=l-x;
        }
        mp[des.x][des.y]=0;
    }
    
    function findP(sta, des, mp2)
    {
        for(var x=0; x<w; x++)
        {
            v[x]=[];
            vtmp[x]=[];
            for(var y=0; y<h; y++)
            {
            v[x][y]=0;
            vtmp[x][y]=-1;
            }
        }
        var que=[];
        que.push({x:sta.x,y:sta.y,dis:0});
        v[sta.x][sta.y]=1;
        vtmp[sta.x][sta.y]=0;
        while(que.length>0)
        {
            var pos=que.shift();
            if(pos.x==des.x&&pos.y==des.y)
            return true;
            if(pos.x>0&&v[pos.x-1][pos.y]==0&&(mp[pos.x-1][pos.y]==-1||mp[pos.x-1][pos.y]==l))
            {
                v[pos.x-1][pos.y]=1;
                vtmp[pos.x-1][pos.y]=pos.dis+1;
                que.push({x:pos.x-1,y:pos.y,dis:pos.dis+1});
            }
            if(pos.y>0&&v[pos.x][pos.y-1]==0&&(mp[pos.x][pos.y-1]<=1||mp[pos.x][pos.y-1]==l))
            {
                v[pos.x][pos.y-1]=1;
                vtmp[pos.x][pos.y-1]=pos.dis+1;
                que.push({x:pos.x,y:pos.y-1,dis:pos.dis+1});
            }
            if(pos.x+1<w&&v[pos.x+1][pos.y]==0&&(mp[pos.x+1][pos.y]<=1||mp[pos.x+1][pos.y]==l))
            {
                v[pos.x+1][pos.y]=1;
                vtmp[pos.x+1][pos.y]=pos.dis+1;
                que.push({x:pos.x+1,y:pos.y,dis:pos.dis+1});
            }
            if(pos.y+1<h&&v[pos.x][pos.y+1]==0&&(mp[pos.x][pos.y+1]<=1||mp[pos.x][pos.y+1]==l))
            {
                v[pos.x][pos.y+1]=1;
                vtmp[pos.x][pos.y+1]=pos.dis+1;
                que.push({x:pos.x,y:pos.y+1,dis:pos.dis+1});
            }
        }
        return false;
    }
    
    function findT(sta, des, mp2)
    {
        for(var x=0; x<w; x++)
        {
            v[x]=[];
            for(var y=0; y<h; y++)
            {
            v[x][y]=0;
            }
        }
        var que=[];
        que.push({x:sta.x,y:sta.y,dis:0});
        v[sta.x][sta.y]=1;
        while(que.length>0)
        {
            var pos=que.shift();
            if(pos.x==des.x&&pos.y==des.y)
            return true;
            if(pos.x>0&&v[pos.x-1][pos.y]==0&&mp2[pos.x-1][pos.y]==-1)
            {
                v[pos.x-1][pos.y]=1;
                que.push({x:pos.x-1,y:pos.y,dis:pos.dis+1});
            }
            if(pos.y>0&&v[pos.x][pos.y-1]==0&&mp2[pos.x][pos.y-1]==-1)
            {
                v[pos.x][pos.y-1]=1;
                que.push({x:pos.x,y:pos.y-1,dis:pos.dis+1});
            }
            if(pos.x+1<w&&v[pos.x+1][pos.y]==0&&mp2[pos.x+1][pos.y]==-1)
            {
                v[pos.x+1][pos.y]=1;
                que.push({x:pos.x+1,y:pos.y,dis:pos.dis+1});
            }
            if(pos.y+1<h&&v[pos.x][pos.y+1]==0&&mp2[pos.x][pos.y+1]==-1)
            {
                v[pos.x][pos.y+1]=1;
                que.push({x:pos.x,y:pos.y+1,dis:pos.dis+1});
            }
        }
        return false;
    }
    
    function judge(x,y,sta)
    {
        if(x==sta.x)
        {
            if(y>sta.y)
            dir='down';
            else
            dir='up';
        }
        else if(x>sta.x)
        dir='right';
        else
        dir='left';
    }
    
    function cal(x,y,mp2)
    {
        var ret=0;
        if(x<0||(x>0&&mp2[x-1][y]!=-1))
        ret+=1;
        if(y<0||(y>0&&mp2[x][y-1]!=-1))
        ret+=1;
        if(x+1>w||(x+1<w&&mp2[x+1][y]!=-1))
        ret+=1;
        if(y+1>h||(y+1<h&&mp2[x][y+1]!=-1))
        ret+=1;
        return ret;
    }
    
    function move(step, game)
    {
       var newsnake=[];
       dir='right';
       var lll=step;
       
       for(var i=game.snake.length-1; i>=0; i--)
       newsnake.push(game.snake[i]);
       var fx=newsnake[newsnake.length-1].x;
       var fy=newsnake[newsnake.length-1].y;
   
        while(step>0)
        {
             var ansx=fx;
             var ansy=fy;
             var mp2=[];
             var max=-1;
             for(var i=0; i<w; i++)
             {
                 mp2[i]=[];
             for(var j=0; j<h; j++)
             mp2[i][j]=-1;
             }
             for(var i=newsnake.length-1; i>=0; i--)
                 mp2[newsnake[i].x][newsnake[i].y]=1;
             if(fy>0&&vtmp[fx][fy-1]==step-1)
            {
                 var nouse=cal(fx,fy-1,mp2);
                 if(nouse>max)
                 {
                     ansx=fx;
                     ansy=fy-1;
                     max=nouse;
                     if(step==lll)
                     dir='up';
                 }
             }
           else if(fy+1<h&&vtmp[fx][fy+1]==step-1)
             {
                 var nouse=cal(fx,fy+1,mp2);
                 if(nouse>max)
                 {
                     ansx=fx;
                     ansy=fy+1;
                     max=nouse;
                 if(step==lll)
                     dir='down';
                 }
             }
             else  if(fx>0&&vtmp[fx-1][fy]==step-1)
             {
                 var nouse=cal(fx-1,fy,mp2);
                 if(nouse>max)
                 {
                     ansx=fx-1;
                     ansy=fy;
                     max=nouse; 
                      if(step==lll)
                     dir='left';
                 }
             }  else if(fx+1<w&&vtmp[fx+1][fy]==step-1)
            {
                 var nouse=cal(fx+1,fy,mp2);
                 if(nouse>max)
                 {
                     ansx=fx+1;
                     ansy=fy;
                     max=nouse;
                      if(step==lll)
                     dir='right';
                 }
             }
             fx=ansx;
             fy=ansy;
             step--;
             newsnake.push({x:fx,y:fy});
             if(step)
             newsnake.shift();
        }
        
       var mp2=[];
       for(var i=0; i<w; i++)
       {
           mp2[i]=[];
             for(var j=0; j<h; j++)
             mp2[i][j]=-1;
       }
        for(var i=0; i<newsnake.length-1; i++)
              mp2[newsnake[i].x][newsnake[i].y]=1;
        if(findT(newsnake[0],newsnake[newsnake.length-1],mp2))
                return true;
        return false;
    }
   
    
    function getdist(fx,fy,des,mp2)
    {
        var que=[];
        var v=[];
        for(var x=0; x<w; x++)
        {
            v[x]=[];
        for(var y=0; y<h; y++)
        v[x][y]=0;
        }
        que.push({x:fx,y:fy,dist:0});
        v[fx][fy]=1;
        while(que.length>0)
        {
            var pos=que.shift();
            if(pos.x==des.x&&pos.y==des.y)
            return pos.dist;
            if(pos.x>0&&v[pos.x-1][pos.y]==0&&mp2[pos.x-1][pos.y]<=1)
            {
                v[pos.x-1][pos.y]=1;
                que.push({x:pos.x-1,y:pos.y,dist:pos.dist+1});
            }
            if(pos.y>0&&v[pos.x][pos.y-1]==0&&mp2[pos.x][pos.y-1]<=1)
            {
                v[pos.x][pos.y-1]=1;
                que.push({x:pos.x,y:pos.y-1,dist:pos.dist+1});
            }
            if(pos.x+1<w&&v[pos.x+1][pos.y]==0&&mp2[pos.x+1][pos.y]<=1)
            {
                v[pos.x+1][pos.y]=1;
                que.push({x:pos.x+1,y:pos.y,dist:pos.dist+1});
            }
            if(pos.y+1<h&&v[pos.x][pos.y+1]==0&&mp2[pos.x][pos.y+1]<=1)
            {
                v[pos.x][pos.y+1]=1;
                que.push({x:pos.x,y:pos.y+1,dist:pos.dist+1});
            }
        }
        return -1;
    }
    
    function far(sta,des,mp2)
    {
        for(var x=0; x<w; x++)
            for(var y=0; y<h; y++)
             if(mp2[x][y]==1)
                 mp2[x][y]=-1;
               else if(mp2[x][y]>1)
                mp2[x][y]-=1;
        
        var max=-1;
         if(sta.y+1<h&&mp2[sta.x][sta.y+1]<2)
        {
            mp2[sta.x][sta.y+1]=l;
            var di=getdist(sta.x,sta.y+1,des,mp2);
             if(di>max)
            {
                max=di;
                dir='down';
            }
            mp2[sta.x][sta.y+1]=-1;
        }
     
        if(sta.y>0&&mp2[sta.x][sta.y-1]<2)
        {
            mp2[sta.x][sta.y-1]=l;
            var di=getdist(sta.x,sta.y-1,des,mp2);
             if(di>max)
            {
                max=di;
                dir='up';
            }
            mp2[sta.x][sta.y-1]=-1;
        }
        
          if(sta.x>0&&mp2[sta.x-1][sta.y]<2)
        {
            mp2[sta.x-1][sta.y]=l;
            var di=getdist(sta.x-1,sta.y,des,mp2);
            if(di>max)
            {
                max=di;
                dir='left';
            }
            mp2[sta.x-1][sta.y]=-1;
        }
        
        if(sta.x+1<w&&mp2[sta.x+1][sta.y]<2)
        {
            mp2[sta.x+1][sta.y]=l;
            var di=getdist(sta.x+1,sta.y,des,mp2);
            if(di>max)
            {
                max=di;
                dir='right';
            }
            mp2[sta.x+1][sta.y]=-1;
        }
       
        return dir;
    }
    
    return function(game)
    {
       var start=game.snake[0];
        var  destination=game.food[0];
        l=game.snake.length;
        creatmp(game.snake,destination);
        
        if(findP(destination,start,mp)&&l<190)
        {
           if(move(vtmp[start.x][start.y], game))
                return dir;
        }
        return far(start,game.snake[l-2],mp);
    }
}