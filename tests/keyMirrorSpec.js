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
		var obj = {
					ADD: null,
					TODO: {
						CREATE: null,
						UPDATE: null
						},
					DELETE:'foo'
					};

		var result = keyMirror(obj);
		assert.deepEqual(result, {ADD:'ADD',TODO:{ CREATE:'TODO_CREATE', UPDATE:'TODO_UPDATE' }, DELETE:'foo'});

	});

	it('should bo ably to handle very deep objects', function() {
			var obj = {
					ADD: null,
					TODO: {
						CREATE: null,
						UPDATE: null,
						MAIL: {
							SEND:null,
							GET: null,
							META: {
								AUTHOR:null,							
							}
						}
						},
					DELETE:'foo'
					};
			var result = keyMirror(obj);
			var resultObj = {
				ADD:'ADD',
				TODO: {
					CREATE:'TODO_CREATE',
					UPDATE:'TODO_UPDATE',
					MAIL:{
						SEND:'TODO_MAIL_SEND',
						GET:'TODO_MAIL_GET',
						META: {
							AUTHOR: 'TODO_MAIL_META_AUTHOR'							
						}
					}
				},
				DELETE:'foo'
			};	 
			assert.deepEqual(result, resultObj);
	});

});