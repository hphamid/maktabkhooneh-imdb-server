/**
 * Created by Darya Computer on 8/4/2016.
 */

const  CodeTypeReference = require('./../classes/CodeTypeReference.js');
const  CodeStatementCollection = require('./../bases/CodeStatementCollection.js');

var CodeCatchClause = function () {
    this.CatchExceptionType = new CodeTypeReference();
    this.LocalName = '';
    this.Statements = new CodeStatementCollection();
};

CodeCatchClause.init = function (type, name, statements) {
    this.setCatchExceptionType(type);
    this.setLocalName(name);
    this.setStatements(statements);
};

CodeCatchClause.prototype.getCatchExceptionType = function () {
    return this.CatchExceptionType;
};

CodeCatchClause.prototype.setCatchExceptionType = function (type) {
    if (type instanceof String){
        var typeArg = new CodeTypeReference();
        typeArg.init(type);
        this.CatchExceptionType = typeArg;
    }
    else if(type instanceof CodeTypeReference)
        this.CatchExceptionType = type;
};

CodeCatchClause.prototype.getLocalName = function () {
    return this.LocalName;
};

CodeCatchClause.prototype.setLocalName = function (name) {
    this.LocalName = name;
};

CodeCatchClause.prototype.getStatements = function () {
    return this.Statements;
};

CodeCatchClause.prototype.setStatements = function (statements) {
    if (Array.isArray(statements)){
        var statementsArg = new CodeStatementCollection();
        statementsArg.add(statements);
        this.Statements = statementsArg;
    }
    else if(statements instanceof CodeStatementCollection)
        this.Statements = statements;
};
