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

class FunctionCallNode {
    constructor(name, argExpressions) {
        this.name = name;
        this.argExpressions = argExpressions;
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
                '. At: ' +
                token.value;
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
        if (this.peek('integer')) {
            return this.parseInteger();
        } else {
            return this.parseFunctionCall();
        }
    }

    parseInteger() {
        return new IntegerNode(this.consume('integer').value);
    }

    parseFunctionCall() {
        const name = this.consume('identifier').value;
        const argExpressions = this.parseArgExpressions();
        return new FunctionCallNode(name, argExpressions);
    }

    parseArgExpressions() {
        const argExpressions = [];
        
        this.consume('oparen');
        
        if (!this.peek('cparen')) {
            argExpressions.push(this.parseExpression());
            while (this.peek('comma')) {
                this.consume('comma');
                argExpressions.push(this.parseExpression());
            }
        }

        this.consume('cparen');

        return argExpressions;
    }

    peek(expectedType) {
        return this.tokens[0].type === expectedType;
    }
}

module.exports = Parser;
