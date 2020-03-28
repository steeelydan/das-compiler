class Generator {
    generate(node) {
        switch (node.constructor.name) {
            case 'DefNode':
                const defFunctionName = node.name;
                const defArgNames = node.argNames.join(', ');
                const defReturnValue = this.generate(node.body);
                return `function ${defFunctionName}(${defArgNames}) { return ${defReturnValue} };`;
            case 'FunctionCallNode':
                const callFunctionName = node.name;
                const callArgNames = node.argExpressions
                    .map(expression => {
                        return this.generate(expression);
                    })
                    .join(', ');
                return `${callFunctionName}(${callArgNames})`;
            case 'IntegerNode':
                return node.value;
            case 'VariableReferenceNode':
                return node.value;
            default:
                throw 'Unexpected node type: ' + node.constructor.name;
        }
    }
}

module.exports = Generator;
