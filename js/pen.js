var Pen = Shape.extend({
	constructor: function(name, x, y, endX, endY, color, width, points){
		this.base(name, x, y, color, width);
		this.tempX = x;
		this.tempY = y;
		this.endX = endX;
		this.endY = endY;
		this.points = points;
	},
	draw: function(context, e){
		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		//if the pen moves to another position, it is stored in array
		for (var i = 0; i < this.points.length-1; i++) {
			context.lineCap = "round";
			context.beginPath();
			context.moveTo(this.points[i].x, this.points[i].y);
			context.lineTo(this.points[i+1].x, this.points[i+1].y);
			context.stroke();
		}
	},
	drawing: function(canvas, e){
		this.tempX = this.endX;
		this.tempY = this.endY;
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - rect.left;
		this.endY = e.y - rect.top;
		this.points.push({x: this.endX, y:this.endY});
	},
	//Checks if the point (x, y) is within 10 pixels from the drawn line
	contains: function(c, x, y){
		var rect = c.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;
		for (var i = 0; i < this.points.length-1; i++) {
			var distance = Math.sqrt(((this.points[i].x - x)*(this.points[i].x - x)) + ((this.points[i].y - y)*(this.points[i].y - y)));
			if(distance <= 10){
				return true;
			}
		}
		return false;
	},
	move: function(deltaX, deltaY){
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].x = this.points[i].x - deltaX;
			this.points[i].y = this.points[i].y - deltaY;	
		}
	}
});	