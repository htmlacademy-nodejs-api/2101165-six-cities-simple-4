import got from 'got';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import { MockData } from '../../types/mock-data.type';
import { CliCommandInterface } from './cli-command.interface';
import { getCliTextColor } from '../helpers/index.js';
import OfferGenerator from '../../modules/offer-generator/offer-generator.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [offersCount, filepath, url] = parameters;
    const count = Number(offersCount);

    try {
      this.initialData = await got.get(url).json();
      console.log(this.initialData);
    } catch {
      console.log(getCliTextColor.error(`Не удалось получить данные с адреса ${url}.`));
      return;
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);


    try {

      if (!Number.isInteger(count)) {
        throw new Error();
      }

      const tsvFileWriter = new TSVFileWriter(filepath);

      for (let i = 0; i < Number(count); i++) {
        await tsvFileWriter.write(offerGeneratorString.generate());
      }

      console.log(getCliTextColor.success(`Файл "${filepath}" создан!`));

    } catch {
      console.log(getCliTextColor.error('Параметр <offersCount> не является числом!'));
    }
  }
}
