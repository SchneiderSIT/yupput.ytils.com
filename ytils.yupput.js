/**jsmrg include lib/slice/js/yupput.jslint-head.js */
(function() {

    /**jsmrg include lib/slice/js/yupput.namespace-head.js */
    /**jsmrg include lib/slice/js/yupput.helper.js */
    /**jsmrg include lib/slice/js/yupput.html.js */
    /**jsmrg include lib/slice/js/yupput.input.js */

    /**
     * @typedef YupputItem
     * @property {string} html - The rendered HTML according to the data below.
     * @property {string} values.headline - The headline of the entry.
     * @property {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
     * @property {string} [values.thumbnail] - Optional: The url to the thumbnail image.
     * @property {string} values.value - The value to return to the callback if value[x] has been selected.
     */

    /**
     * The Yupput constructor.
     *
     * @param {object[]} values - An array of objects with the following parameters:
     * @param {string} values.headline - The headline of the entry.
     * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
     * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
     * @param {string} values.value - The value to return to the callback if value[x] has been selected.
     *
     * @param {inputCallback} callback - The callback function for selections on Yupput. Two parameters will be passed into this callback.
     * @callback inputCallback
     * @param {string} callback.value The value of the selected item that has been passed in into Yupput before.
     * @param {string} callback.inputValue The value of the input element at the enter-key-event or on selection of an item.
     *
     * @param {object} config
     * @param {string} [config.placeholder] - The placeholder text for the input on the top, defaults to "Search value".
     * @param {string} [config.zIndex] - The z-index for the absolute positioned Yupput container, defaults to 2000.
     * @param {string} [config.autoHide] - Whether to automatically close Yupput dialogue on entry selection/callback or not. Defaults to true.
     * @param {string} [config.hideOnEscape] - Whether to close Yupput dialogue on escape or not. Defaults to true.
     * @param {function} [config.callbackBeforeShow] - Optional function callback before the Yupput dialogue opens.
     * @param {function} [config.callbackOnEscape] - Optional function callback on enter after Yupput's functionality has been done.
     * @constructor
     */
    Ytils.Yupput = function(values, callback, config) {

        // Configuration defaults:
        var DEFAULT_PLACEHOLDER = "Search value";
        var DEFAULT_Z_INDEX = 2000;
        var DEFAULT_AUTO_HIDE = true;
        var DEFAULT_CTRL_SHIFT_CHAR = "Y";
        var DEFAULT_STOP_PROPAGATE_ENTER = false;
        var DEFAULT_STOP_PROPAGATE_ESCAPE = false;
        var DEFAULT_HIDE_ON_ESCAPE = true;

        // CSS IDs:
        var CONTAINER_ID = "ytilsYupputOuterContainer";
        var CONTAINER_FINDINGS_ID = "ytilsYupputFindings";
        var INPUT_ID = "ytilsYupputInput";
        var FINDINGS_UP_BTN_ID = "ytilsYupputFindingsUpBtn";
        var FINDINGS_DOWN_BTN_ID = "ytilsYupputFindingsDownBtn";

        var FINDING_HTML_TEMPLATE = "/**jsmrg htmlvar escdoublequotes lib/slice/htmlvar/yupput.finding.html */";

        var valuesPrivate;
        var valuesPrivateWRendering;

        // General configuration settings.
        var placeholder;
        var zIndex;
        var autoHide;

        // Event configuration settings:
        var stopPropagateEnter; // TODO
        var stopPropagateEsc; // TODO
        var hideOnEscape;

        // Callback functions:
        var callbackOnEscape = null;
        var callbackBeforeShow = null;

        var initialized = false;
        var containerFindingsInnerHtml = "";
        var uiVisible = false;
        var ctrlShiftChar;

        /**
         * {object} selectedItem
         * {string}
         */
        var selectedItem = null;

        /**
         *
         *
         * @type {string[]}
         */
        var renderedFindings = [ ];

        var fireCallback = function() {

            callback(selectedItem, Ytils.YupputInput.getValueFromInput(INPUT_ID));
        };

        /**
         * @param {string} thumbnail
         * @param {string} headline
         * @param {string} metaData
         * @return {string} The HTML to render
         */
        var createFindingHtml = function(thumbnail, headline, metaData) {

            var yh = Ytils.YupputHelper;
            var findingHtml = FINDING_HTML_TEMPLATE;

            if (yh.isNonEmptyString(thumbnail)) {
                findingHtml = findingHtml.replace("{{thumbnail}}", "background-image: url(" + thumbnail + ");");
            } else {
                findingHtml = findingHtml.replace("{{thumbnail}}", "width: 0 !important;");
            }

            if (yh.isNonEmptyString(headline)) {
                findingHtml = findingHtml.replace("{{headline}}", headline);
            } else {
                findingHtml = findingHtml.replace("{{headline}}", "");
            }

            if (yh.isNonEmptyString(metaData)) {
                findingHtml = findingHtml.replace("{{metaData}}", metaData);
            } else {
                findingHtml = findingHtml.replace("{{metaData}}", "");
            }

            return findingHtml;
        };

        var prepareAllValues = function() {

            var i;
            var god = Ytils.YupputHelper.god;
            var c = valuesPrivate.length;

            valuesPrivateWRendering = [ ];

            for (i = 0; i < c; i += 1) {

                var thumbail = god(valuesPrivate[i], "thumbnail");
                var headline = god(valuesPrivate[i], "headline");
                var metaData = god(valuesPrivate[i], "metaData");
                var itemHtml = createFindingHtml(thumbail, headline, metaData);

                valuesPrivateWRendering[i] = { };
                valuesPrivateWRendering[i].thumbail = thumbail;
                valuesPrivateWRendering[i].headline = headline;
                valuesPrivateWRendering[i].metaData = metaData;
                valuesPrivateWRendering[i].html = itemHtml;
            }

            var a = 10;
        };

        /**
         * Hides the dialogue.
         */
        var hidePrivate = function() {

            Ytils.YupputInput.clearInput(INPUT_ID);
            Ytils.YupputHtml.hide(CONTAINER_ID);

            uiVisible = false;
        };

        /**
         * Shows the dialogue if not visible yet.
         */
        var showPrivate = function() {

            if (false === uiVisible) {

                Ytils.YupputHtml.show(CONTAINER_ID);
                prepareAllValues();

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

            containerFindingsInnerHtml = "/**jsmrg htmlvar escdoublequotes lib/slice/htmlvar/yupput.container-inner-html-w-input.html %d%placeholder */";
            Ytils.YupputHtml.setInnerHtml(CONTAINER_ID, containerFindingsInnerHtml);
        };

        /**
         * Initializes keydown and -up events.
         */
        var initKeyListener = function() {

            document.addEventListener("keydown", (e) => {

                if (e.ctrlKey && e.shiftKey && e.key === ctrlShiftChar) {

                    showPrivate();
                }
            });

            var inputHandle = Ytils.YupputInput.getInputTypeTextHandleById(INPUT_ID);
            inputHandle.onkeyup = function(e) {

                if (hideOnEscape && e.key === "Escape") {

                    hidePrivate();
                }

                if (e.key === "Enter") {

                    if (uiVisible) {

                        fireCallback();
                    }
                }
            };
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

            var god = Ytils.YupputHelper.god;

            placeholder = god(config,"placeholder") || DEFAULT_PLACEHOLDER;
            zIndex = god(config,"zIndex") || DEFAULT_Z_INDEX;
            autoHide = god(config,"autoHide") || DEFAULT_AUTO_HIDE;
            ctrlShiftChar = god(config,"ctrlShiftChar") || DEFAULT_CTRL_SHIFT_CHAR;
            hideOnEscape = god(config,"hideOnEscape") || DEFAULT_HIDE_ON_ESCAPE;

            // Check callback parameter:
            Ytils.YupputHelper.expectFunction(callback, "Ytils.Yupput expects parameter callback to be a function.");

            // Check config options:
            Ytils.YupputHelper.expectString(placeholder, "Ytils.Yupput expects config option .placeholder to be a string.");
            Ytils.YupputHelper.expectInt(zIndex, "Ytils.Yupput expects config option .zIndex to be an integer.");
            Ytils.YupputHelper.expectBoolean(autoHide, "Ytils.Yupput expects config option .autoHide to be a boolean.");
            Ytils.YupputHelper.expectAz09Char(ctrlShiftChar, "Ytils.Yupput expects config option .ctrlShiftChar to be a single char within a-z, A-Z or 0-9.");
            Ytils.YupputHelper.expectFunctionOrNull(god(config, "callbackBeforeShow"), "Ytils.Yupput expects config option .callbackBeforeShow to be a function.");
            Ytils.YupputHelper.expectFunctionOrNull(god(config, "callbackOnEscape"), "Ytils.Yupput expects config option .callbackOnEscape to be a function.");

            ctrlShiftChar = ctrlShiftChar.toUpperCase();

            createInitialContainer();

            Ytils.YupputHtml.expectExisting(INPUT_ID);
            initKeyListener();

            valuesPrivate = values;
            initialized = true;
        };

        /**
         * Returns true if the Yupput dialogue is active or not.
         *
         * @returns {boolean}
         */
        this.isVisible = function() {

            return uiVisible;
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
            prepareAllValues();
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