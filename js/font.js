var Font = Shape.extend({
	constructor: function(x,y, color, width, text){
		this.base(x,y, color, width, text);
	},
	draw: function(context, e){
		context.fillStyle = this.color;
		context.font = this.width;
		context.fillText(this.text, this.x, this.y);
		context.stroke();
		context.closePath();
	},
	drawing: function(canvas, e){

	},
	texting: function(context, e){
		var inputtext = document.getElementById("typo");
		inputtext.style.left = this.x + 50 + "px";
    	inputtext.style.top = this.y - 30 + "px";
    	inputtext.style.display = "inline-block";
    	inputtext.focus();
	}
})