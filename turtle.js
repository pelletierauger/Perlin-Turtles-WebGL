let Turtle = function(x, y) {
    this.pos = { x: x, y: y };
    this.heading = 0;
    this.location = { x: 0, y: 0 };
    this.currentValue = 0;
    this.s = 2;
};

Turtle.prototype.show = function() {
    fill(0, 255, 0);
    // ellipse(this.pos.x, this.pos.y, 10);
    let turtleSize = 15;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    beginShape();
    vertex(0, -turtleSize);
    vertex(turtleSize / 3, 0);
    vertex(-turtleSize / 3, 0);
    endShape(CLOSE);
    fill(0);
    ellipse(0, 0, 5);
    fill(0, 200, 0);
    pop();
};

Turtle.prototype.walk = function(ind) {
    //     this.s = 0.5;
    //     let headingModifier = map(this.currentValue, 0, 0.5, -Math.PI * this.s, Math.PI * this.s);
    //     var r = map(this.currentValue, 0, 1, tileWidth * 0.1, tileWidth * 1);
    //     r = Math.max(10, this.currentValue * 5);
    // r = sin(this.currentValue * 100) * 15;
    var r = 6;
    if (this.currentValue < 0.5) {
        a = 2 * 0.5;
        // let headingModifier = PI * this.s;
    } else {
        a = -7 * 0.5;
        // let headingModifier = -PI * this.s;
    }
    a *= this.currentValue * 25;
    // a = PI /  10;
    // var a = this.heading + headingModifier;
    var x = Math.cos(a) * r;
    var y = Math.sin(a) * r;
    // console.log(x, y);
    // let padding = 10 + Math.sin(ind) * 4;
    if (this.pos.x + x > 0 && this.pos.x + x < width &&
        this.pos.y + y > 0 && this.pos.y + y < height) {
        // turtlePath.beginShape();
        // turtlePath.vertex(this.pos.x, this.pos.y);
        this.pos.x += x;
        this.pos.y += y;
        // turtlePath.vertex(this.pos.x, this.pos.y);
        // turtlePath.endShape();
        vertices.push((this.pos.x - 640) * 0.00175, (this.pos.y - 360) * 0.0029, 0);
        //         this.heading += headingModifier;
    } else {
        // this.pos = { x: width / 2, y: height / 2 };
        //         this.pos = { x: random(width), y: random(height) };
        //         this.pos = { x: initPos[ind].x, y: initPos[ind].y };
        this.pos.x = initPos[respawnTimes * 2];
        this.pos.y = initPos[respawnTimes * 2 + 1];
        respawnTimes++;
        // this.heading = random(TWO_PI);
    }
};

// ind * 2, ind * 2 + 1
// 0, 1, 2, 3, 4, 5

Turtle.prototype.getLocation = function() {
    // ellipse(this.pos.x, this.pos.y, 5);
    //     let gridPosX = map(this.pos.x, 0, width, 0, gridXAmount);
    //     let gridPosX = this.pos.x * 0.2;
    //     let gridPosY = map(this.pos.y, 0, height, 0, gridYAmount);
    //     let gridPosY = this.pos.y * 0.2;
    //     this.location = { x: Math.floor(gridPosX), y: Math.floor(gridPosY) };
    //     let xAmount = gridXAmount;
    //     var oneDValue = Math.floor(gridPosX) + (Math.floor(gridPosY) * xAmount);
    var oneDValue = Math.floor(this.pos.x * 0.2) + (Math.floor(this.pos.y * 0.2) * gridXAmount);
    //     var oneDValue = Math.floor(this.pos.x * 0.2) + (Math.floor(this.pos.y) * 0.2 * gridXAmount);
    this.currentValue = grid[oneDValue];
    // return grid[oneDValue] ? grid[oneDValue] : "There was a mistake";
};

Turtle.prototype.showLocation = function() {
    let x = this.location.x;
    let y = this.location.y;
    fill(0, 0, 255, 50);
    noStroke();
    rect(x * tileWidth, y * tileWidth, tileWidth + 1, tileWidth + 1);
};




turtleWalk = function(ind) {
    let oneDValue = Math.floor(turtlePos[0] * 0.2) + (Math.floor(turtlePos[1] * 0.2) * gridXAmount);
    turtleVal = grid[oneDValue];
    let r = 2;
    let a;
    if (turtleVal < 0.5) {
        a = 2 * 0.5;
    } else {
        a = -7 * 0.5;
    }
    a *= turtleVal * 25;
    let x = Math.cos(a) * r;
    let y = Math.sin(a) * r;
    if (turtlePos[0] + x > 0 && turtlePos[0] + x < width &&
        turtlePos[1] + y > 0 && turtlePos[1] + y < height) {
        turtlePos[0] += x;
        turtlePos[1] += y;
        vertices.push((turtlePos[0] - 640) * 0.00175, (turtlePos[1] - 360) * 0.0029, 0);
    } else {
        turtlePos[0] = initPos[respawnTimes * 2];
        turtlePos[1] = initPos[respawnTimes * 2 + 1];
        respawnTimes++;
    }
};