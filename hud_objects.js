// The pause menu (press esc to activate)
var pausemenu = {
    start : function() {
        this.paused = false;
        this.menu = 0
        this.blur = 0;
        this.maxblur = 80;
        this.initblurstep = 2;
        this.selheight = -100;
        this.pbcolor = "#1b2932"
        this.tempfps = maxfps
        this.active = 0
        this.blurstep = 2;

        this.pauseimage = new Image();
        this.pauseimage.src = "textures/pause.png";

        this.title = new displaytext(x=(gameWindow.canvas.width/2), y=((gameWindow.canvas.height/10)*1.5), text="Paused", justify="left", size=100, font="Arial", color="white")
        this.resume = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*4, text="Resume Game", "left", size=50, font="Arial", color="white")
        this.restart = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*5, text="Restart Game", "left", size=50, font="Arial", color="white")
        this.ability = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*7, text="Accessability", "left", size=50, font="Arial", color="white")
        this.settings = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*8, text="Settings", "left", size=50, font="Arial", color="white")

        this.settingstitle = new displaytext(x=(gameWindow.canvas.width/2), y=((gameWindow.canvas.height/20)*3), text="Settings", justify="center", size=100, font="Arial", color="white")
        this.Smaxfps = new displaytext(x=(gameWindow.canvas.width/4)*1, y=(gameWindow.canvas.height/20)*6, text="Set Max FPS", justify="center", size=40, font="Arial", color="white")
        this.Smaxfpsnumber = new displaytext(x=(gameWindow.canvas.width/4)*1, y=(gameWindow.canvas.height/20)*7, text=maxfps, justify="center", size=20, font="Arial", color="white")
        this.Smaxfpsslider = new slider(x=(gameWindow.canvas.width/4)*1, y=(gameWindow.canvas.height/20)*8, width=150, height=20, maxfps, 10, 300, "#49545b", "white", 5)
        this.Szoom = new displaytext(x=(gameWindow.canvas.width/4)*3, y=(gameWindow.canvas.height/20)*6, text="Set View Zoom", justify="center", size=40, font="Arial", color="white")
        this.Szoomnumber = new displaytext(x=(gameWindow.canvas.width/4)*3, y=(gameWindow.canvas.height/20)*7, text=`${camera.czoom}%`, justify="center", size=20, font="Arial", color="white")
        this.Szoomslider = new slider(x=(gameWindow.canvas.width/4)*3, y=(gameWindow.canvas.height/20)*8, width=150, height=20, zoom, 25, 200, "#49545b", "white", 5)
        this.Sdebugtext = new displaytext(x=((gameWindow.canvas.width/2)-((gameWindow.canvas.width/1.1)/2)) + gameWindow.canvas.width/1.11, y=((gameWindow.canvas.height/2)-((gameWindow.canvas.height/1.1)/2)) + gameWindow.canvas.height/1.12, text=`Debug: ${debug}`, justify="right", size=10, font="Arial", color="white")
        
        this.mainmenutext = [this.title, this.resume, this.restart, this.ability, this.settings]
        this.settingsmenutext = [this.settingstitle, this.Smaxfps, this.Smaxfpsnumber, this.Smaxfpsslider, this.Szoom, this.Szoomnumber, this.Szoomslider, this.Sdebugtext]
        //updatelist = updatelist.concat(this.menutext)
    },

    toggle : function() {
        if (this.blur == 0) {
            pausemenu.menu = 1;
            this.paused = true;
        }
        if (this.blur == this.maxblur) {
            this.paused = false;
        }
    },
