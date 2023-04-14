export default class CerebrumPenetrate {
  constructor() {
    this.tape = [];
    this.head = 0;
    this.code = '';
    this.maxBlocks = 30000;
    this.operators = '<>+-[].,';
    this.codePointer = 0;
    this.addressStack = [];
    this.output = '';
    this.outputElement = {};

    this.resetTape();
  }

  load(text) {
    this.code = text;
    this.trimCode();
  }

  run() {
    let finish = false;

    this.resetAll();

    const operations = {
      '<': () => {
        this.prev();
      },
      '>': () => {
        this.next();
      },
      '+': () => {
        this.inc();
      },
      '-': () => {
        this.dec();
      },
      '[': () => {
        if (this.tape[this.head]) {
          this.addressStack.push(this.codePointer);
        } else {
          let count = 0;
          while (true) {
            this.codePointer++;
            if (!this.code[this.codePointer]) break;
            if (this.code[this.codePointer] === '[') {
              count++;
            } else if (this.code[this.codePointer] === ']') {
              if (count > 0) {
                count--;
              } else {
                break;
              }
            }
          }
        }
      },
      ']': () => {
        this.codePointer = this.addressStack.pop() - 1;
      },
      '.': () => {
        this.toOutput();
      },
      ',': () => {
        this.input();
      },
    };

    while (!finish) {
      if (this.code[this.codePointer] === undefined) {
        finish = true;
      } else {
        operations[this.code[this.codePointer]]();
      }

      this.codePointer++;
    }
  }

  trimCode() {
    this.code = this.code
      .split('')
      .filter((e) => this.operators.split('').includes(e))
      .join('');
  }

  next() {
    this.head = Math.min(this.maxBlocks, this.head + 1);
  }

  prev() {
    this.head = Math.max(0, this.head - 1);
  }

  inc() {
    this.tape[this.head] = Math.min(255, this.tape[this.head] + 1);
  }

  dec() {
    this.tape[this.head] = Math.max(0, this.tape[this.head] - 1);
  }

  out() {
    return this.getChar();
  }

  toOutput() {
    this.output += this.out();
  }

  input() {
    let input = prompt('Input');
    if (input.length > 0) {
      this.setChar(input);
    }
  }

  log() {
    console.log(this.output);
  }

  print() {
    if (this.outputElement.value !== undefined) {
      this.outputElement.value = this.output.replaceAll('\n', '<br />');
    } else {
      this.outputElement.innerHTML = this.output.replaceAll('\n', '<br />');
    }
  }

  getValue() {
    return this.tape[this.head];
  }

  setValue(value) {
    if (value >= 0 && value <= 255) {
      this.tape[this.head] = value;
    }
  }

  getChar() {
    return String.fromCharCode(this.tape[this.head]);
  }

  setChar(char) {
    this.setValue(char.charCodeAt());
  }

  resetTape() {
    this.tape = Array(this.maxBlocks).fill(0);
  }

  resetAll() {
    this.resetTape();
    this.head = 0;
    this.codePointer = 0;
    this.addressStack = [];
    this.output = '';
  }

  setOutputElement(selector) {
    this.outputElement = document.querySelector(selector);
  }

  getOutputElement() {
    return this.outputElement;
  }
}
