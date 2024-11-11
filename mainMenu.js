import inquirer from "inquirer";
import { addNote, addTask, listNotes, listTasks, listAllNotes, listAllTasks, searchByString } from './helper.js';


const promptMenu = () => {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: 'Choose an Option?',
      pageSize: 10,
      choices: ['Add a Note', 'Add a Task', 'Search By String', 'List Notes (Current Project only)', 'List Notes (All Projects)',  'List Tasks (Current Project only)', 'List Tasks (All Projects)', 'Exit'],
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
          listAllNotes();
          break;
        case 'List Tasks (Current Project only)':
            listTasks();
          break;
        case 'List Tasks (All Projects)':
          listAllTasks();
          break;
        case 'Search By String':
            inquirer
            .prompt([
              {
                type: 'input',
                name: 'searchText',
                message: 'Enter your search text:',
              },
            ])
            .then(searchText => {
                searchByString(searchText.searchText);
            });
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
