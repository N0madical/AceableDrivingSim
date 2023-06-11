// Textures
this.asphaltpreload = new Image();
this.asphaltpreload.src = "textures/crasphalt.jpg";

this.grasspreload = new Image();
this.grasspreload.src = "textures/grass.png";

this.lightpole = new Image();
this.lightpole.src = "textures/lightpole.png";

// Maps
maps = [
    // Parking lot map
    parkinglot = [
        new terrain(0, 0, 0, 15, 20, asphaltpreload),
        new terrain(0, 0, 0, 100, 100, grasspreload),

        new shape("rect", -10, 17.5, 0, 2.5, 0.25, "yellow"),
        new shape("rect", -5, 17.5, 0, 2.5, 0.25, "yellow"),
        new shape("rect", 0, 17.5, 0, 2.5, 0.25, "yellow"),
        new shape("rect", 5, 17.5, 0, 2.5, 0.25, "yellow"),
        new shape("rect", 10, 17.5, 0, 2.5, 0.25, "yellow"),

        new shape("rect", 5.625, -7.5, 45, 0.25, 5, "yellow"), 
        new shape("rect", 5.625, -3.75, 45, 0.25, 5, "yellow"),
        new shape("rect", 5.625, 0, 45, 0.25, 5, "yellow"), 
        new shape("rect", 5.625, 3.75, 45, 0.25, 5, "yellow"),
        new shape("rect", 5.625, 7.5, 45, 0.25, 5, "yellow"),

        new shape("rect", -5.625, -7.5, -45, 0.25, 5, "yellow"), 
        new shape("rect", -5.625, -3.75, -45, 0.25, 5, "yellow"),
        new shape("rect", -5.625, 0, -45, 0.25, 5, "yellow"), 
        new shape("rect", -5.625, 3.75, -45, 0.25, 5, "yellow"),
        new shape("rect", -5.625, 7.5, -45, 0.25, 5, "yellow"),

        new shape("rect", -7.5, 0, 0, 0.5, 20, "dimgray"),
        new shape("rect", 7.5, 0, 0, 0.5, 20, "dimgray"),
    ],

    // Road map (WIP)
    road = [],
]