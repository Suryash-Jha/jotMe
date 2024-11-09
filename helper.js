
var fs = require('fs');
// Node js "as alias"
const { v4: uuid4 } = require('uuid');

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
    const noteBody = {
        note: note,
        created_at: new Date(),
        id: uuid4(),
    }
    console.log("Json body of note : ", noteBody)
}

exports.createLocalFile = createLocalFile
exports.addNote = addNote

