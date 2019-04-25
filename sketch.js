let cvsWrapper = null;
let x0,y0,x1,x2,y1,y2,y3,ay,vy,rotangle; // motion parameters
let bird,flag,birdcolor,birdmotion,gamestatus,points,t; //parameters
let birdimg,baseimg,bgimg,soundObj,soundhit,sounddie,gameover,pipeup,pipedown; //png & wav
let numbers = Array(10);

// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets

function preload() {
    let num =  ["0","1","2","3","4","5","6","7","8","9"].map(n =>`${n}.png`);
    for (var i = 0; i < 10; i++) {
        numbers[i] = loadImage("assets/sprites/"+num[i]);
    }
    startgame = loadImage("assets/sprites/message.png");
    baseimg = loadImage("assets/sprites/base.png");
    pipeup = loadImage("assets/sprites/pipe-green-upper.png");
    pipedown = loadImage("assets/sprites/pipe-green-lower.png");
    gameover = loadImage("assets/sprites/gameover.png");
    soundObj = loadSound("assets/audio/wing.wav");
    soundpoint = loadSound("assets/audio/point.wav");
    soundhit = loadSound("assets/audio/hit.wav");
    sounddie = loadSound("assets/audio/die.wav");
    birdimg = loadImage("assets/sprites/yellowbird-midflap.png");
    flag = floor(random()*2);
    if(flag == 0)
        bgimg = loadImage("assets/sprites/background-day.png");
    else
        bgimg = loadImage("assets/sprites/background-night.png");
}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");
    x0 = y0 = vy = rotangle = birdmotion = points = t = 0;
    gamestatus = 1;
    x2 = width;
    x3 = width+306;
    y2 = getRandom(300,450);
    y3 = getRandom(300,450);
    x1 = width/2-50;
    y1 = height/2;
    ay = 9.8;
    bird = ["blue", "red", "yellow"].map(color => ["upflap", "midflap", "downflap"].map(flap =>`${color}bird-${flap}.png`));
    birdcolor = floor(random()*3);
    scale = cvsWrapper.offsetWidth/bgimg.width;
    push();
    // setup code below
}

function draw() {
    // Render function (called per frame.)
    // background(0);
    if(gamestatus != 0){
        image(bgimg,x0,y0,scale*bgimg.width,scale*bgimg.height);
        image(bgimg,x0+bgimg.width*scale,y0,scale*bgimg.width,scale*bgimg.height);
        image(pipeup, x2+50, -440+y2,pipeup.width,pipeup.height);
        image(pipedown, x2+50, y2,pipedown.width,pipedown.height*1.3);
        image(pipeup, x3+50, -440+y3,pipeup.width,pipeup.height);
        image(pipedown, x3+50, y3,pipedown.width,pipedown.height*1.3);
        updatepoints();
        vy += ay*0.033;
        y1 += vy;
        translate(x1,y1);
        imageMode(CENTER);
        rotate(rotangle);
        image(birdimg,0,0);
        pop();
        image(baseimg,x0,height-baseimg.height,scale*baseimg.width);
        image(baseimg,x0+baseimg.width*scale,height-baseimg.height,scale*baseimg.width);
        push();
        birdimg = loadImage("assets/sprites/"+bird[birdcolor][birdmotion]);
        birdmotion = ((birdmotion+1)%3);
        // translate(x1,y1);
        x0 -= 1;
        if(x0 < -bgimg.width*scale)
            x0 = 0; 
        x2 -= 3;
        x3 -= 3;
        if(x2 < -100){
            x2 = width;
            y2 = getRandom(200,450);
        }
        if(x3 < -100){
            x3 = width;
            y3 = getRandom(200,450);
        }
        if((x2 === 90 || x3 === 90 )&& gamestatus<2){
            soundpoint.play();
            points++;
        }
        if(rotangle < PI/2)
            rotangle += PI/90; 
        ifdie();
    }
}

function die(){
    if(gamestatus == 1){
        sounddie.play();
    }
    if(y1 < height-baseimg.height){
        gamestatus++;
        x0 += 1;
        x2 += 3;
        x3 += 3;
    }
    else{  
        soundhit.play();
        gamestatus = 0;
        points = 0;
        x2 = width;
        x3 = width+306;
        y1 = height/2;
        rotangle = 0;
        pop();
        image(gameover,(bgimg.width*scale-gameover.width*scale)/2,bgimg.height/2,scale*gameover.width,scale*gameover.height);
    }
}

function ifdie(){
    if(gamestatus>1)
        die();
    if((x1-45 >= x2 && x1-45 <= x2+70) && (y1 < y2-120 || y1 > y2))
        die();
    if((x1-45 >= x3 && x1-45 <= x3+70) && (y1 < y3-120 || y1 > y3))
        die();
    if(y1 > height-baseimg.height)
        die();
}

function updatepoints(){
    if(points < 10)
        image(numbers[points],x1+50,120);
    else{
        image(numbers[floor(points/10)],x1+37,120);
        image(numbers[points%10],x1+62,120);
    }
}

function keyPressed() {
    if(gamestatus === 0){//revive
        y1 = height/2;
        vy = 6;
        gamestatus = 1;
        push();
    }
    if(keyCode === 32 && gamestatus === 1){
        vy = -6; //12
        soundObj.play();
        rotangle = -PI/5;
    }
}
// function mouseClicked(){
//     if(gamestatus === 1){//revive
//         y1 = height/2;
//         vy = 6;
//         gamestatus = 0;
//     }
//     if(keyCode === 32){
//         vy -= 12;
//         soundObj.play();
//         // rotate(PI/4);
//     }
// }

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}