// Loads a rectangle or rectangular image on the canvas
function rect(isimage, x, y, angle, width, height, fill, layer=2) {
    // Allow for shape to be a color or image
    this.start = function() {
        this.type = 1;
        this.x = x;
        this.y = y;
        this.isimage = isimage
        this.layer = layer;
        this.angle = angle + 0.00001;
        this.width = width;
        this.height = height;
        this.opacity = 100;
        this.radius = ((Math.sqrt((this.width)**2 + (this.height)**2))/2)
        this.poscorner = [(this.x + (cos(this.angle+invtan(this.height/this.width))*this.radius)),(this.y + (sin(this.angle+invtan(this.height/this.width))*this.radius))]
        this.negcorner = [(this.x - (cos(this.angle+invtan(this.height/this.width))*this.radius)),(this.y - (sin(this.angle+invtan(this.height/this.width))*this.radius))]
        if (this.isimage) {
            this.fill = loadedtextures[fill];
        } else {
            this.fill = fill;
        }
    }

    this.interface = function(opt1,opt2,opt3) {
        if(opt1) {
            this.angle = opt1
            this.width = opt2
            this.height = opt3
        }
        return {
            get1: this.angle, min1: 0, max1: 360, step1: 15, name1: "Angle",
            get2: this.width, min2: 0.1, max2: 50, step2: 0.5, name2: "Width",
            get3: this.height, min3: 0.1, max3: 50, step3: 0.5, name3: "Height",
        }
    }

    this.printSelf = function() {
        return `rect(isimage=${isimage}, x=${this.x}, y=${this.y}, angle=${this.angle}, width=${this.width}, height=${this.height}, fill='${fill}', layer=${this.layer})`
    }

    this.update = function() {
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,360-this.angle)
        canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
        canvas.rotate(radians(this.pos[2]));
        this.opacity = 100;
        if(!player.paused && (Math.sqrt((this.x-camera.cx)**2 + (this.y-camera.cy)**2) <= this.radius + (player.height/2))) {
            if(this.layer > player.layer) {
                for (let i = 0; i < player.distances.length; i++) {
                    this.pointx = camera.cx + (sin(((i*16) + camera.cangle) % 360) * (player.distances[i]))
                    this.pointy = camera.cy + (cos(((i*16) + camera.cangle) % 360) * (player.distances[i]))
                    if (pointInRectangle(this.pointx, this.pointy, this.x, this.y, this.width, this.height, this.angle)) {
                        if (this.layer == player.layer + 1) {
                            player.reset()
                        } else {
                            this.opacity -= 1.5
                        }
                    }
                }
            }
            if(this.layer == player.layer) {
                for (let i = 0; i < player.wheelangles.length; i++) {
                    this.pointx = camera.cx + (sin(((player.wheelangles[i]) + camera.cangle) % 360) * (player.wheeldistance))
                    this.pointy = camera.cy + (cos(((player.wheelangles[i]) + camera.cangle) % 360) * (player.wheeldistance))
                    if (pointInRectangle(this.pointx, this.pointy, this.x, this.y, this.width, this.height, this.angle)) {
                        if((i == 0 || i == 3) && (player.speed > 0)) {player.speed = 0}
                        if((i == 1 || i == 2) && (player.speed < 0)) {player.speed = 0}
                    }
                }
            }
        }
        if(this.opacity != 100) {
            canvas.globalAlpha = (this.opacity/100)
        }

        if(gameEditor.window == 1) {
            if(pointInRectangle(gameEditor.mousePos[0], gameEditor.mousePos[1], this.x, this.y, this.width, this.height, this.angle) && Math.abs(clickhandler.x - 50) < 50 - gameEditor.borderX && Math.abs(clickhandler.y - 50) < 50 - gameEditor.borderY) {
                canvas.filter = "brightness(50%)"
                if(clickhandler.click && gameEditor.asel == -1) {
                    gameEditor.sel = this.id
                    gameEditor.asel = this.id
                }
            }
        }

        if(this.isimage) {
            canvas.drawImage(this.fill, Round((this.width*(scalar)*(camera.czoom/100)) / -2), Round((this.height*(scalar)*(camera.czoom/100)) / -2), Round(this.width*(scalar)*(camera.czoom/100)), Round(this.height*(scalar)*(camera.czoom/100)));
        } else {
            canvas.fillStyle = this.fill; 
            canvas.fillRect(Round((this.width*(scalar)*(camera.czoom/100)) / -2), Round((this.height*(scalar)*(camera.czoom/100)) / -2), Round(this.width*(scalar)*(camera.czoom/100)), Round(this.height*(scalar)*(camera.czoom/100)));
        }
        canvas.restore();

    }

    this.testpoint = function(tstx, tsty) {
        if(pointInRectangle(tstx, tsty, this.x, this.y, this.width, this.height, this.angle)){return true}
        return false
    }
    
}

