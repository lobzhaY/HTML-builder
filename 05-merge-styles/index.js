const fs = require('fs');
const path = require('path');

const pathStyleDir = path.join(__dirname, 'styles');
console.log(pathStyleDir);
let allStyles = [];

fs.readdir(pathStyleDir, (err, data) => {
    console.log(data)
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
        fs.stat(path.join(pathStyleDir, data[i]), (err, stats) => {
            if (err) throw err;
            if (stats.isFile() && path.extname(data[i]).slice(1) === 'css') {
                console.log(data[i]);
                fs.readFile(
                    path.join(pathStyleDir, data[i]),
                    'utf-8',
                    (err, data) => {
                        if (err) throw err;
                        allStyles.push(data);
                        writeBundle(allStyles)
                    }
                )
            }
        });
    }
})

function writeBundle(data) {
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
                .write(data[i])
        } else {
            fs.appendFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                data[i],
                err => {
                    if (err) throw err;
                    console.log('Файл был изменен');
                }
            );
        }
    }
}