export function dew () {
  throw new Error("Error converting CommonJS file aurelia-binding\\src\\decorator-observable.js, please post a jspm bug with this message.\nSyntaxError: unknown: Unexpected token, expected \",\" (1:41)\n\n> 1 | export function observable(targetOrConfig: any, key: string, descriptor?: PropertyDescriptor) {\n    |                                          ^\n  2 |   function deco(target, key, descriptor, config) { // eslint-disable-line no-shadow\n  3 |     // class decorator?\n  4 |     const isClassDecorator = key === undefined;\n    at Parser._raise (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:807:17)\n    at Parser.raiseWithData (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:800:17)\n    at Parser.raise (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:761:17)\n    at Parser.unexpected (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:9931:16)\n    at Parser.expect (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:9905:28)\n    at Parser.parseBindingList (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:10372:14)\n    at Parser.parseFunctionParams (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:13207:24)\n    at Parser.parseFunction (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:13185:10)\n    at Parser.parseFunctionStatement (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:12822:17)\n    at Parser.parseStatementContent (C:\\Users\\bejoy\\AppData\\Roaming\\npm\\node_modules\\jspm\\node_modules\\@babel\\parser\\lib\\index.js:12503:21)");
}
