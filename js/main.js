$(document).ready(function(){
	console.log("I'm ready");

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var shapes = new Array();
	var button = "penButton";
	var isDown = false;
	var boundingRect = canvas.getBoundingClientRect();
	var color = "black";
	var width = "1";
	var font = "Arial";
	var fontsize = "10px";
	var text = "Halló heimur!";

	$("#fonts").change(function(){
		font = $(this).val();
	});
	$("#fontsize").change(function(){
		fontsize = $(this).val();
	});

	$("#typo").change(function(){
		text = $(this).val();
	});


	$("#sizebar").change(function(){
		width = $(this).val();
	});

	var coloring = document.getElementById("ground"), 		
		rainbow = document.getElementById("rainbow");
	coloring.addEventListener("input", function(){
		color = coloring.value;
		rainbow.style.color = color;
	}, false);


	//funtion that determines what tool the user wants to use
	$(".btn").click(function(){
		buttonID = undefined;
		buttonID = $(this).attr('id');
		buttonID = "#" + buttonID;
		if(buttonID != "#color"){
		$("#buttonMenu button").each(function(){
			$(this).removeClass();
			$(this).addClass('btn btn-default btn-lg');
		})
		$(buttonID).addClass("btn btn-success btn-lg");
		}
	});

	canvas.onmousedown = function(evt){
		isDown = true;
		var shape = getShape(evt);
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
		redraw();
	};

	redraw = function(){
		context.clearRect(0,0, context.canvas.width, context.canvas.height);
		for (var i = 0; i < shapes.length; i++) {
			shapes[i].draw(context);
		};
	}

	getShape = function(evt){
		button = document.getElementsByClassName("btn-success")[0].getAttribute('id');
		if (button === "rectButton"){
		 	return shape = new Rectangle(evt.x - boundingRect.left, evt.y - boundingRect.top, color, width);
		}else if(button === "circleButton"){
			return new Circle(evt.x - boundingRect.left, evt.y - boundingRect.top, color, width);
		}else if(button === "lineButton"){
			return new Line(evt.x - boundingRect.left, evt.y - boundingRect.top, color, width);
		}else if(button === "textButton"){
			return new Font(evt.x - boundingRect.left, evt.y - boundingRect.top, color, fontsize + ' ' + font, text);
		}else{
			return new Pen(evt.x - boundingRect.left, evt.y - boundingRect.top, color, width);
		}
	}
})