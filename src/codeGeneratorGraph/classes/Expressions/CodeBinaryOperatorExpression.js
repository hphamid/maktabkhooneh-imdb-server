/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');


var CodeBinaryOperatorExpression = function () {
    this.Left = new CodeExpression();
    this.Right = new CodeExpression();
    this.Operator = '';
};

CodeBinaryOperatorExpression.prototype = Object.create(CodeExpression);

CodeBinaryOperatorExpression.prototype.init = function (left, operator, right) {
    this.setLeft(left);
    this.setRight(right);
    this.setOperator(operator);
};

CodeBinaryOperatorExpression.prototype.getLeft = function () {
    return this.Left;
};

CodeBinaryOperatorExpression.prototype.setLeft = function (left) {
    this.Left = left;
};

CodeBinaryOperatorExpression.prototype.getRight = function () {
    return this.Right;
};

CodeBinaryOperatorExpression.prototype.setRight = function (right) {
    this.Right = right;
};

CodeBinaryOperatorExpression.prototype.getOperator = function () {
    return this.Operator;
};

CodeBinaryOperatorExpression.prototype.setOperator = function (operator) {
    this.Operator = operator;
};

module.exports = CodeBinaryOperatorExpression;