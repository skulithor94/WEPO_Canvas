var Circle = Shape.extend({
	constructor: function(x, y){
		this.base(x,y);
	},
	draw: function(canvas, e){
		canvas.beginPath();
		canvas.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
		canvas.stroke();
	},
	drawing: function(canvas, e){
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - this.x - rect.left;
		this.endY = e.y - this.y - rect.top;
	}
});