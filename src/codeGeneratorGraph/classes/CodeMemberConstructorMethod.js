/**
 * Created by Darya Computer on 8/1/2016.
 */
const CodeMemberMethod  = require('./CodeMemberMethod.js');
const CodeObjects = require('./../Enumerations/CodeObjects.js');
const  CodeStatementCollection = require('./../bases/CodeStatementCollection.js');
const  CodeTypeReference = require('./../classes/CodeTypeReference.js');
const  CodeParameterDeclarationExpression = require('./../classes/Expressions/CodeParameterDeclarationExpression.js');
const  CodeParameterDeclarationExpressionCollection = require('./../classes/CodeParameterDeclarationExpressionCollection.js');

var CodeMemberConstructorMethod = function () {
    this.Parameters = new CodeParameterDeclarationExpressionCollection();
    this.ReturnType = new CodeTypeReference();
    this.Statements = new CodeStatementCollection();
    this.TypeParameters = ''; //FIXME in barae genericas badan bzanim hala :D
    this.IsPublic = true;
    this.IsStatic = false;
};

CodeMemberConstructorMethod.prototype = Object.create(CodeMemberMethod.prototype);


CodeMemberConstructorMethod.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeMemberConstructorMethod, this,
        [
            (this.getReturnType() != undefined) ? this.getReturnType().toString(languageHelper) : null,
            (this.getParameters() != undefined) ? this.getParameters().toString(languageHelper) : null,
            (this.getStatements() != undefined) ? this.getStatements().toString(languageHelper) : null
        ]);
};

module.exports = CodeMemberConstructorMethod;