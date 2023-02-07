var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_parser = __toESM(require("./frontend/parser.ts"));
var import_environment = __toESM(require("./runtime/environment.ts"));
var import_interpreter = require("./runtime/interpreter.ts");
repl();
function repl() {
  const parser = new import_parser.default();
  const env = new import_environment.default();
  env.declareVar("x", { value: 100, type: "number" });
  console.log("\nRepl v0.1");
  while (true) {
    const input = prompt("> ");
    if (!input || input.includes("exit")) {
      Deno.exit(1);
    }
    const program = parser.produceAST(input);
    const result = (0, import_interpreter.evaluate)(program, env);
    console.log(result);
  }
}
//# sourceMappingURL=main.js.map
