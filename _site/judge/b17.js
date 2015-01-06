

function path( parent, x, y ){
	this.parent = parent
	this.x = x;
	this.y = y;
	this.steps = 0;
	this.valuse = 0;
}

path.prototype.equalse = function ( compare ){
	return this.x == compare.x && this.y  == compare.y;
}

function container(  ){
	this.paths = new Array();
}

container.prototype.add = function( newpath ){
	
	var index = this.contains( newpath );
	if( index >= 0 ){
		if( this.paths[index].valuse > newpath.valuse ){
			this.paths.slice( index, 1 );
		}else{
			return ;
		}
	}
	this.paths.push( newpath );
	for( var i = this.paths.length-2; i >= 0 ; i-- ){
		
		if( this.paths[i].valuse >=  newpath.valuse ){
			this.paths[i+1] = this.paths[i];
		}else{
			this.paths[i+1] = newpath;
			return ;
		}
	}
	this.paths[0] = newpath;
}

container.prototype.remove = function ( deletedpath ){
	for( var i = 0; i < this.paths.length; i++ ){
		if( paths[i].equals( deletedpath ) ){
			this.paths.splice( i, 1);
			break;
		}
	}
}

container.prototype.contains = function ( p ){
	for( var i = this.paths.length - 1; i >= 0; i-- ){
		if( this.paths[i].x == p.x && this.paths[i].y == p.y ){
			return i;
		}
	}
	return -1;
}
container.prototype.isempty = function(){
	return this.paths.length == 0;
}

function createThink(w, h) {
     var maxsteps = w * h / 3;
	var countsteps = 0;
	var x = 0;
	var y = 0;
	var tail = 5;
	var selected = false;
	
    return function(game) {
        
       var marks = 0;
       var maxM = -100;
       var maxIndex;
	   if( tail <= 0 ){
		tail = 5;
		}
      for( var i = 0; i < 4; i++ ){
			marks = countMarks( w, h, game, i, tail );
			if( marks > maxM ){
				maxM = marks;
				maxIndex = i;
			}
			if( marks == maxM ){
				selected = !selected;
				if( selected ){
					maxM = marks;
					maxIndex = i;
				}
			}
		}
		
		if( x != game.food[0].x || y != game.food[0].y ){
			x = game.food[0].x;
			y = game.food[0].y;
			countsteps = 0;
		}
		else{
			countsteps ++;
		}
		if( countsteps > maxsteps ){
			tail = -100;
			if( countsteps > maxsteps + 100 ){
				maxIndex = 0;
			}
		}
		
		
       switch( maxIndex ){
       case 0:
    	   return 'right';
       case 1:
    	   return 'left';
       case 2:
    	   return 'down';
       case 3:
    	   return 'up';
		default :
			return 'down';   
       }
    };
}

function countMarks( w, h, game, direction, tail ){

		var marks = 0;
		var snakecopy = deepClone( game.snake );
		
	   switch( direction ){
	   case 0:
			snakecopy.unshift( {x:game.snake[0].x+1,y:game.snake[0].y});
			if( snakecopy[0].x != game.food[0].x || snakecopy[0].y != game.food[0].y ){
				snakecopy.pop(); 
			}
			if( !check(w, h,snakecopy[0].x,snakecopy[0].y, game.snake) ){
				return 0;
			}
		  	marks += isSafe( w, h, snakecopy );
			if( game.snake[0].x - game.snake[game.snake.length-1].x < 0 ){
				marks += tail;
			}
		  	if( game.snake[0].x - game.food[0].x < 0 ){
				marks+= 10;
			}
			if( snakecopy[0].x != w - 1 ){
				marks += 2;
			}
		   return marks;
	   case 1:
	   		
			snakecopy.unshift( {x:game.snake[0].x - 1,y:game.snake[0].y});
			if( snakecopy[0].x != game.food[0].x ||game.snake[0].y != game.food[0].y ){
				snakecopy.pop(); 
			}
			if( !check( w, h,snakecopy[0].x,snakecopy[0].y, game.snake ) ){
				return 0;
			}
		  	marks += isSafe( w, h, snakecopy );
			if( game.snake[0].x - game.snake[game.snake.length-1].x > 0 ){
				marks += tail;
			}
		  	if(game.snake[0].x - game.food[0].x > 0){
				marks+= 10;
			}
			if( snakecopy[0].x != 0 ){
				marks += 2;
			}
		   return marks;
	   case 2:
	   		
			snakecopy.unshift( {x:game.snake[0].x,y:game.snake[0].y+1});
			if( snakecopy[0].x != game.food[0].x ||snakecopy[0].y != game.food[0].y ){
				snakecopy.pop(); 
			}
			if( !check( w, h,snakecopy[0].x,snakecopy[0].y, game.snake ) ){
				return 0;
			}
			marks += isSafe( w, h, snakecopy );
		  	
			if( game.snake[0].y - game.snake[game.snake.length-1].y < 0 ){
				marks += tail;
			}
		  	if(game.snake[0].y - game.food[0].y < 0){
				marks+= 10;
			}
			if( snakecopy[0].y != h -1 ){
				marks += 2;
			}
		   return marks;
	   case 3:
	   		
			snakecopy.unshift( {x:game.snake[0].x,y:game.snake[0].y-1});
			if( snakecopy[0].x!= game.food[0].x ||snakecopy[0].y != game.food[0].y ){
				snakecopy.pop(); 
			}
			if( !check( w, h,snakecopy[0].x,snakecopy[0].y, game.snake ) ){
				return 0;
			}
		  	marks += isSafe( w, h, snakecopy );
			if( game.snake[0].y - game.snake[game.snake.length-1].y > 0 ){
				marks += tail;
			}
		  	if(game.snake[0].y - game.food[0].y > 0){
				marks+= 10;
			}
			if( snakecopy[0].y != 0 ){
				marks += 2;
			}
		   return marks;
	   }
}

