var Circle = Shape.extend({
	constructor: function(name, x, y, color, width){
		this.base(name, x, y, color, width);
		this.radius = 0;
	},
	constructor: function(name, x, y, endX, endY, color, width, radius){
		this.base(name, x, y, color, width);
		this.endX = endX;
		this.endY = endY;
		this.radius = radius;
	},
	draw: function(context, e){
		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		context.beginPath();
		context.arc(this.x, this.y, this.radius * 8, 0, 2 * Math.PI, false);
		context.stroke();
		context.closePath();
	},
	drawing: function(canvas, e){
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - rect.left;
		this.endY = e.y - rect.top;
		this.radius = Math.sqrt(Math.abs(((this.endX - this.x)^2)) + Math.abs(((this.endY-this.y)^2)));
	}
});