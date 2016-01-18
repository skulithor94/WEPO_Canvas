var Rectangle = Shape.extend({
	draw: function(context){
		$("#myCanvas").mousedown(function(e){
			var button = document.getElementsByClassName("btn-success")[0].getAttribute('id');
			if(button !== "rectButton"){
				return;
			}
			this.x = e.pageX - this.offsetLeft;
			this.y = e.pageY - this.offsetTop;

			context.fillStyle = "blue";
			context.fillRect(this.x - 90, this.y - 30, 60, 60);
		});
	}
});