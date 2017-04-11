/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeStatement = require('./../../bases/CodeStatement.js');
const  CodeStatementCollection = require('./../../bases/CodeStatementCollection.js');

var CodeTryCatchFinallyStatement = function () {
    this.CatchClauses = new CatchClauseCollection; //FIXME catch clause nadarim hanooz :D
    this.FinallyStatements = new CodeStatementCollection();
    this.TryStatements = new CodeStatementCollection();
};

CodeTryCatchFinallyStatement.prototype = Object.create(CodeStatement);

CodeTryCatchFinallyStatement.prototype.init = function (tryStatements, catchClause, finallyStatement) {

    this.setFinallyStatements(finallyStatement);
    this.setCatchClauses(catchClause);
    this.setTryStatements(tryStatements);
};

CodeTryCatchFinallyStatement.prototype.getCatchClauses = function () {
    return this.CatchClauses;
};

CodeTryCatchFinallyStatement.prototype.setCatchClauses = function (args) {
    if (Array.isArray(args)){
        var clauses = new CatchClauseCollection();
        clauses.add(args);
        this.CatchClauses = clauses;
    }
    else if((typeof args) == CatchClauseCollection)
        this.CatchClauses = args;
};

CodeTryCatchFinallyStatement.prototype.getFinallyStatements = function () {
    return this.FinallyStatements;
};

CodeTryCatchFinallyStatement.prototype.setFinallyStatements = function (args) {
    if (Array.isArray(args)){
        var statements = new CodeStatementCollection();
        statements.add(args);
        this.FinallyStatements = args;
    }
    else if ((typeof args) == CodeStatementCollection)
        this.FinallyStatements = args;
};

CodeTryCatchFinallyStatement.prototype.getTryStatements = function () {
    return this.TryStatements;
};

CodeTryCatchFinallyStatement.prototype.setTryStatements = function (args) {
    if (Array.isArray(args)){
        var statements = new CodeStatementCollection();
        statements.add(args);
        this.TryStatements = args;
    }
    else if ((typeof args) == CodeStatementCollection)
        this.TryStatements = args;
};

module.exports = CodeTryCatchFinallyStatement;