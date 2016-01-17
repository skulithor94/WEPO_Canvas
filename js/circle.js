var Circle = Shape.extend({
	draw: function(context){
		$("#myCanvas").mousedown(function(e){
			this.x = e.pageX - this.offsetLeft;
			this.y = e.pageY - this.offsetTop;

			context.beginPath();
			context.arc(this.x, this.y, 10, 0, Math.PI, false);
			context.fillStyle = "black";
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle	= "black";
			context.stroke();		
		});
	}
});