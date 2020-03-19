/*
Example code in our language:
def f() 1 end
*/

const fs = require('fs');

class Tokenizer {
    constructor() {
        // Order is important!
        this.tokenTypes = new Map();
        this.tokenTypes.set('def', `\\bdef\\b`);
        this.tokenTypes.set('end', '\\bend\\b');
        this.tokenTypes.set('identifier', '\\b[a-zA.Z]+\\b');
        this.tokenTypes.set('integer', '\\b[0-9]+\\b');
        this.tokenTypes.set('oparen', '\\(');
        this.tokenTypes.set('cparen', '\\)');

        this.source = fs.readFileSync('test.src', { encoding: 'utf8' }).trim();
    }

    tokenize() {
        console.log(this.source);
        while (this.source !== '') {
            this.tokenTypes.forEach((value, key) => {
                const regex = new RegExp('\\A(' + value + ')');
                console.log(regex, value);
                console.log(this.source.match(regex));
            });
        }
    }
}

const tokenizer = new Tokenizer();

tokenizer.tokenize();
