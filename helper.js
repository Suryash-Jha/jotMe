import fs from 'fs';
import { v4 as uuid4 } from 'uuid';
import { execSync } from 'child_process';
import chalk from 'chalk';
import Table from 'cli-table3';
import moment from 'moment';
import wordwrap from 'wordwrap';
import os from 'os';
import path from 'path';


const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const homeDir = os.homedir();
const root_local_path = 'docu-local.json';
const root_global_path = `${homeDir}/jotMe-records.json`;
const currentWorkingDir = process.cwd();
const docuFilePath = path.join(currentWorkingDir, root_local_path);

const createGlobalFile = () => {

  if (!fs.existsSync(root_global_path)) {
    const data = { Paths: [], Config: [] };
    fs.writeFileSync(root_global_path, JSON.stringify(data, null, 2), 'utf-8');
  }
};
const createLocalFile = () => {


  if (!fs.existsSync(root_local_path)) {
    const data = { Notes: [], Tasks: [] };
    fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
    console.log(chalk.redBright('JotMe Initialization done!'));

  }

  if (fs.existsSync(root_global_path)) {
    const fileData = fs.readFileSync(root_global_path, 'utf-8');
    const data = JSON.parse(fileData);
    if (!data.Paths.includes(docuFilePath)) {
      data.Paths.push(docuFilePath); 

      fs.writeFileSync(root_global_path, JSON.stringify(data, null, 2), 'utf-8');
    }
  } else {
    console.error(`Global file does not exist at: ${root_global_path}`);
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
    if (fs.existsSync('.git'))
      commitToGit(task);
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

const loadAllNotes = () => {  
  const globalFileData = fs.readFileSync(root_global_path, 'utf-8');
  const globalData = JSON.parse(globalFileData);
  const allNotes = [];
  globalData.Paths.forEach((path) => {
    const fileData = fs.readFileSync
    (path, 'utf-8');
    const data = JSON.parse(fileData);
    data.Notes.forEach((note) => {
      allNotes.push(note.note);
  })
  })
  return allNotes
}
const loadAllTasks = () => {  
  const globalFileData = fs.readFileSync(root_global_path, 'utf-8');
  const globalData = JSON.parse(globalFileData);
  const allTasks = [];
  globalData.Paths.forEach((path) => {
    const fileData = fs.readFileSync
    (path, 'utf-8');
    const data = JSON.parse(fileData);
    data.Tasks.forEach((task) => {
      allTasks.push(task);
  })
  })
  return allTasks
}
const listAllTasks = () => {
  try {
    createLocalFile();
    const allTasks = loadAllTasks()

    if (allTasks.length === 0) {
      console.log(chalk.yellowBright("Oops! No Tasks available."));
      return;
    }

    console.log(chalk.bold.underline.cyan('📜 Listing All Tasks 📜 '));
    console.log('\n')

    var table = new Table({
      head: ['Task No.', 'Task', 'Created At'],
      colWidths: [10, 80, 30],
    },
    );
    const wrap = wordwrap(0, 70); // Wrap at 80 characters

    const taskArray = [];
    const taskLength = allTasks.length;
    allTasks && allTasks.length >0 && allTasks.forEach((task, i) => {
      taskArray.push([taskLength - i, wrap(task?.task), moment(task?.created_at).format('MMM DD YYYY, h:mm:ss a')]);
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
const listAllNotes = () => {
  try {
    createLocalFile();
    const allNotes = loadAllNotes()
    console.log(chalk.bold.underline.cyan('📜 Listing All Notes 📜 '));
    console.log('\n')

    if (allNotes.length === 0) {
      console.log(chalk.yellowBright("Oops! No notes available."));
      return;
    }


    allNotes.forEach((note, i) => {
      console.log(chalk.blueBright(`(${i + 1})`) + chalk.greenBright(` ${note}`));
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
    const taskLength = data.Tasks.length;
    data.Tasks.forEach((task, i) => {
      taskArray.push([taskLength - i, wrap(task.task), moment(task.created_at).format('MMM DD YYYY, h:mm:ss a')]);
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
// createLocalFile()
createGlobalFile()
export { createLocalFile, addNote, addTask, commitToGit, listNotes, listTasks, listAllNotes, listAllTasks };
