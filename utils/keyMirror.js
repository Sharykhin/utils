function keyMirror(obj) {
	if(typeof obj !== 'object') {
		throw new Error('agrument of function must be an object');
	}

	function Mirror(obj) {
		this.mirrorObj = {};		
		this.assert(obj);
		return this.mirrorObj;
	}

	Mirror.prototype.assert = function(obj) {
		for(var key in obj) {
			this.mirrorObj[key] = key;
		}		
	}

	

	return new Mirror(obj);
}