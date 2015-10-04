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
                var initalizeNs = ns ? ns + '_' + key : key;
				this.assign(obj[key], initalizeNs);   
                initalizeNs=undefined;
			} 
            
            if (ns) {             
              this.assignNS(ns,key);                
            } else if(!isObject && obj[key] === null) {               
              this.mirrorObj[key] = key;             
            } else if(!isObject) {
              this.mirrorObj[key] = obj[key]; 
            }
		}		
	};
  
    
    
    Mirror.prototype.assignNS = function(ns,key) {       
      var nsArr = ns.split('_');        
      this.extendMirrorObj(nsArr,this.mirrorObj,key,ns);
    };	
  
    Mirror.prototype.extendMirrorObj = function(properties, obj,value,ns) {
        var key = properties.shift();   
                               
        if (obj[key] === undefined) {          
            obj[key] = {};
        } 
        if(properties.length === 0) {          
          if(obj[key][value] === undefined) {
            obj[key][value] = ns + '_' + value;           
          }
          return;
        }
        this.extendMirrorObj(properties,obj[key],value,ns);
    };
  
    var mirror = new Mirror(obj);
	return mirror.mirrorObj;
}