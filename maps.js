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