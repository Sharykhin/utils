describe('function extent', function() {
	var Foo = function() {
			this.name='foo'
		};

		Foo.prototype.getName = function() {
			return this.name;
		};

	it('should extend prototype', function() {
		var Bar = function() {
			this.name = 'bar';
		};		
		extend(Foo,Bar);
		var obj = new Bar();
		assert.ok(obj.getName);
		assert.equal(obj.getName(),'bar');
	});

});