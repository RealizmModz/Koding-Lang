var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var parser_exports = {};
__export(parser_exports, {
  default: () => Parser
});
module.exports = __toCommonJS(parser_exports);
var import_lexer = require("./lexer.ts");
class Parser {
  constructor() {
    this.tokens = [];
  }
  not_eof() {
    return this.tokens[0].type != import_lexer.TokenType.EOF;
  }
  at() {
    return this.tokens[0];
  }
  eat() {
    const prev = this.tokens.shift();
    return prev;
  }
  expect(type, err) {
    const prev = this.tokens.shift();
    if (!prev || prev.type != type) {
      console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
      Deno.exit(1);
    }
    return prev;
  }
  produceAST(sourceCode) {
    this.tokens = (0, import_lexer.tokenize)(sourceCode);
    const program = {
      kind: "Program",
      body: []
    };
    while (this.not_eof()) {
      program.body.push(this.parse_stmt());
    }
    return program;
  }
  parse_stmt() {
    return this.parse_expr();
  }
  parse_expr() {
    return this.parse_additive_expr();
  }
  parse_additive_expr() {
    let left = this.parse_multiplicitave_expr();
    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value;
      const right = this.parse_multiplicitave_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator
      };
    }
    return left;
  }
  parse_multiplicitave_expr() {
    let left = this.parse_primary_expr();
    while (this.at().value == "/" || this.at().value == "*" || this.at().value == "%") {
      const operator = this.eat().value;
      const right = this.parse_primary_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator
      };
    }
    return left;
  }
  parse_primary_expr() {
    const tk = this.at().type;
    switch (tk) {
      case import_lexer.TokenType.Identifier:
        return { kind: "Identifier", symbol: this.eat().value };
      case import_lexer.TokenType.Null:
        this.eat();
        return { kind: "NullLiteral", value: "null" };
      case import_lexer.TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value)
        };
      case import_lexer.TokenType.OpenParen: {
        this.eat();
        const value = this.parse_expr();
        this.expect(
          import_lexer.TokenType.CloseParen,
          "Unexpected token found inside parenthesised expression. Expected closing parenthesis."
        );
        return value;
      }
      default:
        console.error("Unexpected token found during parsing!", this.at());
        Deno.exit(1);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=parser.js.map
