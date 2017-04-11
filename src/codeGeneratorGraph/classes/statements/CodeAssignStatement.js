/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeStatement = require('./../../bases/CodeStatement.js');
const CodeObjects = require('./../../Enumerations/CodeObjects.js');

var CodeAssignStatement = function () {
    this.Left = new CodeExpression();
    this.Right = new CodeExpression();
};

CodeAssignStatement.prototype = Object.create(CodeStatement);

CodeAssignStatement.prototype.setLeft = function (left) {
    this.Left = left;
};

CodeAssignStatement.prototype.getLeft = function () {
    return this.Left;
};

CodeAssignStatement.prototype.setRight = function (right) {
    this.Right = right;
};

CodeAssignStatement.prototype.getRight = function () {
    return this.Right;
};

CodeAssignStatement.prototype.init = function (left, right) {
    this.setRight(right);
    this.setLeft(left);
};

CodeAssignStatement.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeAssignStatement, this,
        [this.getLeft().toString(languageHelper), this.getRight().toString(languageHelper)]);
}
module.exports = CodeAssignStatement;

