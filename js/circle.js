var Circle = Shape.extend({
	constructor: function(x, y, color, width){
		this.base(x, y, color, width);
		this.radius = 0;
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
		this.radius = Math.sqrt(((this.endX - this.x)^2) + ((this.endY-this.y)^2));
	}
});