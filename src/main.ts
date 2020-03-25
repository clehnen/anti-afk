import robot from 'robotjs';
import iohook from 'iohook';

function wiggleMouse() {
  const {x, y} = robot.getMousePos();
  console.log(x, y);
  robot.moveMouseSmooth(x + 100, y);
  robot.moveMouseSmooth(x - 100, y);
  robot.moveMouseSmooth(x, y);
}

setInterval(() => wiggleMouse(), 3000);

iohook.on('mousedown', (event) => {
  process.exit(0);
});

iohook.start();
