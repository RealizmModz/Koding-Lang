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
var environment_exports = {};
__export(environment_exports, {
  default: () => Environment
});
module.exports = __toCommonJS(environment_exports);
class Environment {
  constructor(parentENV) {
    this.parent = parentENV;
    this.variables = /* @__PURE__ */ new Map();
  }
  declareVar(varname, value) {
    if (this.variables.has(varname)) {
      throw `Cannot declare variable ${varname}. As it already is defined.`;
    }
    this.variables.set(varname, value);
    return value;
  }
  assignVar(varname, value) {
    const env = this.resolve(varname);
    env.variables.set(varname, value);
    return value;
  }
  lookupVar(varname) {
    const env = this.resolve(varname);
    return env.variables.get(varname);
  }
  resolve(varname) {
    if (this.variables.has(varname))
      return this;
    if (this.parent == void 0)
      throw `Cannot resolve '${varname}' as it does not exist.`;
    return this.parent.resolve(varname);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=environment.js.map
