class Generator {
    constructor(parseTree) {
        this.parseTree = parseTree;
    }

    generate() {
        console.log(this.parseTree);
    }
}

module.exports = Generator;