//((-500) + this.blur*8)
    mainmenu : function() {
        if(pausemenu.menu == 1) {
            canvas = gameWindow.context;
            canvas.setTransform(1, 0, 0, 1, 0, 0);
            canvas.translate(-425 + ((gameWindow.canvas.width/3.4) * (this.blur/this.maxblur)), ((gameWindow.canvas.height/2)));
            canvas.rotate(radians(5));
            canvas.fillStyle = "#1b2932"; 
            canvas.fillRect( 800/-2, (gameWindow.canvas.height*1.5)/-2, 800, (gameWindow.canvas.height*1.5));        
            canvas.restore();

            canvas = gameWindow.context;
            canvas.setTransform(1, 0, 0, 1, 0, 0);
            canvas.translate(-425 + ((gameWindow.canvas.width/3.7) * (this.blur/this.maxblur)), (this.selheight));
            canvas.fillStyle = "#49545b"; 
            canvas.globalAlpha = 0.5;
            canvas.fillRect( 800/-2, (gameWindow.canvas.height/10)/-2, 800, (gameWindow.canvas.height/10));
            canvas.globalAlpha = 1.0;
            canvas.restore();

            if (r_key == true) {
                player.reset()
                finishscreen.finished = false
                this.paused = false;
            }

            for(i = 0; i < this.mainmenutext.length; i++) {
                this.mainmenutext[i].alpha = this.blur*1.25;
                this.mainmenutext[i].x = gameWindow.canvas.width/20 - ((1-(this.blur/this.maxblur))*this.mainmenutext[0].width*2);
                if(i == 0) {
                    this.mainmenutext[i].y = (gameWindow.canvas.height/10)*(i+1.5)
                } else if (i <= 2) {
                    this.mainmenutext[i].y = (gameWindow.canvas.height/10)*(i+3)
                } else if (i <= 4) {
                    this.mainmenutext[i].y = (gameWindow.canvas.height/10)*(i+4)
                }
                this.mainmenutext[i].update()

                if ((mousepos[0] <= 500) && ((mousepos[1] >= (this.mainmenutext[i].y-gameWindow.canvas.height/20)) && (mousepos[1] <= (this.mainmenutext[i].y+gameWindow.canvas.height/20))) && (i != 0)) {
                    if (Math.round(this.selheight) != this.mainmenutext[i].y){
                        this.selheight += (this.mainmenutext[i].y - this.selheight)/1.5
                    }
                    

                    if(mousedown == 1 && pausemenu.paused == 1) {
                        if(i == 1) {
                            pausemenu.toggle()
                        } else if (i == 2) {
                            player.reset()
                            finishscreen.finished = false
                            pausemenu.toggle()
                        } else if (i == 4) {
                            pausemenu.menu = 2
                        }
                    }
                }
            }
        }
    },

    settingsmenu : function() {
        if(this.menu == 2) {
            canvas = gameWindow.context;
            canvas.fillStyle = "#1b2932"; 
            canvas.globalAlpha = ((this.blur * (100/this.maxblur))/100)
            canvas.fillRect((gameWindow.canvas.width/2)-((gameWindow.canvas.width/1.1)/2), (gameWindow.canvas.height/2)-((gameWindow.canvas.height/1.1)/2), gameWindow.canvas.width/1.1, gameWindow.canvas.height/1.1)
            canvas.globalAlpha = 1

            for (i = 0; i < this.settingsmenutext.length; i++) {
                this.settingsmenutext[i].update()
            }

            this.tempfps = this.Smaxfpsslider.value
            this.Smaxfpsnumber.text = this.tempfps

            camera.czoom = this.Szoomslider.value
            this.Szoomnumber.text = `${camera.czoom}%`

            this.Sdebugtext.text = `Debug: ${debug}`
        }
    },

    update : function() {
        if ((this.blur > 0) && (this.paused == false)) {
            this.blur -= this.blurstep;
            this.selheight = -100;
        } else if ((this.blur <= 0) && (this.paused == false)) {
            pausemenu.menu = 0;
        }
        if ((this.blur < this.maxblur) && (this.paused == true)) {
            this.blur += this.blurstep;
        }

        if(this.blur >= this.maxblur) { maxfps = 30 } else {maxfps = this.tempfps; this.blurstep = this.initblurstep * (60/fps);}

        pausebuttoncanvas = gameWindow.context;
        pausebuttoncanvas.fillStyle = this.pbcolor;
        pausebuttoncanvas.beginPath();
        pausebuttoncanvas.arc(0,0,((gameWindow.canvas.height/15)),0,2*Math.PI);
        pausebuttoncanvas.closePath();
        pausebuttoncanvas.fill();
        pausebuttoncanvas.drawImage(this.pauseimage, gameWindow.canvas.height/120, gameWindow.canvas.height/120, gameWindow.canvas.height/30, gameWindow.canvas.height/30);

        bg = gameWindow.context;
        bg.fillStyle = "black";
        bg.globalAlpha = (this.blur/100);
        bg.fillRect(0,0,gameWindow.canvas.width,gameWindow.canvas.height);
        bg.globalAlpha = 1.0;

        pausemenu.mainmenu()

        pausemenu.settingsmenu()

        if(!pausemenu.paused) {
            if((mousepos[0] <= gameWindow.canvas.height/20) && (mousepos[1] <= gameWindow.canvas.height/20)) {
                this.pbcolor = "#49545b"
                if (mousedown == 1) {
                    pausemenu.toggle()
                }
            } else {
                this.pbcolor = "#1b2932"
            }
        }
        upcount++;
    },
}

