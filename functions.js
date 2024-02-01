// Custom Functions

//Math
function degrees(radians) {return (radians * (180/Math.PI)) % 360}
function radians(degrees) {return degrees * (Math.PI/180)}
function Round(number, points=0) {return (Math.round(number * Math.pow(10,points))/Math.pow(10,points))}
function cos(theta) {return Round(Math.cos(theta * Math.PI/180),10)} //Cos in degrees
function sin(theta) {return Round(Math.sin(theta * Math.PI/180),10)} //Sin in degrees
function tan(theta) {return Round(Math.tan(theta * Math.PI/180),10)} //Tan in degrees
function invtan(imp) {return Math.atan(imp) * 180/Math.PI} //Inverse tan in degrees
function invtan2(imp1,imp2) {return Math.atan2(imp1,imp2) * 180/Math.PI}
function mod(n1, n2) {return ((n1 % n2) + n2) % n2};
function mod360(n1) {return ((n1 % 360) + 360) % 360};
function average(list) {
    this.sum = 0
    for(this.i = 0; this.i <= list.length-1; this.i++) {this.sum += list[i]}
    return this.sum/list.length
}

//Game
function updateAll(...list) {
    for(let j in list) {
        for(let i in list[j]) {
            list[j][i].update()
        }
    }
}
function loadsprites(map, maps) {
    for (i = 0; i < cartextures.length; i++) {
        f = new Image();
        f.src = cartextures[i][0]
        loadedcartextures.push([f,cartextures[i][1],cartextures[i][2]])
    }

    for (i = 0; i < textures[0].length; i++) {
        f = new Image();
        f.src = textures[0][i][1]
        f.onload = function() {loadcount++}
        loadedtextures[textures[0][i][0]] = f
    }

    if (typeof(textures[map]) != "undefined") {
        for (i = 0; i < textures[map].length; i++) {
            f = new Image();
            f.src = textures[map][i][1]
            loadedtextures[textures[map][i][0]] = f
        }
    }

    for (i = 0; i < maps[map-1].length; i++) {
        maps[map-1][i].start()
    }
}
function clickbox(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    if ((mousepos[0] > (this.x - this.width/2)) && (mousepos[0] < (this.x + this.width/2)) && -(mousepos[1] < (this.y + (this.height/2))) && (mousepos[1] > (this.y - (this.height/2)))) {
        if(mousedown == true) {
            return 2
        } else {
            return 1
        }
    } else {
        return 0
    }
}

//Animations
function animate(value, direction, type, limit, step, round=0) {
    let returnvar
    returnvar = (type) ? Round(value + (limit - value)/(step*(fps/60)), round): (direction) ? Round(value + (step*(60/fps)), round):Round(value - (step*(60/fps)), round)
    if(direction) {
        return (returnvar == value || returnvar == undefined || returnvar > limit) ? limit:returnvar
    } else {
        return (returnvar == value || returnvar == undefined || returnvar < limit) ? limit:returnvar
    }
}

// Button Functions
function setControls(type) {
    mobilecontrols = type
    pausemenu.controlschosen = true;
    pausemenu.toggle()
}

function pausemenutoggle() {
    pausemenu.toggle()
}