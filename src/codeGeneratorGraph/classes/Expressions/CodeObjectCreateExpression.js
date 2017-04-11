/**
 * Created by Darya Computer on 8/4/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeExpressionCollection = require('./../../bases/CodeExpressionCollection.js');
const  CodeTypeReference = require('./../CodeTypeReference.js');

var CodeObjectCreate = function () {
    this.Type = new CodeTypeReference();
    this.Parameters = new CodeExpressionCollection();
};

CodeObjectCreate.prototype = Object.create(CodeExpression);

CodeObjectCreate.prototype.init = function (type, args) {
    this.setType(type);
    this.setParameters(args);
};

CodeObjectCreate.prototype.getType = function () {
    return this.Type;
};

CodeObjectCreate.prototype.setType = leFunc({
    'CodeTypeReference' : function (type) {
        this.Type = type;
    },
    'String' : function (type) {
        var typeArg = new CodeTypeReference();
        typeArg.init(type);
        this.Type = typeArg;
    },
    'Type' : function (type) {
        var typeArg = new CodeTypeReference();
        typeArg.init(type.toString());
        this.Type = typeArg;
    }
});

CodeObjectCreate.prototype.getParameters = function () {
    return this.Parameters;
};

CodeObjectCreate.prototype.setParameters = function (args) {
    if(Array.isArray(args)){
        var arguments = new CodeExpressionCollection();
        arguments.add(args);
        this.Parameters = arguments;
    }
    else
        this.Parameters = args;
};

module.exports = CodeObjectCreate;