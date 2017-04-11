/**
 * Created by Darya Computer on 8/1/2016.
 */
'use strict';
const  CodeTypeMember = require('./../bases/CodeTypeMember.js');
const  CodeTypeMemberCollection = require('./../bases/CodeTypeMemberCollection.js');
const  CodeObjects = require('./../Enumerations/CodeObjects.js');

var CodeTypeDeclaration = function () {
    this.BaseTypes = null;
    this.IsClass = true;
    this.IsEnum = false;
    this.IsInterface = false;
    this.IsPatial = false;
    this.Members = new CodeTypeMemberCollection();
    this.TypeAttributes = null;
    this.TypeParameters = null;
    this.Name = '';
};
CodeTypeDeclaration.prototype = Object.create(CodeTypeMember);

CodeTypeDeclaration.prototype.init = function (name, isClass, isEnum, isInterface) {
    this.setName(name);
    this.setIsClass(isClass);
    this.setIsInterface(isInterface);
    this.setIsEnum(isEnum);
};

CodeTypeDeclaration.prototype.getName = function () {
    return this.Name;
};

CodeTypeDeclaration.prototype.setName = function (name) {
    this.Name = name
};

CodeTypeDeclaration.prototype.getBaseTypes = function () {
    return this.BaseTypes;
};

CodeTypeDeclaration.prototype.getIsClass = function () {
    return this.IsClass;
};

CodeTypeDeclaration.prototype.setIsClass = function (isClass) {
    this.IsClass = isClass;
};

CodeTypeDeclaration.prototype.getIsEnum = function () {
    return this.IsEnum;
};

CodeTypeDeclaration.prototype.setIsEnum = function (isEnum) {
    this.IsEnum = isEnum;
};

CodeTypeDeclaration.prototype.getIsInterface = function () {
    return this.IsInterface;
};

CodeTypeDeclaration.prototype.setIsInterface = function (isInterface) {
    this.IsInterface = isInterface;
};

CodeTypeDeclaration.prototype.getIsPartial = function () {
    return this.IsPatial;
};

CodeTypeDeclaration.prototype.setIsPartial = function (isPartial) {
    this.IsPatial = isPartial;
};

CodeTypeDeclaration.prototype.getMembers = function () {
    return this.Members;
};

CodeTypeDeclaration.prototype.addMember = function (member) {
    this.Members.add(member);
};

CodeTypeDeclaration.prototype.getTypeAttributes = function () {
    return this.TypeAttributes;
};

CodeTypeDeclaration.prototype.setTypeAttributes = function (newTypeAttributes) {
    this.TypeAttributes = newTypeAttributes;
};

CodeTypeDeclaration.prototype.getTypeParameters = function () {
    return this.TypeParameters;
};

CodeTypeDeclaration.prototype.toString = function (languageHelper) {
    var membersStringArray = [];
    return languageHelper.toString(CodeObjects.CodeTypeDeclaration, this, this.getMembers().toString(languageHelper));
};

module.exports = CodeTypeDeclaration;