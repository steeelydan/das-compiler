class DefNode {
    constructor(name, argNames, body) {
        this.name = name;
        this.argNames = argNames;
        this.body = body;
    }
}

class IntegerNode {
    constructor(value) {
        this.value = value;
    }
}

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
    }

    parse() {
        const parseTree = this.parseDefinition();
        console.log(parseTree);
    }

    consume(expectedType) {
        const token = this.tokens.shift();
        if (token.type === expectedType) {
            return token;
        } else {
            throw 'Expected token type: ' +
                expectedType +
                ', but we got ' +
                token.type +
                '.';
        }
    }

    parseDefinition() {
        this.consume('def');
        const name = this.consume('identifier').value;
        const argNames = this.parseArgNames();
        const body = this.parseExpression();
        this.consume('end');

        return new DefNode(name, argNames, body);
    }

    parseArgNames() {
        this.consume('oparen');
        const argNames = [];
        if (this.peek('identifier')) {
            argNames.push(this.consume('identifier').value);
            while (this.peek('comma')) {
                this.consume('comma');
                argNames.push(this.consume('identifier').value);
            }
        }
        this.consume('cparen');

        return argNames;
    }

    parseExpression() {
        return this.parseInteger();
    }

    parseInteger() {
        return new IntegerNode(this.consume('integer').value);
    }

    peek(expectedType) {
        return this.tokens[0].type === expectedType;
    }
}

module.exports = Parser;
