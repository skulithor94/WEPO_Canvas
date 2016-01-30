var Line = Shape.extend({
	constructor: function(name, x, y, endX, endY, color, width){
		this.base(name, x, y, color, width);
		this.endX = endX;
		this.endY = endY;
	},
	draw: function(context, e){
		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.endX, this.endY);
		context.stroke();
		//
		context.closePath();
	},
	drawing: function(canvas, e){
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - rect.left;
		this.endY = e.y - rect.top;
	},
	//Checks if the point (x, y) is within 10 pixels from the drawn line
	contains: function(c, x, y){
		var rect = c.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;

		var slope = (this.endY - this.y)/(this.endX - this.x);
		var perpslope = 0 - (1 / slope);
		var intersection = this.y - (slope * this.x);
		var perpintersection = y - (perpslope * x);
		console.log(this.x, this.y, this.endX, this.endY);
		console.log(slope);
		console.log(perpslope);
		console.log(intersection);
		console.log(perpintersection);
		console.log(x, y);


		var lineX, lineY;
		lineX = (perpintersection - intersection)/(slope - perpslope);
		lineY = (slope * lineX) + intersection;
		console.log(lineX, lineY);
		
		var distance = Math.sqrt(((lineX - x)*(lineX - x)) + ((lineY - y)*(lineY - y)));

		//if line is drawn from lower-left to upper-right
		if(((x >= this.x && x <= this.endX) && (y <= this.y && y >= this.endY)) && distance <= 10){
			return true;
		}
		//if line is drawn from upper-right to lower-left
		else if(((x <= this.x && x >= this.endX) && (y >= this.y && y <= this.endY)) && distance <= 10){
			return true;
		}
		//if line is drawn from upper-left to lower-right
		else if(((x >= this.x && x <= this.endX) && (y >= this.y && y <= this.endY)) && distance <= 10){
			return true;
		}
		//if line is drawn from lower-right to upper-left
		else if(((x <= this.x && x >= this.endX) && (y <= this.y && y >= this.endY)) && distance <= 10){
			return true;
		}
		else{
			return false;
		}
	},
	move: function(deltaX, deltaY){
		//console.log(this);
		this.x = this.x - deltaX;
		this.y = this.y - deltaY;
		this.endX = this.endX - deltaX;
		this.endY = this.endY - deltaY;
		//console.log(this);
		//console.log(deltaX, deltaY);
	}
})