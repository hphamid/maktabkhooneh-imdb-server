/**
 * Created by Darya Computer on 8/1/2016.
 */

const  CodeTypeMember = require('./../bases/CodeTypeMember.js');
const  CodeStatementCollection = require('./../bases/CodeStatementCollection.js');
const  CodeTypeReference = require('./../classes/CodeTypeReference.js');
const  CodeParameterDeclarationExpression = require('./../classes/Expressions/CodeParameterDeclarationExpression.js');
const  CodeParameterDeclarationExpressionCollection = require('./../classes/CodeParameterDeclarationExpressionCollection.js');
const CodeObjects = require('./../Enumerations/CodeObjects.js');

var CodeMemberMethod = function () {
    this.Parameters = new CodeParameterDeclarationExpressionCollection();
    this.ReturnType = new CodeTypeReference();
    this.Statements = new CodeStatementCollection();
    this.TypeParameters = ''; //FIXME in barae genericas badan bzanim hala :D
    this.IsPublic = true;
    this.IsStatic = false;
};

CodeMemberMethod.prototype = Object.create(CodeTypeMember.prototype); //FIXME type member :-? :-"

CodeMemberMethod.prototype.getParameters = function () {
    return this.Parameters;
};

CodeMemberMethod.prototype.init = function (isPublic, returnType, name, parameters, statements) {
    this.setIsPublic(isPublic);
    this.setReturnType(returnType);
    this.setName(name);
    this.setParameters(parameters);
    this.setStatements(statements);
};

CodeMemberMethod.prototype.getParameters = function () {
    return this.Parameters;
};

CodeMemberMethod.prototype.addParameter = function (arg) {
    var parameter = new CodeParameterDeclarationExpression();
    parameter.init(args);
    this.Parameters.add(parameter);
};

CodeMemberMethod.prototype.setParameters = function (Parameters) {
    if (Array.isArray(Parameters)){
        this.Parameters.add(Parameters);
    }
    else
        this.Parameters = Parameters;
};

CodeMemberMethod.prototype.getReturnType = function () {
    return this.ReturnType;
};

CodeMemberMethod.prototype.setReturnType = function (arg) {
    if(arg instanceof CodeTypeReference){
        this.ReturnType = arg;
    }
    else {
        var returnType = new CodeTypeReference();
        returnType.init(arg);
        this.ReturnType = returnType;
    }
};

CodeMemberMethod.prototype.getIsPublic = function () {
    return this.IsPublic;
};

CodeMemberMethod.prototype.setIsPublic = function (isPublic) {
    this.IsPublic = isPublic;
};

CodeMemberMethod.prototype.getIsStatic = function () {
    return this.IsStatic;
};

CodeMemberMethod.prototype.setIsStatic = function (isStatic) {
    this.IsStatic = isStatic;
};

CodeMemberMethod.prototype.getStatements = function () {
    return this.Statements;
};

CodeMemberMethod.prototype.setStatements = function (args) {
    if (Array.isArray(args)){
        var statements = new CodeStatementCollection();
        statements.add(args);
        this.Statements = statements;
    }
    else
        this.Statements = args;
};

CodeMemberMethod.prototype.addStatement = function (arg) {

    this.Statements.add(arg);
};

CodeMemberMethod.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeMemberMethod, this,
        [
            (this.getReturnType() != undefined) ? this.getReturnType().toString(languageHelper) : null,
            (this.getParameters() != undefined) ? this.getParameters().toString(languageHelper) : null,
            (this.getStatements() != undefined) ? this.getStatements().toString(languageHelper) : null
        ]);
};
module.exports = CodeMemberMethod;