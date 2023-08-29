// Loads a rectangle or rectangular image on the canvas
function rect(isimage, x, y, angle, width, height, fill, layer=2) {
    // Allow for shape to be a color or image
    this.start = function() {
        this.x = x;
        this.y = y;
        this.isimage = isimage
        this.layer = layer;
        this.angle = angle;
        this.width = width;
        this.height = height;
        this.opacity = 100;
        this.pointrec = [0,0]
        if (this.isimage) {
            this.fill = loadedtextures[fill];
        } else {
            this.fill = fill;
        }
    }

    this.update = function() {
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,this.angle)
        canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
        canvas.rotate(radians(this.pos[2]));
        this.opacity = 100;
        if(!pausemenu.paused) {
            if(this.layer > player.layer) {
                for (this.i = 0; this.i < player.distances.length; this.i++) {
                    this.pointx = camera.cx + (sin(((this.i*16) + camera.cangle) % 360) * (player.distances[this.i]/scalar))
                    this.pointy = camera.cy + (cos(((this.i*16) + camera.cangle) % 360) * (player.distances[this.i]/scalar))
                    if ((this.x - this.width/2 <= this.pointx && this.pointx <= this.x + this.width/2) && (this.y - this.height/2 <= this.pointy && this.pointy <= this.y + this.height/2))
                    {
                        if (this.layer == player.layer + 1) {player.reset()} else {this.opacity -= 1.5}
                    }
                }
            }
            if(this.layer == player.layer) {
                for (this.i = 0; this.i < player.wheelangles.length; this.i++) {
                    this.pointx = camera.cx + (sin(((player.wheelangles[this.i]) + camera.cangle) % 360) * (player.wheeldistance))
                    this.pointy = camera.cy + (cos(((player.wheelangles[this.i]) + camera.cangle) % 360) * (player.wheeldistance))
                    if ((this.x - this.width/2 <= this.pointx && this.pointx <= this.x + this.width/2) && (this.y - this.height/2 <= this.pointy && this.pointy <= this.y + this.height/2))
                    {
                        if((this.i == 0 || this.i == 3) && (player.speed > 0)) {player.speed = 0}
                        if((this.i == 1 || this.i == 2) && (player.speed < 0)) {player.speed = 0}
                    }
                }
            }
        }
        canvas.globalAlpha = (this.opacity/100)
        if(this.isimage) {
            canvas.drawImage(this.fill, (this.width*(scalar)*(camera.czoom/100)) / -2, (this.height*(scalar)*(camera.czoom/100)) / -2, this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));
        } else {
            canvas.fillStyle = this.fill; 
            canvas.fillRect((this.width*(scalar)*(camera.czoom/100)) / -2, (this.height*(scalar)*(camera.czoom/100)) / -2, this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));
        }
        canvas.restore();
        upcount++
    }
}

//Loads a circle or circular image on the canvas
function circle(isimage, x, y, angle, diameter, fill, layer=2) {
    this.start = function() {
        this.x = x;
        this.y = y;
        this.isimage = isimage
        this.layer = layer;
        this.diameter = diameter;
        this.angle = angle;
        this.opacity = 100;
        if (this.isimage) {
            this.fill = loadedtextures[fill];
        } else {
            this.fill = fill;
        }
    }

    this.update = function() {
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,this.angle)
        if(this.isimage) {
            canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
            canvas.rotate(radians(this.pos[2]));
        }
        this.opacity = 100;
        if(!pausemenu.paused) {
            if(this.id == 24) {console.debug(this.layer)}
            if(this.layer >= player.layer) {
                for (this.i = 0; this.i < player.distances.length; this.i++) {
                    this.pointx = camera.cx + (sin(((this.i*16) + camera.cangle + this.angle) % 360) * (player.distances[this.i]/scalar))
                    this.pointy = camera.cy + (cos(((this.i*16) + camera.cangle + this.angle) % 360) * (player.distances[this.i]/scalar))
                    if (((this.pointx - this.x)**2) + ((this.pointy - this.y)**2) <= (this.diameter/2)**2)
                    {   
                        if (this.layer == player.layer) {
                            if(this.i < player.distances.length/2) {if(player.speed > 0) {player.speed = 0}}
                            else {if(player.speed < 0) {player.speed = 0}}
                        }
                        else if (this.layer == player.layer + 1) {player.reset()} 
                        else {this.opacity -= 3}
                        
                    }
                }
            }
        }
        canvas.globalAlpha = (this.opacity/100)
        if(this.isimage) {
            canvas.drawImage(this.fill, (this.diameter*(scalar)*(camera.czoom/100)) / -2, (this.diameter*(scalar)*(camera.czoom/100)) / -2, this.diameter*(scalar)*(camera.czoom/100), this.diameter*(scalar)*(camera.czoom/100));
            canvas.restore();
        } else {
            canvas.fillStyle = this.fill; 
            canvas.beginPath();
            canvas.arc(gameWindow.canvas.width/2+this.pos[0],gameWindow.canvas.height/2-this.pos[1],(this.diameter/2)*scalar*(camera.czoom/100),0,2*Math.PI);
            canvas.fill();
        }
        upcount++
    }
}