//Loads a circle or circular image on the canvas
function circle(isimage, x, y, angle, diameter, fill, arc=360, layer=2) {
    this.start = function() {
        this.type = 2;
        this.x = x;
        this.y = y;
        this.isimage = isimage
        this.layer = layer;
        this.diameter = diameter;
        this.angle = angle;
        this.opacity = 100;
        this.arc = arc;
        if (this.isimage) {
            this.fill = loadedtextures[fill];
        } else {
            this.fill = fill;
        }
    }

    this.printSelf = function() {
        return `circle(isimage=${this.isimage}, x=${this.x}, y=${this.y}, angle=${this.angle}, diameter=${this.diameter}, fill='${fill}', arc=${this.arc}, layer=${this.layer})`
    }

    this.interface = function(opt1,opt2,opt3) {
        if(opt1) {
            this.angle = opt1
            this.diameter = opt2
            this.arc = opt3
        }
        return {
            get1: this.angle, min1: 0, max1: 360, step1: 15, name1: "Angle",
            get2: this.diameter, min2: 0.1, max2: 50, step2: 0.5, name2: "Diameter",
            get3: this.arc, min3: 15, max3: 360, step3: 15, name3: "Arc",
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
        if(!player.paused && (Math.sqrt((this.x-camera.cx)**2 + (this.y-camera.cy)**2) <= this.diameter/2 + (player.height/2))) {
            if(this.layer > player.layer) {
                for (let i = 0; i < player.distances.length; i++) {
                    this.pointx = camera.cx + (sin(((i*16) + camera.cangle) % 360) * (player.distances[i]))
                    this.pointy = camera.cy + (cos(((i*16) + camera.cangle) % 360) * (player.distances[i]))
                    if (Math.sqrt(((this.pointx - this.x)**2) + ((this.pointy - this.y)**2)) <= (this.diameter/2)) {
                        if (this.layer == player.layer + 1) {player.reset()} else {this.opacity -= 1.5}
                    }
                }
            } else if (this.layer == player.layer) {
                for (let i = 0; i < player.wheelangles.length; i++) {
                    this.pointx = camera.cx + (sin(((player.wheelangles[i]) + camera.cangle) % 360) * (player.wheeldistance))
                    this.pointy = camera.cy + (cos(((player.wheelangles[i]) + camera.cangle) % 360) * (player.wheeldistance))
                    if (Math.sqrt(((this.x - this.pointx)**2) + ((this.y - this.pointy)**2)) <= (this.diameter/2))
                    {   
                        if((i == 0 || i == 3) && (player.speed > 0)) {player.speed = 0}
                        if((i == 1 || i == 2) && (player.speed < 0)) {player.speed = 0}
                    }
                }
            }
        }
        if(this.opacity != 100) {
            canvas.globalAlpha = (this.opacity/100)
        }

        if(gameEditor.window == 1) {
            if(pointInRectangle(gameEditor.mousePos[0], gameEditor.mousePos[1], this.x, this.y, this.diameter, this.diameter, this.angle) && Math.abs(clickhandler.x - 50) < 50 - gameEditor.borderX && Math.abs(clickhandler.y - 50) < 50 - gameEditor.borderY) {
                canvas.filter = "brightness(50%)"
                if(clickhandler.click && gameEditor.asel == -1) {
                    gameEditor.sel = this.id
                    gameEditor.asel = this.id
                }
            }
        }

        if(this.isimage) {
            canvas.drawImage(this.fill, Round((this.diameter*(scalar)*(camera.czoom/100)) / -2), Round((this.diameter*(scalar)*(camera.czoom/100)) / -2), Round(this.diameter*(scalar)*(camera.czoom/100)), Round(this.diameter*(scalar)*(camera.czoom/100)));
        } else {
            canvas.fillStyle = this.fill; 
            canvas.beginPath();
            canvas.arc(Round(gameWindow.canvas.width/2+this.pos[0]), Round(gameWindow.canvas.height/2-this.pos[1]), Round((this.diameter/2)*scalar*(camera.czoom/100)), radians(this.pos[2]), radians(this.arc+this.pos[2]));
            canvas.closePath();
            canvas.fill();
        }
        canvas.restore();

    }

    this.testpoint = function(tstx, tsty) {
        if (Math.sqrt(((tstx - this.x)**2) + ((tsty - this.y)**2)) <= (this.diameter/2)) {return true} else {return false}
    }
}

// Loads a repeating texture on the canvas
function terrain(x, y, angle, width, height, image, layer=1, scalex=100, scaley=100) {
    this.start = function() {
        this.type = 3;
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

    this.printSelf = function() {
        return `terrain(x=${this.x}, y=${this.y}, angle=${this.angle}, width=${this.width}, height=${this.height}, image='${image}', layer=${this.layer}, scalex=${scalex}, scaley=${scaley})`
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
            for(let i = 0; i < this.tiley; i++) {
                for(let f = 0; f < this.tilex; f++) {
                    this.x2 = (this.x - (this.width/2 - this.iwidth/2) + (this.iwidth*f)) * 0.998
                    this.y2 = (this.y - (this.height/2 - this.iheight/2) + (this.iheight*i)) * 0.998
                    if((this.x2 - this.radlength < camera.cx + (gameWindow.canvas.width/(scalar*(camera.czoom/100)))) && (this.x2 + this.radlength > camera.cx - (gameWindow.canvas.width/(scalar*(camera.czoom/100))))) {
                        if((this.y2 - this.radlength < camera.cy + (gameWindow.canvas.height/(scalar*(camera.czoom/100)))) && (this.y2 + this.radlength > camera.cy - (gameWindow.canvas.height/(scalar*(camera.czoom/100))))) {
                            this.pos = camera.position(this.x2,this.y2,this.angle);
                            canvas.save();
                            //canvas.imageSmoothingEnabled = false;
                            // if (this.layer == 1) {
                            //     canvas.globalCompositeOperation='destination-over'
                            // }
                            canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
                            canvas.rotate(radians(this.pos[2]));
                            if((this.x2 + this.iwidth/2) > (this.x + (this.width/2))){this.trimx = (((this.x + (this.width/2)) - (this.x2 + this.iwidth/2)))} else {this.trimx = 0}
                            if((this.y2 + this.iheight/2) > (this.y + (this.height/2))){this.trimy = ((this.y + (this.height/2)) - (this.y2 + this.iheight/2))} else {this.trimy = 0}
                            canvas.drawImage(
                                this.image, 
                                0, Round((0 - this.trimy)*scalar), Round((this.iwidth + this.trimx) * scalar), Round((this.iheight + this.trimy) * scalar), Round(
                                ((this.iwidth) / -2)* scalar * (camera.czoom/100)), Round(((this.iheight) / -2 - this.trimy) * scalar *(camera.czoom/100)), Round((this.iwidth+this.trimx)*scalar*(camera.czoom/100)), Round((this.iheight+this.trimy)*scalar*(camera.czoom/100))
                            );
                            canvas.restore();
                        }
                    } 
                }
            }
        }

    }
}

// Parking space object
function parkingspot(iscircle, x, y, angle, width, height, idealangle=0) {
    this.start = function() {
        this.type = 4;
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
        this.sensdistance = 5

        this.AccOfAtt = 0
        this.prevxy = [0,0]
        this.acclist = []
    }

    this.printSelf = function() {
        return `parkingspot(iscircle=${this.circle}, x=${this.x}, y=${this.y}, angle=${this.angle}, width=${this.width}, height=${this.height}, idealangle=${this.idealangle})`
    }

    this.interface = function(opt1,opt2,opt3) {
        if(opt1) {
            this.angle = opt1
            this.width = opt2
            this.height = opt3
        }
        return {
            get1: this.angle, min1: 0, max1: 360, step1: 15, name1: "Angle",
            get2: this.width, min2: 0.1, max2: 50, step2: 0.5, name2: "Width",
            get3: this.height, min3: 0.1, max3: 50, step3: 0.5, name3: "Height",
        }
    }

    this.update = function() {
        if (this.toggle == 0) { this.opacity -= (30/fps);
            if(this.opacity <= 20) { this.toggle = 1}
        } else { this.opacity += (30/fps);
            if(this.opacity >= 50) {this.toggle = 0}
        }
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,-this.angle);
        canvas.globalAlpha = (this.opacity/100)
        canvas.fillStyle = this.fill;

        if(gameEditor.window == 1) {
            if(pointInRectangle(gameEditor.mousePos[0], gameEditor.mousePos[1], this.x, this.y, this.width, this.height, this.angle) && Math.abs(clickhandler.x - 50) < 50 - gameEditor.borderX && Math.abs(clickhandler.y - 50) < 50 - gameEditor.borderY) {
                canvas.filter = "brightness(50%)"
                if(clickhandler.click && gameEditor.asel == -1) {
                    gameEditor.sel = this.id
                    gameEditor.asel = this.id
                }
            }
        }

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

        if(!player.paused) {
            this.distance = Math.sqrt(((camera.cx - this.x)**2) + ((camera.cy - this.y)**2))

            if(this.distance <= this.sensdistance) {
                this.cirx = camera.cx + (player.turnrad*cos(camera.cangle))
                this.ciry = camera.cy - (player.turnrad*sin(camera.cangle))
                this.calc1 = [this.x - this.cirx, this.y - this.ciry]
                this.calc2 = [this.cirx + (this.calc1[0]/Math.sqrt((this.calc1[0]**2) + (this.calc1[1]**2))) * Math.abs(player.turnrad), this.ciry + (this.calc1[1]/Math.sqrt((this.calc1[0]**2) + (this.calc1[1]**2))) * Math.abs(player.turnrad)]
                this.AccOfAtt = 1 - ((Math.sqrt((this.x - this.calc2[0])**2 + (this.y - this.calc2[1])**2))/this.sensdistance)
                if((Round(camera.cx,2) != this.prevxy[0]) || (Round(camera.cy,2) != this.prevxy[1])) {
                    this.prevxy = [Round(camera.cx,2), Round(camera.cy,2)]
                    if(this.AccOfAtt >= 0.6) {this.acclist.push((this.AccOfAtt-0.6)*2.5)
                    } else {this.acclist.push(0)}
                }
            } else if ((Math.sqrt(((camera.cx - this.x)**2) + ((camera.cy - this.y)**2)) >= this.sensdistance + 5) || ([player.cx, player.cy, player.cangle] == player_position)) {
                this.acclist = []
            }

            if((this.distance <= 2) && (player.speed <= 0.5))  {
                parked = true
                finishscreen.parkedcount = 5
                finishscreen.score_accuracy = average(this.acclist)
                this.direction = Math.abs(-(Math.abs((-this.idealangle) - camera.cangle)%180)+90)/90

                if(this.direction >= 0.6) {finishscreen.score_direction = (this.direction-0.6)*2.5} 
                else {finishscreen.score_direction = 0}

                this.xdistance = 1-(Math.abs(cos(this.idealangle+invtan((camera.cy-this.y)/(camera.cx-this.x)))*this.distance)/2)
                // if((this.xdistance >= ((this.width/2)-((player.width/2)*0.9))) && (this.xdistance <= (this.width/2))) {finishscreen.score_distance = (1-((this.xdistance-((this.width/2)-((player.width/2)*0.9)))/((player.width/2)*0.9)))*finishscreen.score_direction}
                // else if (this.xdistance <= ((this.width/2)-((player.width/2)*0.9))) {finishscreen.score_distance = 1*finishscreen.score_direction}
                // else {finishscreen.score_distance = 0}
                if(this.xdistance >= 0.6) {finishscreen.score_distance = ((this.xdistance-0.6)*2.5)*this.direction}
                else {finishscreen.score_distance = 0}
                

                if(this.reverse == false) {
                    if(Math.abs(this.idealangle - camera.cangle) > 90) {
                        finishscreen.score_direction = 0
                    }
                }
            }

            
        }


    }
}

