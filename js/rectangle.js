var Rectangle = Shape.extend({
	draw: function(context){
		$("#myCanvas").mousedown(function(e){
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;

			context.fillStyle = "blue";
			context.fillRect(x - 30, y - 30, 60, 60);
		});
	}
});