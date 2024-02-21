var clickhandler = {
    start : function() {
        this.x = 0
        this.y = 0
        this.realx = 0
        this.realy = 0
        this.click = 0
        this.mouse = [0,0,0]
        this.touches = []
        this.isclicked = false
        this.expectclick = false
        this.mobileUser = false
        this.touch = false

        window.addEventListener('mousemove', function(e) {clickhandler.mouse[0] = e.pageX; clickhandler.mouse[1] = e.pageY;})
        window.addEventListener('mousedown', function(e) {clickhandler.mouse[2] = 1; clickhandler.mobileUser = false})
        window.addEventListener('mouseup', function(e) {clickhandler.mouse[2] = 0})

        window.addEventListener("touchstart", clickhandler.touchHandler);
        window.addEventListener("touchmove", clickhandler.touchHandler);
        window.addEventListener("touchend", clickhandler.touchHandler);
    },

    touchHandler : function(e) {
        clickhandler.mobileUser = true
        let tempclicks = Object.values(e.touches)
        for(let i in tempclicks) {
            clickhandler.touches[i] = [tempclicks[i].pageX, tempclicks[i].pageY, 1]
        }
        for(let i in clickhandler.touches) {
            if(i+1 > tempclicks.length) {
                clickhandler.touches[i][2] = 0
            }
        }
    },

    clicked : function(x1, x2, y1, y2, type=0) {
        if((type == 0 || type == 1) && !clickhandler.mobileUser) {
            if(this.mouse[0] >= x1*(gameWindow.canvas.width/100) && this.mouse[0] <= x2*(gameWindow.canvas.width/100) && this.mouse[1] >= y1*(gameWindow.canvas.height/100) && this.mouse[1] <= y2*(gameWindow.canvas.height/100)) {
                this.touch = true
                if(this.expectclick && !this.mouse[2]) {
                    this.expectclick = false
                    this.isclicked = true
                    return true
                }
            }
        } else {
            this.limit = (type == 0) ? 10:type
            this.first = (type == 0) ? 0:type-1
            for(let i = this.first; i < this.touches.length && i < this.limit; i++) {
                if(this.touches[i][0] >= x1*(gameWindow.canvas.width/100) && this.touches[i][0] <= x2*(gameWindow.canvas.width/100) && this.touches[i][1] >= y1*(gameWindow.canvas.height/100) && this.touches[i][1] <= y2*(gameWindow.canvas.height/100)) {
                    this.touch = true
                    if(this.expectclick && !this.touches[i][2]) {
                        this.expectclick = false
                        this.isclicked = true
                        return true
                    }
                }
            }
        }
        
    },

    hovered : function(x1, x2, y1, y2, debug=false) {
        if(debug){
            console.debug(x1*(gameWindow.canvas.width/100), this.mouse[0], x2*(gameWindow.canvas.width/100), y1*(gameWindow.canvas.height/100), this.mouse[1], y2*(gameWindow.canvas.height/100))
        }
        if(this.mouse[0] >= x1*(gameWindow.canvas.width/100) && this.mouse[0] <= x2*(gameWindow.canvas.width/100) && this.mouse[1] >= y1*(gameWindow.canvas.height/100) && this.mouse[1] <= y2*(gameWindow.canvas.height/100)) {
            return true
        }
        for(let i = 0; i < this.touches.length; i++) {
            if(this.touches[i][0] >= x1*(gameWindow.canvas.width/100) && this.touches[i][0] <= x2*(gameWindow.canvas.width/100) && this.touches[i][1] >= y1*(gameWindow.canvas.height/100) && this.touches[i][1] <= y2*(gameWindow.canvas.height/100)) {
                return true
            }
        }
    },

    update : function() {
        if(this.mobileUser) {
            if(this.touches.length > 0) {
                this.realx = this.touches[0][0]
                this.realy = this.touches[0][1]
                this.click = this.touches[0][2]
            } else {
                this.click = 0
            }
        } else {
            this.realx = this.mouse[0]
            this.realy = this.mouse[1]
            this.click = this.mouse[2]
        }

        this.x = this.realx*(100/gameWindow.canvas.width)
        this.y = this.realy*(100/gameWindow.canvas.height)

        if(this.click && !this.isclicked) {
            this.expectclick = true
        }
        if(!this.click) {
            this.isclicked = false
        }

        if(!this.touch) {
            this.expectclick = false
        }
        this.touch = false
    }
}

