// --------------------------------------------------------------
// Code Starts Here

// Config
var fps = 60;
var zoom = 100;
var map = 1

// Defining Variables
var lasttime = 0;
var fpsrec = 0;
var scalar = 40;

let left = false;
let right = false;
let up = false;
let down = false;
let esc = false;

var upcount = 0;

// Launch The Game
window.onload = function() {
    gameWindow.start(0, 0, 0, zoom);
    player.start();
    test = new testcirc();
    fpscount = new displaytext(50, 50, "FPS: Error", "left", size=30)
    speedometer = new displaytext(50, 100, "Speed: Error", "left", size=30)
    posdebug = new displaytext(50, 150, "Position: Error", "left", size=30)

    spritelist = [player, test, fpscount, speedometer, posdebug, pausemenu]
    
    updatelist = maps[map-1].concat(spritelist);

    pausemenu.start();

    console.debug(`Degree Cos: ${atan(1/2)}`)
}

var gameWindow = {
    canvas : document.createElement("canvas"),
    start : function(x=0, y=0, angle=0, zoom=100) {

        // Starting Variables For Canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.id = "gamescreen"
        this.context = this.canvas.getContext("2d");
        //this.context.filter = "blur(10px)";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        camera.start(x,y,angle,zoom);

        // Start Refresh
        this.interval = setInterval(updateGameWindow, (1000/fps));

        // Keyboard Listeners
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            gameWindow.keys = (gameWindow.keys || []);
            gameWindow.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameWindow.keys[e.keyCode] = (e.type == "keydown");
        })
    },

    // Wipe Canvas To Create Refresh Effect
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}

var camera = {
    start : function(x, y, angle, zoom) {
        this.cx = x;
        this.cy = y;
        this.cangle = angle;
        this.czoom = zoom;
    },

    position : function(x, y, rot) {
        this.distance = (Math.sqrt(Math.pow(x-this.cx,2)+Math.pow(y-this.cy,2)))*scalar
        this.angle = degrees(Math.atan2((y-this.cy),(x-this.cx)))+this.cangle
        this.x2 = (Math.cos(radians(this.angle))*this.distance)
        this.y2 = (Math.sin(radians(this.angle))*this.distance)
        this.angle2 = rot - this.cangle
        return [this.x2, this.y2, this.angle2, this.angle]
    }
}

var pausemenu = {
    start : function() {
        this.paused = false;
        this.blur = 0;
        this.maxblur = 80;
        this.blurstep = 2;

        this.title = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*2, text="Paused", "center", size=100, font="Arial", color="white")
        this.resume = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*4, text="Resume Game", "center", size=50, font="Arial", color="white")
        this.restart = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*5, text="Restart Game", "center", size=50, font="Arial", color="white")
        this.ability = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*7, text="Accessability", "center", size=50, font="Arial", color="white")
        this.settings = new displaytext(x=(gameWindow.canvas.width/2), y=(gameWindow.canvas.height/10)*8, text="Settings", "center", size=50, font="Arial", color="white")
        
        this.menutext = [this.title, this.resume, this.restart, this.ability, this.settings]
        updatelist = updatelist.concat(this.menutext)
    },

    toggle : function() {
        if (this.blur == 0) {
            this.paused = true;
        }
        if (this.blur == this.maxblur) {
            this.paused = false;
        }
    },

    update : function() {
        if ((this.blur > 0) && (this.paused == false)) {
            this.blur -= this.blurstep;
        }
        if ((this.blur < this.maxblur) && (this.paused == true)) {
            this.blur += this.blurstep;
        }
        bg = gameWindow.context;
        bg.fillStyle = "black";
        bg.globalAlpha = (this.blur/100);
        bg.fillRect(0,0,gameWindow.canvas.width,gameWindow.canvas.height);
        bg.globalAlpha = 1.0;

        for(i = 0; i < this.menutext.length; i++) {
            this.menutext[i].alpha = this.blur*1.25;
        }

        upcount++;
    },
}

