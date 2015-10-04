describe('keyMirror function', function() {

	it('should accept only an object as argument', function(){
			var result = new Function("keyMirror('hello');");			
			assert.throw(result, Error);
	});

	it('should return new object with value, which are the same as keys', function(){
		var obj = {CREATE:null}; 
		var result = keyMirror(obj);		
		assert.deepEqual(result,{ CREATE: 'CREATE' });
	});

	it('should create values with underscore if key has object', function() {
		var obj = {
					ADD: null,
					TODO: {
						CREATE: null,
						UPDATE: null
						}
					};

		var result = keyMirror(obj);
		assert.deepEqual(result, {ADD:'ADD',TODO:{ CREATE:'TODO_CREATE', UPDATE:'TODO_UPDATE' }});

	});

	it('should not change value if it was specified', function(){
		
	});

});