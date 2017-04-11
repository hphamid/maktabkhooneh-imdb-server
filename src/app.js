/**
 * Created by hamid on 7/26/16.
 * main app configuration used by preCompile to start app
 */
"use strict";

const PromiseStream = require('./stream/PromiseStream.js');
const Streamify = require('./stream/Streamify.js');
const StreamLogger = require('./stream/StreamLogger.js');
const merge = require('./stream/StreamMerger').merge;
const AnnotationContainer = require('./annotationSystem/AnnotationContainer.js');
const RequireDependencyLoader = require('./annotationSystem/RequireDependencyLoader.js');
const codeGenerator = require('./moduleGenerator/GenerateModuleCode');
const ModuleAddressGenerator = require('./annotationSystem/ModuleAddressGenerator');
const scanFolders = require('./annotationSystem/DirectoryScanner.js').scanFolders;
const scanModule = require('./annotationSystem/ModuleScanner.js').scanModule;
const HandlerContainer = require('./requestHandler/HandlerContainer');
const bind = Streamify.bind;
const fs = require('fs');
const updateVersion = require("./updateVersion");

const AppContext = require('./AppContext');
var context = new AppContext();

function initContext(context) {
    context.appDirectory = __dirname;
    context.annotationContainer = new AnnotationContainer();
    context.annotationDependencyLoader = new RequireDependencyLoader();
    context.appDependencyLoader = new RequireDependencyLoader();
    context.annotationContainer.setAnnotationDependencyLoader(context.annotationDependencyLoader);
    context.handlerContainer = HandlerContainer;
}

function loadAnnotations(context, annotationAddresses) {
    return Streamify.init(bind(scanFolders, [annotationAddresses, ".js"], false))
        .pipe(scanModule)
        .pipe(bind(context.annotationDependencyLoader.addModule, [], true, context.annotationDependencyLoader))
        .pipe(bind(context.annotationContainer.checkModuleAndLoadAnnotations, [context], false, context.annotationContainer))
        .pipeStream(PromiseStream.new()).promise();
}

function loadLibsFiles(context, libAddresses) {
    return Streamify.init(bind(scanFolders, [libAddresses, ".js"], false))
        .pipe(scanModule)
        .pipe(bind(context.appDependencyLoader.addModule, [], true, context.appDependencyLoader))
        .pipe(StreamLogger("libs"))
        .pipe(bind(context.annotationContainer.ScanAndLoadModuleUsedAnnotations,
            ["init", context], false, context.annotationContainer))
        .pipeStream(PromiseStream.new()).promise();
}


// 3 level of annotations: init, preCompile and compile
function loadAppModules(context, appModuleAddresses, finalPath) {
    if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath);
    }
    return Streamify.init(bind(scanFolders, [appModuleAddresses, ".js"], false))
        .pipe(scanModule)
        .pipe(bind(context.appDependencyLoader.addModule, [], true, context.appDependencyLoader))
        .pipe(bind(context.annotationContainer.ScanAndLoadModuleUsedAnnotations,
            ["init", context], false, context.annotationContainer))
        .pipe(StreamLogger("init", false))
        .pipeStream(PromiseStream.new()).promise().then(function (data) {
            return Streamify.initFromArray(data)
                .pipe(ModuleAddressGenerator(finalPath))
                .pipe(bind(context.annotationContainer.ScanAndLoadModuleUsedAnnotations,
                    ["preCompile", context], false, context.annotationContainer))
                .pipeStream(PromiseStream.new()).promise();
        }).then(function (data) {
            return Streamify.initFromArray(data)
                .pipe(ModuleAddressGenerator(finalPath))
                .pipe(bind(context.annotationContainer.ScanAndLoadModuleUsedAnnotations,
                    ["compile", context], false, context.annotationContainer))
                .pipe(bind(codeGenerator, [context.appDependencyLoader], false))
                .pipeStream(PromiseStream.new()).promise();
        });
}

function runCallbacks() {
    console.log("calling callbacks");
    context.contextLoadedCallbacks.forEach(function (callback, i) {
        console.log('callback', i, "started.");
        callback(context);
        console.log('callback', i, "done.");
    });
}

const backtory_config = "backtory_config.json";
const backtory_sdk_config = "./src/backtory_sdk_config.json";
var globalConfig = require("./config");
function runApiKeyGenerators(){
    var sdkConfig = {
        integratedMasterKey: globalConfig.integratedMasterKey,
        integratedInstances: [
            {id: globalConfig.authInstanceId, type: "auth"},
            {id: globalConfig.objectSorageInstanceId, type: "object-storage"},
            {id: globalConfig.cloudCode, type: "lambda"},
            {id: globalConfig.cdnInstanceId, type: "cdn"},
        ]
    };
    fs.writeFileSync(backtory_sdk_config, JSON.stringify(sdkConfig, null, 4));

    var backtoryConfig = {
        masterKey: globalConfig.integratedMasterKey,
        clientKey: globalConfig.clientKey,
        authenticationId: globalConfig.authInstanceId,
        auto: true
    };
    fs.writeFileSync(backtory_config, JSON.stringify(backtoryConfig, null, 4));

}


module.exports.init = function () {
    updateVersion.update();
    initContext(context);
    loadAnnotations(context, ["./src/converters", "./src/requestHandler", "./src/annotations"]).then(function (data) {
        return loadLibsFiles(context, ["./src/reqAndRes", "./src/moduleGenerator", "./src/requestHandler", "./src/annotationRuntimeModules", "./src/util", "./src/converters"])
    }).then(function (data) {
        return loadAppModules(context, ["./src/db/repo", "./src/services", "./src/controllers", "./src/provider"], "./src/generated");
    }).then(function (data) {
        runCallbacks();
        runApiKeyGenerators();
        console.log("app finished...");
    }).catch(function (err) {
        console.log(err);
        process.exit(1);
    });
};

module.exports.context = context;
