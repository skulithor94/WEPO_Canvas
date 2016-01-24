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
	}
});