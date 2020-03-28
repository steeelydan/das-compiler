const Tokenizer = require('./Tokenizer');
const Parser = require('./Parser');
const Generator = require('./Generator');

const tokenizer = new Tokenizer('test.src');
const tokens = tokenizer.tokenize();
const parser = new Parser(tokens);
const parseTree = parser.parse();
const generator = new Generator(parseTree);
const code = generator.generate();