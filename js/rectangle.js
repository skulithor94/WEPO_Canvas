var Rectangle = Shape.extend({
	constructor: function(x, y){
		this.base(x,y);
	},
	draw: function(canvas, e){
		canvas.strokeRect(this.x, this.y, this.endX, this.endY);
	},
	drawing: function(canvas, e){
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - this.x - rect.left;
		this.endY = e.y - this.y - rect.top;
	}
});