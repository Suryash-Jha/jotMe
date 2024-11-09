import fs from 'fs';
import { v4 as uuid4 } from 'uuid';
import { execSync } from 'child_process';
import chalk from 'chalk';

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
      note: note,
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
      task: task,
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

export { createLocalFile, addNote, addTask, commitToGit };
