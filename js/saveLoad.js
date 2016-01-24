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
		var userId = $("#userIdInputForLoad").val();
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
			var canvas = document.getElementById("myCanvas");
			var context = canvas.getContext("2d");
			var tempShapes = data.WhiteboardContents;
			tempShapes = JSON.parse(tempShapes);
			console.log(tempShapes);
			console.log(tempShapes.length);
			console.log(tempShapes[0]);
			for (var i = 0; i < tempShapes.length; i++) {
				shapes.push(getShapeByName(tempShapes[i]));
			}
			for (var i = 0; i < shapes.length; i++) {
				shapes[i].draw(context);
			};
			$("#loadModal").modal('hide');
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
			//TODO: FIX THIS, ÞETTA ER EKKI RÉTT, Á AÐ VERA EINS OG HIN!!
			return new Font("Text", evt.x - boundingRect.left, evt.y - boundingRect.top, color, fontsize + ' ' + font, text);
		}else{
			return new Pen("Pen", arrayEntry.x, arrayEntry.y, arrayEntry.endX, arrayEntry.endY, arrayEntry.color, arrayEntry.width, arrayEntry.points);
		}
	}
	//Loading images
	$("#loadButton").click(function(){
		$("#loadModal").modal('show');
	});
	//TODO: FIX THIS!
	$("input[type=file]").on('change', function(){
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		console.log("file ready");
		var image = event.target.files[0];
		context.drawImage(image, 0, 0);
	});

})