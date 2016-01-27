var Rectangle = Shape.extend({
	constructor: function(name, x, y, color, width){
		this.base(name, x, y, color, width);
	},
	constructor: function(name, x, y, endX, endY, color, width){
		this.base(name, x, y, color, width);
		this.endX = endX;
		this.endY = endY;
	},
	draw: function(context, e){
		if(this.x === this.endX && this.y === this.endY){
			return;
		}
		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		context.strokeRect(this.x, this.y, this.endX, this.endY);
		context.closePath();
	},
	drawing: function(canvas, e){
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - this.x - rect.left;
		this.endY = e.y - this.y - rect.top;
	},
	//Checks if the point (x, y) is within the boundaries of the rectangle
	contains: function(c, x, y){
		var rect = c.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;

		//if box is drawn from lower-left to upper-right
		if((x >= this.x && x <= (this.endX + this.x)) && (y <= this.y && y >= (this.endY + this.y))){
			return true;
		}
		//if box is drawn from upper-right to lower-left
		else if((x <= this.x && x >= (this.endX + this.x)) && (y >= this.y && y <= (this.endY + this.y))){
			return true;
		}
		//if box is drawn from upper-left to lower-right
		else if((x >= this.x && x <= (this.endX + this.x)) && (y >= this.y && y <= (this.endY + this.y))){
			return true;
		}
		//if box is drawn from lower-right to upper-left
		else if((x <= this.x && x >= (this.endX + this.x)) && (y <= this.y && y >= (this.endY + this.y))){
			return true;
		}
		else{
			return false;
		}
	},
	move: function(deltaX, deltaY){
		console.log(this);
		this.x = this.x - deltaX;
		this.y = this.y - deltaY;
		console.log(this);
		console.log(deltaX, deltaY);
	}
});