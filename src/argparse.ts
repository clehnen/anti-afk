export function parseArguments(): ArgumentSettings {
  return process.argv.reduce((args, currArg, index, arr) => {
    return (parsingScheme.has(currArg)) ?
        {...args, ...parsingScheme.get(currArg)(arr[index + 1])} :
        args;
  }, new ArgumentSettings());
}

type argFunc = (nextArg: string) => Partial<ArgumentSettings>;

const parsingScheme = new Map<string, argFunc>([
  ['-t', (nextArg) => ({timeoutIntervalSeconds: parseInt(nextArg)})],
  ['-i', (nextArg) => ({moveIntervalSeconds: parseInt(nextArg)})],
]);

export class ArgumentSettings {
  timeoutIntervalSeconds: number = 10;
  moveIntervalSeconds: number = 3;
}
