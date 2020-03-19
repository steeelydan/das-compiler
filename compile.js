/*
Example code in our language:
def f() 1 end
*/

const fs = require('fs');

class Tokenizer {
    constructor() {
        this.file = fs.readFileSync('test.src', {encoding: 'utf8'}).trim();
        console.log(this.file);
    }
}

new Tokenizer();