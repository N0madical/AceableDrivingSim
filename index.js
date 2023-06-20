// --------------------------------------------------------------
// Code Starts Here

// Config
var fps = 144;
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
let loadedtextures = {}

// Debug Timer
var upcount = 0;

// Launch The Game On Window Load
window.onload = function() {

    gameWindow.start(0, 0, 0, zoom);
    player.start();
    fpscount = new displaytext(50, 50, "FPS: Error", "left", size=30);
    speedometer = new displaytext(50, 100, "Speed: Error", "left", size=30);
    posdebug = new displaytext(50, 150, "Position: Error", "left", size=30);
    border = new carborder();

    // Sprides to be loaded on all maps
    spritelist = [player, fpscount, speedometer, posdebug, pausemenu]
    
    // Import selected map
    updatelist = maps[map-1].concat(spritelist);

    loadsprites(map, maps)

    // Initiate pause menu
    pausemenu.start();

    for(i = 0; i < updatelist.length; i++) {
        if (typeof updatelist[i].layer == 'undefined') {
            updatelist[i].layer = 5
        }
    }

}

// Main Game Window Container
var gameWindow = {
    canvas : document.getElementById("maincanvas"),
    start : function(x=0, y=0, angle=0, zoom=100) {
        // Starting Variables For Canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.id = "gamescreen"
        this.context = this.canvas.getContext("2d"); // This is what allows all objects to interface with canvas
        //this.context.filter = "blur(10px)"; // Experimenting with blur effect (Lags Computer)
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Inserts canvas into HTML
        camera.start(x,y,angle,zoom);

        // Start Refresh Ticker
        msPrev = window.performance.now()
        function gameTick() {
            window.requestAnimationFrame(gameTick)

            const msNow = window.performance.now()
            const msPassed = msNow - msPrev

            if (msPassed < 1000/fps) return

            const excessTime = msPassed % (1000/fps)
            msPrev = msNow - excessTime

            updateGameWindow()
        }
        gameTick()

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
        this.deceleration = 10
        this.turnback = 5
        this.maxturndeg = 30
        this.wheelbase = 3

        // Defining Starting Variables On Creation
        this.width = 2.5;
        this.height = 5;
        this.speed = 0;
        this.turndeg = 0;
        this.layer = 3;
        this.carimage = new Image();
        this.carimage.src = "textures/car.png";
        this.distances = [100,99,99,92,76,63,55,49,45,43,41,41,41,42,44,55,52,56,66,83,92,98,100,100,98,93,85,69,56,52,53,42,40,39,39,40,41,44,48,53,62,74,94,101,101]
    },

    // Move The Sprite When Update Is Called
    update : function() {
        // Update Camera Position (WIP)
        if(!pausemenu.paused) {
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
            if (!up && !down) {
                if (this.speed > 0) {this.speed -= this.deceleration/fps; if(this.speed <=0){this.speed=0}} 
                else if (this.speed < 0) {this.speed += this.deceleration/fps; if(this.speed >=0){this.speed=0}}
                else {this.speed = 0}
            }
            
            // Stop Turning Effect
            if (this.turndeg > 0 && !(left || right)) {this.turndeg -= this.turnback * Math.abs(this.speed/60); if(this.turndeg <=0){this.turndeg=0}} 
            else if (this.turndeg < 0 && !(left || right)) {this.turndeg += this.turnback * Math.abs(this.speed/60); if(this.turndeg >=0){this.turndeg=0}}
            else if (!(left || right)) {this.rotation = 0}
        }

        // Update Player Visuals
        wheelL = gameWindow.context;
        wheelL.save();
        wheelL.translate(((gameWindow.canvas.width/2 - ((this.width/3.0)*(scalar)))), ((gameWindow.canvas.height/2 - ((this.height/3.8)*(scalar)))));
        wheelL.rotate(radians(this.turndeg));
        wheelL.fillStyle = "black";
        wheelL.fillRect(((this.width/10) / -2)*scalar, ((this.height/6) / -2)*scalar, (this.width/10)*(scalar), (this.height/6)*(scalar));
        wheelL.restore();

        wheelR = gameWindow.context;
        wheelR.save();
        wheelR.translate(((gameWindow.canvas.width/2 + ((this.width/3.0)*(scalar)))), ((gameWindow.canvas.height/2 - ((this.height/3.8)*(scalar)))));
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

function carborder() {
    this.x = gameWindow.canvas.width/2 - 2.5
    this.y = gameWindow.canvas.height/2 - 2.5
    this.distances = player.distances
    console.debug(this.distances.length)
    this.update = function() {
        for (i = 0; i < this.distances.length; i++) {
            this.newx = this.x + (sin(i*8 + 45) * this.distances[i])
            this.newy = this.y + (cos(i*8 + 45) * this.distances[i])

            bg = gameWindow.context;
            bg.fillStyle = "red";
            bg.fillRect(this.newx,this.newy,5,5);
            bg.globalAlpha = 1.0;
        }
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

// Refresh The Canvas (50x per second)
function updateGameWindow() {

    // Debug ticker gives steady timer to load fps
    upcount = 0
    const d = new Date();
    fpsrec += 1
    if (lasttime + 250 <= d.getTime()) {
        lasttime = d.getTime();
        fpscount.text = `FPS: ${fpsrec * 4} / ${fps}`;
        speedometer.text = `Speed: ${round(player.speed,1)}, Turn Angle: ${round(player.turndeg,1)}°, Turn Radius: ${round(player.turnrad,1)}, Res. Angle: ${round((player.speed/player.turnrad),1)}°`
        posdebug.text = `Position: ${round(camera.cx,1)}, ${round(camera.cy,1)}, ${round(camera.cangle,1)}°`
        realfps = fpsrec * 4;
        fpsrec = 0;
    }

    // if(Math.abs(realfps - fps) > 10) {
    //     clearInterval(gameWindow.interval)
    //     gameWindow.interval = setInterval(updateGameWindow, (16))
    //     console.debug(gameWindow.interval)
    // }

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
        if (left && (player.turndeg > (player.maxturndeg*-1))) {player.turndeg -= (120/fps); }
        if (right && (player.turndeg < (player.maxturndeg))) {player.turndeg += (120/fps); }
        if (up && (player.speed < 10)) {if(player.speed >= 0) {player.speed += (5/fps)} else {player.speed += 0.3}}
        if (down && (player.speed > -10)) {if(player.speed <= 0) {player.speed -= (5/fps)} else {player.speed -= 0.3}}
        // if (up) {player.speed = 1
        // } else if (down) {player.speed = -1
        // } else {player.speed = 0}
    }
    
    // Pause Menu (WIP)
    if(esc) {pausemenu.toggle(); console.debug("Esc pressed")}
    
    // Load all objects, upcount allows objects to notify loader when they complete loading to avoid async overlap
    g = 1
    while (g < 6) {
        upcount = 0
        maxupcount = 0
        timeout = 0
        for (f = 0; f < updatelist.length; f++) {
            if (updatelist[f].layer == g) {
                updatelist[f].update()
                maxupcount++
            }
        }
        
        // //console.debug(`Found ${maxupcount} layer ${g} sprites`)
        // while(upcount < maxupcount && timeout < 10) {
        //     timeout++
        // }
        // //console.debug(`Timeout value on sprite ${g} is ${timeout}`)
        // if(timeout > 10) {
        //     console.error("Item did not load under 10ms")
        // }
        g++
    }
    
    
    
    // while(upcount < updatelist.length) {
    //     updatelist[upcount].update();
    // }

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
function loadsprites(map, maps) {
    for (i = 0; i < textures[0].length; i++) {
        f = new Image();
        f.src = textures[0][i][1]
        loadedtextures[textures[0][i][0]] = f
    }

    for (i = 0; i < textures[map].length; i++) {
        f = new Image();
        f.src = textures[map][i][1]
        loadedtextures[textures[map][i][0]] = f
    }

    for (i = 0; i < maps[map-1].length; i++) {
        maps[map-1][i].start()
    }
}