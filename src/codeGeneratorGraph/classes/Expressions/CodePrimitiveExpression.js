/**
 * Created by Darya Computer on 8/4/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');


var CodePrimitiveExpression = function (val) {
    this.Value = val;
};
CodePrimitiveExpression.prototype = Object.create(CodeExpression);

CodePrimitiveExpression.prototype.init = function (val) {
    this.setValue(val);
};

CodePrimitiveExpression.prototype.getValue = function () {
    return this.Value;
};

CodePrimitiveExpression.prototype.setValue = function (val) {
    this.Value = val;
};

 CodePrimitiveExpression.prototype.toString = function (languageHelper) {
     return '"' + this.Value.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0') + '"';
 };
module.exports = CodePrimitiveExpression;