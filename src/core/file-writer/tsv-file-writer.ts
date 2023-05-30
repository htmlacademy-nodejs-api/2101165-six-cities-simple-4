import { FileWriterInterface } from './file-writer.interface.js';
import { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { CHUNK_SIZE } from '../helpers/index.js';

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: CHUNK_SIZE.Write,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
