import commander from 'commander';
import pp from '../../../package.json';

/* BEGIN INIT */
const _pro = new commander.Command();
export const argParse: commander.Command = _pro;

setGlobals();
parseGlobals();

/**
 * Initialize options applicable on all Commands, are parsed on first import.
 */
function setGlobals(): void {
  _pro.version(pp.version);
  _pro.option('-v --verbose', 'Enable verbose logging', false);
  _pro.helpOption('-h --help');
}

/**
 * Parse Commands to decode Global options defined above
 */
function parseGlobals(): void {
  _pro.parseOptions(process.argv);
}

/* END INIT */

/**
 * Return parsed Global Options
 * @return {GlobalOptions} gobal options
 */
export function opts(): GlobalOptions {
  return _pro.opts() as GlobalOptions;
}

/**
 * Return parsed Options for a specified Argument.
 * @param {Command} argument on which to retrieve Options
 * @return {T} Object containing the Option values
 */
export function getCommandOptions<T>(argument: commander.Command): T {
  argument.parseOptions(process.argv);
  const options = argument.opts();
  return options as T;
}

/**
 * Execute the Parser and run the configured scripts and functions accordingly.
 */
export async function execute(): Promise<void> {
  parseGlobals();
  await _pro.parseAsync(process.argv);
}

export type Command = commander.Command;

export interface GlobalOptions {
  version: string;
  verbose: boolean;
  logFile: boolean;
}

