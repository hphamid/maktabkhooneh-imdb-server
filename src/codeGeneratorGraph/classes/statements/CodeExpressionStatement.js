/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeStatement = require('./../../bases/CodeStatement.js');

var CodeExpressionStatement = function () {
    this.Expression = new CodeExpression();
};

CodeExpressionStatement.prototype.prototype = Object.create(CodeStatement);

CodeExpressionStatement.prototype.setExpression = function (codeExpression) {
    this.Expression = codeExpression;
};

CodeExpressionStatement.prototype.getExpression = function () {
    return this.Expression;
};

CodeExpressionStatement.prototype.init = function (codeExpression) {
    this.Expression = codeExpression;
};

module.exports = CodeExpressionStatement;