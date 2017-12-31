var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var gravity = new vector(0,.0005);
var clock = 0;
ctx.fillStyle = 'white';
var snow = [];
var wind = [];
var dev = false;
var maxSize = 5;

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
    for (var i = 0; i < 4; i++) {
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
