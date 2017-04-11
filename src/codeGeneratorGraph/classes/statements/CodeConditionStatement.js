/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeStatement = require('./../../bases/CodeStatement.js');

var CodeConditionStatement = function () {
    this.Condition = new CodeExpression();
    this.FalseStatement = new CodeStatement();
    this.TrueStatement = new CodeStatement();
};

CodeConditionStatement.prototype = Object.create(CodeStatement);

CodeConditionStatement.prototype.setCondition = function (condition) {
    if ((typeof condition) == CodeExpression)
        this.Condition = condition;
    else if((typeof condition) == String){
        var con = new CodeExpression(condition);
        this.Condition = con;
    }
};

CodeConditionStatement.prototype.getCondition = function () {
    return this.Condition;
};

CodeConditionStatement.prototype.setFalseStatement = function (statement) {
    this.FalseStatement = statement;
};

CodeConditionStatement.prototype.getFalseStatement = function () {
    return this.FalseStatement;
};

CodeConditionStatement.prototype.setTrueStatement = function (statement) {
    this.TrueStatement = statement;
};

CodeConditionStatement.prototype.getTrueStatement = function () {
    return this.TrueStatement;
};

CodeConditionStatement.prototype.init = function (condition, trueStatement, falseStatement) {
    this.setCondition(condition);
    this.setTrueStatement(trueStatement);
    this.setFalseStatement(falseStatement);
};

module.exports = CodeConditionStatement;