#!/usr/bin/env node

const yargs = require('yargs');
const figlet = require('figlet');
const { addNote, addTask, commitToGit } = require('./helper.js');

figlet('JOT - ME ✏️', async (err, data) => {
  // Dynamic import of gradient-string!!! without using import statement at the top
  const gradient = await import('gradient-string'); 

  if (err) {
    console.error('Error generating ASCII art');
    return;
  }
  console.log(gradient.pastel.multiline(data)); 

yargs
  .scriptName('jotme')
  .usage('$0 <cmd> [args]')

  .command('add', 'Add a note or task', (yargs) => {
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
  }, (argv) => {
    if (argv.n) {
        addNote(argv.n)
    
    }
    if (argv.t) {
      commitToGit(argv.t)
      addTask(argv.t);
    }
  })
  //   // Command to list all notes and tasks
//   .command('listAll', 'List all notes and tasks', () => {
//     if (notes.length === 0 && tasks.length === 0) {
//       console.log('No notes or tasks available.');
//     } else {
//       console.log('Notes:');
//       notes.forEach((note, index) => {
//         console.log(`${index + 1}. ${note}`);
//       });

//       console.log('Tasks:');
//       tasks.forEach((task, index) => {
//         console.log(`${index + 1}. ${task}`);
//       });
//     }
//   })

//   // Command to list only notes or tasks
//   .command('list', 'List notes or tasks', (yargs) => {
//     yargs
//       .option('n', {
//         alias: 'notes',
//         type: 'boolean',
//         description: 'List only notes',
//       })
//       .option('t', {
//         alias: 'tasks',
//         type: 'boolean',
//         description: 'List only tasks',
//       });
//   }, (argv) => {
//     if (argv.n) {
//       if (notes.length === 0) {
//         console.log('No notes available.');
//       } else {
//         console.log('Notes:');
//         notes.forEach((note, index) => {
//           console.log(`${index + 1}. ${note}`);
//         });
//       }
//     }

//     if (argv.t) {
//       if (tasks.length === 0) {
//         console.log('No tasks available.');
//       } else {
//         console.log('Tasks:');
//         tasks.forEach((task, index) => {
//           console.log(`${index + 1}. ${task}`);
//         });
//       }
//     }
//   })



    // Show help if no command is provided
    .help()
    .argv;

})

