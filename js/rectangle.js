var Rectangle = Shape.extend({
	constructor: function(x, y, color, width){
		this.base(x,y, color, width);
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