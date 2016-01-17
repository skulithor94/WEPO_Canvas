$(document).ready(function(){
	console.log("I'm ready");

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var buttonID;

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

		if (buttonID === "#rectButton") {
			var rect = new Rectangle(0, 0);
			rect.draw(context);
		};

	});

	/*$("#myCanvas").click(function(e){
		console.log("Click");

		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;

		

	});*/
})