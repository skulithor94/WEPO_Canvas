var Rectangle = Shape.extend({
	draw: function(context){
		$("#myCanvas").mousedown(function(e){
			this.x = e.pageX - this.offsetLeft;
			this.y = e.pageY - this.offsetTop;

			context.fillStyle = "blue";
			context.fillRect(this.x - 90, this.y - 30, 60, 60);
		});
	}
});