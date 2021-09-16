const landingCanvas = document.getElementById("landing-canvas");
const landing = document.querySelector(".landing");
landingCanvas.width = landing.clientWidth;
landingCanvas.height = landing.clientHeight;

const G = 0.01; // gravity

/** @type {CanvasRenderingContext2D} **/
const c = landingCanvas.getContext("2d");

// linear gradient bg
let bg = c.createLinearGradient(
  landingCanvas.width / 2,
  0,
  landingCanvas.width / 2,
  landingCanvas.height
);
bg.addColorStop(0, "#0D1B2A");
bg.addColorStop(0.6, "#1B263B");
bg.addColorStop(1, "#415A77");

let clicked = false;

// Probably a bad way to do this
landing.addEventListener("mousedown", (event) => {
  // lightings.push(new Lighting({ x: event.clientX, y: event.clientY }));
  clicked = true;
});
landing.addEventListener("mouseup", (event) => {
  clicked = false;
});

// making canvas resize seamless
document.addEventListener("resize", () => {
  landingCanvas.width = landing.clientWidth;
  landingCanvas.height = landing.clientHeight;
});

// Well, the main Raindrop class, nothing else ¯\_('-')_/¯
class RainDrop {
  constructor(vel, pos) {
    // Basic stuff
    this.vel = vel;
    this.pos = pos;
    this.radius = Math.random() * 5;
  }

  update() {
    if (this.pos.y > landingCanvas.height) {
      this._reset();
    }

    this.vel.y += G; // Applying gravity
    // Applying velocity
    if (clicked) {
      this.pos.x += this.vel.x / 5;
      this.pos.y += this.vel.y / 5;
    } else {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  }

  // Making it seamless
  _reset() {
    this.pos.x =
      Math.random() * 2 * landingCanvas.clientWidth - landingCanvas.clientWidth;
    this.pos.y = Math.random() * -200;
    this.radius = Math.random() * 5;
    let v = 10 + Math.random() * 50;
    this.vel.x = v;
    this.vel.y = v + Math.random();
  }

  // Drawing
  draw() {
    c.beginPath();
    c.strokeStyle = "#778DA9";
    c.moveTo(this.pos.x, this.pos.y);
    c.lineTo(this.pos.x + this.vel.x, this.pos.y + this.vel.y);
    c.stroke();
    c.closePath();
  }
}
/*

USELESS OOF

class Lighting {
  constructor(target) {
    this.target = target;
    this.speed = 0.2;
    this.start = { x: Math.random() * landingCanvas.width, y: 0 };
    this.end = { x: this.start.x, y: this.start.y };
    this.res = 3;
    this.spread = 100;
    this.points = [];
    for (let i = 0; i < this.res; i++) {
      this.points.push(this.crawl(this.start));
    }
  }

  crawl(point) {
    return {
      x: point.x + (Math.random() * this.spread * 2 - this.spread),
      y: point.y + (Math.random() * this.spread * 2 - this.spread),
    };
  }

  update() {
    let s = {
      x: this.target.x - this.end.x,
      y: this.target.y - this.end.y,
    };
    this.end.x += this.speed * s.x;
    this.end.y += this.speed * s.y;
  }

  draw() {
    c.beginPath();
    c.strokeStyle = "#E0E1DD";
    c.moveTo(this.start.x, this.start.y);
    c.lineTo(this.end.x, this.end.y);
    c.stroke();
    c.closePath();
  }
}
 */

// All the drops
let drops = [];
for (let i = 0; i <= 200; i++) {
  let x =
    Math.random() * 2 * landingCanvas.clientWidth - landingCanvas.clientWidth;
  let y = Math.random() * -landingCanvas.clientHeight;
  let v = 10 + Math.random() * 50;
  drops.push(new RainDrop({ x: v, y: v }, { x: x, y: y })); // Creating new drops
}

// let lightings = [];

// Main draw function
function draw() {
  c.fillStyle = bg;
  c.fillRect(0, 0, landingCanvas.width, landingCanvas.height);

  drops.forEach((drop) => {
    drop.update();
    drop.draw();
  });

  /* USELESS OOF
  lightings.forEach((lighting) => {
    lighting.update();
    lighting.draw();
  }); */
  requestAnimationFrame(draw);
}

draw();
