// will determine the pacmen image to use
let pos = 0;

// pacmen image array
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
// will control the direction 0 - left to right and 1 - right to left
let direction = 0;
 // holds all the pacmen in an array
const pacMen = [];

// creates and returns an object with random values to be used for velocity and initial pacmen position
function setToRandom(scale) {
  return {
    x: Math.floor(Math.random() * scale) + 1,
    y: Math.floor(Math.random() * scale) + 1,
  };
}

// Make pacmen at a random position with random velocity
function makePac() {
  // call setRandom fn for initial values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = Math.floor(Math.random() * 100) + 1;
  
  // TODO: set position here
  newimg.style.left = position.x;   // edited
  newimg.style.top = position.y + 50;    // edited
  // TODO add new Child image to game
  game.appendChild(newimg);   // edited
  
  // return details in an object
  return {
    position,
    velocity,
    newimg,
    pos,
    direction,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.pos = (item.pos + 1) % 2;
    item.newimg.src = pacArray[item.direction][item.pos];
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  
  });
  
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce

  if (item.position.x + item.velocity.x > window.innerWidth - item.newimg.width || item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
    item.direction = 1;
  }

  if (item.position.y + item.velocity.y > window.innerHeight - item.newimg.height|| item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y
    
  }

  if (item.position.x - item.velocity.x <= 0) item.direction = 0;

  return item.direction;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}