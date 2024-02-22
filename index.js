// --------------------------------------------------------------
// Code Starts Here

// Defining Variables
player_position = [0,0,0]
zoom = 100;

// Initiating Variables
var lasttime = 0;
var fpsrec = 0;
var scalar = 50;
let orientOffset = 0;
let renderlist = {}

let left = false;
let right = false;
let up = false;
let down = false;
let esc = false;
let r_key = false;
let s_key = false;
let a_key = false;
let space = false;
let parked = false
var fps = maxfps;
let loadedtextures = {}
let loadedcartextures = []
var loadopac = 100;
var loadcount = 0;
let rightUpDialog = false;

// Debug Timer
var upcount = 0;

// Launch The Game On Window Load
window.onload = function() {
    // Import Settings
    player_position = configs[map-1][0];
    zoom = configs[map-1][1]
    
    // Start The Game
    gameWindow.start(player_position[0], player_position[1], player_position[2], zoom);
    player.start();

    // Load Debug HUD (If applicable)
    if (debug) {
        fpscount.x = 99; fpscount.y = 2; fpscount.size = 25;
        console.info("Debug Mode Enabled")
    }

    // Sprides to be loaded on all maps
    spritelist = [player, finishscreen, pausemenu]

    // Import selected map
    updatelist = maps[map-1].concat(spritelist);

    loadsprites(map, maps)

    // Initiate pause menu
    pausemenu.start();
    finishscreen.start();
    mobileHud.start();

    // Add IDs and Layers if Undefined
    for(i = 0; i < updatelist.length; i++) {
        if (typeof updatelist[i].layer == 'undefined') {
            updatelist[i].layer = 5
        }

        updatelist[i].id = i
    };

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
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]); // Inserts canvas into HTML
        camera.start(x,y,angle,zoom);

        // Start Refresh Ticker
        msPrev = window.performance.now()
        function gameTick() {
            window.requestAnimationFrame(gameTick)

            const msNow = window.performance.now()
            const msPassed = msNow - msPrev

            if (msPassed < 1000/maxfps) return

            const excessTime = msPassed % (1000/maxfps)
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

        clickhandler.start()
    },

    // Wipe Canvas To Create Refresh Effect
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}

// Camera object controls placement of all objects relative to player
var camera = {
    start : function(x, y, angle, zoom) {
        this.cx = x;
        this.cy = y;
        this.cangle = angle;
        this.czoom = zoom * ((gameWindow.canvas.height**0.5)/(1080**0.5));
    },

    // Objects use the position function to get position relative to player
    position : function(x, y, rot=0) {
        let distance = (Math.sqrt(Math.pow(x-this.cx,2)+Math.pow(y-this.cy,2)))*scalar*(camera.czoom/100)
        let angle = invtan2((y-this.cy),(x-this.cx))+(this.cangle+orientOffset)
        return [
            (cos(angle))*distance, //x return
            (sin(angle))*distance, //y return
            rot - (this.cangle+orientOffset), //angle return
            angle //offset angle return
        ]
        
        //return [this.x2, this.y2, this.angle2, this.angle]
    }
}

