var Shape = Base.extend({
	constructor: function(x,y, color, width, text){
		this.x = x;
		this.y = y;
		this.endX = x;
		this.endY = y;
		this.color = color;
		this.width = width;
		this.text = text;
	},
	draw: function(canvas){
		
	}
});