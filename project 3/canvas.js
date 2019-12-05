var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = (window.innerHeight);

//:::::::::::::::::::::::::::::::VARIABLES::::::::::::::::::::::::::::::::::::

var c = canvas.getContext('2d');    // c is Context for short, since we type it alot...
var circleArray = [];               // create our array to hold our Circle objects...
var snowArray = [];                 // create our array to hold our Snow objects...
var snowFillColor = "white";        // fill color for our snow objects
var snowBorderColor = "white";      // border color for our snow objects
var circleFillColor = "white";      // fill color for our circle objects
var circleBorderColor = "black";    // border color for our snow objects
var circleCount = 500;              // number of circles to spawn
var snowCount = 500;                // number of snow to spawn
var snowSpeed = 1;                  // speed of snow

//:::::::::::::::::::::::::::::::FUNCTIONS::::::::::::::::::::::::::::::::::::

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = circleBorderColor;
        c.stroke();
        c.fillStyle = circleFillColor;
        c.fill();
    }
    
    this.update = function() {
        if (this.x + this.radius > innerWidth || 
            this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || 
            this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;      
        this.draw();
    }
}

function Snow(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = snowBorderColor;
        c.stroke();
        c.fillStyle = snowFillColor;
        c.fill();
    }
    
    this.update = function() {
    
        if (this.x + this.radius > innerWidth ||
            this.x - this.radius < 0) {
            removeFromArray(snowArray, this);
        }
        if (this.y + this.radius > innerHeight ||
            this.y - this.radius < 0) {
            removeFromArray(snowArray, this);
        }
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function checkArrays() {
    if (snowArray.length < snowCount) {
        for (var i = snowArray.length; i < snowCount; i++) {
            createSnow();
        }
    }
    if (circleArray.length < circleCount) {
        for (var i = circleArray.length; i < circleCount; i++)
            createCircles();
    }
}

function createSnow(){
    var radius = 2;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = snowSpeed;
    var dy = snowSpeed;
    snowArray.push(new Snow(x, y, dx, dy, radius));
}

function createCircles() {
    var radius = Math.random() * 6;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));  
}

function removeFromArray(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    for (var i = 0; i < snowArray.length; i++) {
        snowArray[i].update();
        checkArrays();
    }
}

//:::::::::::::::::::::::::::::::::::DO STUFF::::::::::::::::::::::::::::::::::

animate();                          // run the animate function
checkArrays();                      // checkArrays (which spawns our objects)