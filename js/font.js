var Font = Shape.extend({
	constructor: function(name, x, y, color, width, text){
		this.base(name, x, y, color, width, text);
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