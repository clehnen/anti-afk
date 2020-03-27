import {AntiAfkAuto} from './auto-mode';
import {parseArguments} from './argparse';

// startAntiAFK();
console.log('Started Anti-AFK');


const args = parseArguments();
AntiAfkAuto.fromArguments(args).start();
