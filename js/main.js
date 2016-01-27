	var shapes = [];
	var canvas;
	var context;
$(document).ready(function(){

	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");

	var button = "penButton";		//Default tool.
	var buttonID;
	var isDown = false;
	var isOut = false;
	var boundingRect = canvas.getBoundingClientRect(); //Used to get correct cords for canvas.
	var color = "black";
	var width = "1";
	var font = "Arial";
	var fontsize = "10";
	var text = "";
	var undoObject; 				//An object is kept in this variable if it is undone.
	var hasBeenCleared = false;		//Used in functions to tell if canvas has been cleared.
	var wasCleared = false;			//Used to tell if the whole canvas was cleared before last undo operation.
	var textisvalid = false;
	//If the user clears the canvas all objects are stored here
	//so the user can undo the clear and get back his work.
	var undoCanvas = [];			
	var textid = document.getElementById("typo");
	$("#fonts").change(function(){
		font = $(this).val();
	});

	$("#fontsize").change(function(){
		fontsize = $(this).val();
	});

	$("#typo").on("keydown",function gettext(e) {
    	if(e.keyCode == 13) {
    		
        	text = textid.value;
        	textid.value = "";
        	textid.style.display = "none";
        	
        	var temp = shapes[shapes.length -1];
        	console.log("temp:");
        	console.log(temp);
        	shapes.pop();
        	var shape = getShape(e);
        	console.log("shape: ");
        	console.log(shape);
        	shape.x = temp.x;
        	shape.y = temp.y;
        	shape.width = temp.width;
        	shape.color = temp.color;
        	/*x,y, color, width, text*/
        	shape.draw(context);
			shapes.push(shape);
			text = "";
			redraw();
		}
	});	

	$("#typo").keyup(function(){
		$(this).height("auto");
		$(this).width("auto");
	});


	$("#sizebar").change(function(){
		width = $(this).val();
	});



	//These functions undo and redo provide only one level of undo/redo
	//if the user removes two shapes he will only get the latter back
	//by redoing.
	$("#undoButton").click(function(){
		if(hasBeenCleared && isCanvasBlank(canvas)){
			shapes = undoCanvas;
			redraw();
			hasBeenCleared = false;
			wasCleared = true;
			return;
		}
		if (shapes.length <= 0) {
			return;
		};
		wasCleared = false;
		undoObject = shapes.pop();
		redraw();
	});

	$("#redoButton").click(function(){
		if(wasCleared){
			clear();
			wasCleared = false;
		}
		if(undoObject !== undefined){
			shapes.push(undoObject);
			undoObject = undefined;
			redraw();
			wasCleared = false;
		}
	});
	
	//Funtion that determines what tool the user wants to use.
	$(".btn").click(function(){
		buttonID = undefined;
		buttonID = $(this).attr('id');
		buttonID = "#" + buttonID;

		if(tooglableButtons()){
			$("#buttonMenu button").each(function(){
			$(this).removeClass();
			$(this).addClass('btn btn-default btn-lg');
			})
			$(buttonID).addClass("btn btn-success btn-lg");
		}
	});

	$("#clearButton").click(clear);

	//Function is used to check if the button being clicked is
	//a tool with which to draw. 
	function tooglableButtons(){
		return buttonID !== "#color" && buttonID !== "#undoButton" && buttonID !== "#redoButton" 
			&& buttonID !== "#clearButton" && buttonID !== "#saveButton" && buttonID !== "#loadButton"
			&& buttonID !== "#localSaveButton" && buttonID !== "#cloudSaveButton" && buttonID !== "#localLoadButton"
			&& buttonID !== "#cloudLoadButton" 	&& buttonID !== "#sizedrop" && buttonID !== "#settingsButton";
	}
	//Function that clears the whole canvas. The extra variables
	//make it so the user can undo the clear. 
	function clear(){
		if(!isCanvasBlank(canvas)){
			context.clearRect(0,0, context.canvas.width, context.canvas.height);
			undoCanvas = shapes;
			shapes = [];
			hasBeenCleared = true;
			undoObject = undefined;
		}
	}

	var coloring = document.getElementById("ground"), 		
		rainbow = document.getElementById("rainbow");

	coloring.addEventListener("input", function(){
		color = coloring.value;
		rainbow.style.color = color;
	}, false);

	function disableRedo(){
		wasCleared = false;
	};

	//Function that handles drawing on the canvas.
	//When user clicks on the canvas the shape object determines 
	//what should be drawn.
	canvas.onmousedown = function(evt){
		disableRedo();
		isDown = true;
		var shape = getShape(evt);
		var button = document.getElementsByClassName("btn-success")[0].getAttribute('id');
		
			canvas.onmousemove = function(evt){
				if(!isDown && !isOut){
					return;
				}
				shape.drawing(canvas, evt);
				redraw();
				if(button == "textButton"){
					shape.texting(context);
				}
				else{
					shape.draw(context);
				}
			}
			canvas.onmouseup = function(evt){
				if (isOut) {
					return;
				}
				isDown = false;
				if(button == "textButton"){
					shape.texting(context);
				}
				else{
					shape.draw(context);
				}
				shapes.push(shape);
				redraw();
			}
			textid.onmouseout = function(evt){
		
				text = textid.value;
		        textid.value = "";
		       	textid.style.display = "none";
		    	shapes.pop();
			}
			
		redraw();
	};

	//Function that clears the whole canvas and draws all the shapes again:
	//Used so only one instance of each object is seen while drawing, not all of them.
	function redraw(){
		context.clearRect(0,0, context.canvas.width, context.canvas.height);
		for (var i = 0; i < shapes.length; i++) {
			shapes[i].draw(context);
		};
		//console.log(shapes);
	}

	//Function provided by user Austin Brunkhorst on
	//http://stackoverflow.com/questions/17386707/how-to-check-if-a-canvas-is-blank
	function isCanvasBlank(canvas) {
    	var blank = document.createElement('canvas');
    	blank.width = canvas.width;
    	blank.height = canvas.height;

    	return canvas.toDataURL() == blank.toDataURL();
	}

	//Function that returns the shape which corresponds to the button that is pressed.
	function getShape(evt) {
		button = document.getElementsByClassName("btn-success")[0].getAttribute('id');
		var tempX = evt.x - boundingRect.left;
		var tempY = evt.y - boundingRect.top;
		if (button === "rectButton"){
		 	return new Rectangle("Rectangle", tempX, tempY, tempX, tempY, color, width);
		}else if(button === "circleButton"){
			return new Circle("Circle", tempX, tempY, tempX, tempY, color, width, 0);
		}else if(button === "lineButton"){
			return new Line("Line", tempX, tempY, tempX, tempY, color, width);
		}else if(button === "textButton"){
			return new Font("Text", tempX, tempY, tempX, tempY, color, fontsize + 'px ' + font, text);
		}else{
			return new Pen("Pen", tempX, tempY, tempX, tempY, color, width, [{x: tempX, y: tempY}]);
		}
	}
})

function openDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}   
	