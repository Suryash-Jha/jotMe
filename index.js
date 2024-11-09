
var fs = require('fs');
var root_local_path= 'docu-local.json'
var root_global_path= '/jotMe-records.json'

const createLocalFile= ()=>{
// get location
console.log('current_directory+ filename', __filename)
// create and empty file with name docu-local.json
if(fs.existsSync(root_local_path)) console.log('file exists!')
else console.log('file doesn\'t exists')

}
createLocalFile()