// The player object (present on all maps)
var player = {
    start : function(x, y, angle, zoom) {
        // Config For The Car
        this.deceleration = 6.5
        this.turnback = 5
        this.maxturndeg = 30
        this.wheelbase = 3
        this.acceleration = 4

        // Defining Starting Variables On Creation
        this.type = 0;
        this.paused = false;
        this.width = 2.3;
        this.height = 5;
        this.speed = 0;
        this.turndeg = 0;
        this.layer = 3;
        this.carimage = new Image();
        this.carimage.src = "textures/car.png";
        this.expimage = new Image();
        this.expimage.src = "textures/explosion.png"
        this.distances = [125, 120, 91, 65, 53, 49, 48, 52, 62, 85, 125, 125, 125, 98, 68, 54, 49, 48, 50, 57, 74, 109, 125]
        for(let i in this.distances){this.distances[i] = this.distances[i]/50} //Converting distances from pixels @1920*1080 to meters
        this.wheeldistance = Math.sqrt(Math.pow(this.height/3,2) + Math.pow(this.width/3,2))
        this.wheelangles = [30,150,210,330]

        this.finished = new hudText()
    },

    // Move The Sprite When Update Is Called
    update : function() {
        // Update Camera Position (WIP)
        if(!this.paused) {
            this.turnrad = this.wheelbase/tan(this.turndeg)
            this.arcdeg = degrees(this.speed/this.turnrad)
            this.theta = 90 - ((180-this.arcdeg)/2)
            this.angularspeed = sin(this.arcdeg)/(sin((180-this.arcdeg)/2)/this.turnrad)
            camera.cangle += (this.speed/radians(this.turnrad))/fps
            this.prevloc = [camera.cx, camera.cy]
            if(this.turndeg != 0 && this.speed != 0) {
                camera.cx += (this.angularspeed * (sin(camera.cangle)))/fps
                camera.cy += (this.angularspeed * (cos(camera.cangle)))/fps
            } else {
                camera.cx += ((this.speed * (sin(camera.cangle))))/fps
                camera.cy += ((this.speed * (cos(camera.cangle))))/fps
            }
            if(isNaN(camera.cx) || isNaN(camera.cy)) {camera.cx = this.prevloc[0]; camera.cy = this.prevloc[1];}

            // Slow Down Effect
            if (!up && !down && !mobileHud.active) {
                if (this.speed > 0) {this.speed -= this.deceleration/fps; if(this.speed <=0){this.speed=0}} 
                else if (this.speed < 0) {this.speed += this.deceleration/fps; if(this.speed >=0){this.speed=0}}
                else {this.speed = 0}
            }
            
            // Stop Turning Effect
            if (this.turndeg > 0 && !(left || right)) {this.turndeg -= this.turnback * Math.abs(this.speed/fps); if(this.turndeg <=0){this.turndeg=0}} 
            else if (this.turndeg < 0 && !(left || right)) {this.turndeg += this.turnback * Math.abs(this.speed/fps); if(this.turndeg >=0){this.turndeg=0}}
            else if (!(left || right)) {this.rotation = 0}
        }

        // Update Player Visuals
        wheelL = gameWindow.context;
        wheelL.save();
        wheelL.translate(((gameWindow.canvas.width/2 - ((this.wheeldistance*0.8)*(scalar)*(camera.czoom/100)*sin(orientOffset+35)))), ((gameWindow.canvas.height/2 - ((this.wheeldistance*0.8)*(scalar)*(camera.czoom/100)*cos(orientOffset+35)))));
        wheelL.rotate(radians(this.turndeg - orientOffset));
        wheelL.fillStyle = "black";
        wheelL.fillRect(((this.width/10) / -2)*scalar*(camera.czoom/100), ((this.height/6) / -2)*scalar*(camera.czoom/100), (this.width/10)*(scalar)*(camera.czoom/100), (this.height/6)*(scalar)*(camera.czoom/100));
        wheelL.restore();

        wheelR = gameWindow.context;
        wheelR.save();
        wheelR.translate(((gameWindow.canvas.width/2 - ((this.wheeldistance*0.8)*(scalar)*(camera.czoom/100)*sin(orientOffset-35)))), ((gameWindow.canvas.height/2 - ((this.wheeldistance*0.8)*(scalar)*(camera.czoom/100)*cos(orientOffset-35)))));
        wheelR.rotate(radians(this.turndeg - orientOffset));
        wheelR.fillStyle = "black";
        wheelR.fillRect(((this.width/10) / -2)*scalar*(camera.czoom/100), ((this.height/6) / -2)*scalar*(camera.czoom/100), (this.width/10)*(scalar)*(camera.czoom/100), (this.height/6)*(scalar)*(camera.czoom/100));
        wheelR.restore();

        car = gameWindow.context;
        car.save();
        car.translate(gameWindow.canvas.width/2, gameWindow.canvas.height/2);
        car.rotate(radians(orientOffset*-1));
        car.drawImage(this.carimage, ((this.width/-2)*(scalar)*(camera.czoom/100)), ((this.height/-2)*(scalar)*(camera.czoom/100)), this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));
        car.restore();

        // car = gameWindow.context;
        // car.fillStyle = "purple";
        // car.drawImage(this.carimage, (gameWindow.canvas.width/2)-((this.width/2)*(scalar)*(camera.czoom/100)), (gameWindow.canvas.height/2)-((this.height/2)*(scalar)*(camera.czoom/100)), this.width*(scalar)*(camera.czoom/100), this.height*(scalar)*(camera.czoom/100));

        // Let the renderer know rendering is complete
        upcount++
    },

    explosion : function() {
        this.i = Math.floor(Math.random() * 360)
        exp = gameWindow.context;
        exp.save();
        exp.translate(((gameWindow.canvas.width/2 + ((this.width/3.0)*(scalar)*(camera.czoom/100)))), ((gameWindow.canvas.height/2 - ((this.height/3.8)*(scalar)*(camera.czoom/100)))));
        exp.rotate(radians(this.turndeg));
        exp.fillRect(((this.width/10) / -2)*scalar*(camera.czoom/100), ((this.height/6) / -2)*scalar*(camera.czoom/100), (this.width/10)*(scalar)*(camera.czoom/100), (this.height/6)*(scalar)*(camera.czoom/100));
        exp.restore();
    },

    //Reset the game & Player
    reset : function() {
        camera.cx = player_position[0];
        camera.cy = player_position[1];
        camera.cangle = player_position[2];
        this.speed = 0;
        this.turndeg = 0;
        finishscreen.reset()
        this.paused = false
    }
}