// Parking space object
function infospot(x, y, size, menu) {
    this.start = function() {
        this.type = 5;
        this.x = x;
        this.y = y;
        this.menu = menu;
        this.width = size;
        this.fill = "blue";
        this.layer = 2;
        this.toggle = 0;
        this.opacity = 50;
    }

    this.printSelf = function() {
        return `infospot(x=${this.x}, y=${this.y}, size=${this.width}, menu=${this.menu})`
    }

    this.interface = function(opt1,opt2,opt3) {
        if(opt1) {
            this.width = opt1
        }
        return {
            get1: this.width, min1: 0.1, max1: 50, step1: 0.5, name1: "Diameter",
            get2: 0, min2: 0.1, max2: 50, step2: 0.5, name2: undefined,
            get3: 0, min3: 0.1, max3: 50, step3: 0.5, name3: undefined,
        }
    }

    this.update = function() {
        if (this.toggle == 0) { this.opacity -= (30/fps);
            if(this.opacity <= 20) { this.toggle = 1}
        } else { this.opacity += (30/fps);
            if(this.opacity >= 50) {this.toggle = 0}
        }
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,-this.angle);

        if(gameEditor.window == 1) {
            if(pointInRectangle(gameEditor.mousePos[0], gameEditor.mousePos[1], this.x, this.y, this.width, this.width, 0) && Math.abs(clickhandler.x - 50) < 50 - gameEditor.borderX && Math.abs(clickhandler.y - 50) < 50 - gameEditor.borderY) {
                canvas.filter = "brightness(50%)"
                if(clickhandler.click && gameEditor.asel == -1) {
                    gameEditor.sel = this.id
                    gameEditor.asel = this.id
                }
            }
        }

        canvas.globalAlpha = (this.opacity/100)
        canvas.fillStyle = this.fill;
        canvas.beginPath();
        canvas.arc(gameWindow.canvas.width/2+this.pos[0],gameWindow.canvas.height/2-this.pos[1],(this.width/2)*scalar*(camera.czoom/100),0,2*Math.PI);
        canvas.fill();
        canvas.globalAlpha = 1
        canvas.restore();

        if(!player.paused) {
            let distance = Math.sqrt(((camera.cx - this.x)**2) + ((camera.cy - this.y)**2))

            if((distance <= this.width/2))  { // && (player.speed <= 0.5)
                if(renderlist[this.menu] != 2) {
                    renderlist[this.menu] = 1
                    for(let i in infomenus[this.menu][0]) {
                        infomenus[this.menu][0][i].alpha = animate(infomenus[this.menu][0][i].alpha*100, true, true, 100, 5)/100
                    }
                    let hoverbox = infomenus[this.menu][0][0]
                    if(clickhandler.hovered(hoverbox.x-hoverbox.width/2, hoverbox.x+hoverbox.width/2, hoverbox.y-hoverbox.height/2, hoverbox.y+hoverbox.height/2)) {
                        hoverbox.width = animate(hoverbox.width, false, true, 9, 10, 4)
                        hoverbox.height = animate(hoverbox.height, false, true, 14, 10, 4)
                    } else {
                        hoverbox.width = animate(hoverbox.width, true, true, 10, 5, 2)
                        hoverbox.height = animate(hoverbox.height, true, true, 15, 5, 2)
                    }
                    if(i_key) {
                        toolTipToggle(0)
                    }
                }
            } else {
                if(infomenus[this.menu][0][0].alpha != 0) {
                    for(let i in infomenus[this.menu][0]) {
                        infomenus[this.menu][0][i].alpha = animate(infomenus[this.menu][0][i].alpha*100, false, true, 0, 5)/100
                    }
                } else {
                    renderlist[this.menu] = 0
                }
            }
        }


    }
}

