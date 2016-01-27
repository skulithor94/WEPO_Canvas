var Font = Shape.extend({
	constructor: function(name, x, y, color, width, text){
		this.base(name, x, y, color, width);
		this.text = text;
	},
	constructor: function(name, x, y, endX, endY, color, width, text){
		this.base(name, x, y, endX, endY, color, width);
		this.width = width;
		this.color = color;
		this.text = text;
	},
	draw: function(context, e){
		context.fillStyle = this.color;
		context.font = this.width;
		context.fillText(this.text, this.x, this.y);
		context.closePath();
	},
	drawing: function(canvas, e){

	},
	texting: function(context, e){
		var inputtext = document.getElementById("typo");
		inputtext.style.left = this.x + 45 + "px";
    	inputtext.style.top = this.y - 10 - document.getElementById("fontsize").value + "px";
    	inputtext.style.display = "inline-block";
    	inputtext.style.fontFamily = document.getElementById("fonts").value;
    	inputtext.style.fontSize = document.getElementById("fontsize").value;
    	inputtext.focus();
	}
})