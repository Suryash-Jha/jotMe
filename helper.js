
var fs = require('fs');
// Node js "as alias"
const { v4: uuid4 } = require('uuid');
const { execSync } = require('child_process');  // Import execSync to run git commands synchronously

var root_local_path = 'docu-local.json'
var root_global_path = '/jotMe-records.json'

const createLocalFile = () => {
    if (!fs.existsSync(root_local_path)){
        data = { Notes: [],Tasks: []}
        fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
    }

}

const addNote = (note) => {
    createLocalFile()
    const fileData= fs.readFileSync(root_local_path, 'utf-8');
    const data= JSON.parse(fileData);
    const noteBody = {
        note: note,
        created_at: new Date(),
        id: uuid4(),
    }
    data.Notes.push(noteBody)
    fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
    console.log("Json body of note : ", noteBody, 'Total length of notes after insertion is : ', data.Notes.length ) 
}
const addTask = (task) => {
    createLocalFile()
    const fileData= fs.readFileSync(root_local_path, 'utf-8');
    const data= JSON.parse(fileData);
    const taskBody = {
        task: task,
        created_at: new Date(),
        id: uuid4(),
    }
    data.Tasks.push(taskBody)
    try{
        execSync(`git add .`, {stdio: 'inherit'});
        execSync(`git commit -m "${task}"`, {stdio: 'inherit'});
    }
    catch (err){
        console.log('Error while doing GIT operations, failed to record this task!!!', err)
        return;
    }
    fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log("Json body of task : ", taskBody, 'Total length of tasks after insertion is : ', data.Tasks.length ) 
}

exports.createLocalFile = createLocalFile
exports.addNote = addNote
exports.addTask = addTask

