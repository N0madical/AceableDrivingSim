// #################### Instructions For Map Building  ####################


// ----- Placing objects:
// Add a new line to the desired map in the maps array
// Lines must follow format "new {type}({inputs}),"


// ----- Avaliable shape types are:
// 1: Rectangle Object, 
    // Format: "new rect(useimagetexture, x-position, y-position, rotation angle, width, height, texture/color, layer),"
    // Description: Places a rectangle on the canvas with a color or texture

// 2: Circle Object, 
    // Format: "new circle(useimagetexture, x-position, y-position, rotation angle, radius, texture/color, layer),"
    // Description: Places a circle on the canvas with a color or texture

// 3: Repeating Terrain, 
    // Format: "new terrain(x-position, y-position, rotation angle, width, height, texture),"
    // Description: Places a rectagle of a repeating terrain image on the canvas (image must be tileable!)

// 4: Parking Spot
    // Format: "new parkingspot (iscircle, x-position, y-position, angle, width, height),"
    // Description: Places a rectangle or circle that denotes where the player should park


// ----- Information on inputs:
    // useimagetexture:
        // Value: True/False
        // Desc: Weather or not the object should render as a image or as a solid color
    // texture/color:
        // Value: "color name" or "texture name"
        // Desc: Define a solid color or texture based on useimagetexture input
    // layer: 
        // Value: Number 1-5
        // Desc: The visual hight of the object, 1 is lowest, 5 is highest, 3 will collide with player (same layer as player)
    // iscircle:
        // Value: True/False
        // Desc: Tells the object to render as a rectange or a circle


// ########################################################################

//Loading Configs
configs = [
    parkinglot = [
        startpos = [1.5,0,0],
        startzoom = 100,
    ],

    parkinglot2 = [
        startpos = [0,0,0],
        startzoom = 100,
    ],

    road = [
        startpos = [0,0,0],
        startzoom = 100,
    ],

    test = [
        startpos = [0,0,0],
        startzoom = 100,
    ],
]

cartextures = [
    ["textures/car.png", 2.3, 5], //0
    ["textures/carblack.png", 2.3, 5], //1
    ["textures/carblue.png", 2.3, 5], //2
    ["textures/cardarkblue.png", 2.3, 5], //3
    ["textures/carlightblue.png", 2.3, 5], //4 
    ["textures/cargray.png", 2.3, 5], //5
]

//Loading Textures
textures = [
    global = [
        ["asphalt", "textures/crasphalt.jpg"],
        ["grass", "textures/grass.jpg"],
        ["road", "textures/road.png"]
    ],
    
    parkinglot = [
        ["lightpole", "textures/lightpole.png"],
        ["tree", "textures/tree.png"],
        ["grleaves", "textures/leaves_grass.jpg"],
        ["driveway", "textures/driveway.png"],
        ["arrow", "textures/arrow.png"],
    ],
    
    parkinglot2 = [
        ["lightpole", "textures/lightpole.png"],
        ["tree", "textures/tree.png"],
    ],

    road = [
        ["lightpole", "textures/lightpole.png"],
        ["tree", "textures/tree.png"],
        ["grleaves", "textures/leaves_grass.jpg"],
        ["driveway", "textures/driveway.png"],
        ["arrow", "textures/arrow.png"],
    ],

    test = [],

]

