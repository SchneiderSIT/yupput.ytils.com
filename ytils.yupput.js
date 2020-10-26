/**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.jslint-head.js */
(function() {

    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.namespace-head.js */
    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.helper.js */
    /**jsmrg include /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/js/yupput.html.js */

    /**
     * The yupput constructor.
     *
     * @param {object[]} values - An array of objects with the following parameters:
     * @param {string} values.headline - The headline of the entry.
     * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
     * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
     * @param {string} values.value - The value to return to the callback if value[x] has been selected.
     *
     * @param {function} callback - The function that will be called with the param of the passed in value.
     *
     * @param {object} config
     * @param {string} [config.placeholder] - The placeholder text for the input on the top, defaults to "Search value".
     * @param {string} [config.zIndex] - The z-index for the absolute positioned Yupput container, defaults to 2000.
     * @param {string} [config.autoHide] - Whether to automatically close Yupput dialogue on entry selection/callback or not. Defaults to true.
     * @constructor
     */
    Ytils.Yupput = function(values, callback, config) {

        var DEFAULT_PLACEHOLDER = "Search value";
        var DEFAULT_Z_INDEX = 2000;
        var DEFAULT_AUTO_HIDE = true;
        var DEFAULT_CTRL_SHIFT_CHAR = "Y";

        var CONTAINER_ID = "ytilsYupputOuterContainer";
        var CONTAINER_FINDINGS_ID = "ytilsYupputFindings";
        var INPUT_ID = "ytilsYupputInput";
        var FINDINGS_UP_BTN_ID = "ytilsYupputFindingsUpBtn";
        var FINDINGS_DOWN_BTN_ID = "ytilsYupputFindingsDownBtn";

        var valuesPrivate;
        var placeholder;
        var zIndex;
        var autoHide;
        var initialized = false;
        var containerFindingsInnerHtml = "";
        var uiVisible = false;
        var ctrlShiftChar;

        var renderValues = function() {

            var findingsContainerHandle = document.getElementById(CONTAINER_FINDINGS_ID);
            var findingHtmlTemplate = "/**jsmrg htmlvar escdoublequotes /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/htmlvar/yupput.finding.html */";
        };

        /**
         * Shows the dialogue if not visible yet.
         */
        var showPrivate = function() {

            if (false === uiVisible) {

                Ytils.YupputHtml.show(CONTAINER_ID);
                setFocus();
                uiVisible = true;
            }
        };

        /**
         * Sets the focus to the input element.
         */
        var setFocus = function() {

            var inputHandle = document.getElementById(INPUT_ID);

            inputHandle.focus();
            inputHandle.select();
        };

        /**
         * Creates the surrounding container for Yupput.
         */
        var createInitialContainer = function() {

            Ytils.YupputHtml.createAndAppendIfNotExists(CONTAINER_ID);
            Ytils.YupputHtml.hide(CONTAINER_ID);

            containerFindingsInnerHtml = "/**jsmrg htmlvar escdoublequotes /Users/kim/Documents/Develop/yupput.ytils.com/lib/slice/htmlvar/yupput.container-inner-html-w-input.html %d%placeholder */";
            Ytils.YupputHtml.setInnerHtml(CONTAINER_ID, containerFindingsInnerHtml);
        };

        var initKeyListener = function() {

            document.addEventListener("keydown", (e) => {

                if (e.ctrlKey && e.shiftKey && e.key === ctrlShiftChar) {

                    showPrivate();
                }
            });

            // TODO: var inputHandle = document.getElementById(INPUT_ID);
        };

        /**
         * Constructor.
         *
         * @param {object[]} values - An array of objects with the following parameters:
         * @param {string} values.headline - The headline of the entry.
         * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
         * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
         * @param {string} values.value - The value to return to the callback if value[x] has been selected.
         */
        var construct = function(values) {

            placeholder = Ytils.YupputHelper.god(config,"placeholder") || DEFAULT_PLACEHOLDER;
            zIndex = Ytils.YupputHelper.god(config,"zIndex") || DEFAULT_Z_INDEX;
            autoHide = Ytils.YupputHelper.god(config,"autoHide") || DEFAULT_AUTO_HIDE;
            ctrlShiftChar = Ytils.YupputHelper.god(config,"ctrlShiftChar") || DEFAULT_CTRL_SHIFT_CHAR;

            Ytils.YupputHelper.expectString(placeholder, "Ytils.Yupput expects config option .placeholder to be a string.");
            Ytils.YupputHelper.expectInt(zIndex, "Ytils.Yupput expects config option .zIndex to be an integer.");
            Ytils.YupputHelper.expectBoolean(autoHide, "Ytils.Yupput expects config option .autoHide to be a boolean.");
            Ytils.YupputHelper.expectAz09Char(ctrlShiftChar, "Ytils.Yupput expects config option .ctrlShiftChar to be a single char within a-z, A-Z or 0-9.");
            Ytils.YupputHelper.expectFunction(callback, "Ytils.Yupput expects parameter callback to be a function.");

            ctrlShiftChar = ctrlShiftChar.toUpperCase();

            createInitialContainer();

            Ytils.YupputHtml.expectExisting(INPUT_ID);
            initKeyListener();

            valuesPrivate = values;
            initialized = true;
        };

        /**
         * Updates the data records
         *
         * @param {object[]} values - An array of objects with the following parameters:
         * @param {string} values.headline - The headline of the entry.
         * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
         * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
         * @param {string} values.value - The value to return to the callback if value[x] has been selected.
         */
        this.updateData = function(values) {

            valuesPrivate = values;
        };

        /**
         * Renders the dialogue.
         */
        this.show = function() {

            showPrivate(values);
        };

        construct(values);
    };

}());