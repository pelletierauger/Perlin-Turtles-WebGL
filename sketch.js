let looping = true;
let keysActive = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let gl, shaderProgram;
let time;
let positive = true;
let intensity;
let drawCount = 0;
let drawIncrement = 0.000125;
let noiseCount = 0;
let noiseIncrement = 0.000125;
let vertexBuffer;
let vertices = [];

let graphics;
let turtlePath;
let seed;
var gridScalar = 16;
var gridXAmount = 16 * gridScalar;
var gridYAmount = 9 * gridScalar;
var tileWidth;
var grid = [];
let turtle;
let respawnTimes = 0;

let bgVertShader;
let bgFragShader;
let fgVertShader;
let fgFragShader;


// a shader variable
let texcoordShader;
let initPos = [];
let turtlePos;
let turtleVal;
const openSimplex = openSimplexNoise(2);

function setup() {
    socket = io.connect('http://localhost:8080');
    // socket.on('receiveOSC', receiveOSC);
    pixelDensity(1);
    // cnvs = createCanvas(windowWidth, windowWidth * 9 / 16, WEBGL);
    cnvs = createCanvas(windowWidth, windowHeight, WEBGL);
    canvasDOM = document.getElementById('defaultCanvas0');
    // noCanvas();
    // cnvs = document.getElementById('my_Canvas');
    gl = canvas.getContext('webgl');
    // canvasDOM = document.getElementById('my_Canvas');
    // canvasDOM = document.getElementById('defaultCanvas0');
    // gl = canvasDOM.getContext('webgl');
    // gl = cnvs.drawingContext;

    // gl = canvasDOM.getContext('webgl', { premultipliedAlpha: false });



    // gl.colorMask(false, false, false, true);
    // gl.colorMask(false, false, false, true);

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // Set the view port
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    frameRate(20);
    // background(0);
    // fill(255, 50);
    noStroke();

    vertex_buffer = gl.createBuffer();
    if (!looping) {
        noLoop();
    }

    seed = 61.813779498236926;
    noiseSeed(seed);
    tileWidth = width / gridXAmount - 1 / gridXAmount;
    // turtle = new Turtle(width / 2, height / 2);
    turtlePos = [0, 0];
    turtleVal = 0;
    for (var x = 0; x < gridXAmount; x++) {
        for (var y = 0; y < gridYAmount; y++) {
            var oneDValue = x + (y * gridXAmount);
            let value = noise(x * 0.025, y * 0.025);
            // let value = openSimplex.noise3D(x * 0.025, y * 0.025, 0);
            // grid[oneDValue] = (value + 1) * 0.5;
            grid[oneDValue] = value;
        }
    }
    for (let i = 0; i < 40000; i++) {
        // initPos.push({ x: random(width), y: random(height) });
        initPos.push(random(width), random(height));
    }
    // bgVertShader = gl.createShader(gl.VERTEX_SHADER);
    // bgFragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // fgVertShader = gl.createShader(gl.VERTEX_SHADER);
    // fgFragShader = gl.createShader(gl.FRAGMENT_SHADER);
}

initPos = [];
for (let i = 0; i < 40000; i++) {
    //     initPos.push({ x: random(width), y: random(height) });
    // initPos.push(random(width), random(height));
}
draw = function() {
    // gl.clear(gl.COLOR_BUFFER_BIT);
    vertices = [];
    setBGShaders();
    gl.uniform1f(time, drawCount * 10);
    drawBG();
    // if (frameCount == 1) {
    setDotsShaders();
    // }
    respawnTimes = 0;
    turtlePos = [0, 0];
    for (let i = 0; i < 40000; i++) {
        turtleWalk();
    }
    drawDots();
    // setOverlayShaders();
    // gl.uniform1f(time, drawCount);
    // drawBG();
    drawCount += drawIncrement;
    // if (exporting && frameCount < maxFrames) {
    //     frameExport();
    // }
    var t = noiseCount;
    for (var x = 0; x < gridXAmount; x++) {
        for (var y = 0; y < gridYAmount; y++) {
            var oneDValue = x + (y * gridXAmount);
            let value = noise(x * 0.01, y * 0.01, t);
            // let value = openSimplex.noise3D(x * 0.025, y * 0.025, t);
            // grid[oneDValue] = (value + 1) * 0.5;
            grid[oneDValue] = value;
        }
    }
    noiseCount += noiseIncrement;
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
        if (key == 'm' || key == 'M') {
            redraw();
        }
    }
}

// logJavaScriptConsole(frameRate())
// noiseIncrement *= 10;