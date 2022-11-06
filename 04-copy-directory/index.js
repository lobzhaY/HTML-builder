const path = require('path');
const fs = require('fs');

const pathDir = path.join(__dirname, 'files-copy');
const startPath = path.join(__dirname, 'files');

function copyDir() {
    fs.mkdir(pathDir, { recursive: true }, err => {
        if (err) throw err;
    });
    fs.readdir(startPath, (err, data) => {
        console.log(data)
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            fs.promises.copyFile((path.join(startPath, data[i])), (path.join(pathDir, data[i])))
        }
    })
}
copyDir();