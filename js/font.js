var Font = Shape.extend({
	constructor: function(x,y, color, width, text){
		this.base(x,y, color, width, text);
	},
	draw: function(context, e){
		context.beginPath();
		context.fillStyle = this.color;
		context.font = this.width;
		context.fillText(this.text, this.x, this.y);
		context.stroke();
		context.closePath();
	},
	drawing: function(canvas, e){

	}
})