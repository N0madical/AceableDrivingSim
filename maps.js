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
        startpos = [5,0,0],
        startzoom = 50,
    ],
]

cartextures = [
    ["textures/car.png", 2.3, 5],
    ["textures/carblue.png", 2.3, 5],
]

//Loading Textures
textures = [
    global = [
        ["asphalt", "textures/crasphalt.jpg"],
        ["grass", "textures/grass.jpg"],
        ["car", "textures/car.png"],
        ["carblack", "textures/carblack.png"],
        ["carblue", "textures/carblue.png"],
        ["cardarkblue", "textures/cardarkblue.png"],
        ["carlightblue", "textures/carlightblue.png"],
        ["cargray", "textures/cargray.png"],
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

    road = [],

    test = [],

]

// Maps
maps = [
    // Parking lot map
    parkinglot = [
        //new rect(false, 0, 10, 0, 2, 2, "yellow", 4),

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

        new car(type=0, x=0, y=-5, angle=180, speed=4, turn=0, logicID=1),

        new parkingspot(false, -5.75, -8.75, 90, 2, 4),
        new rect(true, -6, -6.25, 90, 2.3, 5, "carblue", 4, -0.5),
        new rect(true, -6.1, -3.75, 90, 2.3, 5, "cardarkblue", 4, -0.5),
        new rect(true, -5.7, -1.25, 90, 2.3, 5, "car", 4, -0.5),
        new parkingspot(false, -5.75, 1.25, 90, 2, 4),
        new rect(true, -6.3, 3.75, 90, 2.3, 5, "carlightblue", 4, -0.5),
        new rect(true, -6.1, 6.25, 90, 2.3, 5, "car", 4, -0.5),
        new parkingspot(false, -5.75, 8.75, 90, 2, 4),

        new rect(true, 6.1, -8.75, 270, 2.3, 5, "carlightblue", 4, -0.5),
        new rect(true, 6.2, -6.25, 270, 2.3, 5, "cargray", 4, -0.5),
        new parkingspot(false, 5.75, -3.75, 90, 2, 4),
        new rect(true, 5.6, -1.25, 270, 2.3, 5, "carblack", 4, -0.5),
        new rect(true, 6, 1.25, 270, 2.3, 5, "cargray", 4, -0.5),
        new parkingspot(false, 5.75, 3.75, 90, 2, 4),
        new rect(true, 6.1, 6.25, 270, 2.3, 5, "carlightblue", 4, -0.5),
        new parkingspot(false, 5.75, 8.75, 90, 2, 4),

        new rect(true, 15.25, -6.25, 180, 2.3, 5, "cardarkblue", 4, -0.5),
        new parkingspot(false, 15.1, 0, 0, 2, 5),
        new rect(true, 15, 6.25, 180, 2.3, 5, "carblue", 4, -0.5),

        new rect(true, 22.9, -8.5, 180, 2.3, 5, "car", 4, -0.5),
        new parkingspot(false, 22.9, -2.9, 0, 2, 5),
        new rect(true, 23, 2.75, 180, 2.3, 5, "carblack", 4, -0.5),
        new rect(true, 22.75, 8.5, 180, 2.3, 5, "carlightblue", 4, -0.5),

        new rect(true, -15.5, -5.5, 315, 2.3, 5, "cargray", 4, -0.5),
        new rect(true, -15, -1.25, 315, 2.3, 5, "carblack", 4, -0.5),
        new rect(true, -15.25, 2, 315, 2.3, 5, "cargray", 4, -0.5),
        new rect(true, -15.5, 5.5, 315, 2.3, 5, "carlightblue", 4, -0.5),

        new rect(true, -23, -5.5, 45, 2.3, 5, "car", 4, -0.5),
        new rect(true, -22.75, -2, 45, 2.3, 5, "carblack", 4, -0.5),
        new parkingspot(false, -22.5, 1.3, 45, 2, 5),
        new rect(true, -22.5, 5, 45, 2.3, 5, "carblue", 4, -0.5),
        
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

        //new rect(false, 0, 8, 0, 5, 0.5, "orange", 4)
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
    road = [],

    test = [
        new car(type=0, x=0, y=20, angle=180, speed=2, turn=0, logicID=1),
        new rect(false, 0, 10, 0, 10, 0.5, "dimgray", 3),
    ]
]


//Object Syntax: [
//         Interaction Object (Options: 0 = at position, 1 = Wall, 2 = Curb, 3 = Terrain, 4 = Cover, 5 = NPC Car, 6 = Player Car, Array = IDs), 
//         Path(1 = Streight Path, 2 = Real Path) OR Check(1=x, 2=y, 3=angle, 4=velocity), 
//         Distance Along Path OR Check Value,
//         Resulting [X,Y,Angle,Velocity] Change, 
//         Repeats (Optional)
//        ]

carscripts = [
    script1 = [
        [2, 1, 5, [0,0,60,0, false]],
        [0, 3, 0, [0,0,0,0, false]],
    ]
]