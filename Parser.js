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
        this.consume('cparen');

        return []; // For now
    }

    parseExpression() {
        return this.parseInteger();
    }

    parseInteger() {
        return new IntegerNode(this.consume('integer').value);
    }
}

module.exports = Parser;