/**
 * Copyright © 2023 OpenText Corporation All rights reserved.
 * 
 * The stub data set for datum property values. Include this script before
 * otts_module_api
 */
(function () {

    if (!global) {
      // for server side javascript, global should already be defined for global scope variables
      var global = window;
    }

    global.iw.local = {
        stubs: [
            { "id": "DT01", "type": "Textarea", "name": "My Textarea", "min": -1, "max": 40, "mask": "regular expression", "exposed": true, "replicatable": false, "value": "Content..." }
        ],
    };
})();
