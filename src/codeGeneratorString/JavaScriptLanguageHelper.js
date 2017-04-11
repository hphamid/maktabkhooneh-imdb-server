/**
 * Created by Darya Computer on 8/6/2016.
 */
'use strict';
const CodeObjects = require('./../codeGeneratorGraph/Enumerations/CodeObjects.js');
const Mustache = require('mustache');
Mustache.escape = function (value) {
    return value;
};
var JavaScriptLanguageHelper = function () {

    this.TypeMemberDeclaration = '{{#members}}{{{.}}} {{{enter}}} {{/members}}';
    this.requireTemplate = 'require ({{{quot}}}{{{address}}}{{{quot}}})';
    this.FieldReferenceExpressionTemplate = '{{target}}.{{FieldName}}';
    this.MethodInvokeExpressionTemplate = '{{method}}({{parameters}})';
    this.ParameterDeclarationExpressionCollectionTemplate = '{{#parameters}}, {{{.}}}{{/parameters}}';
    this.VariableDeclarationStatementTemplate = 'var {{{name}}} {{{equal}}} {{{initializer}}}';
    this.AssignStatementTemplate = '{{{left}}} {{{equal}}} {{{right}}}';
    this.StatementCollection = '{{#statements}}{{{.}}}; {{{enter}}} {{/statements}}';

    this.MemberMethod = 'module.exports.{{name}} {{{equal}}} function ({{{parameters}}}) ' +
        '{ ' +
        '{{{enter}}}' +
        '{{{statements}}} ' +
        '};';
    this.TypeMemberCollection = '{{#members}} \n  {{{.}}} \n {{/members}}';
    this.MethodReferenceExpressionTemplate = '{{#hasTarget}}{{{target}}}.{{/hasTarget}} {{{methodName}}}';
    this.ConstructorMethodTemplate = 'module.exports = function ({{{parameters}}}) ' +
        '{ ' +
        '{{{enter}}}' +
        '{{{statements}}} ' +
        '};';

    this.MethodReturnStatement = 'return {{expression}}';

};

JavaScriptLanguageHelper.prototype.toString = function (type, object, params) {
    let toReturn = '';
    let view = this.makeView(type, object, params);

    switch (type) {
        case CodeObjects.CodeTypeDeclaration :
            toReturn = Mustache.render(this.TypeMemberDeclaration, view);
            break;

        case CodeObjects.CodeTypeReference :
            toReturn = object.BaseType + ' ';
            break;
        case CodeObjects.CodeThisReferenceExpression :
            toReturn = 'this';
            break;
        case CodeObjects.CodeRequireExpression :
            toReturn = Mustache.render(this.requireTemplate, view);
            break;
        case CodeObjects.CodeFieldReferenceExpression :
            toReturn = Mustache.render(this.FieldReferenceExpressionTemplate, view);
            break;
        case CodeObjects.CodeMethodInvokeExpression :
            toReturn = Mustache.render(this.MethodInvokeExpressionTemplate, view);
            break;
        case CodeObjects.CodeParameterDeclarationExpression :
            toReturn = object.getName() + ' ';
            break;
        case CodeObjects.CodeParameterDeclarationExpressionCollection :
            toReturn = Mustache.render(this.ParameterDeclarationExpressionCollectionTemplate, view);
            toReturn = toReturn.substring(1, toReturn.length);
            break;
        case CodeObjects.CodeVariableDeclarationStatement :
            toReturn = Mustache.render(this.VariableDeclarationStatementTemplate , view);
            break;
        case CodeObjects.CodeAssignStatement :
            toReturn = Mustache.render(this.AssignStatementTemplate, view);
            break;
        case CodeObjects.CodeStatementCollection :
            toReturn = Mustache.render(this.StatementCollection, view);
            break;
        case CodeObjects.CodeMemberMethod :
            toReturn = Mustache.render(this.MemberMethod, view);
            break;
        case CodeObjects.CodeTypeMemberCollection :
            toReturn = Mustache.render(this.TypeMemberCollection, view);
            break;
        case CodeObjects.CodeMethodReferenceExpression :
            toReturn = Mustache.render(this.MethodReferenceExpressionTemplate, view);
            break;
        case CodeObjects.CodeMemberConstructorMethod :
            toReturn = Mustache.render(this.ConstructorMethodTemplate, view);
            break;
        case CodeObjects.CodeMethodReturnStatement :
            toReturn = Mustache.render(this.MethodReturnStatement, view);
            break;
        default :
            console.log("there was no type");
        
    }
    return toReturn;
};

JavaScriptLanguageHelper.prototype.makeView = function (type, object, params) {
    switch (type) {
        case CodeObjects.CodeTypeReference :
            return null;
        case CodeObjects.CodeTypeDeclaration:
            return {
                members : params,
                name : object.getName(),
                enter : '\n'
            };
        case CodeObjects.CodeRequireExpression :
            return {
                address : object.getAddress().replace(/\\/g, '\/'),
                quot : "'"
            };
        case CodeObjects.CodeFieldReferenceExpression :
            return {
                target : params[0],
                FieldName : object.getFieldName()
            };
        case CodeObjects.CodeMethodInvokeExpression :
            return {
                method : params[0],
                parameters : params[1]
            };
        case CodeObjects.CodeParameterDeclarationExpressionCollection :
            return {
                parameters: params
            };
        case CodeObjects.CodeVariableDeclarationStatement :
            return {
                name : object.getName(),
                initializer : params[1],
                equal : '='
            };
        case CodeObjects.CodeAssignStatement :
            return {
                left : params[0],
                right : params[1],
                equal : '='
            };
        case CodeObjects.CodeStatementCollection :
            return {
                statements : params,
                enter : '\n'
            };
        case CodeObjects.CodeMemberMethod :
            return {
                name : object.getName(),
                parameters : params[1],
                statements : params[2],
                equal : '=',
                enter : '\n'
            };
        case CodeObjects.CodeTypeMemberCollection :
            return {
                members : params,
                enter : '\n'
            };
        case CodeObjects.CodeMethodReferenceExpression :
            return {
                hasTarget : (params[0] == '') ? false : true,
                target : params[0],
                methodName : object.getMethodName()
            };
        case CodeObjects.CodeMemberConstructorMethod :
            return {
                name : object.getName(),
                parameters : params[1],
                statements : params[2],
                equal : '=',
                enter : '\n'
            };
        case CodeObjects.CodeMethodReturnStatement :
            return {
                expression : params[0]
            };
        default :
            // console.log("none of them :-/");
            break;
    }

};

module .exports =  JavaScriptLanguageHelper;