// Maps
maps = [
    // Parking lot map
    parkinglot = [
        new infospot(x=18, y=0, size=2, menu=0),
        //new infospot(0, 0, 2, 0),

        new car(type=0, x=0, y=-10, angle=180, speed=3, turn=0, logicID=1),

        new terrain(0, 0, 0, 90, 80, "grass"),

        new terrain(0, 0, 0, 50, 42, "asphalt"),

        new terrain(0, 30.5, 0, 90, 8, "road"),

        new terrain(-11, 0, 0, 5, 20, "grleaves"),
        new terrain(11, 0, 0, 5, 20, "grleaves"),

        new rect(true, 0, 25.5, 0, 10, 10, "driveway", 3),
        new rect(true, 1.5, -8, 0, 2, 3, "arrow", 2),
        new rect(true, -1.5, -8, 180, 2, 3, "arrow", 2),
        new rect(true, 1.5, 8, 0, 2, 3, "arrow", 2),
        new rect(true, -1.5, 8, 180, 2, 3, "arrow", 2),
        new rect(true, -19.25, -8, 0, 2, 3, "arrow", 2),
        new rect(true, -19.25, 8, 0, 2, 3, "arrow", 2),
        new rect(true, 19.25, -8, 180, 2, 3, "arrow", 2),
        new rect(true, 19.25, 8, 180, 2, 3, "arrow", 2),
        new rect(true, 11, 16, 270, 2, 3, "arrow", 2),
        new rect(true, -11, 16, 270, 2, 3, "arrow", 2),
        new rect(true, 11, -16, 90, 2, 3, "arrow", 2),
        new rect(true, -11, -16, 90, 2, 3, "arrow", 2),

        new circle(true, -11, 8, 0, 8, "tree", 360, 5),
        new circle(true, -11, 0, 70, 8, "tree", 360, 5), // ID: 10
        new circle(true, -11, -8, 230, 8, "tree", 360, 5),

        new circle(true, 11, 8, 0, 8, "tree", 360, 5),
        new circle(true, 11, 0, 70, 8, "tree", 360, 5),
        new circle(true, 11, -8, 230, 8, "tree", 360, 5),

        new circle(true, -27, 10, 0, 8, "tree", 360, 5),
        new circle(true, -27, 0, 70, 8, "tree", 360, 5),
        new circle(true, -27, -10, 230, 8, "tree", 360, 5),
        new circle(true, -22, 19, 70, 8, "tree", 360, 5),
        new circle(true, -22, -19, 230, 8, "tree", 360, 5),
        new circle(true, -12, 23, 70, 8, "tree", 360, 5), // ID: 20
        new circle(true, -12, -23, 230, 8, "tree", 360, 5),

        new circle(true, 27, 10, 0, 8, "tree", 360, 5),
        new circle(true, 27, 0, 70, 8, "tree", 360, 5),
        new circle(true, 27, -10, 230, 8, "tree", 360, 5),
        new circle(true, 22, 19, 70, 8, "tree", 360, 5),
        new circle(true, 22, -19, 230, 8, "tree", 360, 5),
        new circle(true, 12, 23, 70, 8, "tree", 360, 5),
        new circle(true, 12, -23, 230, 8, "tree", 360, 5),
        new circle(true, 0, -23, 230, 8, "tree", 360, 5),

        new rect(false, -23, -7.5, 45, 0.15, 5, "yellow"), // ID: 30
        new rect(false, -23, -3.75, 45, 0.15, 5, "yellow"),
        new rect(false, -23, 0, 45, 0.15, 5, "yellow"), 
        new rect(false, -23, 3.75, 45, 0.15, 5, "yellow"),
        new rect(false, -23, 7.5, 45, 0.15, 5, "yellow"),

        new rect(false, -15.5, -7.5, -45, 0.15, 5, "yellow"), 
        new rect(false, -15.5, -3.75, -45, 0.15, 5, "yellow"),
        new rect(false, -15.5, 0, -45, 0.15, 5, "yellow"), 
        new rect(false, -15.5, 3.75, -45, 0.15, 5, "yellow"),
        new rect(false, -15.5, 7.5, -45, 0.15, 5, "yellow"),

        new rect(false, -6, -10, 90, 0.15, 5, "yellow"), // ID: 40
        new rect(false, -6, -7.5, 90, 0.15, 5, "yellow"),
        new rect(false, -6, -5, 90, 0.15, 5, "yellow"), 
        new rect(false, -6, -2.5, 90, 0.15, 5, "yellow"), 
        new rect(false, -6, 0, 90, 0.15, 5, "yellow"), 
        new rect(false, -6, 2.5, 90, 0.15, 5, "yellow"),
        new rect(false, -6, 5, 90, 0.15, 5, "yellow"),
        new rect(false, -6, 7.5, 90, 0.15, 5, "yellow"),
        new rect(false, -6, 10, 90, 0.15, 5, "yellow"),

        new parkingspot(false, -5.75, -8.75, 90, 2, 4),
        new car(0, -6, -6.25, 90),
        new car(3, -6.1, -3.75, 90),
        new car(0, -5.7, -1.25, 90),
        new parkingspot(false, -5.75, 1.25, 90, 2, 4),
        new car(4, -6.3, 3.75, 90),
        new car(0, -6.1, 6.25, 90),
        new parkingspot(false, -5.75, 8.75, 90, 2, 4),

        new car(4, 6.1, -8.75, 270),
        new car(5, 6.2, -6.25, 270),
        new parkingspot(false, 5.75, -3.75, 90, 2, 4),
        new car(1, 5.6, -1.25, 270),
        new car(5, 6, 1.25, 270),
        new parkingspot(false, 5.75, 3.75, 90, 2, 4),
        new car(4, 6.1, 6.25, 270),
        new parkingspot(false, 5.75, 8.75, 90, 2, 4),

        new car(3, 15.25, -6.25, 180),
        new parkingspot(false, 15.1, 0, 0, 2, 5),
        new car(2, 15, 6.25, 180),

        new car(0, 22.9, -8.5, 180),
        new parkingspot(false, 22.9, -2.9, 0, 2, 5),
        new car(1, 23, 2.75, 180),
        new car(4, 22.75, 8.5, 180),

        new car(5, -15.5, -5.5, 315),
        new car(1, -15, -1.25, 315),
        new car(5, -15.25, 2, 315),
        new car(4, -15.5, 5.5, 315),

        new car(0, -23, -5.5, 45),
        new car(1, -22.75, -2, 45),
        new parkingspot(false, -22.5, 1.3, 45, 2, 5),
        new car(2, -22.5, 5, 45),
        
        new rect(false, 6, -10, 90, 0.15, 5, "yellow"), 
        new rect(false, 6, -7.5, 90, 0.15, 5, "yellow"),
        new rect(false, 6, -5, 90, 0.15, 5, "yellow"), 
        new rect(false, 6, -2.5, 90, 0.15, 5, "yellow"), 
        new rect(false, 6, 0, 90, 0.15, 5, "yellow"), 
        new rect(false, 6, 2.5, 90, 0.15, 5, "yellow"),
        new rect(false, 6, 5, 90, 0.15, 5, "yellow"),
        new rect(false, 6, 7.5, 90, 0.15, 5, "yellow"),
        new rect(false, 6, 10, 90, 0.15, 5, "yellow"),

        new rect(false, 14.75, -10.5, 90, 0.15, 3, "yellow"), 
        new rect(false, 15, -3.5, 90, 0.15, 2.5, "yellow"), 
        new rect(false, 15, 3.5, 90, 0.15, 2.5, "yellow"), // ID: 60
        new rect(false, 14.75, 10.5, 90, 0.15, 3, "yellow"),

        new rect(false, 23.25, -11.5, 90, 0.15, 3, "yellow"), 
        new rect(false, 23, -5.75, 90, 0.15, 2.5, "yellow"), 
        new rect(false, 23, 0, 90, 0.15, 2.5, "yellow"), 
        new rect(false, 23, 5.75, 90, 0.15, 2.5, "yellow"),
        new rect(false, 23.25, 11.5, 90, 0.15, 3, "yellow"),

        //new rect(false, 19, 2, 90, 0.15, 5, "yellow"),

        new rect(false, -8.5, 0, 0, 0.5, 20, "dimgray", 3),
        new rect(false, -13.5, 0, 0, 0.5, 20, "dimgray", 3),
        new circle(isimage=false, x=-11, y=-10, angle=0, diameter=5.5, fill="dimgray", arc=180, layer=3),
        new circle(isimage=false, x=-11, y=10, angle=180, diameter=5.5, fill="dimgray", arc=180, layer=3), // ID: 70

        new rect(false, 8.5, 0, 0, 0.5, 20, "dimgray", 3),
        new rect(false, 13.5, 0, 0, 0.5, 20, "dimgray", 3),
        new circle(isimage=false, x=11, y=-10, angle=0, diameter=5.5, fill="dimgray", arc=180, layer=3),
        new circle(isimage=false, x=11, y=10, angle=180, diameter=5.5, fill="dimgray", arc=180, layer=3),

        new rect(false, -24.5, 0, 0, 0.5, 30, "dimgray", 3),
        new rect(false, 24.5, 0, 0, 0.5, 30, "dimgray", 3),
        new rect(false, -21.5, 17.75, -45, 0.5, 8.5, "dimgray", 3),
        new rect(false, 21.5, 17.75, 45, 0.5, 8.5, "dimgray", 3),
        new rect(false, -21.5, -17.75, 45, 0.5, 8.5, "dimgray", 3),
        new rect(false, 21.5, -17.75, -45, 0.5, 8.5, "dimgray", 3),
        new rect(false, 0, -20.75, 0, 38, 0.5, "dimgray", 3),
        new rect(false, 11.2, 20.75, 0, 16, 0.5, "dimgray", 3),
        new rect(false, -11.2, 20.75, 0, 16, 0.5, "dimgray", 3),
    ],

    parkinglot2 = [
        //new testcirc(),
        new terrain(0, 0, 0, 50, 50, "asphalt"),
        new terrain(0, 0, 0, 100, 100, "grass"),

        new circle(true, -10, 8, 0, 8, "tree", 5),
        new circle(true, -10, 0, 70, 8, "tree", 5),
        new circle(true, -10, -8, 230, 8, "tree", 5),
        
        // far right side yellow lines
        new rect(false, 22.5, 24, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 21.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 19, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 16.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 14, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 11.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 9, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 6.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 4, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, 1.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -1, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -3.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -6, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -8.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -11, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -13.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -16, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -18.5, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -21, 90, 0.15, 5, "yellow"),
        new rect(false, 22.5, -23.5, 90, 0.15, 5, "yellow"),

        new rect(false, 25, 0, 0, 0.5, 50.5, "dimgray", 3), //right curb
        new rect(false, 0, 25, 0, 50.5, 0.5, "dimgray", 3), // top curb
        new rect(false, 0, -25, 0, 50.5, 0.5, "dimgray", 3), //bottom curb
        new rect(false, 8, 0, 0, 0.5, 35, "dimgray", 3), //right curb
        

        new parkingspot(false, 22.5, 22.75, 90, 2, 4), //green spot
        new parkingspot(false, 22.5, -2.25, 90, 2, 4), //green spot
    ],

    // Road map (WIP)
    road = [
        new infospot(x=18, y=0, size=2, menu=0),
        new car(cartype=0, x=0, y=-10, angle=180, speed=3, turn=0, logicID=1, layer=4, colisionmod=[0,0]),
        new terrain(x=0, y=0, angle=0, width=90, height=80, image='grass', layer=1, scalex=100, scaley=100),
        new terrain(x=0, y=0, angle=0, width=50, height=42, image='asphalt', layer=1, scalex=100, scaley=100),
        new terrain(x=0, y=30.5, angle=0, width=90, height=8, image='road', layer=1, scalex=100, scaley=100),
        new terrain(x=-11, y=0, angle=0, width=5, height=20, image='grleaves', layer=1, scalex=100, scaley=100),
        new terrain(x=11, y=0, angle=0, width=5, height=20, image='grleaves', layer=1, scalex=100, scaley=100),
        new rect(isimage=true, x=0, y=25.5, angle=0.00001, width=10, height=10, fill='driveway', layer=3),
        new rect(isimage=true, x=1.5, y=-8, angle=0.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=-1.5, y=-8, angle=180.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=1.5, y=8, angle=0.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=-1.5, y=8, angle=180.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=-19.25, y=-8, angle=0.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=-19.25, y=8, angle=0.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=19.25, y=-8, angle=180.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=19.25, y=8, angle=180.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=11, y=16, angle=270.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=-11, y=16, angle=270.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=11, y=-16, angle=90.00001, width=2, height=3, fill='arrow', layer=2),
        new rect(isimage=true, x=-11, y=-16, angle=90.00001, width=2, height=3, fill='arrow', layer=2),
        new circle(isimage=true, x=-11, y=8, angle=0, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-11, y=0, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-11, y=-8, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=11, y=8, angle=0, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=11, y=0, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=11, y=-8, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-27, y=10, angle=0, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-27, y=0, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-27, y=-10, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-22, y=19, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-22, y=-19, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-12, y=23, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=-12, y=-23, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=27, y=10, angle=0, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=27, y=0, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=27, y=-10, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=22, y=19, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=22, y=-19, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=12, y=23, angle=70, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=12, y=-23, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new circle(isimage=true, x=0, y=-23, angle=230, diameter=8, fill='tree', arc=360, layer=5),
        new rect(isimage=false, x=-23, y=-7.5, angle=45.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-23, y=-3.75, angle=45.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-23, y=0, angle=45.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-23, y=3.75, angle=45.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-23, y=7.5, angle=45.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-15.5, y=-7.5, angle=-44.99999, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-15.5, y=-3.75, angle=-44.99999, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-15.5, y=0, angle=-44.99999, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-15.5, y=3.75, angle=-44.99999, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-15.5, y=7.5, angle=-44.99999, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=-10, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=-7.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=-5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=-2.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=0, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=2.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=7.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=-6, y=10, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new parkingspot(iscircle=false, x=-5.75, y=-8.75, angle=90, width=2, height=4, idealangle=90),
        new car(cartype=0, x=-6, y=-6.25, angle=90, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=3, x=-6.1, y=-3.75, angle=90, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=0, x=-5.7, y=-1.25, angle=90, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=-5.75, y=1.25, angle=90, width=2, height=4, idealangle=90),
        new car(cartype=4, x=-6.3, y=3.75, angle=90, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=0, x=-6.1, y=6.25, angle=90, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=-5.75, y=8.75, angle=90, width=2, height=4, idealangle=90),
        new car(cartype=4, x=6.1, y=-8.75, angle=270, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=5, x=6.2, y=-6.25, angle=270, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=5.75, y=-3.75, angle=90, width=2, height=4, idealangle=90),
        new car(cartype=1, x=5.6, y=-1.25, angle=270, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=5, x=6, y=1.25, angle=270, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=5.75, y=3.75, angle=90, width=2, height=4, idealangle=90),
        new car(cartype=4, x=6.1, y=6.25, angle=270, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=5.75, y=8.75, angle=90, width=2, height=4, idealangle=90),
        new car(cartype=3, x=15.25, y=-6.25, angle=180, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=15.1, y=0, angle=0, width=2, height=5, idealangle=0),
        new car(cartype=2, x=15, y=6.25, angle=180, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=0, x=22.9, y=-8.5, angle=180, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=22.9, y=-2.9, angle=0, width=2, height=5, idealangle=0),
        new car(cartype=1, x=23, y=2.75, angle=180, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=4, x=22.75, y=8.5, angle=180, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=5, x=-15.5, y=-5.5, angle=315, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=1, x=-15, y=-1.25, angle=315, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=5, x=-15.25, y=2, angle=315, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=4, x=-15.5, y=5.5, angle=315, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=0, x=-23, y=-5.5, angle=45, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new car(cartype=1, x=-22.75, y=-2, angle=45, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new parkingspot(iscircle=false, x=-22.5, y=1.3, angle=45, width=2, height=5, idealangle=45),
        new car(cartype=2, x=-22.5, y=5, angle=45, speed=0, turn=0, logicID=0, layer=4, colisionmod=[0,0]),
        new rect(isimage=false, x=6, y=-10, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=-7.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=-5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=-2.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=0, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=2.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=7.5, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=6, y=10, angle=90.00001, width=0.15, height=5, fill='yellow', layer=2),
        new rect(isimage=false, x=14.75, y=-10.5, angle=90.00001, width=0.15, height=3, fill='yellow', layer=2),
        new rect(isimage=false, x=15, y=-3.5, angle=90.00001, width=0.15, height=2.5, fill='yellow', layer=2),
        new rect(isimage=false, x=15, y=3.5, angle=90.00001, width=0.15, height=2.5, fill='yellow', layer=2),
        new rect(isimage=false, x=14.75, y=10.5, angle=90.00001, width=0.15, height=3, fill='yellow', layer=2),
        new rect(isimage=false, x=23.25, y=-11.5, angle=90.00001, width=0.15, height=3, fill='yellow', layer=2),
        new rect(isimage=false, x=23, y=-5.75, angle=90.00001, width=0.15, height=2.5, fill='yellow', layer=2),
        new rect(isimage=false, x=23, y=0, angle=90.00001, width=0.15, height=2.5, fill='yellow', layer=2),
        new rect(isimage=false, x=23, y=5.75, angle=90.00001, width=0.15, height=2.5, fill='yellow', layer=2),
        new rect(isimage=false, x=23.25, y=11.5, angle=90.00001, width=0.15, height=3, fill='yellow', layer=2),
        new rect(isimage=false, x=-8.5, y=0, angle=0.00001, width=0.5, height=20, fill='dimgray', layer=3),
        new rect(isimage=false, x=-13.5, y=0, angle=0.00001, width=0.5, height=20, fill='dimgray', layer=3),
        new circle(isimage=false, x=-11, y=-10, angle=0, diameter=5.5, fill='dimgray', arc=180, layer=3),
        new circle(isimage=false, x=-11, y=10, angle=180, diameter=5.5, fill='dimgray', arc=180, layer=3),
        new rect(isimage=false, x=8.5, y=0, angle=0.00001, width=0.5, height=20, fill='dimgray', layer=3),
        new rect(isimage=false, x=13.5, y=0, angle=0.00001, width=0.5, height=20, fill='dimgray', layer=3),
        new circle(isimage=false, x=11, y=-10, angle=0, diameter=5.5, fill='dimgray', arc=180, layer=3),
        new circle(isimage=false, x=11, y=10, angle=180, diameter=5.5, fill='dimgray', arc=180, layer=3),
        new rect(isimage=false, x=-24.5, y=0, angle=0.00001, width=0.5, height=30, fill='dimgray', layer=3),
        new rect(isimage=false, x=24.5, y=0, angle=0.00001, width=0.5, height=30, fill='dimgray', layer=3),
        new rect(isimage=false, x=-21.5, y=17.75, angle=-44.99999, width=0.5, height=8.5, fill='dimgray', layer=3),
        new rect(isimage=false, x=21.5, y=17.75, angle=45.00001, width=0.5, height=8.5, fill='dimgray', layer=3),
        new rect(isimage=false, x=-21.5, y=-17.75, angle=45.00001, width=0.5, height=8.5, fill='dimgray', layer=3),
        new rect(isimage=false, x=21.5, y=-17.75, angle=-44.99999, width=0.5, height=8.5, fill='dimgray', layer=3),
        new rect(isimage=false, x=0, y=-20.75, angle=0.00001, width=38, height=0.5, fill='dimgray', layer=3),
        new rect(isimage=false, x=11.2, y=20.75, angle=0.00001, width=16, height=0.5, fill='dimgray', layer=3),
        new rect(isimage=false, x=-11.2, y=20.75, angle=0.00001, width=16, height=0.5, fill='dimgray', layer=3),        
    ],

    test = [
        new rect(false, 10, 0, 0, 0.5, 0.5, "dimgray", 3),
    ]
]


//Object Syntax: [
//         Interaction Object (Options: 0 = at value, 1 = Wall, 2 = Curb, 3 = Terrain, 4 = Cover, 5 = NPC Car, 6 = Player Car, Array = IDs), 
//         Path(1 = Streight Path, 2 = Real Path) OR Check(1=x, 2=y, 3=angle, 4=velocity), 
//         Distance Along Path OR [Check Value,range],
//         Resulting [X,Y,Angle,Velocity, angletype(false = turn, true = angle), ifDirectional] Change, 
//         Exclusive (Optional)
//         Repeats (Optional) #Cancels all following actions
//        ]

carscripts = [
    script1 = [
        [2, 1, 7, [0,0,-60,0, 1, false], true],
        [0, 3, [0,2], [0,0,0,0, 1, false]],
        [0, 3, [90,2], [0,0,0,0, 1, false]],
        [0, 3, [180,2], [0,0,0,0, 1, false]],
        [0, 3, [270,2], [0,0,0,0, 1, false]],
    ],
    // script2 = [
    //     [0, 3, [0,1], [0,0,0,0, 1, false]],
    //     [0, 3, [0,1], [0,0,0,0, 3, false]],
    //     //[0, 3, [90,1], [0,0,0,0, false]],
    //     [0, 3, [180,1], [0,0,0,0, 1, false]],
    //     [0, 3, [180,1], [0,0,180,0, 3, false]],
    //     //[0, 3, [270,1], [0,0,0,0, false]],
    //     [2, 1, 5, [0,0,70,0, 1, false]],
    // ],
]

infomenus = [
    [
        [
            new hudRect(50, 10, 10, 15, "#1b2932", 50, false, "both", 0, "toolTipToggle", [0]),
            new hudText("Parallel\nParking", 50, 6, 35, "center", "white", alpha=0),
            new hudRect(50, 14, 2, 3.5, "info.png", 0, true, "width", alpha=0)
        ],
        [
            new hudRect(50, 40, 50, 60, "#1b2932",  25, false, "both"),
            new hudText("x", 73, 13, 60, "center", "white", 1, "Arial", "toolTipToggle", [0]),
            new hudText("Parallel Parking", 50, 15, 60, "center", "white"),
            new hudRect(35, 40, 12, 40, "tooltip1.JPG", 0, true, "height"),
            new hudText("Start by pulling up next to\nthe car in front of your\nparking space\n\nThen, back in at a tight angle\nand streighten out before\nhitting the curb.", 43, 25, 40, "left", "white"),
        ],
    ]
]

//GUI
//hudRect: x, y, width, height, color, image, autoresize, transparency
//hudText: text, x, y, size, justify="left", color="white", alpha=1, font="Arial", clickevent="", args=[]
//hudSlider: x, y, width, height, value, min, max, barcolor, handlecolor, step
guipages = [
    hud = [
        fpscount = new hudText("FPS: Error", 99.5, 1.25, size=15, justify="right"),
    ],
    debughud = [
        speedometer = new hudText("Speed: Error", 99, 5, 25, "right"),
        posdebug = new hudText("Position: Error", 99, 8, 25, "right"),
        border = new carborder(),
    ],
    mobileContolHud = [
        new hudRect(88, 50, (1*(1080/1920)), 1, "white", 90, false, "width", 0.2),
        new hudRect(88, 50, (3*(1080/1920)), 3, "white", 90, false, "width", 0.4),
        new hudRect(88, 50, (6*(1080/1920)), 6, "white", 90, false, "width", 0.6),
        new hudRect(88, 50, (9*(1080/1920)), 9, "white", 90, false, "width", 0.8),
        new hudRect(88, 50, (12*(1080/1920)), 12, "white", 20, false, "width")
    ],
    choosecontrolstext = [
        new hudRect(50, 50, 60, 60, "#1b2932", 50),
        new hudRect(36, 57, 1, 35, "#49545b", 0, false, "both", 1, "setControls", ("1")),
        new hudRect(64, 57, 1, 35, "#49545b", 0, false, "both", 1),
        new hudText("Select Your Controls", 50, 28, 80, "center"),
        new hudText("Touch", 36, 38, 40, "center"),
        new hudText("Touch & Tilt", 64, 38, 40, "center"),
    ],
    mainmenutext = [
        new hudText("Paused", 20, 10, 100, justify="left"),
        new hudText("Resume Game", 20, 30, 50, justify="left"),
        new hudText("Restart Game", 20, 45, 50, justify="left"),
        new hudText("Controls", 20, 60, 50, justify="left"),
        new hudText("Settings", 20, 75, 50, justify="left"),
        new hudText("Editor Mode", 20, 90, 50, justify="left"),
        new hudText("_", 20, 45, 50, justify="left"),
        new hudText("_", 20, 60, 50, justify="left"),
        new hudText("_", 20, 75, 50, justify="left"),
        new hudText("_", 20, 90, 50, justify="left"),
    ],
    editorTitle = [new hudText("Edit Mode", 50, 5, 50, "center")],
    editorHud = [
        new hudRect(95, 10, 8, 15, "RotatePlus.png", 0, true, "height", 1, "editorInterface", ["0"]),
        new hudRect(95, 25, 8, 15, "RotateMinus.png", 0, true, "height", 1, "editorInterface", ["1"]),
        new hudRect(95, 40, 8, 15, "#555555", 90, false, "height", 1, "editorInterface", ["2"]),
        new hudText("Change\nLayer", 95, 40, 30, "center"),
        new hudRect(85, 55, 8, 15, "PlusH.png", 0, true, "height", 1, "editorInterface", ["6"]),
        new hudRect(95, 55, 8, 15, "MinusH.png", 0, true, "height", 1, "editorInterface", ["5"]),
        new hudRect(85, 70, 8, 15, "PlusW.png", 0, true, "height", 1, "editorInterface", ["4"]),
        new hudRect(95, 70, 8, 15, "MinusW.png", 0, true, "height", 1, "editorInterface", ["3"]),
    ],
    exportHud = [
        new hudRect(50, 50, 100, 100, "black", 0, false, "both", 0.6),
        new hudText("Export Map", 50, 5, 50, "center"),
        new hudRect(50, 95, 20, 5, "#1b2932", 10, false, "both", 1, "closePort"),
        new hudText("Close", 50, 95, 30, "center"),
    ],
    importHud = [
        new hudRect(50, 50, 100, 100, "black", 0, false, "both", 0.6),
        new hudText("Import Map", 50, 5, 50, "center"),
        new hudRect(50, 95, 20, 5, "#1b2932", 10, false, "both", 1, "closePort"),
        new hudText("Load & Close", 50, 95, 30, "center"),
    ],
    settingsmenutext = [
        new hudRect(50, 50, 80, 80, "#1b2932", 25),
        new hudText("Settings", 50, 20, 100, "center"),
        new hudSlider(30, 40, 10, 2, maxfps, 30, 300, "#49545b", "white", 5),
        new hudSlider(70, 40, 10, 2, 101, 50, 200, "#49545b", "white", 5),
        new hudText("Max Fps: -", 30, 35, 30, "center"),
        new hudText("Zoom: Auto", 70, 35, 30, "center"),
        new hudText("Debug: -", 89, 88, 10, "right"),
        new hudText("Press 'a' or 'd' to change", 70, 45, 15, "center", "gray"),
        new hudRect(37, 86, 8, 1, "#FFFFFF", 5, false, "both", 1),
        new hudRect(37, 75, 10, 20, "#49545b", 0, false, "both", 1, "setControls", ("0")),
        new hudRect(50, 75, 10, 20, "#49545b", 0, false, "both", 1, "setControls", ("1")),
        new hudRect(63, 75, 10, 20, "#49545b", 0, false, "both", 1), //#10
        new hudText("Touch Controls:", 50, 55, 40, "center"),
        new hudText("Off", 37, 62, 30, "center"),
        new hudText("Touch", 50, 62, 30, "center"),
        new hudText("Touch & Tilt", 63, 62, 30, "center"),
        new hudText("FPS: -", 11, 88, 10, "left"),
        new hudText("x", 89, 12, 60, "right", "white", 1, "Arial", "pausemenutoggle"),
    ],
    controlstext = [
        new hudRect(50, 50, 80, 80, "#1b2932", 25),
        new hudText("Controls", 50, 20, 100, "center"),
        new hudRect(30, 40, 30, 17, "keys.png", 0, true, "width"),
        new hudText("Move The Car: \nWASD or Arrow Keys", 30, 50, 20, "center"),
        new hudRect(30, 70, 20, 8, "spacebar.png", 0, true, "width"),
        new hudText("Finish The Game (When In Parking Spot): \nSpacebar", 30, 77, 20, "center"),
        new hudRect(70, 35, 10, 9, "key-a-d.png", 0, true, "width"),
        new hudText("Change Onscreen Important Slider:\n'a' key: decrease\n'd' key: increase", 70, 41, 20, "center"),
        new hudRect(70, 58, 5, 9, "key-esc.png", 0, true, "width"),
        new hudText("Close Current Menu / Open Pause Menu:\nEscape key", 70, 64, 20, "center"),
        new hudText("Underlined Letter:\nHighlighting Pressable Key", 70, 77, 20, "center"),
        new hudText("x", 89, 12, 60, "right", "white", 1, "Arial", "pausemenutoggle"),
    ],
    finishscreentext = [
        new hudRect(50, 50, 100, 100, "#000000", 0, false, "both", 0.8),
        new hudText("Congratulations!", 50, 15, 100, "center"),
        new hudText("Level Complete!", 50, 22, 20, "center"),
        new hudText("Score:", 50, 43, 30, "center"),
        new hudText("Pull-In Accuracy:", 50, 75, 30, "center"),
        new hudText("Angle Accuracy:", 50, 80, 30, "center"),
        new hudText("Left/Right Accuracy:", 50, 85, 30, "center"),
        new hudRect(40, 50, 0, 0, "star.png", 0, true, "width"),
        new hudRect(45, 50, 0, 0, "star.png", 0, true, "width"),
        new hudRect(50, 50, 0, 0, "star.png", 0, true, "width"),
        new hudRect(55, 50, 0, 0, "star.png", 0, true, "width"),
        new hudRect(60, 50, 0, 0, "star.png", 0, true, "width"),
    ],
    popuptext = [
        new hudRect(50, 0, 45, 18, "tabbg.png", 0, true, "both"),
        new hudRect(42.5, 4.5, 11, 8, "spacebar.png", 0, true, "both"),
        new hudText(text="Press   SpaceBar   or Click Here to Finish", x=50, y=4, size=40, justify="center", color="white", font="Arial"),
    ],
    rightUp = [
        new hudRect(50, 50, 100, 100, "#000000", 0, false, "both", 0.8),
        new hudText("Please Hold Your Device Up For Tilt Controls", 50, 50, 100, "center"),
    ]
]