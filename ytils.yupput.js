/**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.jslint-head.js */
(function() {

    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.namespace-head.js */
    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.helper.js */
    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.html.js */

    /**
     * The yupput constructor.
     *
     * @param {function} callback - The function that will be called with the param of the passed in value
     * @param {object} config
     * @param {string} [config.placeholder] - The placeholder text for the input on the top, defaults to "Search value".
     * @param {string} [config.zIndex] - The z-index for the absolute positioned Yupput container, defaults to 2000.
     * @param {string} [config.autoHide] - Whether to automatically close Yupput dialogue on entry selection/callback or not. Defaults to true.
     * @constructor
     */
    Ytils.Yupput = function(callback, config) {

        var DEFAULT_PLACEHOLDER = "Search value";
        var DEFAULT_Z_INDEX = 2000;
        var DEFAULT_AUTO_HIDE = true;

        var CONTAINER_ID = "ytilsYupputOuterContainer";

        var placeholder;
        var zIndex;
        var autoHide;
        var initialized = false;

        var createInitialContainer = function() {

            Ytils.YupputHtml.createAndAppendIfNotExists(CONTAINER_ID);
        };

        var construct = function() {

            placeholder = Ytils.YupputHelper.god("placeholder") || DEFAULT_PLACEHOLDER;
            zIndex = Ytils.YupputHelper.god("zIndex") || DEFAULT_Z_INDEX;
            autoHide = Ytils.YupputHelper.god("autoHide") || DEFAULT_AUTO_HIDE;
            initialized = true;

            Ytils.YupputHelper.expectFunction(callback, "Ytils.Yupput expects parameter callback to be a function.");

            createInitialContainer();
        };

        /**
         * Renders the dialogue.
         *
         * @param {object[]} values - An array of objects with the following parameters:
         * @param {string} values.headline - The headline of the entry.
         * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
         * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
         * @param {string} values.value - The value to return to the callback if value[x] has been selected.
         */
        this.show = function(values) {



        };

        construct();
    };

}());