// Loads a repeating texture on the canvas
function terrain(x, y, angle, width, height, image, layer=1, scalex=100, scaley=100) {
    this.start = function() {
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.angle = angle;
        this.width = width;
        this.height = height;
        this.image = loadedtextures[image];
        if (scalex <= 100) {this.iwidth = (this.image.width * (scalex/100)) / scalar;} else {this.iwidth = this.image.width / scalar}
        if (scaley <= 100) {this.iheight = (this.image.height * (scaley/100)) / scalar;} else {this.iheight = this.image.height / scalar}
        this.radlength = Math.sqrt(Math.pow(this.iwidth/2, 2) + Math.pow(this.iheight/2, 2))
        this.tilex = Math.ceil(this.width/this.iwidth)
        this.tiley = Math.ceil(this.height/this.iheight)
        canvas = gameWindow.context;
    }

    this.update = function() {
        if (this.tilex > 1000000 || this.tiley > 1000000) {
            this.start()
        // } else if (this.x - this.width/2 < camera.cx - gameWindow.canvas.width/scalar || this.x + this.width/2 > camera.cx + gameWindow.canvas.width/scalar || this.y - this.height/2 < camera.cy - gameWindow.canvas.height/scalar || this.y + this.height/2 > camera.cy + gameWindow.canvas.height/scalar) {
        //     console.debug(`New rendering engine is being used for ${image}`)
        //     for (this.i = 0; this.i*this.iheight < gameWindow.canvas.height/scalar; this.i++) {
        //         for (this.f = 0; this.f*this.iwidth < gameWindow.canvas.width/scalar; this.f++) {
        //             this.x2 = ((gameWindow.canvas.width/-2)/scalar) + (this.f * this.iwidth)
        //             this.y2 = ((gameWindow.canvas.height/-2)/scalar) + (this.i * this.iheight)
        //             if(this.f == 1 && this.i == 1) {
        //                 console.debug(this.x2, this.y2)
        //             }
        //             if(this.x2 > this.x-(this.width/2) || this.x2 < this.x+(this.width/2)) {
        //                 if(this.y2 > this.y-(this.height/2) || this.y2 < this.y+(this.height/2)) {
        //                     this.pos = camera.position(this.x2,this.y2,this.angle);
        //                     canvas.save();
        //                     //canvas.imageSmoothingEnabled = false;
        //                     if (this.layer == 1) {
        //                         canvas.globalCompositeOperation='destination-over'
        //                     }
        //                     canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
        //                     canvas.rotate(radians(this.pos[2]));
        //                     if((this.x2 + this.iwidth/2) > (this.x + (this.width/2))){this.trimx = (((this.x + (this.width/2)) - (this.x2 + this.iwidth/2)))} else {this.trimx = 0}
        //                     if((this.y2 + this.iheight/2) > (this.y + (this.height/2))){this.trimy = ((this.y + (this.height/2)) - (this.y2 + this.iheight/2))} else {this.trimy = 0}
        //                     canvas.drawImage(this.image, 0, (0 - this.trimy)*scalar, (this.iwidth + this.trimx) * scalar, (this.iheight + this.trimy) * scalar, ((this.iwidth*(camera.czoom/100)) / -2)*scalar, ((this.iheight*(camera.czoom/100)) / -2 - this.trimy)*scalar, (this.iwidth*(camera.czoom/100)+this.trimx)*scalar, (this.iheight*(camera.czoom/100)+this.trimy)*scalar);
        //                     canvas.restore();
        //                 }
        //             }
                    
        //         }
        //     }
        } else {
            for(this.i = 0; this.i < this.tiley; this.i++) {
                for(this.f = 0; this.f < this.tilex; this.f++) {
                    this.x2 = (this.x - (this.width/2 - this.iwidth/2) + (this.iwidth*this.f)) * 0.998
                    this.y2 = (this.y - (this.height/2 - this.iheight/2) + (this.iheight*this.i)) * 0.998
                    if((this.x2 - this.radlength < camera.cx + (gameWindow.canvas.width/(scalar*(camera.czoom/100)))) && (this.x2 + this.radlength > camera.cx - (gameWindow.canvas.width/(scalar*(camera.czoom/100))))) {
                        if((this.y2 - this.radlength < camera.cy + (gameWindow.canvas.height/(scalar*(camera.czoom/100)))) && (this.y2 + this.radlength > camera.cy - (gameWindow.canvas.height/(scalar*(camera.czoom/100))))) {
                            this.pos = camera.position(this.x2,this.y2,this.angle);
                            canvas.save();
                            //canvas.imageSmoothingEnabled = false;
                            if (this.layer == 1) {
                                canvas.globalCompositeOperation='destination-over'
                            }
                            canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
                            canvas.rotate(radians(this.pos[2]));
                            if((this.x2 + this.iwidth/2) > (this.x + (this.width/2))){this.trimx = (((this.x + (this.width/2)) - (this.x2 + this.iwidth/2)))} else {this.trimx = 0}
                            if((this.y2 + this.iheight/2) > (this.y + (this.height/2))){this.trimy = ((this.y + (this.height/2)) - (this.y2 + this.iheight/2))} else {this.trimy = 0}
                            canvas.drawImage(
                                this.image, 
                                0, (0 - this.trimy)*scalar, (this.iwidth + this.trimx) * scalar, (this.iheight + this.trimy) * scalar, 
                                ((this.iwidth) / -2)* scalar * (camera.czoom/100), ((this.iheight) / -2 - this.trimy) * scalar *(camera.czoom/100), (this.iwidth+this.trimx)*scalar*(camera.czoom/100), (this.iheight+this.trimy)*scalar*(camera.czoom/100)
                            );
                            canvas.restore();
                        }
                    } 
                }
            }
        }
        upcount++
    }
}

