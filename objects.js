// Loads a shape on the canvas
function shape(type, x, y, angle, width, height, fill="black") {
    // Allow for shape to be a color or image
    if(type == "image"){this.type=0}
    else if(type == "rect"){this.type=1}
    else if(type == "rectangle"){this.type=1}
    else{this.type=1}
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.width = width;
    this.height = height;
    this.fill = fill;

    console.debug(this.type, this.fill)

    this.update = function() {
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,this.angle)
        canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
        canvas.rotate(radians(this.pos[2]));
        if(this.type == 0) {
            canvas.drawImage(this.fill, (this.width*(scalar)*(camera.czoom/100)) / -2, (this.height*(scalar)*(camera.czoom/100)) / -2, this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));
        }
        else if(this.type == 1) {
            canvas.fillStyle = this.fill; 
            canvas.fillRect((this.width*(scalar)*(camera.czoom/100)) / -2, (this.height*(scalar)*(camera.czoom/100)) / -2, this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));
        }
        canvas.restore();
        upcount++
    }
}

// Loads a repeating texture on the canvas
function terrain(x, y, angle, width, height, image, scalex=100, scaley=100) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.width = width;
    this.height = height;
    this.image = image;
    if (scalex <= 100) {this.iwidth = (this.image.width * (scalex/100)) / scalar;} else {this.iwidth = this.image.width / scalar}
    if (scaley <= 100) {this.iheight = (this.image.height * (scaley/100)) / scalar;} else {this.iheight = this.image.height / scalar}
    console.debug(this.iwidth)
    this.radlength = Math.sqrt(Math.pow(this.iwidth/2, 2) + Math.pow(this.iheight/2, 2)) * scalar

    this.tilex = Math.ceil(this.width/this.iwidth)
    this.tiley = Math.ceil(this.height/this.iheight)

    this.update = function() {
        for(i = 0; i < this.tiley; i++) {
            for(f = 0; f < this.tilex; f++) {
                this.x2 = (this.x - (this.width/2 - this.iwidth/2) + (this.iwidth*f))
                this.y2 = (this.y - (this.height/2 - this.iheight/2) + (this.iheight*i))
                this.pos = camera.position(this.x2,this.y2,this.angle);
                if(((this.pos[0] - this.radlength) <= gameWindow.canvas.width/2) && ((this.pos[0] + this.radlength) >= gameWindow.canvas.width/-2) && ((this.pos[1] - this.radlength) <= gameWindow.canvas.height/2) && ((this.pos[1] + this.radlength) >= gameWindow.canvas.height/-2)) {
                    canvas = gameWindow.context;
                    canvas.save();
                    canvas.globalCompositeOperation='destination-over';
                    canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
                    canvas.rotate(radians(this.pos[2]));
                    if((this.x2 + this.iwidth/2) > (this.x + (this.width/2))){this.trimx = (((this.x + (this.width/2)) - (this.x2 + this.iwidth/2)))} else {this.trimx = 0}
                    if((this.y2 + this.iheight/2) > (this.y + (this.height/2))){this.trimy = ((this.y + (this.height/2)) - (this.y2 + this.iheight/2))} else {this.trimy = 0}
                    canvas.drawImage(this.image, 0, (0 - this.trimy)*scalar, (this.iwidth + this.trimx) * scalar, (this.iheight + this.trimy) * scalar, ((this.iwidth*(camera.czoom/100)) / -2)*scalar, ((this.iheight*(camera.czoom/100)) / -2 - this.trimy)*scalar, (this.iwidth*(camera.czoom/100)+this.trimx)*scalar, (this.iheight*(camera.czoom/100)+this.trimy)*scalar);
                    canvas.restore();
                } 
            }
        }
        upcount++
    }
}

// Loads a circle on the canvas (experimental)
function testcirc() {
    this.y = 0
    this.x = 0
    this.radius = 5.2
    this.angle = 0

    this.update = function() {
        canvas = gameWindow.context;
        canvas.beginPath();
        if(player.turnrad > 0) {
            this.x = player.turnrad
        } else {
            this.x = -player.turnrad
        }
        canvas.arc((gameWindow.canvas.width/2)+camera.position(player.turnrad,this.y,this.angle)[0], (gameWindow.canvas.height/2)-camera.position(player.turnrad,this.y,this.angle)[1], Math.abs(player.turnrad)*scalar, 0, 2*Math.PI);
        canvas.stroke();
        upcount++
    }
}

// Loads text into the player HUD
function displaytext(x, y, text, justify, size, font="Arial", color="white") {
    this.x = x;
    this.y = y;
    this.text = text;
    this.justify = justify;
    this.size = size;
    this.font = font;
    this.color = color;
    this.alpha = 100;

    this.update = function() {
        canvas = gameWindow.context;
        canvas.font = (`${this.size}px ${this.font}`);
        canvas.fillStyle = this.color;
        if (this.justify == "center") {
            this.jpos = canvas.measureText(this.text).width/2;
        } else if (this.justify == "right") {
            this.jpos = canvas.measureText(this.text).width;
        } else {
            this.jpos = 0;
        }
        canvas.globalAlpha = (this.alpha/100);
        canvas.fillText(this.text, this.x - this.jpos, this.y + this.size/3);
        canvas.globalAlpha = 1;
        upcount++
    }
}