import inquirer from "inquirer";
import { addNote, addTask, commitToGit } from './helper.js';


const promptMenu = () => {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: 'Choose an Option?',
      choices: ['Add a Note', 'Add a Task', 'List Tasks (Current Project only)', 'List Tasks (All Projects)','Exit'],
    },
  ])
  .then(answers => {
    switch (answers.options) {
        case 'Add a Note':
            inquirer
            .prompt([
              {
                type: 'input',
                name: 'note',
                message: 'Enter your note:',
              },
            ])
            .then(noteAnswer => {
                addNote(noteAnswer.note);
            });
          break;
        case 'Add a Task':
            inquirer
            .prompt([
              {
                type: 'input',
                name: 'task',
                message: 'Enter your task:',
              },
            ])
            .then(taskAnswer => {
                commitToGit(taskAnswer.task);
                addTask(taskAnswer.task);
            });
          break;
        case 'List Tasks (Current Project only)':
          console.log('Listing tasks for the current project...');
          break;
        case 'List Tasks (All Projects)':
          console.log('Listing tasks for all projects...');
          break;
        case 'Exit':
          console.log('Exiting...');
          break;
        default:
          console.log('Invalid Option');
      }
      console.info('Answer:', answers.options);
  
  });
}

export { promptMenu };
