const Tokenizer = require('./Tokenizer');
const Parser = require('./Parser');

const tokenizer = new Tokenizer('test.src');
const tokens = tokenizer.tokenize();
const parser = new Parser(tokens);
parser.parse();
