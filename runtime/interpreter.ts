import { ValueType, RuntimeVal } from "./values.ts";
import { NumericLiteral, Stmt } from "../frontend/ast.ts";


export function evaluate (astNode: Stmt): RuntimeVal {

switch (astNode.kind) {
  case "NumericLiteral":
    return {
      value: ((astNode as NumericLiteral).value),
      type: "number",
    } as NumberVal;

  default:
    console.log(astNode);
    return { value: "null", type: "null" } as "NullVal";
}
  
}