function car(cartype, x, y, angle, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]) {
    this.start = function() {
        this.type = 6;
        this.type = cartype;
        this.fill = loadedcartextures[cartype][0];
        this.width = loadedcartextures[cartype][1];
        this.height = loadedcartextures[cartype][2];
        this.speed = speed
        this.turndeg = turn;
        this.layer = layer
        this.logicid = logicID - 1
        this.x = x 
        this.y = y
        this.angle = angle
        this.colmod = colisionmod;
        this.radius = ((Math.sqrt((this.width)**2 + (this.height)**2))/2)
        this.exclusiveactive = false
        this.colmods = [[-0.4,-0.2],[-0.4,-0.2],[-0.4,-0.2],[-0.4,-0.2],[-0.4,-0.2],[-0.4,-0.2]]
    }

    this.printSelf = function() {
        let x2
        let y2
        let a2
        if(this.logicid == -1) {
            x2 = this.x
            y2 = this.y
            a2 = this.angle
        } else {
            x2 = x
            y2 = y
            a2 = angle
        }
        return `car(cartype=${this.type}, x=${x2}, y=${y2}, angle=${a2}, speed=${this.speed}, turn=${turn}, logicID=${logicID}, layer=${this.layer}, colisionmod=[${this.colmod}])`
    }

    this.interface = function(opt1,opt2,opt3) {
        if(opt1) {
            this.angle = opt1
            this.type = opt2
        }
        return {
            get1: this.angle, min1: 0, max1: 360, step1: 15, name1: "Angle",
            get2: this.type, min2: 0, max2: cartextures.length, step2: 1, name2: "Model",
            get3: 0, min3: 0.1, max3: 50, step3: 0.5, name3: undefined,
        }
    }

    this.update = function() {
        this.turnrad = this.height/tan(this.turndeg)

        if(fps >= 8) {
            this.arcdeg = degrees(this.speed/this.turnrad)
            this.theta = 90 - ((180-this.arcdeg)/2)
            this.angularspeed = sin(this.arcdeg)/(sin((180-this.arcdeg)/2)/this.turnrad)
            this.angle += (this.speed/radians(this.turnrad))/fps
            this.angle = mod360(this.angle)
            if(this.turndeg != 0 && this.speed != 0) {
                this.x -= (this.angularspeed * (sin(this.angle)))/fps
                this.y += (this.angularspeed * (cos(this.angle)))/fps
            } else {
                this.x -= ((this.speed * (sin(this.angle))))/fps
                this.y += ((this.speed * (cos(this.angle))))/fps
            }
        }
        
        
        canvas = gameWindow.context;
        canvas.save();
        this.pos = camera.position(this.x,this.y,360-this.angle)
        canvas.translate(((gameWindow.canvas.width/2 + this.pos[0])), ((gameWindow.canvas.height/2 - this.pos[1])));
        canvas.rotate(radians(this.pos[2]));

        if(this.logicid >= 0) {
            this.exclusiveactive = false
            for(let i = 0; i < carscripts[this.logicid].length; i++) {
                if(this.exclusiveactive == false) {
                    //console.debug(this.angle)
                    this.logicActive = false

                    // // Object, Objects, or Value to activate logic result
                    this.pathintersect = carscripts[this.logicid][i][0]

                    // // Path to check for object along, or type of value to check (x,y,angle,velocity)
                    this.pathtype = carscripts[this.logicid][i][1]

                    // // Distance along path to check for object, or array of [Desired value, Range] when checking value
                    this.pathdist = carscripts[this.logicid][i][2]

                    // // What to do when the logic is triggered
                    this.result = carscripts[this.logicid][i][3]

                    if(this.pathtype == 1) {
                        this.pathpoint = [this.x - (this.pathdist * sin(this.angle)), this.y + (this.pathdist * cos(this.angle))]
                    } else {
                        this.pathpoint = [this.x - (this.turnrad * cos(degrees(this.pathdist/this.turnrad))), this.y + (this.turnrad * sin(degrees(this.pathdist/this.turnrad)))]
                    }
                    
                    if(this.pathintersect == 1) {
                        this.layersel = 4
                    } else if (this.pathintersect == 2) { 
                        this.layersel = 3
                    } else if (this.pathintersect == 3) { 
                        this.layersel = 2
                    } else if (this.pathintersect == 4) { 
                        this.layersel = 5
                    }

                    if(this.pathintersect == 0 && !this.logicactive) {
                        if(this.pathtype == 1 && this.x >= this.pathdist[0] - this.pathdist[1] && this.x <= this.pathdist[0] + this.pathdist[1]) {
                            this.logicActive = true
                            this.x = this.pathdist[0]
                        } else if (this.pathtype == 2 && this.y >= this.pathdist[0] - this.pathdist[1] && this.y <= this.pathdist[0] + this.pathdist[1]) {
                            this.logicActive = true
                            this.y = this.pathdist[0]
                        } else if (this.pathtype == 3 && (mod360(this.angle)) >= this.pathdist[0] - this.pathdist[1] && (mod360(this.angle)) <= this.pathdist[0] + this.pathdist[1]) {
                            this.logicActive = true
                            this.angle = this.pathdist[0]
                        } else if (this.pathtype == 4 && this.speed >= this.pathdist[0] - this.pathdist[1] && this.speed <= this.pathdist[0] + this.pathdist[1]) {
                            this.logicActive = true
                            this.speed = this.pathdist[0]
                        }
                    }

                    if (this.pathintersect >= 1 && this.pathintersect <= 5) {
                        for (let j = 0; j < maps[map-1].length; j++) {
                            if(maps[map-1][j].type == 1 || maps[map-1][j].type == 2) {
                                if(maps[map-1][j].layer == this.layersel) {
                                    if(maps[map-1][j].testpoint(this.pathpoint[0], this.pathpoint[1])) {
                                        this.logicActive = true
                                        this.logicactive = true
                                    }
                                }
                                
                            }
                        }
                    }

                    if (this.pathintersect == 6) {
                        if(pointInRectangle(this.pathpoint[0], this.pathpoint[1], camera.cx, camera.cy, player.width, player.height, camera.cangle)) {
                            this.logicActive = true
                            this.logicactive = true
                        }
                    }

                    if(this.logicActive) {
                        this.exclusiveactive = carscripts[this.logicid][i][4]
                        this.x += this.result[0]
                        this.y += this.result[1]
                        if (this.result[4] == true) {
                            this.turndeg = this.result[2]
                            //console.debug(this.turndeg, this.angle, this.angle%360)
                        } else if (this.result[4] == false) {
                            this.angle += this.result[2]
                        } else {
                            this.angle = this.result[2]
                        }
                        if((this.result[5] == true && this.speed >= 0) || (this.result[5] == false)) {
                            this.speed += this.result[3]
                        } else {
                            this.speed -= this.result[3]
                        }
                    } else {
                        this.logicactive = false
                    }
                }
            }
        }

        if(!player.paused && (Math.sqrt((this.x-camera.cx)**2 + (this.y-camera.cy)**2) <= this.radius + (player.height/2))) {
            for (let i = 0; i < player.distances.length; i++) {
                this.pointx = camera.cx + (sin(((i*16) + camera.cangle) % 360) * (player.distances[i]))
                this.pointy = camera.cy + (cos(((i*16) + camera.cangle) % 360) * (player.distances[i]))

                if(pointInRectangle(this.pointx, this.pointy, this.x, this.y, this.width + this.colmods[this.type][0], this.height + this.colmods[this.type][1], this.angle)) {player.reset()}
            }
        }

        if(gameEditor.window == 1) {
            if(pointInRectangle(gameEditor.mousePos[0], gameEditor.mousePos[1], this.x, this.y, this.width, this.height, this.angle) && Math.abs(clickhandler.x - 50) < 50 - gameEditor.borderX && Math.abs(clickhandler.y - 50) < 50 - gameEditor.borderY) {
                canvas.filter = "brightness(50%)"
                if(clickhandler.click && gameEditor.asel == -1) {
                    gameEditor.sel = this.id
                    gameEditor.asel = this.id
                }
            }
        }

        canvas.drawImage(this.fill, (this.width*(scalar)*(camera.czoom/100)) / -2, (this.height*(scalar)*(camera.czoom/100)) / -2, this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));
        canvas.restore();

    }
}

this.testpoint = function(tstx, tsty) {
    if(pointInRectangle(tstx, tsty, this.x, this.y, this.width, this.height, this.angle)){return true}
    return false
}

function pointInRectangle(x, y, rx, ry, w, h, a) {
    // Translate point and rectangle to center at the origin
    x -= rx;
    y -= ry;

    // Rotate the point around the origin by -a
    const xRotated = x * cos(-a) - y * sin(-a);
    const yRotated = x * sin(-a) + y * cos(-a);

    // Check if the rotated point is inside the rotated rectangle
    return (
        xRotated >= -w/2 && xRotated <= w/2 &&
        yRotated >= -h/2 && yRotated <= h/2
    );
}