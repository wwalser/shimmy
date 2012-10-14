/*global require:true */
var Shimmy = require('../lib/Shimmy.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
var shimmyMethods = ['shim', 'get', 'getAll'];
exports['Shimmy'] = {
	setUp: function(done) {
		for (var i in Shimmy) {
			if (shimmyMethods.indexOf(i) === -1) {
				delete Shimmy[i];
			}
		}
		done();
	},
	'Create shim': function(test) {
		test.expect(1);
		
		test.equal(typeof Shimmy.shim('$'), 'function', 'Shim created.');
		test.done();
	},
	'Namespace created': function(test) {
		//@todo implement this test (have to figure out how)
		//test.expect(1);
		
		var $ = Shimmy.shim('AJS.$');
		//test.equal(typeof this.AJS, 'object', 'namespace created.');
		test.done();
	},
	'Get by name': function(test) {
		test.expect(1);
		var shimName = 'AJS.$';

		Shimmy.shim(shimName);
		
		test.equal(typeof Shimmy.get(shimName), 'function', 'Shim can be gotten by name.');
		test.done();
	},
	'Get all shims': function(test) {
		test.expect(3);
		var shimName1 = 'AJS.$';
		var shimName2 = 'AJS.toInit';

		Shimmy.shim(shimName1);
		Shimmy.shim(shimName2);
		
		test.equal(typeof Shimmy.getAll(), 'object', 'Object is returned.');
		test.equal(typeof Shimmy.getAll()[shimName1], 'function', 'Object contains $ shim.');
		test.equal(typeof Shimmy.getAll()[shimName2], 'function', 'Object contains toInit shim.');
		test.done();
	},
	'Call made to replaced function': function(test) {
		test.expect(1);
		var shimName = '$',
			shim = Shimmy.shim(shimName),
			replaceFunction = function(){
				test.ok(true, 'Replaced function successfully called.');
				test.done();
			};

		shim();
		shim = shim.replace(replaceFunction);
	},
	'Parameter sent to replaced function': function(test) {
		test.expect(1);
		var shimName = '$',
			shim = Shimmy.shim(shimName),
			replaceFunction = function(param){
				test.equal(param, 'testing', 'Replaced function should be called with same parameters.');
				test.done();
			};

		shim('testing');
		shim = shim.replace(replaceFunction);
	},
	'Replaced function executed in correct context': function(test) {
		test.expect(1);
		var shimName = '$',
			shim = Shimmy.shim(shimName),
			replaceFunction = function(){
				test.equal(this, context, 'Replaced function should be called with correct context.');
				test.done();
			},
			context = {'testing': 'foo bar baz'};

		shim.call(context);
		shim = shim.replace(replaceFunction);
	}
};
