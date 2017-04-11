/**
 * Created by Darya Computer on 8/2/2016.
 */
const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeStatement = require('./../../bases/CodeStatement.js');

var CodeIterationStatement = function () {

    this.Statements = new CodeStatementCollection();
    this.InitStatement = new CodeStatement();
    this.IncrementStatement = new CodeStatement();
    this.TestExpression = new CodeExpression();
};

CodeIterationStatement.prototype = Object.create(CodeStatement);

CodeIterationStatement.prototype.init = function (initStatement, testExp, incExp, statements) {

    this.setStatements(statements);
    this.setIncrementStatement(incExp);
    this.setTestExpression(testExp);
    this.setInitStatement(initStatement);
};

CodeIterationStatement.prototype.getInitStatement = function () {
    return this.InitStatement;
};

CodeIterationStatement.prototype.setInitStatement = function (statement) {
    this.InitStatement = statement;
};

CodeIterationStatement.prototype.getIncrementStatement = function () {
    return this.IncrementStatement;
};

CodeIterationStatement.prototype.setIncrementStatement = function (statement) {
    this.IncrementStatement = statement;
};

CodeIterationStatement.prototype.getTestExpression = function () {
    return this.TestExpression;
};

CodeIterationStatement.prototype.setTestExpression = function (statement) {
    this.TestExpression = statement;
};

CodeIterationStatement.prototype.getStatements = function () {
    return this.Statements;
};

CodeIterationStatement.prototype.setStatements = function (statements) {
    this.Statements = statements;
};

CodeIterationStatement.prototype.addStatement = function (statement) {
    this.Statements.add(statement);
};

CodeIterationStatement.prototype.removeStatement = function (statement) {
    this.Statements.remove(statement);
};

module.exports = CodeIterationStatement;