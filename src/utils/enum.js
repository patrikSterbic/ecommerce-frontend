// Inspired by https://gist.github.com/xmlking/e86e4f15ec32b12c4689
export class EnumSymbol {
  sym = Symbol;
  value;
  description;

  constructor(name, { value, description }) {
    if (!Object.is(value, undefined)) this.value = value;
    if (description) this.description = description;

    Object.freeze(this);
  }

  get display() {
    return this.description || Symbol.keyFor(this.sym);
  }

  toString() {
    return this.sym;
  }

  valueOf() {
    return this.value;
  }
}

export class Enum {
  constructor(enumLiterals) {
    for (const key in enumLiterals) {
      if (!enumLiterals[key])
        throw new TypeError(
          "each enum should have been initialized with at least empty {} value"
        );
      this[key] = new EnumSymbol(key, enumLiterals[key]);
    }
    Object.freeze(this);
  }

  symbols() {
    return Object.keys(this).map(key => this[key]);
  }

  keys() {
    return Object.keys(this);
  }

  contains(sym) {
    if (!(sym instanceof EnumSymbol)) return false;
    return this[Symbol.keyFor(sym.sym)] === sym;
  }
}
