/**
 * Created by Darya Computer on 8/4/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');

var CodeVariableReferenceExpression = function (name) {
    this.setVariableName(name);
};

CodeVariableReferenceExpression.prototype = Object.create(CodeExpression);

CodeVariableReferenceExpression.prototype.getVariableName = function () {
    return this.VariableName;
};

CodeVariableReferenceExpression.prototype.setVariableName = function (name) {
    this.VariableName = name;
};

CodeVariableReferenceExpression.prototype.toString = function (languageHelper) {
    return this.getVariableName();
};
module.exports = CodeVariableReferenceExpression;