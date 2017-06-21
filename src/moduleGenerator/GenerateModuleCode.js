/**
 * Created by hamid on 8/6/16.
 */
'use strict';
const CodeTypeDeclaration = require('./../codeGeneratorGraph/classes/CodeTypeDeclaration.js');
const CodeParameterDeclarationExpression = require('./../codeGeneratorGraph/classes/Expressions/CodeParameterDeclarationExpression.js');
const CodeMemberMethod = require('./../codeGeneratorGraph/classes/CodeMemberMethod.js');
const CodeAssignStatement = require('./../codeGeneratorGraph/classes/statements/CodeAssignStatement.js');
const CodeRequire = require('./../codeGeneratorGraph/classes/CodeRequire.js');
const CodeThisReferenceExpression = require('./../codeGeneratorGraph/classes/Expressions/CodeThisReferenceExpression.js');
const CodeFieldReferenceExpression = require('./../codeGeneratorGraph/classes/Expressions/CodeFieldReferenceExpression.js');
const CodeVariableDeclarationStatement = require('./../codeGeneratorGraph/classes/statements/CodeVariableDeclarationStatement.js');
const CodeMethodInvokeExpression = require('./../codeGeneratorGraph/classes/Expressions/CodeMethodInvokeExpression.js');
const CodeMethodReferenceExpression = require('./../codeGeneratorGraph/classes/Expressions/CodeMethodReferenceExpression.js');
const CodePrimitiveExpression = require('./../codeGeneratorGraph/classes/Expressions/CodePrimitiveExpression.js');
const CodeVariableReference = require('./../codeGeneratorGraph/classes/Expressions/CodeVariableReferenceExpression.js');
const CodeMemberConstructorMethod = require('./../codeGeneratorGraph/classes/CodeMemberConstructorMethod.js');
const CodeReturnStatement = require('./../codeGeneratorGraph/classes/statements/CodeMethodReturnStatement');
const LanguageHelper = require('./../codeGeneratorString/JavaScriptLanguageHelper.js');
const fs = require('fs');
const Path = require('path');
const AspectData = require('../annotationSystem/data/AspectData.js');

function getModuleRequireAddressInfo(moduleName, baseModuleInfo, dependencyLoader){
    var loadedModuleInfo = dependencyLoader.getModuleInfo(moduleName);
    //console.log(loadedModuleInfo.getRuntimeAddress(baseModuleInfo.moduleRuntimeAddress), baseModuleInfo.moduleRuntimeAddress) ;
    return loadedModuleInfo.getRuntimeAddress(baseModuleInfo.moduleRuntimeAddress);
}

function getOriginalModuleAddress(moduleInfo){
    var dirName = Path.dirname(moduleInfo.moduleRuntimeAddress);
    return Path.relative(dirName, moduleInfo.fileInfo.path);
}

function generateModule(moduleInfo, dependencyLoader){
    var helper = new LanguageHelper();

    //first lets make the module
    var gmodule = new CodeTypeDeclaration();
    gmodule.init(moduleInfo.name, false, false, false);

    //const runBefore = require('RunBeforeAspectRunner');
    var beforeRequireExpression = new CodeRequire(getModuleRequireAddressInfo("RunBeforeAspectRunner", moduleInfo, dependencyLoader))

    var variableDeclare0 = new CodeVariableDeclarationStatement();
    variableDeclare0.init('const', 'runBefore', beforeRequireExpression);
    gmodule.addMember(variableDeclare0);

    //const runAfter = require('RunAfterAspectRunner');
    var afterRequireExpression = new CodeRequire(getModuleRequireAddressInfo("RunAfterAspectRunner", moduleInfo, dependencyLoader));
    var variableDeclare1 = new CodeVariableDeclarationStatement();
    variableDeclare1.init('const', 'runAfter', afterRequireExpression);
    gmodule.addMember(variableDeclare1);

    //const runBefore = require('RunAroundAspectRunner');
    var aroundRequireExpression = new CodeRequire(getModuleRequireAddressInfo("RunAroundAspectRunner", moduleInfo, dependencyLoader));
    var variableDeclare2 = new CodeVariableDeclarationStatement();
    variableDeclare2.init('const', 'runAround', aroundRequireExpression);
    gmodule.addMember(variableDeclare2);

    //const module = require(..)
    var requireExpression = new CodeRequire(getOriginalModuleAddress(moduleInfo));
    var variableDeclare3 = new CodeVariableDeclarationStatement();
    variableDeclare3.init('const', 'originalModule', requireExpression);
    gmodule.addMember(variableDeclare3);

    //define parameters of constructor
    if(moduleInfo.isCallable){
        var constructorParameters = [];
        for(let i = 0; i < moduleInfo.runArgs.length; i ++){
            let par = new CodeParameterDeclarationExpression();
            par.init('', moduleInfo.runArgs[i]);
            constructorParameters.push(par);
        }
        var constructor = new CodeMemberConstructorMethod();
        let applyInvoke = new CodeMethodInvokeExpression();
        let applyReference = new CodeMethodReferenceExpression();
        let FieldExpression2 = new CodeFieldReferenceExpression();
        applyReference.init(field, 'apply');
        applyInvoke.init(applyReference, [FieldExpression2, 'arguments']);
        constructor.addStatement(applyInvoke);
        constructor.init(false, '', moduleInfo.name, constructorParameters, []);
        gmodule.addMember(constructor);
    }

    Object.keys(moduleInfo.functions).forEach(function(element){
        gmodule.addMember(methodMaker(moduleInfo, moduleInfo.functions[element], moduleInfo.functions[element].name,
            moduleInfo.functions[element].runArgs, dependencyLoader, []));
    }, this);
    var str = gmodule.toString(helper);
    fs.writeFileSync(moduleInfo.moduleRuntimeAddress, str);
}

