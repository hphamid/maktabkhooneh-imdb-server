/**
 * Created by Darya Computer on 8/1/2016.
 */

var CodeTypeDeclaration = function () {
    this.BaseTypes = null;
    this.IsClass = false;
    this.IsEnum = false;
    this.IsInterface = false;
    this.IsPatial = false;
    this.Members = null;
    this.TypeAttributes = null;
    this.TypeParameters = null;
}

CodeTypeDeclaration.init = function (name) {
    this.Name = name;
}

CodeTypeDeclaration.prototype = Object.create(TypeMember);

CodeTypeDeclaration.getBaseTypes = function () {
    return this.BaseTypes;
}

CodeTypeDeclaration.getIsClass = function () {
    return this.IsClass;
}

CodeTypeDeclaration.setIsClass = function (isClass) {
    this.IsClass = isClass;
}

CodeTypeDeclaration.getIsEnum = function () {
    return this.IsEnum;
}

CodeTypeDeclaration.setIsEnum = function (isEnum) {
    this.IsEnum = isEnum;
}

CodeTypeDeclaration.getIsInterface = function () {
    return this.IsInterface;
}

CodeTypeDeclaration.setIsInterface = function (isInterface) {
    this.IsInterface = isInterface;
}

CodeTypeDeclaration.getIsPartial = function () {
    return this.IsPatial;
}

CodeTypeDeclaration.setIsPartial = function (isPartial) {
    this.IsPatial = isPartial;
}

CodeTypeDeclaration.GetMembers = function () {
    return this.Members;
}

CodeTypeDeclaration.getTypeAttributes = function () {
    return this.TypeAttributes;
}

CodeTypeDeclaration.setTypeAttributes = function (newTypeAttributes) {
    this.TypeAttributes = newTypeAttributes;
}

CodeTypeDeclaration.getTypeParameters = function () {
    return this.TypeParameters;
}

module.exports = CodeTypeDeclaration;