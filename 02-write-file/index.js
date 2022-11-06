const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const emitter = new EventEmitter();
let userText = '';
emitter.on('start', message => console.log(message));
emitter.emit('start', 'Hello');
const { stdin } = process;
stdin.on('data', data => {
    userText += data;
    if (data.indexOf('exit') !== -1) {
        console.log('Удачи в изучении Node.js!')
        process.exit();
    } else {
        fs.writeFile(
            path.join(__dirname, 'text.txt'),
            userText,
            (err) => {
                if (err) throw err;
                console.log('Файл был создан');
            }
        );
    }
});