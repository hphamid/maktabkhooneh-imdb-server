/**
 * Created by Darya Computer on 8/1/2016.
 */
const  CodeObject = require('./CodeObject.js');

var CodeTypeMember = function () {
    this.Attributes = null;
    this.Comments = '';
    this.CustomAttributes = null;
    this.LinePragma = 0;    //the line that statement occurs
    this.Name = '';
};

CodeTypeMember.prototype = Object.create(CodeObject);

CodeTypeMember.prototype.getAttributes = function () {
    return this.Attributes;
};

CodeTypeMember.prototype.setAttributes = function (newAttribiutes) {
    this.Attributes = newAttribiutes;
};

CodeTypeMember.prototype.getComments = function () {
    return this.Comments;
};

CodeTypeMember.prototype.getCustomAttributes = function () {
    return this.CustomAttributes;
};

CodeTypeMember.prototype.setCustomAttributes = function (newCustomAttributes) {
    this.CustomAttributes = newCustomAttributes;
};


CodeTypeMember.prototype.getLinePragma = function () {
    return this.LinePragma;
};

CodeTypeMember.prototype.setLinePragma = function (newLinePragma) {
    this.LinePragma = newLinePragma;
};

CodeTypeMember.prototype.getName = function () {
    return this.Name;
};

CodeTypeMember.prototype.setName = function (newName) {
    this.Name = newName;
};

module.exports = CodeTypeMember;