/**
 * Created by Darya Computer on 8/2/2016.
 */

const  CodeExpression = require('./../../bases/CodeExpression.js');
const  CodeExpressionCollection = require('./../../bases/CodeExpressionCollection.js');
const  CodeTypeReference = require('./../CodeTypeReference.js');


var CodeArrayCreateExpression = function () {
    this.CreateType = new CodeTypeReference();
    this.Size = 0;
    this.SizeExpression = null;
    this.Initializers = new CodeExpressionCollection();
    this.ArrayName = '';
};

CodeArrayCreateExpression.prototype = Object.create(CodeExpression);

CodeArrayCreateExpression.prototype.init = function (arg0, arg1, arg2, arg3) {
    this.setInitializers(arg3);
    this.setSize(arg2);
    this.setCreateType(arg0);
    this.ArrayName = arg1;
};

CodeArrayCreateExpression.prototype.getCreateType = function () {
    return this.CreateType;
};

CodeArrayCreateExpression.prototype.setCreateType = function (type) {
    if(type instanceof CodeTypeReference)
        this.CreateType = type;
    else if(type instanceof String){
        var createType = new CodeTypeReference();
        createType.init(type);
        this.CreateType = createType;
    }
};

CodeArrayCreateExpression.prototype.getSizeNumber = function () {
    return this.Size;
};

CodeArrayCreateExpression.prototype.setSizeNumber = function (size) {
    this.Size = size;
};

CodeArrayCreateExpression.prototype.getSizeExpression = function () {
    return this.SizeExpression;
};

CodeArrayCreateExpression.prototype.setSizeExpression = function (expression) {
    if (expression instanceof CodeExpression)
        this.SizeExpression = expression;
    else if(expression instanceof String){
        var size = new CodeExpression();
        size.init(expression);
        this.SizeExpression = expression;
    }
};

CodeArrayCreateExpression.prototype.setSize = function (size) {
    if(typeof size == "number")
        this.setSize(size);
    else
        this.setSizeExpression(size);
};

CodeArrayCreateExpression.prototype.getSize = function () {
    if (this.getSizeExpression() == null)
        return this.getSizeNumber();
    return this.getSizeExpression();
};

CodeArrayCreateExpression.prototype.getInitializers = function () {
    return this.Initializers;
};

CodeArrayCreateExpression.prototype.setInitializers = function (args) {
    if (args instanceof CodeExpressionCollection)
        this.Initializers = args;
    else if(Array.isArray(args)){
        var initializers = new CodeExpressionCollection();
        initializers.add(args);
        this.Initializers = initializers;
    }
};

module.exports = CodeArrayCreateExpression;