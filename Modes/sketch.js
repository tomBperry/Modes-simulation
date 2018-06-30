let balls = [];
let zero, unit;
let rowSep;
let Fn, f0;

const radius = 3;
const T = 30;
const damping = 1;
const N = 1000;
const M = 5;


function setup() {
  createCanvas(770, 450);
  colorMode(RGB, 255);
  const A = 0.5 //0.5 * height / M
  rowSep = width / (N + 1);;
  zero = createVector();
  unit = createVector(0, 1);

  for (let n = 0; n < N; n++) {
    balls.push(new Ball(n));


    if (n <= N / 2) {
      balls[n].position.y = balls[n].position.y +
        A  * balls[n].position.x;
    } else {
      balls[n].position.y = balls[n].position.y +
        A  *(width- balls[n].position.x);


      // Sin starting positions
      // for (let i = 0; i <= M; i++) {
      //   balls[n].position.y = balls[n].position.y +
      //     A * sin(i * PI * balls[n].position.x / width);
      // }
    }
  }

}

function draw() {
  background(0);

  for (let n = 0; n < balls.length; n++) {
    balls[n].angle = calcAngle(n);
  }
  dy = balls[0].position.y - (height / 2);
  theta0 = atan(dy / rowSep);

  f0 = T * (sin(balls[0].angle) - sin(theta0)); //T * (balls[0].angle - theta0);
  balls[0].addForce(unit.copy().mult(f0));

  for (let n = 1; n < balls.length; n++) {
    Fn = T * (sin(balls[n].angle) - sin(balls[n - 1].angle)); // T * (balls[n].angle - balls[n - 1].angle);
    balls[n].addForce(unit.copy().mult(Fn));
  }

  for (let n = 0; n < balls.length; n++) {
    balls[n].update();
    balls[n].show();
  }
}
