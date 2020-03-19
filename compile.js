const fs = require('fs');

class Tokenizer {
    constructor() {
        // Order is important!
        this.tokenTypes = new Map();
        this.tokenTypes.set('def', /^(\bdef\b)/);
        this.tokenTypes.set('end', /^(\bend\b)/);
        this.tokenTypes.set('identifier', /^(\b[a-zA-Z]+\b)/);
        this.tokenTypes.set('integer', /^(\b[0-9]+\b)/);
        this.tokenTypes.set('oparen', /^(\()/);
        this.tokenTypes.set('cparen', /^(\))/);

        this.source = fs.readFileSync('test.src', { encoding: 'utf8' }).trim();
    }

    tokenize() {
        while (this.source.length) {
            this.tokenTypes.forEach((value, key) => {
                const match = this.source.match(value);
                if (match) {
                    const token = match[0];
                    const position = match.index;
                    this.source = this.source
                        .substr(position + token.length)
                        .trim();
                    console.log(token);
                }
            });
        }
    }
}

const tokenizer = new Tokenizer();

tokenizer.tokenize();