var mobileHud = {
    start: function() {
        this.active = false;
        this.clickstart = {x:0, y:0};
    },

    update : function() {
        if(mobilecontrols != 0 && !player.paused) {
            if(!(clickhandler.x < 6 && clickhandler.y < 8) && clickhandler.click) {
                if(!this.active) {
                    this.clickstart = {x:clickhandler.x, y:clickhandler.y}
                }
                this.active = true
                for(let i = 0; i < 5; i++) {
                    if(mobilecontrols == 1) {
                        if(Math.abs(((this.clickstart.x - clickhandler.x)*-1.5)) < player.maxturndeg) {
                            mobileContolHud[i].x = this.clickstart.x - ((this.clickstart.x - clickhandler.x)/4)*i
                        }
                    } else {
                        mobileContolHud[i].x = clickhandler.x
                    }
                    mobileContolHud[i].y = this.clickstart.y - ((this.clickstart.y - clickhandler.y)/4)*i
                }

                if(player.speed*(player.acceleration*((this.clickstart.y - clickhandler.y)/50)) >= 0) {
                    player.speed += ((player.acceleration*((this.clickstart.y - clickhandler.y)/50))/fps)
                } else {
                    player.speed += ((player.acceleration*((this.clickstart.y - clickhandler.y)/10))/fps)
                }
                
                if(mobilecontrols == 1) {
                    if(Math.abs(((this.clickstart.x - clickhandler.x)*-1.5)) < player.maxturndeg) {
                        player.turndeg = ((this.clickstart.x - clickhandler.x)*-1.5)
                    } else {
                        if(((this.clickstart.x - clickhandler.x)*-1.5) > 0) {
                            player.turndeg = player.maxturndeg
                        } else {
                            player.turndeg = player.maxturndeg*-1
                        }
                    }
                }
                updateAll(mobileContolHud)
            } else {
                this.active = false
            }
        }
    }
}

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
        this.controlschosen = false;

        this.pauseimage = new Image();
        this.pauseimage.src = "textures/pause.png";
    },

    toggle : function() {
        if (this.blur <= 0.25) {
            pausemenu.menu = 1;
            this.paused = true;
            player.paused = true;
        }
        if (this.blur >= this.maxblur - 0.25) {
            this.paused = false;
            player.paused = false;
        }
    },

    openmenu : function(menu) {
        pausemenu.menu = menu;
        this.paused = true;
        player.paused = true;
    },

    controls : function() {
        pausemenu.menu = -1
        this.paused = true;
        player.paused = true;
    },

    mainmenu : function() {
        this.mainmenutext = mainmenutext
        if(pausemenu.menu == 1) {
            canvas = gameWindow.context;
            canvas.setTransform(1, 0, 0, 1, 0, 0);
            canvas.translate(-475 + ((gameWindow.canvas.width/3.4) * (this.blur/this.maxblur)), ((gameWindow.canvas.height/2)));
            canvas.rotate(radians(5));
            canvas.fillStyle = "#1b2932"; 
            canvas.fillRect( 800/-2, (gameWindow.canvas.height*1.5)/-2, 800, (gameWindow.canvas.height*1.5));        
            canvas.restore();

            canvas = gameWindow.context;
            canvas.setTransform(1, 0, 0, 1, 0, 0);
            canvas.translate(-475 + ((gameWindow.canvas.width/3.7) * (this.blur/this.maxblur)), (this.selheight));
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

            for(let i = 0; i < this.mainmenutext.length; i++) {
                this.mainmenutext[i].alpha = this.blur*1.25;
                this.mainmenutext[i].x = (30 * ((this.blur/this.maxblur))) - 25;
                this.mainmenutext[i].update()

                if (clickhandler.hovered(0,25,this.mainmenutext[i].y-5,this.mainmenutext[i].y+5)) {
                    if (Math.round(this.selheight) != this.mainmenutext[i].realy){
                        this.selheight += (this.mainmenutext[i].realy - this.selheight)/5
                    }
                    
                    if(clickhandler.clicked(0,25,this.mainmenutext[i].y-5,this.mainmenutext[i].y+5) && pausemenu.paused == 1) {
                        if(i == 1) {
                            pausemenu.toggle()
                        } else if (i == 2) {
                            player.reset()
                            finishscreen.finished = false
                            pausemenu.toggle()
                        } else if (i == 4) {
                            pausemenu.menu = 2
                        } else if (i == 3) {
                            pausemenu.menu = 3
                        }
                    }
                }
            }
        }
    },

    configmenu : function() {
        if(this.menu == -1) {
            for(let i in choosecontrolstext) {
                choosecontrolstext[i].alpha = this.blur/100
            }
            choosecontrolstext[1].width = animate(choosecontrolstext[1].width, true, true, 25, 10, 5)
            choosecontrolstext[2].width = animate(choosecontrolstext[2].width, true, true, 25, 10, 5)
            //64, 57, 1, 35
            document.getElementById("requestMotionAccess").style.display = "initial"
            document.getElementById("requestMotionAccess").style.left = `${((gameWindow.canvas.width/100) * (64-(25/2)))}px`
            document.getElementById("requestMotionAccess").style.top = `${(gameWindow.canvas.height/100) * (57-(35/2))}px`
            document.getElementById("requestMotionAccess").style.width = `${(gameWindow.canvas.width/100) * 25}px`
            document.getElementById("requestMotionAccess").style.height = `${(gameWindow.canvas.height/100) * 35}px`
            document.getElementById("requestMotionAccess").style.opacity = `0`
            updateAll(choosecontrolstext)
        }
    },

    settingsmenu : function() {
        if(this.menu == 2) {
            for(let i in settingsmenutext) {
                settingsmenutext[i].alpha = (this.blur/100)*1.25
            }

            maxfps = settingsmenutext[2].value
            settingsmenutext[4].text = `Max Fps: ${maxfps}`

            if(settingsmenutext[3].value != 101) {
                camera.czoom = settingsmenutext[3].value
                settingsmenutext[5].text = `Zoom: ${camera.czoom}%`
            }
            

            settingsmenutext[6].text = `Debug: ${debug}`

            updateAll(settingsmenutext)
        }
    },

    accmenu : function() {
        if(this.menu == 3) {
            for(let i in acctext) {
                acctext[i].alpha = (this.blur/100)*1.25
            }

            updateAll(acctext)
        }
    },

    update : function() {
        if(this.menu >= 0) {
            document.getElementById("requestMotionAccess").style.display = "none"
        }

        if ((this.blur != 0) && (this.paused == false)) {
            this.blur += (0 - this.blur)/(fps/10);
            if(this.blur <= 0.25){this.blur = 0}
            this.selheight = -100;
        } else if ((this.blur <= 0) && (this.paused == false)) {
            pausemenu.menu = 0;
        }
        if ((this.blur != this.maxblur) && (this.paused == true)){
            this.blur += (this.maxblur - this.blur)/(fps/10)
            if(this.blur >= this.maxblur-0.25){this.blur = this.maxblur}
        }
        // if ((this.blur < this.maxblur) && (this.paused == true)) {
        //     this.blur += this.blurstep;
        // }

        //if(this.blur >= this.maxblur) { maxfps = 30 } else {maxfps = this.tempfps; this.blurstep = this.initblurstep;}

        pausebuttoncanvas = gameWindow.context;
        pausebuttoncanvas.fillStyle = this.pbcolor;
        pausebuttoncanvas.beginPath();
        this.pbscale = (80*(((gameWindow.canvas.width+gameWindow.canvas.height)**0.5)/55))
        pausebuttoncanvas.arc(0,0,this.pbscale,0,2*Math.PI);
        pausebuttoncanvas.closePath();
        pausebuttoncanvas.fill();
        pausebuttoncanvas.drawImage(this.pauseimage, gameWindow.canvas.height/120, gameWindow.canvas.height/120, this.pbscale*0.5, this.pbscale*0.5);

        bg = gameWindow.context;
        bg.fillStyle = "black";
        bg.globalAlpha = (this.blur/100);
        bg.fillRect(0,0,gameWindow.canvas.width,gameWindow.canvas.height);
        bg.globalAlpha = 1.0;

        pausemenu.mainmenu()

        pausemenu.settingsmenu()
        pausemenu.accmenu()

        pausemenu.configmenu()

        if(!pausemenu.paused) {
            if(clickhandler.hovered(0,6,0,8)) {
                this.pbcolor = "#49545b"
                if (clickhandler.clicked(0,6,0,8)) {
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
        this.score_accuracy = 0;
        this.score_direction = 0;
        this.score_distance = 0;
        this.parkedcount = 0
        this.tabtoggle = false

        this.starsize = 10
        this.starcount = 7

        this.spacebar = new Image(); this.spacebar.src = "textures/spacebar.png";
        this.tabbg = new Image(); this.tabbg.src = "textures/tabbg.png";
        this.tabbg2 = new Image(); this.tabbg2.src = "textures/tabbg2.png";
        this.star = new Image(); this.star.src = "textures/star.png";

        this.tabimage = this.tabbg
    },

    update : function() {
        this.parkedcount -= 1

        this.opos = [0, 4.5, 4] //Original positions of finish screen tab text elements
        if(parked) {
            for(let i = 0; i < popuptext.length; i++) {
                popuptext[i].y = animate(popuptext[i].y, true, true, this.opos[i], 5, 20)
            }
            updateAll(popuptext);
            parked = false
        } else {
            for(let i = 0; i < popuptext.length; i++) {
                popuptext[i].y = animate(popuptext[i].y, false, true, -10, 5, 20)
            }
            updateAll(popuptext);
        }

        if ((clickhandler.hovered(30, 70, 0, 9)) && (pausemenu.paused == false)) {
            if(!this.tabtoggle) {
                popuptext[0].setImage("tabbg2.png")
                this.tabtoggle = true
            }
        } else {
            if(this.tabtoggle) {
                popuptext[0].setImage("tabbg.png")
                this.tabtoggle = false
            }
        }

        if ((this.parkedcount > 0) && (clickhandler.clicked(30, 70, 0, 9) || space) && (pausemenu.paused == false)) {
            this.finished = true
        }

        if(this.finished) {
            updateAll(finishscreentext)
            player.paused = true

            finishscreentext[4].text = `Pull-In Accuracy: ${Round(this.score_accuracy*100)}%`
            finishscreentext[5].text = `Angle Accuracy: ${Round(this.score_direction*100)}%`
            finishscreentext[6].text = `Left/Right Accuracy: ${Round(this.score_distance*100)}%`

            this.score = (this.score_accuracy+this.score_direction+this.score_distance)/3

            finishscreentext[this.starcount].width = animate(finishscreentext[this.starcount].width, true, true, 5.625, 5, 1)
            finishscreentext[this.starcount].height = animate(finishscreentext[this.starcount].height, true, true, 10, 5, 1)
            if(finishscreentext[this.starcount].width >= 5.625 && finishscreentext[this.starcount].height >= 10 && this.starcount < (Round(this.score*5) + 6)) {
                this.starcount++
            }
        }
        upcount++;
    },

    reset : function() {
        for(let i = 7; i < (7+5); i++) {
            finishscreentext[i].width = 0
            finishscreentext[i].height = 0
        }
        this.starcount = 7
        this.starsize = 0
    }
}

function carborder() {
    this.update = function() {
        this.x = gameWindow.canvas.width/2
        this.y = gameWindow.canvas.height/2
        for (let i = 0; i < (player.distances.length); i++) {
            this.newx = this.x + (sin(((i*16)) % 360) * (player.distances[i]))*scalar*(camera.czoom/100)
            this.newy = this.y - (cos(((i*16)) % 360) * (player.distances[i]))*scalar*(camera.czoom/100)

            bg = gameWindow.context;
            bg.fillStyle = "red";
            bg.fillRect(this.newx-2.5,this.newy-2.5,5,5);
        }
        // for (this.f = 0; this.f < 1; this.f++) {
        //     this.newx = this.x + (player.wheeldistance * sin(player.wheelangles[this.f]+90))*scalar
        //     this.newy = this.y + (player.wheeldistance * cos(player.wheelangles[this.f]+90))*scalar

        //     bg = gameWindow.context;
        //     bg.fillStyle = "red";
        //     bg.fillRect(this.newx,this.newy,5,5);
        // }

        // bg = gameWindow.context;
        // bg.fillStyle = "red";
        // bg.fillRect(((maps[0][19].pointrec[0]*scalar)+gameWindow.canvas.width/2)-camera.cx*scalar,((maps[0][19].pointrec[1]*scalar)+gameWindow.canvas.height/2)-camera.cy*scalar,50,50);
        upcount++
    }
}

function hudRect(x, y, width, height, fill, bezel=0, image=false, resize="both", alpha=1, clickevent="", args=[]) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bezel = bezel;
    this.image = image;
    this.clickevent = clickevent;
    this.clickdown = false;
    this.lastclick = 1;
    if(this.image) {
        this.fill = new Image();
        this.fill.src = `textures/${fill}`
    } else {
        this.fill = fill;
    }
    this.resize = resize;
    this.alpha = alpha;

    this.setImage = function(newimage) {
        if(this.fill.src != `textures/${newimage}`) {
            this.fill.src = `textures/${newimage}`
        }
    }

    this.update = function() {
        this.realwidth = (this.resize) ? (this.width*(gameWindow.canvas.width/(100))):(this.width*(1920/(100)))
        this.realheight = (this.resize == "both") ? (this.height*(gameWindow.canvas.height/(100))):(this.resize == "equal") ? (this.height*((gameWindow.canvas.width*(1080/1920))/(100))):(this.height*(1080/(100)))
        this.realx = (this.x*(gameWindow.canvas.width/100))-(this.realwidth/2)
        this.realy = (this.y*(gameWindow.canvas.height/100))-(this.realheight/2)
        this.canvas = gameWindow.context
        this.canvas.globalAlpha = this.alpha;
        if(this.image) {
            canvas.drawImage(this.fill, this.realx, this.realy, this.realwidth, this.realheight);
        } else {
            this.canvas.fillStyle = this.fill;
            if(this.bezel > 0) {
                this.canvas.beginPath();
                //this.canvas.setTransform(cos((this.x - clickhandler.x)/3), sin((this.y + clickhandler.y)/10), 0, 1, 0, 0)
                this.canvas.roundRect(this.realx,this.realy,this.realwidth,this.realheight, this.bezel);
                this.canvas.fill();
            } else {
                this.canvas.fillRect(this.realx,this.realy,this.realwidth,this.realheight);
            }
        }
        this.canvas.globalAlpha = 1.0;

        if(this.clickevent != "") {
            if(clickhandler.clicked(this.x - this.width/2, this.x + this.width/2, this.y - this.height/2, this.y + this.height/2)) {
                window[clickevent](...args)
            }
        }
    }
}

// Loads text into the player HUD
function hudText(text, x, y, size, justify="left", color="white", alpha=1, font="Arial", clickevent="", args=[]) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.justify = justify;
    this.size = size;
    this.font = font;
    this.color = color;
    this.alpha = alpha;
    this.clickevent = clickevent;
    this.args = args;
    this.realwidth = this.size;
    this.realheight = (this.size/3)*2;

    this.update = function() {
        this.multiline = this.text.split("\n")

        this.ssize = this.size * (gameWindow.canvas.width/1920)
        canvas = gameWindow.context;
        canvas.setTransform(1, 0, 0, 1, 0, 0);
        canvas.font = (`${this.ssize}px ${this.font}`);
        canvas.fillStyle = this.color;
        canvas.globalAlpha = this.alpha;
        this.realheight = (this.ssize/3)*2
        for(let i in this.multiline) {
            this.realwidth = canvas.measureText(this.multiline[i]).width
            if (this.justify == "center") {
                this.jpos = this.realwidth/2;
                this.fromleft = this.realwidth/2
                this.fromright = this.realwidth/2
            } else if (this.justify == "right") {
                this.jpos = this.realwidth;
                this.fromleft = this.realwidth
                this.fromright = 0
            } else {
                this.jpos = 0;
                this.fromleft = 0
                this.fromright = this.realwidth
            }
            
            canvas.fillText(this.multiline[i], this.realx - this.jpos, this.realy + this.realheight/2 + (this.realheight*i*2));
        }
        canvas.globalAlpha = 1;
        upcount++
        this.realx = this.x*(gameWindow.canvas.width/100)
        this.realy = this.y*(gameWindow.canvas.height/100)

        if(this.clickevent != "") {
            if(clickhandler.clicked(this.x - (this.fromleft*(100/gameWindow.canvas.width)), this.x + (this.fromright*(100/gameWindow.canvas.width)), this.y - (this.realheight*(100/gameWindow.canvas.height))/2, this.y + (this.realheight*(100/gameWindow.canvas.height))/2)) {
                window[clickevent](...args)
            }
        }
    }
}

