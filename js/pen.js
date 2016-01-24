var Pen = Shape.extend({
	constructor: function(name, x, y, color, width){
		this.base(name, x, y, color, width);
		this.tempX = x;
		this.tempY = y;
		this.points = [{x: x, y: y}];
	},
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
		for (var i = 0; i < this.points.length-1; i++) {
			context.lineCap = "round";
			context.beginPath();
			context.moveTo(this.points[i].x, this.points[i].y);
			context.lineTo(this.points[i+1].x, this.points[i+1].y);
			context.stroke();
		};
	},
	drawing: function(canvas, e){
		this.tempX = this.endX;
		this.tempY = this.endY;
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - rect.left;
		this.endY = e.y - rect.top;
		this.points.push({x: this.endX, y:this.endY});
	}
})