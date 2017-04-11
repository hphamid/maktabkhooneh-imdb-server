/**
 * Created by hamid on 8/9/16.
 */
'use strict';
const Backtory = require("backtory-sdk");
const Path = require("path");
const fs = require("fs");
const globalConfig = require("../config");
const backtory_config = Path.resolve(__dirname, "../backtory_sdk_config.json");
const sdkConfig = {
    integratedMasterKey: globalConfig.integratedMasterKey,
    integratedInstances: [
        {id: globalConfig.authInstanceId, type: "auth"},
        {id: globalConfig.objectSorageInstanceId, type: "object-storage"},
        {id: globalConfig.cloudCode, type: "lambda"},
        {id: globalConfig.cdnInstanceId, type: "cdn"},
    ]
};
fs.writeFileSync(backtory_config, JSON.stringify(sdkConfig, null, 4));

Backtory.setConfigFileLocation(backtory_config);

/**
 * @DependencyProvider("Backtory")
 */
module.exports.backtory = function(){
    return Backtory;
};