function hudSlider(x, y, width, height, value, min, max, barcolor, handlecolor, step=1) {
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
    this.resize = true

    this.update = function() {
        this.realx = this.x*(gameWindow.canvas.width/100)
        this.realy = this.y*(gameWindow.canvas.height/100)
        this.realwidth = (this.resize) ? (this.width*(gameWindow.canvas.width/(100))):(this.width*(1920/(100)))
        this.realheight = (this.resize) ? (this.height*(gameWindow.canvas.height/(100))):(this.height*(1080/(100)))

        canvas = gameWindow.context;
        canvas.setTransform(1, 0, 0, 1, 0, 0);

        canvas.fillStyle = this.color1
        canvas.fillRect(this.realx - this.realwidth/2, this.realy - this.realheight/(4*2), this.realwidth, this.realheight/4);
        
        canvas.fillStyle = this.color2
        canvas.beginPath();
        canvas.arc((this.realx - this.realwidth/2) + ((this.realwidth/(this.max - this.min))*(this.value-this.min)), this.realy, this.realheight, 0, 2*Math.PI);
        canvas.fill();

        //console.debug(clickhandler.realx)

        if((clickhandler.realx > (this.realx - this.realwidth/2)) && (clickhandler.realx < (this.realx + this.realwidth/2)) && (clickhandler.realy < (this.realy + this.realheight*1.5)) && (clickhandler.realy > (this.realy - (this.realheight/2)*1.5)) && (clickhandler.click)) {
            this.active = true
        }
        if(this.active) {
            if(this.step < 1) {
                this.nextvalue = Round((this.min + ((clickhandler.realx - (this.realx - this.realwidth/2))*((this.max - this.min)/this.realwidth))),String(this.step).length-2)
            } else if (this.step > 1) {
                this.nextvalue = Round((this.min + ((clickhandler.realx - (this.realx - this.realwidth/2))*((this.max - this.min)/this.realwidth)))/this.step,0)*this.step
            } else {
                this.nextvalue = Round((this.min + ((clickhandler.realx - (this.realx - this.realwidth/2))*((this.max - this.min)/this.realwidth))),0)
            }
            
            if((this.nextvalue >= this.min) && (this.nextvalue <= this.max)) {
                this.value = this.nextvalue
            } else if (this.nextvalue <= this.min) {
                this.value = this.min
            } else if (this.nextvalue >= this.max) {
                this.value = this.max
            }

            if(clickhandler.click == 0) { 
                this.active = false
            }
        }
        upcount++
    }
} 
