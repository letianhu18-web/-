//simple resource loader
(function() {
    var resourceCache = {};
    var readyCallbacks = [];
    var resourceErrors = {};

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(Array.isArray(urlOrArr)) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url] !== undefined && resourceCache[url] !== null) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;
                delete resourceErrors[url];
                notifyReady();
            };
            img.onerror = function() {
                resourceCache[url] = null;
                resourceErrors[url] = true;
                notifyReady();
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               resourceCache[k] === false) {
                ready = false;
            }
        }
        return ready;
    }

    function notifyReady() {
        if(!isReady() || !readyCallbacks.length) return;
        var callbacks = readyCallbacks.slice();
        readyCallbacks.length = 0;
        callbacks.forEach(function(func) { func(getErrors()); });
    }

    function onReady(func) {
        readyCallbacks.push(func);
        notifyReady();
    }

    function getErrors() {
        return Object.keys(resourceErrors);
    }

    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady,
        getErrors: getErrors
    };
})();
