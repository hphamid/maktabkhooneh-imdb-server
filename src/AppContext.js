/**
 * Created by hamid on 8/8/16.
 */
'use strict';

function AppContext(){
    this.appDirectory = ""; //applicationDirectory
    this.annotationDependencyLoader = {};
    this.annotationContainer = {};
    this.appDependencyLoader = {};
    this.handlerContainer = {}; //HandlerContainer
    this.extraData = {};
    this.contextLoadedCallbacks = []; // these callbacks would be called after context has loaded completely.
}

module.exports = AppContext;