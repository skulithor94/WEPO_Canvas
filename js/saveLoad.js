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

	$("#cloudSaveButton").click(function(){
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		//var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var userId = $("#userIdInput").val();
		var pictureTitle = $("#pictureTitleInput").val();
		var checkbox = false;
		console.log(shapes);
		imageData = JSON.stringify(shapes);

		if ($("#templateCheckbox").is(':checked')) {
			checkbox = true;
		}else{
			checkbox = false;
		}

		var param = { "user": userId, 
				"name": pictureTitle,
				"content": imageData,
				"template": checkbox
		};

		$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "http://whiteboard.apphb.com/Home/Save",
				data: param,
				dataType: "jsonp",
				crossDomain: true,
				success: function (data) {
					console.log("Save successful!");
				},
				error: function (xhr, err) {
					console.log("error");
					alert("Something went wrong! " + err);
				}
		});
	});

	$("#cloudLoadButton").click(function(){

	$.ajax({
		type: "GET",
		url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
		dataType: "jsonp",
		crossDomain: true,
		data: { id: "3574" }//{ user: "skuli14", template: false }
	}).done(function(data){
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		var tempShapes = data.WhiteboardContents;
		tempShapes = JSON.parse(tempShapes);
		console.log(tempShapes);
		console.log(tempShapes.length);
		console.log(tempShapes[0]);
		for (var i = 0; i < tempShapes.length; i++) {
			shapes.push(new Circle(tempShapes[i].x, tempShapes[i].y, tempShapes[i].endX, tempShapes[i].endY,
								tempShapes[i].color, tempShapes[i].width, tempShapes[i].radius));
			shapes[i].draw(context);
		}

		console.log(shapes);
	});


	});

	//Loading images
	$("#loadButton").click(function(){
		$("#loadModal").modal('show');
	});

	$("input[type=file]").on('change', function(){
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		console.log("file ready");
		var image = event.target.files[0];
		context.drawImage(image, 0, 0);
	});

})