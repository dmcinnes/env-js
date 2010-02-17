
/**
 * Makes an object window-like by proxying object accessors
 * @param {Object} scope
 * @param {Object} parent
 */
Envjs.proxy = function(scope, parent, aliasList){};

Envjs.javaEnabled = false;   

Envjs.tmpdir         = ''; 
Envjs.os_name        = ''; 
Envjs.os_arch        = ''; 
Envjs.os_version     = ''; 
Envjs.lang           = ''; 
Envjs.platform       = '';//how do we get the version
    
/**
 * 
 * @param {Object} frameElement
 * @param {Object} url
 */
Envjs.loadFrame = function(frame, url){
    try {
        if(frame.contentWindow){
            //mark for garbage collection
            frame.contentWindow = null; 
        }
        
        frame.contentWindow = {};
        new Window(frame.contentWindow, window);
        
        //I dont think frames load asynchronously in firefox
        //but I haven't verified this...
        frame.contentDocument = frame.contentWindow.document;
        frame.contentDocument.async = false;
        console.log('envjs.loadFrame async %s', frame.contentDocument.async);
        frame.contentWindow.location = url;
    } catch(e) {
        console.log("failed to load frame content: from %s %s", url, e);
    }
};