#!/usr/bin/env node
import 'reflect-metadata';
import 'reflect-metadata'; // на классах расставлены декораторы, при импорте в наш CLI они будут исполняться. Импорт нужен чтобы ничего случайно не сломать.
import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/helper.command.js';
import VersionCommand from './core/cli-command/version.command.js';
import ImportCommand from './core/cli-command/import.command.js';
import GenerateCommand from './core/cli-command/generate.command.js';

const cliManager = new CLIApplication();

cliManager.registerCommands([
  new HelpCommand,
  new VersionCommand,
  new GenerateCommand,
  new ImportCommand,
]);

cliManager.processCommand(process.argv);
