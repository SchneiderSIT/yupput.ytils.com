/**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.jslint-head.js */
(function() {

    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.namespace-head.js */
    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.helper.js */

    /**
     * The yupput constructor.
     * Configuration options:
     *  - config.placeholder: The input's placeholder.
     *
     * @param {object} config
     * @constructor
     */
    Ytils.Yupput = function(config) {

        var initialized = false;

        var construct = function() {

            initialized = true;
        };

        this.show = function(initialValue) {

            /*
            alert(typeof config);
            if (initialized) {
                alert("ja: " + initialValue);
            } else {
                alert("nein: " + initialValue);
            }
             */

        };

        construct();
    };

}());