$(document).ready(function(){
	//Saving
	$("#saveButton").click(function(){
		$("#saveModal").modal('show');
	});

	//Code from http://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
	//and http://stackoverflow.com/questions/12796513/html5-canvas-to-png-file
	//user1874941 and Nippey
	$("#localSaveButton").click(function(){
		var canvas = document.getElementById("myCanvas");
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
		this.href = image;
	});

	//Loading images
	$("#loadButton").click(function(){
		$("#loadModal").modal('show');
	});

})