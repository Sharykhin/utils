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

});