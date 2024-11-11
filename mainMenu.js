import inquirer from "inquirer";
import { addNote, addTask, listNotes, listTasks } from './helper.js';


const promptMenu = () => {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: 'Choose an Option?',
      choices: ['Add a Note', 'Add a Task', 'List Notes (Current Project only)', 'List Notes (All Projects)',  'List Tasks (Current Project only)', 'List Tasks (All Projects)','Exit'],
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
                addTask(taskAnswer.task);
            });
          break;
        case 'List Notes (Current Project only)':
            listNotes();
          break;
        case 'List Notes (All Projects)':
          console.log('Listing notes for all projects...');
          break;
        case 'List Tasks (Current Project only)':
            listTasks();
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
  
  });
}

export { promptMenu };
