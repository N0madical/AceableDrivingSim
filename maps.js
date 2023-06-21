// #################### Instructions For Map Building  ####################

// ----- Placing objects:
// Add a new line to the desired map in the maps array
// Lines must follow format "new {type}({inputs}),"

// The avaliable input types are:
// 1: Rectangle Object, 
    //Format: "new rect(useimagetexture, x-position, y-position, rotation angle, width, height, texture/color, layer),"
    //Description: Places a rectangle on the canvas with a color or texture
// 2: Circle Object, 
    //Format: "new circle(useimagetexture, x-position, y-position, rotation angle, diameter, texture/color, layer),"
    //Description: Places a circle on the canvas with a color or texture
// 3: Repeating Terrain, 
    //Format: "new terrain(x-position, y-position, rotation angle, width, height, texture),"

// Information on inputs:
    // useimagetexture:
        // Value: True/False
        // Desc: Weather or not the object should render as a image or as a solid color
    // texture/color:
        // Value: "color name" or "texture name"
        // Desc: Define a solid color or texture based on useimagetexture input
    // layer: 
        // Value: Number 1-5
        // Desc: The visual hight of the object, 1 is lowest, 5 is highest, 3 will collide with player (same layer as player)

//Loading Textures
textures = [
    global = [
        ["asphalt", "textures/crasphalt.jpg"],
        ["grass", "textures/grass.jpg"],
    ],
    
    parkinglot = [
        ["lightpole", "textures/lightpole.png"],
        ["tree", "textures/tree.png"],
    ],
]

// Maps
maps = [
    // Parking lot map
    parkinglot = [
        //new testcirc(),
        new terrain(0, 0, 0, 15, 20, "asphalt"),
        new terrain(0, 0, 0, 100, 100, "grass"),

        new rect(true, -10, 8, 0, 8, 8, "tree", 5),
        new rect(true, -10, 0, 0, 8, 8, "tree", 5),
        new rect(true, -10, -8, 0, 8, 8, "tree", 5),

        new circle(false, 0, 10, 0, 5, "red", 4),

        new rect(false, 0, 4.0, 0, 0.1, 3, "black"),

        // new rect(false, -10, 8, 0, 8, 8, "red", 4),
        // new rect(false, -10, 0, 0, 8, 8, "red", 4),
        // new rect(false, -10, -8, 0, 8, 8, "red", 4),

        new rect(false, -10, 17.5, 0, 2.5, 0.25, "yellow"),
        new rect(false, -5, 17.5, 0, 2.5, 0.25, "yellow"),
        new rect(false, 0, 17.5, 0, 2.5, 0.25, "yellow"),
        new rect(false, 5, 17.5, 0, 2.5, 0.25, "yellow"),
        new rect(false, 10, 17.5, 0, 2.5, 0.25, "yellow"),

        new rect(false, 5.625, -7.5, 45, 0.25, 5, "yellow"), 
        new rect(false, 5.625, -3.75, 45, 0.25, 5, "yellow"),
        new rect(false, 5.625, 0, 45, 0.25, 5, "yellow"), 
        new rect(false, 5.625, 3.75, 45, 0.25, 5, "yellow"),
        new rect(false, 5.625, 7.5, 45, 0.25, 5, "yellow"),

        new rect(false, -5.625, -7.5, -45, 0.25, 5, "yellow"), 
        new rect(false, -5.625, -3.75, -45, 0.25, 5, "yellow"),
        new rect(false, -5.625, 0, -45, 0.25, 5, "yellow"), 
        new rect(false, -5.625, 3.75, -45, 0.25, 5, "yellow"),
        new rect(false, -5.625, 7.5, -45, 0.25, 5, "yellow"),

        //new rect(false, -7.5, 0, 0, 0.5, 20, "dimgray", 3),
        new rect(false, 7.5, 0, 0, 0.5, 20, "dimgray", 3),
    ],

    // Road map (WIP)
    road = [],
]