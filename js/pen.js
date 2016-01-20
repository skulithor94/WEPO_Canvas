var Pen = Shape.extend({
	constructor: function(x,y, color, width){
		this.base(x,y, color, width);
	},
	draw: function(context, e){

		context.strokeStyle = this.color;
		context.lineWidth = this.width;
		context.lineCap = "round";
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.endX, this.endY);
		context.stroke();
	},
	drawing: function(canvas, e){
		this.x = this.endX;
		this.y = this.endY;

		var rect = canvas.getBoundingClientRect();
		this.endX = e.x - rect.left;
		this.endY = e.y - rect.top;
	}
})