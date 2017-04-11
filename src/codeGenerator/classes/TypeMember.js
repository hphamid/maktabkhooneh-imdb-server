/**
 * Created by Darya Computer on 8/1/2016.
 */

var TypeMember = function () {
    this.Attributes = null;
    this.Comments = '';
    this.CustomAttributes = null;
    this.LinePragma = 0;
    this.Name = '';
};

TypeMember.prototype = Object.create(CodeObject);

TypeMember.getAttributes = function () {
    return this.Attributes;
};

TypeMember.setAttributes = function (newAttribiutes) {
    this.Attributes = newAttribiutes;
};

TypeMember.getComments = function () {
    return this.Comments;
};

TypeMember.getCustomAttributes = function () {
    return this.CustomAttributes;
};

TypeMember.setCustomAttributes = function (newCustomAttributes) {
    this.CustomAttributes = newCustomAttributes;
};


TypeMember.getLinePragma = function () {
    return this.LinePragma;
};

TypeMember.setLinePragma = function (newLinePragma) {
    this.LinePragma = newLinePragma;
};

TypeMember.getName = function () {
    return this.Name;
};

TypeMember.setName = function (newName) {
    this.Name = newName;
};

module.exports = TypeMember;