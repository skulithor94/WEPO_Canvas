var Pen = Shape.extend({
	constructor: function(x,y){
		this.base(x,y);
	},
	draw: function(context, e){
		this.x = this.endX;
		this.y = this.endY;

		

		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.endX, this.endY);
		context.stroke();
	},
	drawing: function(canvas, e){
		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - rect.left;
		this.endY = e.y - rect.top;
	}
})