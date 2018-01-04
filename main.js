var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var gravity = new vector(0,.0005);
var clock = 0;
ctx.fillStyle = 'white';
var snow = [];
var wind = [];
var dev = false;
var maxSize = 5;
//var img = new Image();
//img.src = "data:image/png;base64,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";


document.addEventListener('resize', function () {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
})
c.width = window.innerWidth;
c.height = window.innerHeight;


function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function addVector(obj1,obj2) {
  return {x: obj1.x+obj2.x, y: obj1.y+obj2.y};
}

//vector constructor
function vector(x,y) {
  this.x = x;
  this.y = y;
}


//snowflake constructor
function snowflake(x,y, size) {
  this.pos = new vector(x,y);
  this.vel = new vector(0,.9);
  this.acc = new vector(0,gravity.y*size);
  this.size = size;
  this.update = function () {
    //calculate gusts
    for (flust of wind) {
      //if((this.pos.x < flust.x+flust.width && this.pos.x > flust.x)&&(this.pos.y < flust.y+flust.height && this.pos.y > flust.y)){
      //  this.vel = addVector(this.vel, {x: flust.force.x*this.size/maxSize, y: flust.force.y*this.size/maxSize});
      //}
      var dist = Math.sqrt(Math.pow(flust.x-this.pos.x,2) + Math.pow(flust.y-this.pos.y,2)); // dist from snowflake to center of gust
      if(dist<flust.r){
        this.vel = addVector(this.vel, {x: (flust.force.x*this.size/maxSize)*(flust.r-dist)/flust.r, y: (flust.force.y*this.size/maxSize)*(flust.r-dist)/flust.r});
      }
    }

    //decay accel
    this.acc.x *=.95

    //add accel and velocity to pos
    this.vel = addVector(this.acc,this.vel);
    this.pos = addVector(this.vel,this.pos);
    ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size);
    //ctx.drawImage(img, this.pos.x,this.pos.y-img.height)
  }
}


function gust(x,y,r,force) { //force is a vector
  this.x = x; //rand(0,c.width-10)
  this.y = y; //rand(0,c.height-10)
  //this.width = rand(60,c.width-this.x)
  //this.height = rand(60,c.height-this.y)
  this.r = r;
  this.force = force; //new vector(rand(-20,20)/10, rand(-20,20)/10)
  this.life = 200;
  this.update = function () {
    if (dev) {
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.stroke();
      //ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
//wind.push(new gust(rand(0,c.width-10), rand(0,c.height-10), new vector(rand(-100,100)/10000, rand(-100,100)/10000)));

function loop() {
  //clear canvas
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle = 'white';

  if (clock%1 == 0) {
    for (var i = 0; i < 1; i++) { //rand(5,10)
      snow.push(new snowflake(rand(-50,c.width+50), -20, rand(1,maxSize*10)/10));
    }
  }
  if (clock%200 == 0) {
    //wind.push(new gust(rand(-50,c.width-10), rand(0,c.height-10), new vector(rand(-100,100)/3000, rand(-100,100)/8000)));
    //wind.push(new gust(rand(-50,c.width-10), rand(0,c.height-10), new vector(rand(-100,100)/80000, rand(-100,100)/10000)));
    wind.push(new gust(rand(-50,c.width-10), rand(0,c.height-10), rand(0,c.width/3), new vector(rand(-100,100)/8000, rand(-100,100)/10000)))
    wind.push(new gust(rand(-50,c.width-10), rand(0,c.height-10), rand(0,c.width/3), new vector(rand(-100,100)/8000, rand(-100,100)/10000)))
  }
  if (clock%200 == 190) {
    wind.shift();
    wind.shift();
  }

  //update snowflakes
  for (var i = 0; i < snow.length; i++) {
    if (snow[i].pos.y>c.height) {
      snow.splice(i,1);
    }
    snow[i].update();
  }

  if (dev) {
    //update wind gusts
    for (flust of wind) {
      flust.update();
    }
  }

  //update clock
  clock++;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
