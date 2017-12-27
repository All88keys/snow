var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var gravity = new vector(0,.05);
var clock = 0;
ctx.fillStyle = 'white';
var snow = [];

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function addVector(obj1,obj2) {
  return {x: obj1.x+obj2.x, y: obj1.y+obj2.y};
}

function vector(x,y) {
  this.x = x;
  this.y = y;
}


function snowflake(x,y, size) {
  this.pos = new vector(x,y);
  this.vel = new vector(0,0);
  this.acc = new vector(0,gravity.y*Math.sqrt(size));
  this.size = size;
  this.update = function () {
    this.vel = addVector(this.acc,this.vel);
    this.pos = addVector(this.vel,this.pos);
    ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size);
  }
}

function loop() {
  //clear canvas
  ctx.clearRect(0,0,c.width,c.height);

  if (clock%1 == 0) {
    snow.push(new snowflake(rand(0,c.width), -10, rand(1,20)));
  }

  //update snowflakes
  for (flake of snow) {
    flake.update();
  }

  //update clock
  clock++;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
