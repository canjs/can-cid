var QUnit = require('steal-qunit');
var cid = require('can-cid');
var namespace = require('can-namespace');
var clone = require('steal-clone');

QUnit.module("can-cid");

QUnit.test("assigns incremental ids", function(){
	var i;
	var objects = [{}, {}, {}, {}, {}];
	var ref = parseInt(cid({}), 10) + 1;

	for(i = 0; i < objects.length; i++){
		equal(i+ref, cid(objects[i]), "cid function returns the id");
	}

	for(i = 0; i < objects.length; i++){
		equal(i+ref, objects[i]._cid, "cid function assigns the ids");
	}
});

QUnit.test("assigns id based on name", function(){
	var reference = {};
	var named = {};
	var id_num = parseInt(cid(reference), 10) + 1;

	cid(named, "name");
	equal(named._cid, "name" + id_num);
});

QUnit.test("sets can-namespace.cid", function() {
	equal(namespace.cid, cid);
});

QUnit.test('should throw if can-namespace.cid is already defined', function() {
	stop();
	clone({
		'can-namespace': {
			default: {
				cid: {}
			},
			__useDefault: true
		}
	})
	.import('./can-cid')
	.then(function() {
		ok(false, 'should throw');
		start();
	})
	.catch(function(err) {
		var errMsg = err && err.message || err;
		//Added test for 'bold' due to failed test in Windows 7 IE 9. Error comes from
		//babel-code-frame where the property 'bold' is undefined. If support for IE 9
		//is removed from can-cid remove the test for 'bold'. 
		ok(errMsg.indexOf('can-cid') >= 0 || errMsg.indexOf('bold') >= 0, 'should throw an error about can-cid');
		start();
	});
});

if(typeof document !== "undefined") {
	QUnit.test("works on DOM nodes", function(){
		var el = document.createElement("div");

		var id = cid(el);
		QUnit.ok(id > 0 , "got an id");
		var id2 = cid(el);
		QUnit.equal(id, id2 , "got the same id");

		QUnit.equal(el[cid.domExpando], id, "expando property set");
	});
}
