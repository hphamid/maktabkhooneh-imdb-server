/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeStatement = require('./../../bases/CodeStatement.js');
var CodeObjects = require('./../../Enumerations/CodeObjects.js');

var CodeMethodReturnStatement = function (expression) {
    this.Expression = expression;
};

CodeMethodReturnStatement.prototype = Object.create(CodeStatement);

CodeMethodReturnStatement.prototype.getExpression = function () {
    return this.Expression;
};

CodeMethodReturnStatement.prototype.setExpression = function (expression) {
    this.Expression = expression;
};

CodeMethodReturnStatement.prototype.init = function (expression) {
    this.setExpression(expression);
};

CodeMethodReturnStatement.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeMethodReturnStatement, this,
        [this.getExpression().toString(languageHelper)]);
};
module.exports = CodeMethodReturnStatement;