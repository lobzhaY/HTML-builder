const path = require('path');
const fs = require('fs');
const secretPath = path.join(__dirname, 'secret-folder');
fs.readdir(secretPath, (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
        fs.stat(path.join(secretPath, data[i]), (err, stats) => {
            if (err) throw err;
            if (stats.isFile()) {
                size = stats.size;
                let extname = path.extname(data[i]).slice(1);
                let index = data[i].lastIndexOf('.');
                let name = data[i].slice(0, index);
                console.log(`${name} - ${extname} - ${size}b`)
            }
        });
    }
});