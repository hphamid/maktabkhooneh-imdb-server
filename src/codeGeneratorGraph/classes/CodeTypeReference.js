/**
 * Created by Darya Computer on 8/1/2016.
 */
    // specifies the type of any thing like string, void..
    //  can be used for arguments set return type of method, etc
const  CodeObject = require('./../bases/CodeObject.js');
const  CodeObjects = require('./../Enumerations/CodeObjects.js');
var CodeTypeReference = function () {
    this.BaseType = '';
    this.TypeArguments = null; //FIXME CodeReferenceCollection hastasn
};

CodeTypeReference.prototype = Object.create(CodeObject);

CodeTypeReference.prototype.init = function (type) {
    this.BaseType = type;
};

CodeTypeReference.prototype.getBaseType = function () {
    return this.BaseType;
};

CodeTypeReference.prototype.toString = function (languageHelper) {
    return languageHelper.toString(CodeObjects.CodeTypeReference, this);
};

module.exports = CodeTypeReference;