function methodMaker(moduleInfo, functionInfo, name, params, dependencyLoader, statements){
    var helper = new LanguageHelper();

    let funcParams = [];
    for(let i = 0; i < params.length; i++){
        let par = new CodeParameterDeclarationExpression();
        par.init('', params[i]);
        funcParams.push(par);
    }

    var method = new CodeMemberMethod();
    method.init(false, '', name, funcParams, statements);
    // var thisExpression = new CodeThisReferenceExpression();
    // var FieldExpression0 = new CodeFieldReferenceExpression();
    let variable = new CodeVariableReference('originalModule');
    var FieldExpression1 = new CodeFieldReferenceExpression();
    // FieldExpression0.init(thisExpression, 'originalModule');
    FieldExpression1.init(variable, name);

    var original = new CodeVariableDeclarationStatement();
    original.init('', 'original', FieldExpression1);

    method.addStatement(original);

    var aspects = functionInfo.aspects.all.slice();
    aspects = aspects.concat(moduleInfo.functionsAspects.all);
    //beforeAspects = beforeAspects.reverse();
    for (let i = 0; i < aspects.length; i++){
        let aspect = aspects[i];
        if(aspect.type == AspectData.Before){
            let runBeforeInvoke = new CodeMethodInvokeExpression();
            let runBeforeReference = new CodeMethodReferenceExpression();
            runBeforeReference.init('', 'runBefore');
            let FieldExpression2 = new CodeVariableReference('originalModule');
            let str0 = new CodePrimitiveExpression(aspect.functionName);
            let str1 = new CodePrimitiveExpression
            (getModuleRequireAddressInfo(aspect.module, moduleInfo, dependencyLoader));
            let str2 = new CodePrimitiveExpression(JSON.stringify(aspect.extraData));
            let runBeforParameters = ['original', FieldExpression2, '__dirname', str1, str0, str2];
            runBeforeInvoke.init(runBeforeReference, runBeforParameters);
            let assign = new CodeAssignStatement();
            let field = new CodeVariableReference('original');
            assign.init(field, runBeforeInvoke);
            method.addStatement(assign);
        }else if(aspect.type == AspectData.After){
            let runAfterInvoke = new CodeMethodInvokeExpression();
            let runAfterReference = new CodeMethodReferenceExpression();
            runAfterReference.init('', 'runAfter');
            let FieldExpression2 = new CodeVariableReference('originalModule');
            let str0 = new CodePrimitiveExpression(aspect.functionName);
            let str1 = new CodePrimitiveExpression
            (getModuleRequireAddressInfo(aspect.module, moduleInfo, dependencyLoader));
            let str2 = new CodePrimitiveExpression(JSON.stringify(aspect.extraData));
            let runAfterParameters = ['original', FieldExpression2, '__dirname', str1, str0, str2];
            runAfterInvoke.init(runAfterReference, runAfterParameters);
            let assign = new CodeAssignStatement();
            let field = new CodeVariableReference('original');
            assign.init(field, runAfterInvoke);
            method.addStatement(assign);
        }else if(aspect.type == AspectData.Around){
            let runAroundInvoke = new CodeMethodInvokeExpression();
            let runAroundReference = new CodeMethodReferenceExpression();
            runAroundReference.init('', 'runAround');
            let FieldExpression2 = new CodeVariableReference('originalModule');
            let str0 = new CodePrimitiveExpression(aspect.functionName);
            let str1 = new CodePrimitiveExpression
            (getModuleRequireAddressInfo(aspect.module, moduleInfo, dependencyLoader));
            let str2 = new CodePrimitiveExpression(JSON.stringify(aspect.extraData));
            let runAroundParameters = ['original', FieldExpression2, '__dirname', str1, str0, str2];
            runAroundInvoke.init(runAroundReference, runAroundParameters);
            let assign = new CodeAssignStatement();
            let field = new CodeVariableReference('original');
            assign.init(field, runAroundInvoke);
            method.addStatement(assign);
        }
    }


    //return original.apply(this.module, arguments);
    var originalField = new CodeVariableReference('original');
    var applyInvoke = new CodeMethodInvokeExpression();
    var applyReference = new CodeMethodReferenceExpression();
    applyReference.init(originalField, 'apply');
    applyInvoke.init(applyReference, ['null', 'arguments']);
    var returnExpression = new CodeReturnStatement(applyInvoke);
    method.addStatement(returnExpression);
    return method;
}
module.exports = generateModule;