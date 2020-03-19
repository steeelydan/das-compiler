/*
Example code in our language:
def f() 1 end
*/

const fs = require('fs');

class Tokenizer {
    constructor() {
        this.source = fs.readFileSync('test.src', { encoding: 'utf8' }).trim();
    }

    tokenize() {
        console.log(this.source);
    }
}

const tokenizer = new Tokenizer();

tokenizer.tokenize();
