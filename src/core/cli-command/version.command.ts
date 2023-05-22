import { readFileSync } from 'node:fs';
import { CliCommandInterface } from './cli-command.interface.js';
import { resolve } from 'node:path';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';
  private readonly file = './package.json';

  private readVersion(): string {
    const contentPageJSON = readFileSync(resolve(this.file), 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(version);
  }
}
