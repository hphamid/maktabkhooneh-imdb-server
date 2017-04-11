/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeStatement = require('./../../bases/CodeStatement.js');

var CodeThrowExceptionStatement = function () {
    this.ToThrow = new CodeExpression();
};

CodeThrowExceptionStatement.prototype = Object.create(CodeStatement);

CodeThrowExceptionStatement.prototype.getToThrow = function () {
    return this.ToThrow;
};

CodeThrowExceptionStatement.prototype.setToThrow = function (exception) {
    this.ToThrow = exception;
};

CodeThrowExceptionStatement.prototype.init = function (exeption) {
    this.setToThrow(exeption);
};

module.exports = CodeThrowExceptionStatement;