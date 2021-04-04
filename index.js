const fs = require('fs');
const Tokenizer = require('./Tokenizer');
const Parser = require('./Parser');
const Generator = require('./Generator');

const src = fs.readFileSync('./test.src', { encoding: 'utf-8' });

const tokenizer = new Tokenizer(src);
const tokens = tokenizer.tokenize();
const parser = new Parser(tokens);
const parseTree = parser.parse();
const generator = new Generator();
const code = generator.generate(parseTree);

const runtime = 'function add(x, y) { return x + y; }';
const test = 'console.log(f(1, 2));';

const resultCode = [runtime, code, test].join('\n');

fs.writeFileSync('./result.js', resultCode);

console.log(
  `Source code (test.src):\n\n${src}\n\nResulting code (result.js):\n\n${resultCode}\n\nRun with: node result.js`
);