var finishscreen = {
    start : function() {
        this.yoffset = -100
        this.finished = false
        this.score = 0;

        this.spacebar = new Image(); this.spacebar.src = "textures/spacebar.png";
        this.tabbg = new Image(); this.tabbg.src = "textures/tabbg.png";
        this.tabbg2 = new Image(); this.tabbg2.src = "textures/tabbg2.png";
        this.star = new Image(); this.star.src = "textures/star.png";

        this.tabimage = this.tabbg

        this.complete = new displaytext(x=(gameWindow.canvas.width/2), y=(30), text="Press   SpaceBar   or Click Here to Finish", justify="center", size=30, font="Arial", color="white")

        this.textrender = [
            new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/2)-200, text="Congratulations!", justify="center", size=150, font="Arial", color="white"),
            new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/2)-100, text="Level Complete", justify="center", size=50, font="Arial", color="white"),
            new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/2)+75, text="Score:", justify="center", size=50, font="Arial", color="white")
        ]
    },

    update : function() {
        if(parked) {
            if (Math.round(this.yoffset) < 0){
                this.yoffset += (0 - this.yoffset)/4
            }      
        } else {
            if (Math.round(this.yoffset) > -100 ){
                this.yoffset += (-100 - this.yoffset)/10
            }
        }

        if(this.yoffset > -99) {
            canvas.setTransform(1, 0, 0, 1, 0, 0);
            car = gameWindow.context;
            car.drawImage(this.tabimage, (gameWindow.canvas.width/2)-300, -30 + this.yoffset, 600, 100);
            car.drawImage(this.spacebar, (gameWindow.canvas.width/2)-190, 10 + this.yoffset, 160, (180/4));

            this.complete.y = 30 + this.yoffset;
            this.complete.x = (gameWindow.canvas.width/2)
            this.complete.update();
        }

        if ((mousepos[1] < 70) && ((mousepos[0] > gameWindow.canvas.width/2-300) && (mousepos[0] < gameWindow.canvas.width/2+300)) && (pausemenu.paused == false)) {
            this.tabimage = this.tabbg2
        } else {
            this.tabimage = this.tabbg
        }

        if (parked && (space || (((mousepos[1] < 70) && ((mousepos[0] > gameWindow.canvas.width/2-300) && (mousepos[0] < gameWindow.canvas.width/2+300))) && (mousedown == 1))) && (pausemenu.paused == false)) {
            this.finished = true
        }

        if(this.finished) {
            canvas = gameWindow.context
            canvas.fillStyle = "black";
            canvas.globalAlpha = 0.8;
            canvas.fillRect(0,0,gameWindow.canvas.width,gameWindow.canvas.height);
            canvas.globalAlpha = 1.0;

            for(this.i = 0; this.i < this.textrender.length; this.i++) {
                this.textrender[this.i].x = (gameWindow.canvas.width/2)
                this.textrender[this.i].update();
            }

            for(this.i = 0; this.i < this.score; this.i++) {
                canvas.drawImage(this.star, (gameWindow.canvas.width/2)-(((this.score * 150)/2 + 25)) + (this.i*150), gameWindow.canvas.height/2 + 100, 200, 200);
            }
        }
        upcount++;
    },
}