function check( w, h, x, y, snake ){
	
	if( (x < 0 || x >= w) || (y < 0 || y >= h) ){
		return false;
	}
	for( var i = 0; i < snake.length; i++ ){
		if( x == snake[i].x && y == snake[i].y ){
			return false;
		}
	}
	return true;
}


function isSafe( w, h, snake ){
	
	var openC = new  container();
	var closed = new container();
	var childs = new Array();
	var next = new path( null, snake[0].x, snake[0].y ); 
	
	var index = 0;
	var maxsteps = w + h + w + h + w;
	var desx = snake[snake.length-1].x;
	var desy = snake[snake.length-1].y ;
	
	next.valuse = hf( snake[0].x, snake[0].y, snake[snake.length-1].x, snake[snake.length-1].y );
	openC.paths.push( next );
	
	while( true ){
		if( openC.isempty() ){
			return closed.paths.pop().steps;
		}
		next = openC.paths[0];
		if( next.x == desx && next.y == desy ){
			return 300;
		}
		if( next.steps > maxsteps ){
			return next.steps;
		}		
		openC.paths.shift();
		closed.paths.push( next );
		childs = expand( w, h, next, desx, desy, snake, childs );		
		for( var i = 0; i < childs.length; i++ ){
		
			if( (index = openC.contains( childs[i] )) >= 0 ){
				if( openC.paths[index].valuse > childs[i].valuse ){
					openC.paths[index] = childs[i];
				}
			}
			else if( (index = closed.contains( childs[i] )) >= 0 ){
				if( closed.paths[index].valuse > childs[i].valuse){
					closed.paths.splice(index, 1 );
					openC.add( childs[i] );
				}
			}else{
				openC.add(childs[i] );
			}
		}
	}
}
function safeCheck( w, h, x, y, snake ){
	if( (x < 0 || y >= w) || (y < 0 || y >= h) ){
		return false;
	}
	for( var i = 0; i < snake.length - 1; i++ ){
		if( x == snake[i].x && y == snake[i].y ){
			return false;
		}
	}
	return true;
}
function notparent( child ){
	var parent = child.parent;
	do{
		if( parent.equalse( child ) )return false;
		parent = parent.parent;
	}while( parent != null );
	return true;
}
function hf( startx, starty, endx, endy ){
	return Math.abs( endx - startx ) + Math.abs( endy - starty );
}
function expand( w, h, next, desx, desy, snake ){
	var childs = new Array();
	
	if( safeCheck( w, h, next.x + 1,  next.y, snake ) ){
		var right = new path( next, next.x + 1,  next.y );
		if( notparent( right ) ){
			right.steps = next.steps + 1;
			right.valuse = right.steps + hf(  right.x, right.y, desx, desy );
			childs.push( right );
		}
	}
	
	if( safeCheck( w, h,  next.x - 1,  next.y, snake ) ){
		var left = new path( next, next.x - 1,  next.y );
		if( notparent( left ) ){
			left.steps = next.steps + 1;
			left.valuse = left.steps + hf( left.x, left.y, desx, desy );
			childs.push( left );
		}
	}
	
	if( safeCheck( w, h,  next.x,  next.y + 1, snake ) ){
		var down = new path( next, next.x,  next.y + 1);
		if( notparent( down ) ){
			down.steps = next.steps + 1;
			down.valuse = down.steps + hf(  down.x, down.y, desx, desy );
			childs.push( down );
		}
	}
	
	if( safeCheck( w, h, next.x, next.y-1, snake ) ){
		var up = new path( next, next.x,  next.y - 1);
		if( notparent( up ) ){
			up.steps = next.steps + 1;
			up.valuse = up.steps + hf(up.x, up.y, desx, desy );
			childs.push( up );
		}
	}
	return childs;
}