var player = {
    start : function(x, y, angle, zoom) {
        // Config For The Car
        this.deceleration = 0.1
        this.turnback = 5
        this.maxturndeg = 30
        this.wheelbase = 3

        // Defining Starting Variables On Creation
        this.width = 2.5;
        this.height = 5;
        this.speed = 0;
        this.turndeg = 0;
        this.carimage = new Image();
        this.carimage.src = "textures/car.png";
    },

    // Move The Sprite When Update Is Called
    update : function() {
        // Update Positions
        this.turnrad = this.wheelbase/Math.tan(this.turndeg * (Math.PI/180))
        this.xmov = this.turnrad - (Math.cos(this.speed/this.turnrad)*this.turnrad)
        this.ymov = (Math.sin(this.speed/this.turnrad)*this.turnrad)
        this.tandeg = degrees(Math.atan(this.xmov/this.ymov))
        console.debug((this.speed * Math.sin(radians(this.tandeg))))
        camera.cangle += (this.speed/this.turnrad * (180/Math.PI))/fps
        if(this.turndeg != 0 && this.speed != 0) {
            camera.cx += (((this.speed * Math.sin(radians(this.tandeg))) * (Math.sin(radians(camera.cangle))))/fps)
            camera.cy += (((this.speed * Math.cos(radians(this.tandeg))) * (Math.cos(radians(camera.cangle))))/fps)
        } else {
            camera.cx += ((this.speed * (Math.sin(radians(camera.cangle))))/fps)
            camera.cy += ((this.speed * (Math.cos(radians(camera.cangle))))/fps)
        }
                // if (this.speed > 0) {
        //             }
        // if (this.speed < 0) {
        //     camera.cangle += this.rotation * this.speed/5;
        // }
        // if (this.rotation == 0) {
        //     camera.cx += this.speed * (Math.sin(radians(camera.cangle)));
        //     camera.cy += this.speed * (Math.cos(radians(camera.cangle)));
        // }

        // Slow-Down
        // if (!up && !down) {
        //     if (this.speed > 0) {this.speed -= this.deceleration; if(this.speed <=0){this.speed=0}} 
        //     else if (this.speed < 0) {this.speed += this.deceleration; if(this.speed >=0){this.speed=0}}
        //     else {this.speed = 0}
        // }
        
        // if (this.turndeg > 0 && !(left || right)) {this.turndeg -= this.turnback * Math.abs(this.speed/60); if(this.turndeg <=0){this.turndeg=0}} 
        // else if (this.turndeg < 0 && !(left || right)) {this.turndeg += this.turnback * Math.abs(this.speed/60); if(this.turndeg >=0){this.turndeg=0}}
        // else if (!(left || right)) {this.rotation = 0}

        // Update Visuals
        wheelL = gameWindow.context;
        wheelL.save();
        wheelL.translate(((gameWindow.canvas.width/2 - this.width/3.4*(camera.czoom/100))), ((gameWindow.canvas.height/2 - this.height/3.8*(camera.czoom/100))));
        wheelL.rotate(radians(this.turndeg));
        wheelL.fillStyle = "black";
        wheelL.fillRect((this.width/10*(camera.czoom/100)) / -2, (this.height/6*(camera.czoom/100)) / -2, this.width/10*(camera.czoom/100), this.height/6*(camera.czoom/100));
        wheelL.restore();

        wheelR = gameWindow.context;
        wheelR.save();
        wheelR.translate(((gameWindow.canvas.width/2 + ((this.width/3.4)*(scalar)))), ((gameWindow.canvas.height/2 - ((this.height/3.8)*(scalar)))));
        wheelR.rotate(radians(this.turndeg));
        wheelR.fillStyle = "black";
        wheelR.fillRect(((this.width/10) / -2)*scalar, ((this.height/6) / -2)*scalar, (this.width/10)*(scalar), (this.height/6)*(scalar));
        wheelR.restore();

        car = gameWindow.context;
        car.fillStyle = "purple";
        car.drawImage(this.carimage, (gameWindow.canvas.width/2)-((this.width/2)*(scalar)*(camera.czoom/100)), (gameWindow.canvas.height/2)-((this.height/2)*(scalar)*(camera.czoom/100)), this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));

        upcount++
    }
}

function shape(type, x, y, angle, width, height, fill="black") {
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

function testcirc() {
    this.y = 0
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

// Refresh The Canvas (50x per second)
function updateGameWindow() {
    upcount = 0
    const d = new Date();
    fpsrec += 1
    if (lasttime + 125 <= d.getTime()) {
        lasttime = d.getTime();
        fpscount.text = `FPS: ${fpsrec * 8} / ${fps}`;
        speedometer.text = `Speed: ${round(player.speed,1)}, Turn Angle: ${round(player.turndeg,1)}°, Turn Radius: ${round(player.turnrad,1)}, Res. Angle: ${round((player.speed/player.turnrad * (180/Math.PI)),1)}°`
        posdebug.text = `Position: ${round(camera.cx,1)}, ${round(camera.cy,1)}, ${round(camera.cangle,1)}°`
        fpsrec = 0;
    }

    // Defining Keypresses
    if (gameWindow.keys && (gameWindow.keys[37] || gameWindow.keys[65])) {left = true} else {left = false}
    if (gameWindow.keys && (gameWindow.keys[39] || gameWindow.keys[68])) {right = true} else {right = false}
    if (gameWindow.keys && (gameWindow.keys[38] || gameWindow.keys[87])) {up = true} else {up = false}
    if (gameWindow.keys && (gameWindow.keys[40] || gameWindow.keys[83])) {down = true} else {down = false}
    if (gameWindow.keys && (gameWindow.keys[27])) {esc = true} else {esc = false}

    if(pausemenu.paused){left=false; right=false; up=false; down=false;}

    //############# Keycode Finder ############
    // if (gameWindow.keys) {
    //     for(i = 0; i < gameWindow.keys.length; i++) {
    //         if (gameWindow.keys[i])
    //             console.debug(`Key ${i} pressed`);
    //     }
    // }
    
    // Movement
    gameWindow.clear();

    if(!pausemenu.paused) {
        if (left && (player.turndeg > (player.maxturndeg*-1))) {player.turndeg -= (1); }
        if (right && (player.turndeg < (player.maxturndeg))) {player.turndeg += (1); }
        //if (up && (player.speed < 10)) {if(player.speed >= 0) {player.speed += 10} else {player.speed += 0}}
        //if (down && (player.speed > -10)) {if(player.speed <= 0) {player.speed -= 10} else {player.speed -= 0}}
        if (up) {player.speed = 10
        } else if (down) {player.speed = -10
        } else {player.speed = 0}
    }
    
    if(esc) {pausemenu.toggle(); console.debug("Esc pressed")}
    
    while(upcount < updatelist.length) {
        updatelist[upcount].update();
    }


}

function degrees(radians) {return (radians * (180/Math.PI)) % 360}
function radians(degrees) {return degrees * (Math.PI/180)}
function round(number, points) {return (Math.round(number * Math.pow(10,points))/Math.pow(10,points))}
function cos(theta) {return Math.cos(theta * Math.PI/180)}
function sin(theta) {return Math.sin(theta * Math.PI/180)}
function tan(theta) {return Math.tan(theta * Math.PI/180)}
function atan(imp) {return Math.atan(imp) * 180/Math.PI}