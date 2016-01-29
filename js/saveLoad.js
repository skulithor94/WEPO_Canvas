$(document).ready(function(){
	//Saving
	$("#saveButton").click(function(){
		$("#saveModal").modal('show');
	});

	//Loading
	$("#loadButton").click(function(){
		$("#loadModal").modal('show');
	});

	//Code from http://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
	//and http://stackoverflow.com/questions/12796513/html5-canvas-to-png-file
	//user1874941 and Nippey
	$("#localSaveButton").click(function(){
		var canvas = document.getElementById("myCanvas");
		var image  = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
		this.href  = image;
	});

	//Saving API.
	$("#cloudSaveButton").click(function(){
		var canvas       = document.getElementById("myCanvas");
		var context      = canvas.getContext("2d");
		var userId       = $("#userIdInput").val();
		var pictureTitle = $("#pictureTitleInput").val();
		var checkbox     = false;

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
			$("#modalBodySave").empty();
			$("#modalBodySave").append("<h3>Save successful!</h3>");
		},
		error: function (xhr, err) {
			$("#modalBodySave").empty();
			$("#modalBodySave").append("<h3>Save unsuccessful!</h3>");
		}
	});
});

	//Function used to reset save modal after it has been closed.
	$("#saveCloseButton").click(function(){
		$("#modalBodySave").empty();
		$("#modalBodySave").append("Here you can save to local storage or to the cloud.");
		$("#userIdInput").val('');
		$("#pictureTitleInput").val('');
		$('#templateCheckbox').attr('checked', false);
		$(this).removeClass();
		$(this).addClass('btn btn-info');
	});

	//Function used to reset load modal after it has been closed.
	function closeLoadModal(){
		$("#modalBodyLoad").empty();
		$("#modalBodyLoad").append("Here you can load images from the cloud.");
		$("#userIdInputForLoad").val('');
		$('#templateCheckboxForLoad').attr('checked', false);
		$(this).removeClass();
		$(this).addClass('btn btn-info');
	};

	$("#loadCloseButton").on("click", closeLoadModal); 

	//Loading API.
	$("#cloudLoadButton").click(function(){
		var userId   = $("#userIdInputForLoad").val();
		var checkbox = false;

		if ($("#templateCheckboxForLoad").is(':checked')) {
			checkbox = true;
		}else{
			checkbox = false;
		}

		var param = { "user": userId, 
		"template": checkbox
	};

	$.ajax({
		type: "GET",
		url: "http://whiteboard.apphb.com/Home/GetList",
		dataType: "jsonp",
		crossDomain: true,
		data: param
	}).done(function(data){
		var $modal = $("#modalBodyLoad");
		$modal.empty();
		$modal.append("<ol></ol>");
		for (var i = 0; i < data.length; i++) {
			$("#modalBodyLoad ol").append("<li><a data-id='" + data[i].ID + "' data-user='" + userId + "'>ID: " + data[i].ID + " Name: " + data[i].WhiteboardTitle + "</a></li>");
		};
	});
});

	$(document).on('click', '#modalBodyLoad ol li a', function(evt){

		var ID = $(this).attr("data-id");
		$.ajax({
			type: "GET",
			url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
			dataType: "jsonp",
			crossDomain: true,
			data: { id: ID }
		}).done(function(data){
			var tempShapes = data.WhiteboardContents;
			tempShapes = JSON.parse(tempShapes);
			console.log(tempShapes);
			for (var i = 0; i < tempShapes.length; i++) {
				shapes.push(getShapeByName(tempShapes[i]));
			}
			for (var i = 0; i < shapes.length; i++) {
				shapes[i].draw(context);
			};
			console.log(shapes);
			$("#loadModal").modal('hide');
			closeLoadModal();
		});
	});

	function getShapeByName(arrayEntry){
		if (arrayEntry.name === "Rectangle"){
			return new Rectangle("Rectangle", arrayEntry.x, arrayEntry.y, arrayEntry.endX, arrayEntry.endY, arrayEntry.color, arrayEntry.width);
		}else if(arrayEntry.name === "Circle"){
			return new Circle("Circle", arrayEntry.x, arrayEntry.y, arrayEntry.endX, arrayEntry.endY, arrayEntry.color, arrayEntry.width, arrayEntry.radius);
		}else if(arrayEntry.name === "Line"){
			return new Line("Line", arrayEntry.x, arrayEntry.y, arrayEntry.endX, arrayEntry.endY, arrayEntry.color, arrayEntry.width);
		}else if(arrayEntry.name === "Text"){
			return new Font("Text", arrayEntry.x, arrayEntry.y, arrayEntry.endX, arrayEntry.endY, arrayEntry.color, arrayEntry.width, arrayEntry.text);
		}else{
			return new Pen("Pen", arrayEntry.x, arrayEntry.y, arrayEntry.endX, arrayEntry.endY, arrayEntry.color, arrayEntry.width, arrayEntry.points);
		}
	};
})