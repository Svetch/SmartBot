const operators = {
    '>': function (a: any, b: any): any { return a > b; },
    '<': function (a: any, b: any): any { return a < b; },
    '>=': function (a: any, b: any): any { return a >= b; },
    '<=': function (a: any, b: any): any { return a <= b; },
    '!=': function (a: any, b: any): any { return a != b; },
    '==': function (a: any, b: any): any { return a == b; },
    '===': function (a: any, b: any): any { return a === b; },
};
export default operators;