// Parking space object
function parkingspot(iscircle, x, y, angle, width, height, idealangle=0) {
    this.start = function() {
        this.circle = iscircle
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.idealangle = (angle + idealangle) % 360;
        this.reverse = true
        this.width = width;
        this.height = height;
        this.fill = "green";
        this.layer = 2;
        this.toggle = 0;
        this.opacity = 50;
        this.yoffset = -100

    }

    this.update = function() {
        if (this.toggle == 0) { this.opacity -= (30/fps);
            if(this.opacity <= 20) { this.toggle = 1}
        } else { this.opacity += (30/fps);
            if(this.opacity >= 50) {this.toggle = 0}
        }
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,this.angle);
        canvas.globalAlpha = (this.opacity/100)
        canvas.fillStyle = this.fill;
        if (this.circle) {
            canvas.beginPath();
            canvas.arc(gameWindow.canvas.width/2+this.pos[0],gameWindow.canvas.height/2-this.pos[1],(this.width/2)*scalar*(camera.czoom/100),0,2*Math.PI);
            canvas.fill();
        } else {
            canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
            canvas.rotate(radians(this.pos[2]));
            canvas.fillRect((this.width*(scalar)*(camera.czoom/100)) / -2, (this.height*(scalar)*(camera.czoom/100)) / -2, this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));
        }
        canvas.globalAlpha = 1
        canvas.restore();

        if(!pausemenu.paused) {
            if(Math.sqrt(((camera.cx - this.x)**2) + ((camera.cy - this.y)**2)) <= 2)  {
                parked = true
                finishscreen.score = Math.round(Math.abs(-(Math.abs(this.idealangle - camera.cangle)%180)/(36/2)+5))
                if(this.reverse == false) {
                    if(Math.abs(this.idealangle - camera.cangle) > 90) {
                        finishscreen.score = 0
                    }
                }
            } else {
                parked = false
            }
        }

        upcount++
    }
}

function car(type, logic) {
    this.start = function() {
        this.type = type
        this.logic = logic
    }

    this.update = function() {
        upcount++
    }
}