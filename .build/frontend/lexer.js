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
var lexer_exports = {};
__export(lexer_exports, {
  TokenType: () => TokenType,
  tokenize: () => tokenize
});
module.exports = __toCommonJS(lexer_exports);
var TokenType = /* @__PURE__ */ ((TokenType2) => {
  TokenType2[TokenType2["Null"] = 0] = "Null";
  TokenType2[TokenType2["Number"] = 1] = "Number";
  TokenType2[TokenType2["Identifier"] = 2] = "Identifier";
  TokenType2[TokenType2["Let"] = 3] = "Let";
  TokenType2[TokenType2["BinaryOperator"] = 4] = "BinaryOperator";
  TokenType2[TokenType2["Equals"] = 5] = "Equals";
  TokenType2[TokenType2["OpenParen"] = 6] = "OpenParen";
  TokenType2[TokenType2["CloseParen"] = 7] = "CloseParen";
  TokenType2[TokenType2["EOF"] = 8] = "EOF";
  return TokenType2;
})(TokenType || {});
const KEYWORDS = {
  let: 3 /* Let */,
  null: 0 /* Null */
};
function token(value = "", type) {
  return { value, type };
}
function isalpha(src) {
  return src.toUpperCase() != src.toLowerCase();
}
function isskippable(str) {
  return str == " " || str == "\n" || str == "	";
}
function isint(str) {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}
function tokenize(sourceCode) {
  const tokens = new Array();
  const src = sourceCode.split("");
  while (src.length > 0) {
    if (src[0] == "(") {
      tokens.push(token(src.shift(), 6 /* OpenParen */));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), 7 /* CloseParen */));
    } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/" || src[0] == "%") {
      tokens.push(token(src.shift(), 4 /* BinaryOperator */));
    } else if (src[0] == "=") {
      tokens.push(token(src.shift(), 5 /* Equals */));
    } else {
      if (isint(src[0])) {
        let num = "";
        while (src.length > 0 && isint(src[0])) {
          num += src.shift();
        }
        tokens.push(token(num, 1 /* Number */));
      } else if (isalpha(src[0])) {
        let ident = "";
        while (src.length > 0 && isalpha(src[0])) {
          ident += src.shift();
        }
        const reserved = KEYWORDS[ident];
        if (typeof reserved == "number") {
          tokens.push(token(ident, reserved));
        } else {
          tokens.push(token(ident, 2 /* Identifier */));
        }
      } else if (isskippable(src[0])) {
        src.shift();
      } else {
        console.error(
          "Unreconized character found in source: ",
          src[0].charCodeAt(0),
          src[0]
        );
        Deno.exit(1);
      }
    }
  }
  tokens.push({ type: 8 /* EOF */, value: "EndOfFile" });
  return tokens;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TokenType,
  tokenize
});
//# sourceMappingURL=lexer.js.map
