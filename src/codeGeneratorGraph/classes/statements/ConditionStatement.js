/**
 * Created by Darya Computer on 8/2/2016.
 */
const  CodeStatement = require('./../../bases/CodeStatement.js');
const  CodeExpression = require('./../../bases/CodeExpression.js');

var ConditionStatement = function () {
    this.Condition = new CodeExpression();
    this.FalseStatement = new CodeStatement();
    this.TrueStatement = new CodeStatement();
};

CodeAssignStatement.prototype = Object.create(CodeStatement);

ConditionStatement.prototype.setCondition = function (condition) {
    if (condition instanceof CodeExpression)
        this.Condition = condition;
};

ConditionStatement.prototype.getCondition = function () {
    return this.Condition;
};

ConditionStatement.prototype.setFalseStatement = function (statement) {
    this.FalseStatement = statement;
};

ConditionStatement.prototype.getFalseStatement = function () {
    return this.FalseStatement;
};

ConditionStatement.prototype.setTrueStatement = function (statement) {
    this.TrueStatement = statement;
};

ConditionStatement.prototype.getTrueStatement = function () {
    return this.TrueStatement;
};

ConditionStatement.prototype.init = function (condition, trueStatement, falseStatement) {
    this.setCondition(condition);
    this.setTrueStatement(trueStatement);
    this.setFalseStatement(falseStatement);
};

module.exports = ConditionStatement;