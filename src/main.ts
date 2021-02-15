import {AntiAfkAuto} from './auto-mode';
import {argParse, execute} from './util/argparse/argparse';
import {Option} from 'commander';

const timeout = new Option(
    '-t, --timeout <seconds>',
    'Timeout Interval in Seconds',
);

const interval = new Option(
    '-i, --interval <seconds>',
    'Movement Interval in seconds',
);

timeout.defaultValue = 10;
interval.defaultValue = 3;

argParse
    .addOption(timeout)
    .addOption(interval)
    .action(async (args) => {
      AntiAfkAuto.fromArguments(args).start();
    });

execute().then(() =>
  console.log('Started Anti-AFK'),
);

// startAntiAFK();

