
const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);

// Validate arguments
if (args.length < 2) {
    console.log("Usage: node index.js <operation> <file/dir> [additional arguments]");
    process.exit(1);
}

// Parse arguments
const operation = args[0];
const filePath = args[1];
const additionalArgs = args.slice(2);

// Define operations
const operations = {
    read: (file) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file '${file}': ${err.message}`);
                return;
            }
            console.log(data);
        });
    },
    delete: (file) => {
        fs.unlink(file, (err) => {
            if (err) {
                console.error(`Error deleting file '${file}': ${err.message}`);
                return;
            }
            console.log(`File '${file}' deleted`);
        });
    },
    create: (file) => {
        fs.writeFile(file, '', (err) => {
            if (err) {
                console.error(`Error creating file '${file}': ${err.message}`);
                return;
            }
            console.log(`File '${file}' created`);
        });
    },
    append: (file, content) => {
        fs.appendFile(file, content + '\n', (err) => {
            if (err) {
                console.error(`Error appending to file '${file}': ${err.message}`);
                return;
            }
            console.log(`Content appended to the file '${file}'`);
        });
    },
    rename: (oldFile, newFile) => {
        fs.rename(oldFile, newFile, (err) => {
            if (err) {
                console.error(`Error renaming file '${oldFile}' to '${newFile}': ${err.message}`);
                return;
            }
            console.log(`File '${oldFile}' renamed to '${newFile}'`);
        });
    },
    list: (dir) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error(`Error listing directory '${dir}': ${err.message}`);
                return;
            }
            files.forEach(file => {
                console.log(file);
            });
        });
    }
};

// Check if operation is valid and execute
if (operation in operations) {
    if (operation === 'append') {
        operations[operation](filePath, additionalArgs.join(' '));
    } else if (operation === 'rename') {
        if (additionalArgs.length !== 1) {
            console.log("Usage: node index.js rename <oldFileName> <newFileName>");
        } else {
            operations[operation](filePath, additionalArgs[0]);
        }
    } else {
        operations[operation](filePath);
    }
} else {
    console.log("Invalid operation. Supported operations are: read, delete, create, append, rename, list");
}
