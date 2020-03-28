const Tokenizer = require('./Tokenizer');
const Parser = require('./Parser');
const Generator = require('./Generator');

const tokenizer = new Tokenizer('test.src');
const tokens = tokenizer.tokenize();
const parser = new Parser(tokens);
const parseTree = parser.parse();
const generator = new Generator();
const code = generator.generate(parseTree);

const runtime = 'function add(x, y) { return x + y; }';
const test = 'console.log(f(1, 2));';

const resultCode = [runtime, code, test].join('\n');
console.log(resultCode);

// Call with node index.js | node
