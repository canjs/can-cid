'use strict';

var QUnit = require('steal-qunit');
var CIDSet = require('./set');

QUnit.module("can-cid/set");

QUnit.test("basics", function(){
	var o1 = {},
		o2 = {};

	var set = new CIDSet();

	set.add(o1);
	set.add(o2);

	QUnit.ok( set.has(o1), "has o1");
	QUnit.ok( set.has(o2), "has o2");

	QUnit.equal(set.size, 2, "size === 2");

	set.clear();

	QUnit.equal(set.size, 0, "size === 0");
});

QUnit.test("primitives", function(){
	var set = new CIDSet();

	set.add(0);
	set.add(1);
	set.add(1);
	set.add("1");

	QUnit.equal(set.size, 3, "size === 3");

	QUnit.ok( set.has(0), "has 0" );
	QUnit.ok( !set.has("0"), "! has '0'");
	QUnit.ok( set.has(1) , "has 1");
	QUnit.ok( set.has("1"), "! has '1'");


	set.clear();

	QUnit.equal(set.size, 0);
});