function carborder() {
    this.distances = player.distances
    this.update = function() {
        this.x = gameWindow.canvas.width/2
        this.y = gameWindow.canvas.height/2
        for (i = 0; i < this.distances.length; i++) {
            this.newx = this.x + (sin(i*16) * this.distances[i])
            this.newy = this.y + (cos(i*16) * this.distances[i])

            bg = gameWindow.context;
            bg.fillStyle = "red";
            bg.fillRect(this.newx,this.newy,5,5);
        }
        for (this.f = 0; this.f < 1; this.f++) {
            this.newx = this.x + (player.wheeldistance * sin(player.wheelangles[this.f]+90))*scalar
            this.newy = this.y + (player.wheeldistance * cos(player.wheelangles[this.f]+90))*scalar

            bg = gameWindow.context;
            bg.fillStyle = "red";
            bg.fillRect(this.newx,this.newy,5,5);
        }

        bg = gameWindow.context;
        bg.fillStyle = "red";
        bg.fillRect(((maps[0][19].pointrec[0]*scalar)+gameWindow.canvas.width/2)-camera.cx*scalar,((maps[0][19].pointrec[1]*scalar)+gameWindow.canvas.height/2)-camera.cy*scalar,50,50);
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
    this.width = this.size;
    this.height = (this.size/3)*2;

    this.update = function() {
        this.ssize = this.size * (gameWindow.canvas.width/1920)
        canvas = gameWindow.context;
        canvas.setTransform(1, 0, 0, 1, 0, 0);
        canvas.font = (`${this.ssize}px ${this.font}`);
        canvas.fillStyle = this.color;
        this.width = canvas.measureText(this.text).width
        this.height = (this.ssize/3)*2
        if (this.justify == "center") {
            this.jpos = this.width/2;
        } else if (this.justify == "right") {
            this.jpos = this.width;
        } else {
            this.jpos = 0;
        }
        canvas.globalAlpha = (this.alpha/100);

        canvas.fillText(this.text, this.x - this.jpos, this.y + this.height/2);
        canvas.globalAlpha = 1;
        upcount++
    }
}

function slider(x, y, width, height, value, min, max, barcolor, handlecolor, step=1) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.value = value
    this.min = min
    this.max = max
    this.color1 = barcolor
    this.color2 = handlecolor
    this.active = false
    this.step = step

    this.update = function() {
        canvas = gameWindow.context;
        canvas.setTransform(1, 0, 0, 1, 0, 0);

        canvas.fillStyle = this.color1
        canvas.fillRect(this.x - this.width/2, this.y - this.height/(4*2), this.width, this.height/4);
        
        canvas.fillStyle = this.color2
        canvas.beginPath();
        canvas.arc((this.x - this.width/2) + ((this.width/(this.max - this.min))*this.value), this.y, this.height, 0, 2*Math.PI);
        canvas.fill();

        if((mousepos[0] > (this.x - this.width/2)) && (mousepos[0] < (this.x + this.width/2)) && (mousepos[1] < (this.y + this.height*1.5)) && (mousepos[1] > (this.y - (this.height/2)*1.5)) && (mousedown == true)) {
            this.active = true
        }
        if(this.active) {
            if(this.step < 1) {
                this.nextvalue = round((this.min + ((mousepos[0] - (this.x - this.width/2))*((this.max - this.min)/this.width))),String(this.step).length-2)
            } else if (this.step > 1) {
                this.nextvalue = round((this.min + ((mousepos[0] - (this.x - this.width/2))*((this.max - this.min)/this.width)))/this.step,0)*this.step
            } else {
                this.nextvalue = round((this.min + ((mousepos[0] - (this.x - this.width/2))*((this.max - this.min)/this.width))),0)
            }
            

            if((this.nextvalue >= this.min) && (this.nextvalue <= this.max)) {
                this.value = this.nextvalue
            } else if (this.nextvalue <= this.min) {
                this.value = this.min
            } else if (this.nextvalue >= this.max) {
                this.value = this.max
            }

            if(mousedown == 0) { 
                this.active = false
            }
        }
        upcount++
    }
} 
