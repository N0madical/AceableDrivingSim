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

// Initiating Variables
let left = false;
let right = false;
let up = false;
let down = false;
let esc = false;

// Debug Timer
var upcount = 0;

// Launch The Game On Window Load
window.onload = function() {
    gameWindow.start(0, 0, 0, zoom);
    player.start();
    turnradius = new testcirc();
    fpscount = new displaytext(50, 50, "FPS: Error", "left", size=30);
    speedometer = new displaytext(50, 100, "Speed: Error", "left", size=30);
    posdebug = new displaytext(50, 150, "Position: Error", "left", size=30);

    // Sprides to be loaded on all maps
    spritelist = [player, turnradius, fpscount, speedometer, posdebug, pausemenu]
    
    // Import selected map
    updatelist = maps[map-1].concat(spritelist);

    // Initiate pause menu
    pausemenu.start();

}

// Main Game Window Container
var gameWindow = {
    canvas : document.createElement("canvas"),
    start : function(x=0, y=0, angle=0, zoom=100) {

        // Starting Variables For Canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.id = "gamescreen"
        this.context = this.canvas.getContext("2d"); // This is what allows all objects to interface with canvas
        //this.context.filter = "blur(10px)"; // Experimenting with blur effect (Lags Computer)
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Inserts canvas into HTML
        camera.start(x,y,angle,zoom);

        // Start Refresh Ticker
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

// Camera object controlls placement of all objects relative to player
var camera = {
    start : function(x, y, angle, zoom) {
        this.cx = x;
        this.cy = y;
        this.cangle = angle;
        this.czoom = zoom;
    },

    // Objects use the position function to get position relative to player
    position : function(x, y, rot) {
        this.distance = (Math.sqrt(Math.pow(x-this.cx,2)+Math.pow(y-this.cy,2)))*scalar
        this.angle = invtan2((y-this.cy),(x-this.cx))+this.cangle
        this.x2 = (cos(this.angle))*this.distance
        this.y2 = (sin(this.angle))*this.distance
        this.angle2 = rot - this.cangle
        return [this.x2, this.y2, this.angle2, this.angle]
    }
}

// WIP: The pause menu (press esc to activate)
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

// The player object (present on all maps)
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
        // Update Camera Position (WIP)
        this.turnrad = this.wheelbase/tan(this.turndeg)
        this.arcdeg = degrees(this.speed/this.turnrad)
        this.theta = 90 - ((180-this.arcdeg)/2)
        this.angularspeed = sin(this.arcdeg)/(sin((180-this.arcdeg)/2)/this.turnrad)
        camera.cangle += (this.speed/radians(this.turnrad))/fps
        if(this.turndeg != 0 && this.speed != 0) {
            camera.cx += (this.angularspeed * (sin(camera.cangle)))/fps
            camera.cy += (this.angularspeed * (cos(camera.cangle)))/fps
        } else {
            camera.cx += ((this.speed * (sin(camera.cangle))))/fps
            camera.cy += ((this.speed * (cos(camera.cangle))))/fps
        }

        // Slow Down Effect
        // if (!up && !down) {
        //     if (this.speed > 0) {this.speed -= this.deceleration; if(this.speed <=0){this.speed=0}} 
        //     else if (this.speed < 0) {this.speed += this.deceleration; if(this.speed >=0){this.speed=0}}
        //     else {this.speed = 0}
        // }
        
        // Stop Turning Effect
        // if (this.turndeg > 0 && !(left || right)) {this.turndeg -= this.turnback * Math.abs(this.speed/60); if(this.turndeg <=0){this.turndeg=0}} 
        // else if (this.turndeg < 0 && !(left || right)) {this.turndeg += this.turnback * Math.abs(this.speed/60); if(this.turndeg >=0){this.turndeg=0}}
        // else if (!(left || right)) {this.rotation = 0}

        // Update Player Visuals
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

        // Let the renderer know rendering is complete
        upcount++
    }
}

// Refresh The Canvas (50x per second)
function updateGameWindow() {

    // Debug ticker gives steady timer to load fps
    upcount = 0
    const d = new Date();
    fpsrec += 1
    if (lasttime + 125 <= d.getTime()) {
        lasttime = d.getTime();
        fpscount.text = `FPS: ${fpsrec * 8} / ${fps}`;
        speedometer.text = `Speed: ${round(player.speed,1)}, Turn Angle: ${round(player.turndeg,1)}°, Turn Radius: ${round(player.turnrad,1)}, Res. Angle: ${round((player.speed/player.turnrad),1)}°`
        posdebug.text = `Position: ${round(camera.cx,1)}, ${round(camera.cy,1)}, ${round(camera.cangle,1)}°`
        fpsrec = 0;
    }

    // Defining and Detecting Keypresses
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
    
    // Refresh Game Window
    gameWindow.clear();

    // Affect player when buttons pressed
    if(!pausemenu.paused) {
        if (left && (player.turndeg > (player.maxturndeg*-1))) {player.turndeg -= (1); }
        if (right && (player.turndeg < (player.maxturndeg))) {player.turndeg += (1); }
        //if (up && (player.speed < 10)) {if(player.speed >= 0) {player.speed += 10} else {player.speed += 0}}
        //if (down && (player.speed > -10)) {if(player.speed <= 0) {player.speed -= 10} else {player.speed -= 0}}
        if (up) {player.speed = 10
        } else if (down) {player.speed = -10
        } else {player.speed = 0}
    }
    
    // Pause Menu (WIP)
    if(esc) {pausemenu.toggle(); console.debug("Esc pressed")}
    
    // Load all objects, upcount allows objects to notify loader when they complete loading to avoid async overlap
    while(upcount < updatelist.length) {
        updatelist[upcount].update();
    }

}

// Custom Functions
function degrees(radians) {return (radians * (180/Math.PI)) % 360}
function radians(degrees) {return degrees * (Math.PI/180)}
function round(number, points) {return (Math.round(number * Math.pow(10,points))/Math.pow(10,points))}
function cos(theta) {return Math.cos(theta * Math.PI/180)} //Cos in degrees
function sin(theta) {return Math.sin(theta * Math.PI/180)} //Sin in degrees
function tan(theta) {return Math.tan(theta * Math.PI/180)} //Tan in degrees
function invtan(imp) {return Math.atan(imp) * 180/Math.PI} //Inverse tan in degrees
function invtan2(imp1,imp2) {return Math.atan2(imp1,imp2) * 180/Math.PI}