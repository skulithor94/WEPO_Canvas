$(document).ready(function(){
	console.log("I'm ready");

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var shapes = new Array();
	var button;
	var isDown = false;
	var boundingRect = canvas.getBoundingClientRect();


	//funtion that determines what tool the user wants to use
	$(".btn").click(function(){
		buttonID = undefined;
		buttonID = $(this).attr('id');
		buttonID = "#" + buttonID;
		
		$("#buttonMenu li button").each(function(){
			$(this).removeClass();
			$(this).addClass('btn btn-default');
		})
		$(buttonID).addClass("btn btn-success");
	});

	canvas.onmousedown = function(evt){
		isDown = true;
		var shape;

		button = document.getElementsByClassName("btn-success")[0].getAttribute('id');
		if (button === "rectButton"){
		 	shape = new Rectangle(evt.x- boundingRect.left, evt.y - boundingRect.top);
			canvas.onmousemove = function(evt){
				if(!isDown){
					return;
				}
				shape.drawing(canvas, evt);
				redraw();
				shape.draw(context);
			}
			canvas.onmouseup = function(evt){
				isDown = false;
				shape.draw(context);
				shapes.push(shape);
				redraw();
			}
		}else if(button === "circleButton"){
			var circle = new Circle(0, 0);
			circle.draw(context);
		}else{
			//pen
		}
		redraw();
	};

	redraw = function(){
		context.clearRect(0,0, context.canvas.width, context.canvas.height);
		for (var i = 0; i < shapes.length; i++) {
			shapes[i].draw(context);
		};
	}
})