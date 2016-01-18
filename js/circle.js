var Circle = Shape.extend({
	draw: function(context,buttonID){
		$("#myCanvas").mousedown(function(e){
			var button = document.getElementsByClassName("btn-success")[0].getAttribute('id');
			if(button !== "circleButton"){
				return;
			}
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