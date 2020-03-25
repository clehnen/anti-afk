import robot from 'robotjs';
import iohook from 'iohook';

function shiftMouse() {
  let {x, y} = robot.getMousePos();
  console.log(x, y);
  robot.moveMouseSmooth(x + 100, y);
  robot.moveMouseSmooth(x, y + 100);
  robot.moveMouseSmooth(x - 100, y);

  robot.moveMouseSmooth(x, y - 100);
  robot.moveMouseSmooth(x, y);
}

const interval = setInterval(() => shiftMouse(), 3000);


iohook.on('mousedown', (event) => {
  process.exit(0);
});

iohook.start();
