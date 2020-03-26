import {startAntiAFK} from './anti-afk';
import {AntiAfkAuto} from './auto-mode';

// startAntiAFK();
console.log('Started Anti-AFK');

new AntiAfkAuto().start();
