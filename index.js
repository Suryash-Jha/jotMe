#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import figlet from 'figlet';
import { addNote, addTask, listNotes, listTasks } from './helper.js';
import { promptMenu } from './mainMenu.js';

figlet('JOT - ME ✏️', async (err, data) => {
  // Dynamic import of gradient-string
  const gradient = await import('gradient-string');
  if (err) {
    console.error('Error generating ASCII art');
    return;
  }

  console.log(gradient.default.pastel.multiline(data)); // Use gradient.default due to dynamic import
  if (process.argv.length === 2) {
    promptMenu();
    return;
  }
  yargs(hideBin(process.argv))
    .scriptName('jotme')
    .usage('$0 <cmd> [args]')

    .command(
      'add',
      'Add a note or task',
      (yargs) => {
        yargs
          .option('n', {
            alias: 'note',
            type: 'string',
            description: 'Add a note',
          })
          .option('t', {
            alias: 'task',
            type: 'string',
            description: 'Add a task',
          });
      },
      (argv) => {
        if (argv.n) {
          addNote(argv.n);
        }
        if (argv.t) {
          addTask(argv.t);
        }
      }
    )
    .command(
      'list',
      'Lists notes or tasks',
      (yargs) => {
        yargs
          .option('n', {
            alias: 'note',
            type: 'boolean',
            description: 'List notes',
          })
          .option('t', {
            alias: 'task',
            type: 'boolean',
            description: 'List tasks',
          });
      },
      (argv) => {
        if (argv.n) {
          listNotes()
        }
        if (argv.t) {
          listTasks();

        }
      }
    )
    // Show help if no command is provided
    .help().argv;
});

