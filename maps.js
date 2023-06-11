// Textures
this.asphaltpreload = new Image();
this.asphaltpreload.src = "textures/crasphalt.jpg";

this.grasspreload = new Image();
this.grasspreload.src = "textures/grass.png";

this.lightpole = new Image();
this.lightpole.src = "textures/lightpole.png";

// Maps
maps = [
    parkinglot = [
        //new shape("rect", 0, 0, 0, 5, 5, "darkgray"),

        new terrain(0, 0, 0, 15, 20, asphaltpreload),
        new terrain(0, 0, 0, 100, 100, grasspreload),

        //new shape("rect", 150, 500, 30, 100, 200, "darkgray"),

        // new shape("rect", -150, 500, -30, 100, 200, "darkgray"),
        // new shape("rect", 0, 460, 0, 300, 300, "darkgray"),
        // new shape("rect", 0, 700, 0, 1000, 300, "darkgray"),
        // new shape("rect", 0, 550, 0, 1000, 10, "dimgray"),
        // new shape("rect", 0, 850, 0, 1000, 10, "dimgray"),

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

        // new shape("image", 300, 0, 90, 50, 200, lightpole),
        // new shape("image", 300, 150, 90, 50, 200, lightpole),
        // new shape("image", 300, -150, 90, 50, 200, lightpole),
    ] 
]