// Refresh The Canvas (50x per second)
function updateGameWindow() {
    updatelistcache = [];
    gameWindow.canvas.width = window.innerWidth;
    gameWindow.canvas.height = window.innerHeight;
    camera.cangle = camera.cangle%360
    layercounts = [0,0,0,0,0]
    
    // Debug ticker gives steady timer to load fps
    upcount = 0
    const d = new Date();
    fpsrec += 1
    if (lasttime + 250 <= d.getTime()) {
        lasttime = d.getTime();

        // Update debug text
        fpscount.text = `FPS: ${fpsrec * 4} / ${maxfps}`;
        //fpscount.text = `Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`
        if (debug) {
            speedometer.text = `Speed: ${Round(player.speed,1)}mps : ${Round(player.speed*3.6,1)}kmph : ${Round(player.speed*2.237,1)}mph, Turn Angle: ${Round(player.turndeg,1)}°, Turn Radius: ${Round(player.turnrad,1)}, Res. Angle: ${Round((player.speed/player.turnrad),1)}°`
            posdebug.text = `Position: ${Round(camera.cx,1)}, ${Round(camera.cy,1)}, ${Round(camera.cangle,1)}°, Mouse Pos: ${Round(clickhandler.x)}, ${Round(clickhandler.y)}, ${clickhandler.click}`
        }
        fps = fpsrec * 4;
        fpsrec = 0;
    }
    if(debug == false) {
        if(clickhandler.hovered(93.5,100,0,2)) {
            fpscount.alpha = 1
        } else {
            fpscount.alpha = 0
        }
    }

    // Defining and Detecting Keypresses
    if (gameWindow.keys && (gameWindow.keys[37] || gameWindow.keys[65])) {left = true; a_key = true} else {left = false; a_key = false}
    if (gameWindow.keys && (gameWindow.keys[39] || gameWindow.keys[68])) {right = true; d_key = true} else {right = false; d_key = false}
    if (gameWindow.keys && (gameWindow.keys[38] || gameWindow.keys[87])) {up = true} else {up = false}
    if (gameWindow.keys && (gameWindow.keys[40] || gameWindow.keys[83])) {down = true} else {down = false}
    if (gameWindow.keys && (gameWindow.keys[27])) {esc = true} else {esc = false}
    if (gameWindow.keys && (gameWindow.keys[82])) {r_key = true} else {r_key = false}
    if (gameWindow.keys && (gameWindow.keys[83])) {s_key = true} else {s_key = false}
    if (gameWindow.keys && (gameWindow.keys[67])) {c_key = true} else {c_key = false}
    if (gameWindow.keys && (gameWindow.keys[73])) {i_key = true} else {i_key = false}
    if (gameWindow.keys && (gameWindow.keys[32])) {space = true} else {space = false}

    if(player.paused){left=false; right=false; up=false; down=false;}

    // ############# Keycode Finder ############
    // if (gameWindow.keys) {
    //     for(i = 0; i < gameWindow.keys.length; i++) {
    //         if (gameWindow.keys[i])
    //             console.debug(`Key ${i} pressed`);
    //     }
    // }
    
    // Refresh Game Window
    gameWindow.clear();

    // Affect player when buttons pressed
    if(!player.paused && fps > 8) {
        if (left && (player.turndeg > (player.maxturndeg*-1))) {player.turndeg -= (120/fps); }
        if (right && (player.turndeg < (player.maxturndeg))) {player.turndeg += (120/fps); }
        if (up && (player.speed < 10)) {if(player.speed >= 0) {player.speed += (player.acceleration/fps)} else {player.speed += 10/fps}}
        if (down && (player.speed > -10)) {if(player.speed <= 0) {player.speed -= (player.acceleration/fps)} else {player.speed -= 10/fps}}
    }
    
    // Pause Menu (WIP)
    if(esc) {pausemenu.toggle(); console.info("Esc pressed")}

    if(clickhandler.mobileUser && !pausemenu.controlschosen) {
        pausemenu.openmenu(-1)
    }

    // //Check for dialog
    // if(pausemenu.menu == -1) {
    //     pausemenu.controlsdialog()
    // }
    
    // Load all objects, upcount allows objects to notify loader when they complete loading to avoid async overlap

    for (g = 1; g < 6; g++) {
        for (f = 0; f < updatelist.length; f++) {
            if (updatelist[f].layer == g) {
                updatelist[f].update()
            }
        }
    }

    mobileHud.update()

    if(rightUpDialog) {
        updateAll(rightUp)
    }

    //console.debug(loaded)
    if((fps > 8) && (loadopac >= 1) && (loadcount == global.length)) {
        if (Math.round(loadopac) != 0){
            loadopac += (0 - loadopac)/10
            document.getElementById("loadingscreen").style.opacity = `${loadopac/100}`
        }
        if(loadopac < 1) {document.getElementById("loadingscreen").remove()}
    }

    for(let i in infomenus) {
        if(renderlist[i] == 1) {
            updateAll(infomenus[i][0])
        } else if (renderlist[i] == 2) {
            updateAll(infomenus[i][1])
        }
    }

    clickhandler.update()
    updateAll(hud)
    if(debug) {
        updateAll(debughud)
    }

}