webpackJsonp([12],{0:function(n,e,t){(function(n){"use strict";var e=t(1),r=e.module("sba-applications-environment",["sba-applications"]);n.sbaModules.push(r.name),r.controller("environmentCtrl",t(95)),r.component("sbaEnvironmentManager",t(94)),r.config(["$stateProvider",function(n){n.state("applications.environment",{url:"/environment",templateUrl:"applications-environment/views/environment.html",controller:"environmentCtrl"})}]),r.run(["ApplicationViews","$http","$sce",function(n,e,t){n.register({order:10,title:t.trustAsHtml('<i class="fa fa-server fa-fw"></i>Environment'),state:"applications.environment",show:function(n){return e.head("api/applications/"+n.id+"/env").then(function(){return!0}).catch(function(){return!1})}})}])}).call(e,function(){return this}())},94:function(n,e,t){"use strict";n.exports={bindings:{env:"<environment",application:"<application",envChangedCallback:"&onEnvironmentChanged"},controller:function(){var n=this;n.error=null,n.$onChanges=function(){if(n.env){n.allProperties=n.env.reduce(function(n,e){return n.concat(e.value)},[]);var e=n.env.find(function(n){return"manager"===n.name});n.newProperties=e?e.value.slice(0):[],n.newProperties.push({name:null,value:null}),n.allPropertyNames=n.allProperties.map(function(n){return n.name}).sort().filter(function(n,e,t){return!n||n!==t[e-1]})}},n.onChangePropertyName=function(e){var t=n.allProperties.find(function(n){return n.name===e.name});t&&(e.value=t.value),n.newProperties[n.newProperties.length-1].name&&n.newProperties.push({name:null,value:null})},n.updateEnvironment=function(){n.error=null;var e=n.newProperties.reduce(function(n,e){return e.name&&(n[e.name]=e.value),n},{});n.application.setEnv(e).then(function(){n.envChangedCallback()()}).catch(function(e){n.error=e,n.envChangedCallback()()})},n.resetEnvironment=function(){n.error=null,n.application.resetEnv().then(function(){n.envChangedCallback()()}).catch(function(e){n.error=e,n.envChangedCallback()()})},n.refreshContext=function(){n.application.refresh().then(function(){n.envChangedCallback()()}).catch(function(e){n.error=e,n.envChangedCallback()()})}},template:t(147)}},95:function(n,e){"use strict";n.exports=["$scope","$http","application",function(n,e,t){"ngInject";n.application=t,n.refreshSupported=!1,e.head("api/applications/"+t.id+"/refresh").catch(function(e){n.refreshSupported=405===e.status});var r=function(n){return Object.getOwnPropertyNames(n).map(function(e){var t=n[e]instanceof Object?r(n[e]):n[e];return{name:e,value:t}})};n.refresh=function(){n.env=[],n.profiles=[],t.getEnv().then(function(e){var t=e.data;n.profiles=t.profiles,delete t.profiles,n.env=r(t)}).catch(function(e){n.error=e.data})},n.refresh()}]},147:function(n,e){n.exports='<datalist id="allPropertyNames">\n    <option ng-repeat="name in $ctrl.allPropertyNames | orderBy:\'toString()\'">{{name}}</option>\n</datalist>\n<table class="table">\n    <col width="38%" />\n    <col width="62%" />\n    <tr ng-repeat="property in $ctrl.newProperties">\n        <td>\n            <input type="text" class="input-xlarge" list="allPropertyNames" placeholder="property name" ng-model="property.name" ng-change="$ctrl.onChangePropertyName(property)" />\n        </td>\n        <td>\n            <input type="text" class="input-xxlarge" placeholder="property value" ng-model="property.value" />\n        </td>\n    </tr>\n    <tr class="error" ng-if="$ctrl.error">\n        <td colspan="2"><b>Error:</b> {{$ctrl.error}}</td>\n    </tr>\n    <tr>\n        <td colspan="2">\n            <div class="control-group pull-left">\n                <button class="btn btn-info" ng-click="$ctrl.refreshContext()">Refresh context</button>\n            </div>\n            <div class="control-group pull-right">\n                <button class="btn btn-warning" ng-click="$ctrl.updateEnvironment()">Update environment</button>\n                <button class="btn" ng-click="$ctrl.resetEnvironment()">Reset environment</button>\n            </div>\n        </td>\n    </tr>\n</table>\n'}});