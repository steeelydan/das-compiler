const fs = require('fs');

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Tokenizer {
    constructor(fileName) {
        // Order is relevant for token type discrimination & operator precedence
        this.tokenTypes = [
            { name: 'def', regex: /^(\bdef\b)/ },
            { name: 'end', regex: /^(\bend\b)/ },
            { name: 'identifier', regex: /^(\b[a-zA-Z]+\b)/ },
            { name: 'integer', regex: /^(\b[0-9]+\b)/ },
            { name: 'oparen', regex: /^(\()/ },
            { name: 'cparen', regex: /^(\))/ }
        ];

        this.source = fs.readFileSync(fileName, { encoding: 'utf8' }).trim();
    }

    tokenize() {
        const tokens = [];

        while (this.source.length) {
            let token = null;

            this.source = this.source.trim(); // Ignore all whitespace

            for (let i = 0; i < this.tokenTypes.length; i++) {
                const name = this.tokenTypes[i].name;
                const regex = this.tokenTypes[i].regex;
                token = this.getValidToken(name, regex);
                if (token) {
                    tokens.push(token);
                    break;
                }
            }

            if (!token) {
                throw this.tokenizeError();
            }
        }

        return tokens;
    }

    getValidToken(name, regex) {
        const match = this.source.match(regex);

        if (match) {
            const token = match[0];
            const position = match.index;
            this.source = this.source.substr(position + token.length);

            return new Token(name, token);
        } else {
            return null;
        }
    }

    tokenizeError() {
        return (
            "Couldn't match token at: " +
            this.source.substr(0, 20) +
            (this.source.length > 20 ? '...' : '')
        );
    }
}

module.exports = Tokenizer;