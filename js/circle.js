var Circle = Shape.extend({
    constructor: function(name, x, y, endX, endY, color, width, radius, check){
        this.base(name, x, y, color, width);
        this.endX = endX;
        this.endY = endY;
        this.radius = radius;
        this.check = check;
    },
    draw: function(context, e){
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        
        if(this.check){
            context.fillStyle = this.color;
            context.fill();
        }

        context.stroke();
        context.closePath();
    },
    drawing: function(canvas, e){
        var rect = canvas.getBoundingClientRect();
        this.endX = e.x - rect.left;
        this.endY = e.y - rect.top;
        this.radius = Math.sqrt(Math.abs(((this.endX - this.x)*(this.endX - this.x))) + Math.abs(((this.endY - this.y)*(this.endY - this.y))));
    },
    //Checks if the point (x, y) is within the boundaries of the circle
    contains: function(c, x, y){
        var rect = c.getBoundingClientRect();
        x = x - rect.left;
        y = y - rect.top;
        var distance = Math.sqrt(((this.x - x)*(this.x - x)) + ((this.y - y)*(this.y - y)));

        if(distance <= this.radius){
            return true;
        }
        else{
            return false;
        }
    },
    move: function(deltaX, deltaY){
        this.x = this.x - deltaX;
        this.y = this.y - deltaY;
    }
});