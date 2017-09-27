'use strict';

var CID = require("can-cid");
var domCid = require("./dom-cid");

module.exports = function(obj){
	if(typeof obj.nodeType === "number") {
		return domCid.cid.call(obj);
	} else {
		var type = typeof obj;
		var isObject = type !== null && (type === "object" || type === "function");
		return type+":"+( isObject ? CID(obj) : obj );
	}
};
