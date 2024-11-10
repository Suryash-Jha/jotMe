import fs from 'fs';
import { v4 as uuid4 } from 'uuid';
import { execSync } from 'child_process';
import chalk from 'chalk';
import Table from 'cli-table3';
import moment from 'moment';
import wordwrap from 'wordwrap';



const root_local_path = 'docu-local.json';
const root_global_path = '/jotMe-records.json';

const createLocalFile = () => {
  if (!fs.existsSync(root_local_path)) {
    const data = { Notes: [], Tasks: [] };
    fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
  }
};

const commitToGit = (task) => {
  try {
    execSync(`git add .`, { stdio: 'inherit' });
    execSync(`git commit -m "${task}"`, { stdio: 'inherit' });
  } catch (err) {
    console.log('Error while doing GIT operations, failed to record this task!!!', err);
    return;
  }
};

const addNote = (note) => {
  try {
    createLocalFile();
    const fileData = fs.readFileSync(root_local_path, 'utf-8');
    const data = JSON.parse(fileData);
    const noteBody = {
      note: note.trim(),
      created_at: new Date(),
      id: uuid4(),
    };
    data.Notes.push(noteBody);
    fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
    console.log(chalk.green('Note Inserted Successfully!'));

  } catch (err) {
    console.log('Error while adding note', err);
  }
};

const addTask = (task) => {
  try {
    createLocalFile();
    const fileData = fs.readFileSync(root_local_path, 'utf-8');
    const data = JSON.parse(fileData);
    const taskBody = {
      task: task.trim(),
      created_at: new Date(),
      id: uuid4(),
    };
    data.Tasks.push(taskBody);
    fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
    console.log(chalk.yellow("Task Inserted Successfully!"));

  } catch (err) {
    console.log('Error while adding task', err);
  }
};

const listNotes = () => {
  try {
    createLocalFile();
    const fileData = fs.readFileSync(root_local_path, 'utf-8');
    const data = JSON.parse(fileData);
    if (data.Notes.length === 0) {
      console.log(chalk.yellowBright("Oops! No notes available."));
      return;
    }

    console.log(chalk.bold.underline.cyan('📜 Listing Your Notes 📜 '));
    console.log('\n')

    data.Notes.forEach((note, i) => {
      console.log(chalk.blueBright(`(${i + 1})`) + chalk.greenBright(` ${note.note}`));
      console.log(chalk.gray('----------------------------------------------------------------------')); // Divider line between notes
    });

  } catch (err) {
    console.log('Error while listing notes', err);
  }
};
const listTasks = () => {
  try {
    createLocalFile();
    const fileData = fs.readFileSync(root_local_path, 'utf-8');
    const data = JSON.parse(fileData);
    if (data.Tasks.length === 0) {
      console.log(chalk.yellowBright("Oops! No Tasks available."));
      return;
    }

    console.log(chalk.bold.underline.cyan('📜 Listing Your Tasks 📜 '));
    console.log('\n')

    var table = new Table({
      head: ['Task No.', 'Task', 'Created At'],
      colWidths: [10, 80, 30],
    },
    );
    const wrap = wordwrap(0, 70); // Wrap at 80 characters

    const taskArray = [];
    const taskLength= data.Tasks.length;
    data.Tasks.forEach((task, i) => {
      taskArray.push([taskLength-i, wrap(task.task), moment(task.created_at).format('MMM DD YYYY, h:mm:ss a')]);
      // console.log(chalk.blueBright(`(${i + 1})`) + chalk.whiteBright(` ${task.task}`));
      // console.log(chalk.gray('----------------------------------------------------------------------')); // Divider line between Tasks
    });
    taskArray.reverse()
    table.push(...taskArray);
    console.log(table.toString());

  } catch (err) {
    console.log('Error while listing Tasks', err);
  }
};

export { createLocalFile, addNote, addTask, commitToGit, listNotes, listTasks };
