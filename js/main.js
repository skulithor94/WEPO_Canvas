$(document).ready(function(){
	console.log("I'm ready");

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	//used to test if jquery was working
	$("#myCanvas").click(function(){
		console.log("Click");
	});

	//funtion that determines what tool the user wants to use
	$(".btn").click(function(){
		var buttonID = $(this).attr('id');
		buttonID = "#" + buttonID;
		
		$("#buttonMenu li button").each(function(){
			$(this).removeClass();
			$(this).addClass('btn btn-default');
		})
		$(buttonID).addClass("btn btn-success");
	});
})