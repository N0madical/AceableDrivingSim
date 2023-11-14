function touchHandler(e) {
    for(p = 0; p < 3; p++) {
        if(e.touches[p] != undefined) {
            mobileTouch[p][0] = e.touches[p].pageX;
            mobileTouch[p][1] = e.touches[p].pageY;
            mobileTouch[p][2] = 1;
        }
    }
    e.preventDefault();
}

function touchEnd(e) {
    for(p = 0; p < 3; p++) {
        if(e.touches[p] == undefined) {
            mobileTouch[p][2] = 0;
        }
    }
    e.preventDefault();
}