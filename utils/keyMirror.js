function keyMirror(obj) {
    //argumet must be an object
	if(typeof obj !== 'object') {
		throw new Error('agrument of function must be an object');
	}
    
    // initiazlie function-constructor
	function Mirror(obj) {
		this.mirrorObj = {};
		this.ns=null;        
		this.assign(obj);		
	}
    //Assign properties from object to mirrorObj propery
	Mirror.prototype.assign = function(obj, ns) {         
		for(var key in obj) {
            //Let's assume that current key is not an object
            var isObject = false;  
              
			if (obj[key] !== null && typeof obj[key] === 'object')	{
                //If key is the object, change flag to true
                // and call this method with adding second argument with 
                // namespace 
				isObject = true; 
                var initalizeNs = ns ? ns + '_' + key : key;
				this.assign(obj[key], initalizeNs);   
                initalizeNs=undefined;
			} 
            
            if (ns) {   
              var value = obj[key] || null;             
              this.assignNS(ns,key,value);                
            } else if(!isObject && obj[key] === null) {               
              this.mirrorObj[key] = key;             
            } else if(!isObject) {
              this.mirrorObj[key] = obj[key]; 
            }
		}		
	};    

    Mirror.prototype.assignNS = function(ns,key,value) {       
      var nsArr = ns.split('_');        
      this.extendMirrorObj(nsArr,this.mirrorObj,key,ns,value);
    };	
    
    Mirror.prototype.extendMirrorObj = function(properties, obj, value, ns, customValue) {
        var key = properties.shift();   
        //check if current key exists in mirrorObj                       
        if (obj[key] === undefined) {          
            obj[key] = {};
        } 
        //If there is no any more properties, set the value to the current key
        if(properties.length === 0) {          
          if(obj[key][value] === undefined) {
            obj[key][value] = customValue || ns + '_' + value;           
          }
          return;
        }
        //if properties exist call this method again
        this.extendMirrorObj(properties, obj[key], value, ns, customValue);
    };
  	
  	//instanciare an object of Mirror
    var mirror = new Mirror(obj);
    //return mirrored Object
	return mirror.mirrorObj;
}