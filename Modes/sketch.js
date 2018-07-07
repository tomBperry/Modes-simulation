let balls = [];
let zero, unit;
let Amp, energy;
let rowSep, c;
let Restoringforce;

const radius = 3;

const T = 3000;
const damping = 1;

const N = 200; // 500 is the optimal number on the 29/06/18
const M = 2; // Number of Modes

function setup() {
  createCanvas(1536, 770); //1536, 770
  colorMode(RGB, 255);

  rowSep = width / (N + 1);
  c = T / width;
  const A = 0.5 * 770 / M;

  zero = createVector(0, 0);
  unit = createVector(0, 1);
  endPoint = createVector(width, height / 2);

  for (let n = 0; n < N; n++) {
    balls.push(new Ball(n));

    balls[n].minSep = rowSep;
    balls[n].maxSep = rowSep;

    // if (n <= N / 2) {
    //   balls[n].position.y = balls[n].position.y +
    //     A * balls[n].position.x;
    // } else {
    //   balls[n].position.y = balls[n].position.y +
    //     A * (width - balls[n].position.x);
    // }

    for (let i = 0; i <= M; i++) {
      balls[n].position.y = balls[n].position.y +
        A * sin(i * PI * balls[n].position.x / width);
    }
  }
}


function draw() {
  background(0);

  for (let n = 0; n < balls.length; n++) {
    balls[n].amplitude();
  }

  for (let n = 0; n < balls.length; n++) {
    calcForce(n);
    balls[n].addForce(unit.copy().mult(Fn));

    // Gravity
    // balls[n].addForce(unit.copy().mult(0.03));

    balls[n].update();
    // realtiveSep(n);
    balls[n].show();
    // energy += balls[n].Energy();
  }
  // energy += T * (sqrt(balls[0].position.x * balls[0].position.x +
  //   (balls[0].position.y-width/2) * (balls[0].position.y-width/2))-rowSep);
  //
  // if (frameCount % 6 == 0) {
  //   console.log("Energy: " + energy);
  // }
  // energy = 0;

  // showSprings();

  //  To Greatly improve performance, remove the showSprings and realtiveSep
  // functions.

  // To have energy showing, the relativeSep function must be on

  // Energy not working
}
