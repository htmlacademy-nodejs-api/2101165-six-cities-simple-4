import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      Программа для подготовки данных для REST API сервера.
      Пример:
        main.js --<command> [--arguments]
      Команды:
        --version:                                                                # выводит номер версии
        --help:                                                                   # печатает этот текст
        --import <path> <login> <password> <host> <port> <database-name> <salt>:  # импортирует данные из TSV
        --generate <offersCount> <filepath> <url>:                                # генерирует тестовые данные
    `);
  }
}
