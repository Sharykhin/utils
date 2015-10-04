function keyMirror(obj) {
  
	if(typeof obj !== 'object') {
		throw new Error('agrument of function must be an object');
	}

	function Mirror(obj) {
		this.mirrorObj = {};
		this.ns=null;		
		this.assign(obj);		
	}

	Mirror.prototype.assign = function(obj, ns) {         
		for(var key in obj) {
            var isObject = false;  
           
			if (obj[key] !== null && typeof obj[key] === 'object')	{            
				isObject = true;             
				this.assign(obj[key], key);
                
			}   
            
            if (ns) {             
              this.assignNS(ns);            
              this.mirrorObj[ns][key]=ns + '_' + key;
            } else if(!isObject) {               
              this.mirrorObj[key] = key;             
            } 
		}		
	};
    
    Mirror.prototype.assignNS = function(ns) {
      if (this.mirrorObj[ns] === undefined) {
        this.mirrorObj[ns] = {};
      }     
    };	
    var mirror = new Mirror(obj);
	return mirror.mirrorObj;
}