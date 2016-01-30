var Font = Shape.extend({
	constructor: function(name, x, y, endX, endY, color, width, text, fontsize){
		this.base(name, x, y, endX, endY, color, width);
		this.width = width;
		this.color = color;
		this.text = text;
		this.fontsize = fontsize;
	},
	draw: function(context, e){
		context.fillStyle = this.color;
		context.font = this.width;
		context.fillText(this.text, this.x, this.y);
		context.closePath();
	},
	drawing: function(canvas, e){
		//unused, font uses texting function instead
	},
	contains: function(c, x, y){
		var rect = c.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;
		stringLength = this.text.length;
		if(y <= this.y && y >= this.y - this.fontsize && x >= this.x && x <= (this.x + (stringLength * (this.fontsize / 2)))){
			return true;
		}
		else{
			return false;
		}
	},
	move: function(deltaX, deltaY){
		this.x = this.x - deltaX;
		this.y = this.y - deltaY;
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
});