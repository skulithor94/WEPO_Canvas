var Line = Shape.extend({
	constructor: function(name, x, y, color, width){
		this.base(name, x, y, color, width);
	},
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
		context.closePath();
	},
	drawing: function(canvas, e){
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - rect.left;
		this.endY = e.y - rect.top;
	}
})