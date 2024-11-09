const createLocalFile = () => {
  // Get location
  console.log('Current file: ' + __filename);

  // Check if docu-local.json exists
  if (fs.existsSync(root_local_path)) {
    console.log('File exists!');
    
    // Read the content of the file to check its structure
    const fileContent = fs.readFileSync(root_local_path, 'utf-8');
    let data;

    try {
      // Parse the file content as JSON
      data = JSON.parse(fileContent);
      
      // Check if the structure is valid
      if (!data.Notes || !Array.isArray(data.Notes)) {
        console.log('Notes array missing or invalid. Initializing...');
        data.Notes = [];
      }

      if (!data.Tasks || !Array.isArray(data.Tasks)) {
        console.log('Tasks array missing or invalid. Initializing...');
        data.Tasks = [];
      }

      // If everything is valid, log the current data
      console.log('File data structure is correct:', data);

    } catch (err) {
      console.error('Error reading or parsing file, initializing default structure:', err);
      // Initialize default structure if the file is invalid
      data = { Notes: [], Tasks: [] };
    }

    // Optionally, write the corrected structure back to the file (to fix any issues)
    fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
  } else {
    console.log('File doesn\'t exist. Creating a new file with default structure...');

    // Initialize the structure if the file does not exist
    const initialData = {
      Notes: [],
      Tasks: []
    };

    // Write the default structure to the file
    fs.writeFileSync(root_local_path, JSON.stringify(initialData, null, 2), 'utf-8');
    console.log('File created successfully with initial structure.');
  }
};



// converted this amount of chatgpt code to just


const createLocalFileX = () => {
    if (!fs.existsSync(root_local_path)){
        data = { Notes: [],Tasks: []}
        fs.writeFileSync(root_local_path, JSON.stringify(data, null, 2), 'utf-8');
    }
}