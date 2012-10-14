/*
 * Shimmy
 * http://github.com/wwalser/shimmy
 *
 * Copyright (c) 2012 Wesley Walser
 * Licensed under the MIT license.
 */
(function(root){
	//Consider making this a constructor that takes a namespace instead of assuming 
	//global namespace.
	var Shimmy;
	if (typeof exports !== 'undefined') {
		Shimmy = exports;
		root = exports;
	} else {
		Shimmy = root['Shimmy'] = {};
	}
	
	var shims = {};
	Shimmy.shim = function(shimName){
		//Always start at exports or window
		var namespace = root;
		//Store full namespace and function name so we can add it to the get all hash.
		var fullName = shimName;
		//Check for the existance of namespaces and create them if the don't exist
		var previousNamespace = namespace,
			namespaces;
		if (shimName.indexOf('.') !== -1) {
			namespaces = shimName.split('.');
			for (var i = 0, length = namespaces.length - 1; i < length; i++) {
				shimName = namespaces[i];
				if (typeof previousNamespace[shimName] === 'undefined') {
					previousNamespace = previousNamespace[shimName] = {};
				} else {
					previousNamespace = previousNamespace[shimName];
				}
			}
			shimName = namespaces[i];
			//set namespace to the inner most object
			namespace = previousNamespace;
		}
		
		//ensure the function that we are about to shim doesn't exist yet.
		if (namespace[shimName]) {
			return;
		}
		
		//array for storing calls to this shim
		var shimCalls = [];
		
		//create the shim
		var shim = namespace[shimName] = function(){
			var shimContext = this,
				args = arguments;
			
			shimCalls.push({context: shimContext, args: args});
		};
		//keep a list of all shims created by this instance.
		shims[fullName] = shim;
		
		//Replaces the shim with a true implementation of the desired method.
		//Calls the true implementation with the correct context and arguments
		//in the order that they were originally called.
		shim.replace = function(implementation){
			for (var i = 0, length = shimCalls.length; i < length; i++) {
				implementation.apply(shimCalls[i].context, shimCalls[i].args);
			}
			namespace[shimName] = implementation;
		};
		
		//return so it can be captured in a variable
		return shim;
	};
	Shimmy.get = function(name){
		return shims[name];
	};
	Shimmy.getAll = function(){
		return shims;
	};
}(this));