/**
 * Copyright © 2023 OpenText Corporation All rights reserved.
 *
 * This is the Single Page App client API script file to be included inside of
 * single page app project. The API provides methods to access value by provided
 * Teamsite datum property specicifcations and some utility functions. Values to
 * returns are based on the current runtime environment the script is running
 * under. If environment is not provided, this script will assume it's under
 * local development environment, stub data will be returned if stub data is
 * provided.
 * 
 * Note: module configuration (iw_module_config.json) must be presented in the
 * same directory as this file, data spec and default values will be loaded
 * during bootstrap and before main app launches. 
 * 
 * Scripts include order:
 * This script just be included **AFTER** iw_module_stubs to be able
 * pick up local stub data.
 * 
 * 
 * rely on any client library dependecies.
 * 
 * Sample usage:
 * 
 * const iw:any = window['iw'];
 * // gets the appId which is sending from index.html
 * var root = document.getElementById("root");
   var id = root.dataset["appId"];
   
 * var myBooleanValue = iw.getPropertyValue("D001");
 * var mySelectedCheckBox = iw.getPropertyValue("D002").value;
 * 
 */
(function () {
  
    // for server side javascript, global should already be defined for global
    // scope variables
    if (!global) {
      var global = window;
    }
    
    // for developer to bootstraping application
    // when configuration data is ready, init callback will be invoked
    global.iw.init = function (callback) {
      if (typeof callback === 'function') {
        callback();
      }
    };
  
    /**
     * @private
     * @property {Object} Hash map: type -> get property value
     * type based mapping to retrieve values
     * Create a static hash map for type to value look up, some values requires
     * manual conversions such as String to Number as the original value type
     * is in String type
     */
    var propValues = {
      /**
       * @param {Object} property spec
       * @return {String}
       */
      "Boolean": function (spec) {
        return this.String(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} selected option
       */
      "CheckboxGroup": function (spec) {
        return this.SelectSingle(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {String}
       */
      "Color": function (spec) {
        return this.String(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} selected rule
       */
      "Rule": function (spec) {
        return this.SelectSingle(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} Date as property object format
       */
      "Date": function (spec) {
        return spec.date;
      },
      
      /**
       * @param {Object} property spec
       * @return {Object} DCR Object
       * dcr Content would be available inside drcContent
       */
      "DCR": function (spec) {
        return spec.dcr;
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} file path
       */
      "File": function (spec) {
        return this.String(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} font information object
       */
      "Font": function (spec) {
        return spec.font;
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} image information object
       */
      "Image": function (spec) {
        return spec.image;
      },
  
      /**
       * @param {Object} property spec
       * @return {String} value as string
       */
      "Number": function (spec) {
        return this.String(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} font information object
       */
      "PageLink": function (spec) {
        return this.String(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} selected option
       */
      "RadioGroup": function (spec) {
        return this.SelectSingle(spec);
      },
  
      /**
       * @param {Object} property spec
       * @return {Array} array of selected options
       */
      "SelectMultiple": function (spec) {
        var selected = [];
        var option = spec.option, i;
        for (i=0; i<option.length; i++) {
          if (option[i].selected) {
            selected.push(option[i]);
          }
        }
        return selected;
      },
  
      /**
       * @param {Object} property spec
       * @return {Object} selected option
       */
      "SelectSingle": function (spec) {
        var option = spec.option, i;
        for (i=0; i<option.length; i++) {
          if (option[i].selected) {
            return option[i];
          }
        }
        return null;
      },
  
      /**
       * @param {Object} property spec
       * @return {String} value as string
       */
      "String": function (spec) {
        return spec.value;
      },
  
      /**
       * @param {Object} property spec
       * @return {String} value as string
       */
      "Textarea": function (spec) {
        return this.String(spec);
      },
  
      "RulesEngine": function (spec) {
        return spec;
      }
    };
  
    /**
     * @public
     * @param {String} property ID
     * @returns {Any} depends on type, returns null if not found
     * get the property value of the current object base on the ENV
     */
    global.iw.getPropertyValue = function(appId, propId) {

      if (!appId || !propId) {
        return null;
      }
      var propertyScope;
      if (!global.iw.env) {
        // in local environment
        if (global.iw.local.stubs) {
          // if local stubs are available, use local stub data
          propertyScope = global.iw.local.stubs;
        } else {
          // if local stubs not available, use default property values from config properties
          propertyScope = global.iw.local.config.properties;
        }
      } else {
        // in runtime or authoring (remote) environment
        try {
          // assigning the server properties to unqiue key in preview and runtime mode
          propertyScope = JSON.parse(global.iw.server.properties[appId]);
        } catch(error) {
          propertyScope = null;
          console.error('unable to parse server properties');
        }
      }

      /**
       * @param {Array} properties 
       * @param {String} id
       * Search through all properties and look for specific property by provided
       * property ID
       */
      function findPropertyById(properties, id) {
        if (!properties || !properties.length === 0 || !id) {
          return null;
        }
        for (i=0; i< properties.length; i++) {
          var spec = properties[i];
          if (spec.id === id) {
            if (!spec.type || !propValues[spec.type]) {
              // illegal property type
              return null;
            }
            return propValues[spec.type](spec);
          }
        }
      }
      return findPropertyById(propertyScope, propId);
    };
  
  
    /**
     * @private
     * load module configuration file before bootstrap application
     */
    function loadConfigs() {
      var xhr = new XMLHttpRequest();
      var configPath = global.iw.moduleConfigPath;
      xhr.open('GET', configPath); //TODO: move this to inline configuration
      xhr.onload = function () {
        parseJsonResponse(xhr, iw.init);
      };
      xhr.send();
    }
  
    /**
     * @private
     * @param { Object } paramObj 
     * Convert object to parameter query string (for GET request)
     */
    function paramToUrl(paramObj) {
      var paramStr = '';
      for (var key in paramObj) {
          if (paramStr != "") {
              paramStr += "&";
          }
          paramStr += key + "=" + encodeURIComponent(paramObj[key]);
      }
      return paramStr;
    }
  
    /**
     * @private
     * parse JSON object from an xhr response
     * xhr {object} XML http request object
     * callback {function}
     *    callback(errorObj, response);
     *      errorObject {
     *        success: true|false
     *        reason: "the reason it had failed"
     *      }
     */
    function parseJsonResponse(xhr, callback) {
      if (xhr.status === 200) {
        try {
          var responseObj = JSON.parse(xhr.responseText);
          if(xhr.responseURL)
          callback(false, responseObj);
        } catch(error) {
          callback({
            success: false,
            reason: 'unable to parse response to JSON'
          });
        }
      } else if (xhr.status !== 200) {
        callback({
          success: false,
          reason: 'failed to connect to service'
        });
      }
    }

    /**
     * @private
     * parse JSON object from an xhr response
     * xhr {object} XML http request object
     * callback {function}
     *    callback(errorObj, response);
     *      errorObject {
     *        success: true|false
     *        reason: "the reason it had failed"
     *      }
     */
    function parseXMLResponse(xhr, callback) {
      if (xhr.status === 200) {
        try {
          var responseObj = xhr.responseText;
          callback(false, responseObj);
        } catch(error) {
          callback({
            success: false,
            reason: 'unable to parse response to JSON'
          });
        }
      } else if (xhr.status !== 200) {
        callback({
          success: false,
          reason: 'failed to connect to service'
        });
      }
    }
    
    /**
     * @private
     * LSCS api endpoint mapping configuration
     */
    var lscsApis = {
      "documents": "document",
      "document_meta": "document$"
    };
  
    /**
     * @public
     * LSCS API query
     * Make an LSCS API call to get the server message 
     * @param api { string }
     * @param param { object } query parameters (will be convert to url query params)
     * @param callback { function } callback(errorObj, response)
     * @param useStagingInAuthoring { boolean } (optional) a flag force to use staging (path) context in authoring (preview) mode
     */
    global.iw.queryLscs = function(api, params, callback, useStagingInAuthoring) {
      if (!params) {
        params = {};
      }
      if (!global.iw.env) {
        // in local environment
        if (global.iw.local.lscs_stubs[api]) {
          // if local lscs stubs are available, use local lscs stub data
          callback(false, global.iw.local.lscs_stubs[api]);
          return;
        }
        callback({
          success: false,
          reason: 'Local stub was not provided'
        });
      } else {
        // for query in remote environments
        // make real http request
        if (!global.iw.lscs_path) {
          global.iw.lscs_path = '/';
        }
		if(!global.iw.lscs_path.endsWith("/")) {
			global.iw.lscs_path += "/";
		}
        var xhr = new XMLHttpRequest();
        if (global.iw.env === 'PREVIEW' || global.iw.env === 'EDIT') {
          if(!params.context) {
            params.context = useStagingInAuthoring ? global.iw.lscs_stg_context_param : global.iw.lscs_local_context_param;
          }
        } else if (global.iw.env !== 'EDIT') {
          global.iw.lscs_path = global.iw.lscs_path.replace(/(https?:\/\/)(localhost|127\.0\.0\.1)(:|\/)/ig, '$1' + window.location.hostname + '$3');
        }
        var paramStr = paramToUrl(params);
        var serverEndpoint = lscsApis[api];
        if (!serverEndpoint) {
          callback({
            success: false,
            reason: "API does not exist"
          });
          return;
        }
        xhr.open('GET', global.iw.lscs_path + serverEndpoint + '?' + paramStr);
        xhr.onload = function () {
          parseJsonResponse(xhr, callback);
        };
        xhr.onerror = function() {
          if(xhr.status === 0){
            callback({
                success: false,
                reason: 'Failed to fetch the results. Performing an API based search requires TeamSite to be configured with a valid certificate.'
            })
          }
        }
        xhr.send();
      }
    };

    /**
     * @public
     * LSCS API query to get projects
     * @param callback { function } callback(errorObj, response)
     */
    global.iw.getProjects = function(callback) {
      if (!global.iw.env) {
        // in local environment
        if (global.iw.local.lscs_stubs[api]) {
          // if local lscs stubs are available, use local lscs stub data
          callback(false, global.iw.local.lscs_stubs[api]);
          return;
        }
        callback({
          success: false,
          reason: 'Local stub was not provided'
        });
      } else {
        // for query in remote environments
        // make real http request
        if (!global.iw.lscs_path) {
          global.iw.lscs_path = '/';
        }
        var xhr = new XMLHttpRequest();
        if (global.iw.env !== 'EDIT' && global.iw.env !== 'PREVIEW') {
          global.iw.lscs_path = global.iw.lscs_path.replace(/(https?:\/\/)(localhost|127\.0\.0\.1)(:|\/)/ig, '$1' + window.location.hostname + '$3');
        }
    
        xhr.open('GET', global.iw.lscs_path + "projects");
        xhr.onload = function () {
          parseXMLResponse(xhr, callback);
        };
        xhr.onerror = function() {
          if(xhr.status === 0){
            callback({
                success: false,
                reason: 'Failed to fetch the projects. Performing an API based search requires TeamSite to be configured with a valid certificate.'
            })
          }
        }
        xhr.send();
      }
    };
    
    loadConfigs();
  
  })();
  