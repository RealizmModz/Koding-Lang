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
var interpreter_exports = {};
__export(interpreter_exports, {
  evaluate: () => evaluate
});
module.exports = __toCommonJS(interpreter_exports);
function eval_program(program, env) {
  let lastEvaluated = { type: "null", value: "null" };
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }
  return lastEvaluated;
}
function eval_numeric_binary_expr(lhs, rhs, operator) {
  let result;
  if (operator == "+") {
    result = lhs.value + rhs.value;
  } else if (operator == "-") {
    result = lhs.value - rhs.value;
  } else if (operator == "*") {
    result = lhs.value * rhs.value;
  } else if (operator == "/") {
    result = lhs.value / rhs.value;
  } else {
    result = lhs.value % rhs.value;
  }
  return { value: result, type: "number" };
}
function eval_binary_expr(binop, env) {
  const lhs = evaluate(binop.left, env);
  const rhs = evaluate(binop.right, env);
  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(
      lhs,
      rhs,
      binop.operator
    );
  }
  return { type: "null", value: "null" };
}
function eval_identifier(ident, env) {
  const val = env.lookupVar(ident.symbol);
  return val;
}
function evaluate(astNode, env) {
  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        value: astNode.value,
        type: "number"
      };
    case "NullLiteral":
      return { value: "null", type: "null" };
    case "Identifier":
      return eval_identifier(astNode, env);
    case "BinaryExpr":
      return eval_binary_expr(astNode, env);
    case "Program":
      return eval_program(astNode, env);
    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode
      );
      Deno.exit(0);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  evaluate
});
//# sourceMappingURL=interpreter.js.map
