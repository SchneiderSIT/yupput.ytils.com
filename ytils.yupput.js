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
     * @property {string} [values.fullImage] - Optional: The url to to the full image. This will be ignored if no .thumbnail is given.
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
     * @param {string} [config.maxItemCount] - The maximum number of items being displayed on the Yupput dialogue. Defaults to 5.
     * @param {string} [config.ctrlShiftChar] - The char that opens the Yupput dialogue, when hit together with Control and Shift. Defaults to "Y".
     * @param {boolean} [config.preloadImages] - Whether to preload the images of the items passed into the constructor or not.
     * @param {string} [config.stopPropagateEnter] - Whether to stop propagation of enter when hit while the cursor is in Yupput's input field. Defaults to false.
     * @param {string} [config.stopPropagateEscape] - Whether to stop propagation of escape when hit while the cursor is in Yupput's input field. Defaults to false.
     * @param {function} [config.callbackBeforeShow] - Optional function callback before the Yupput dialogue opens.
     * @param {function} [config.callbackOnEscape] - Optional function callback on enter after Yupput's functionality has been done.
     * @constructor
     */
    Ytils.Yupput = function(values, callback, config) {

        var DATA_KEY_HEADLINE = "headline";
        var DATA_KEY_META_DATA = "metaData";
        var DATA_KEY_THUMBNAIL = "thumbnail";
        var DATA_KEY_VALUE = "value";

        // Configuration defaults:
        var DEFAULT_PLACEHOLDER = "Search value";
        var DEFAULT_Z_INDEX = 2000;
        var DEFAULT_AUTO_HIDE = true;
        var DEFAULT_MAX_ITEM_COUNT = 5;
        var DEFAULT_CTRL_SHIFT_CHAR = "Y";
        var DEFAULT_STOP_PROPAGATE_ENTER = false;
        var DEFAULT_STOP_PROPAGATE_ESCAPE = false;
        var DEFAULT_HIDE_ON_ESCAPE = true;
        var DEFAULT_PRELOAD_IMAGES = false;

        // CSS IDs:
        var CONTAINER_ID = "ytilsYupputOuterContainer";
        var CONTAINER_FINDINGS_ID = "ytilsYupputFindings";
        var INPUT_ID = "ytilsYupputInput";
        var CONTAINER_FINDINGS_UP_ID = "ytilsYupputFindingsUpIndicator";
        var CONTAINER_FINDINGS_DOWN_ID = "ytilsYupputFindingsDownIndicator";
        var FINDINGS_UP_BTN_ID = "ytilsYupputFindingsUpBtn";
        var FINDINGS_DOWN_BTN_ID = "ytilsYupputFindingsDownBtn";

        var FINDING_HTML_TEMPLATE = "/**jsmrg htmlvar escdoublequotes lib/slice/htmlvar/yupput.finding.html */";
        var FINDING_CONTAINER_CLASS = "ytilsYupputFinding";

        var valuesPrivate;
        var valuesPrivateWRendering;
        var valuesPrivateWRenderingMatching;
        var valuesPrivateWRenderingNotMatching;
        var valuesPrivateWRenderingMatchCount = 0;
        var startValueDisplayed = 0;

        // General configuration settings.
        var placeholder;
        var zIndex;
        var autoHide;
        var maxItemCount;
        var preloadImages;

        // Event configuration settings:
        var stopPropagateEnter; // TODO
        var stopPropagateEscape; // TODO
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

        var fireCallback = function() {

            callback(selectedItem, Ytils.YupputInput.getValueFromInput(INPUT_ID));
        };

        /**
         * Renders one <div class="ytilsYupputFinding">...</div>.
         *
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

        /**
         * Prepares all values to be rendered as html slice.
         */
        var prepareAllValuesAndAppendToBody = function() {

            var i;
            var god = Ytils.YupputHelper.god;
            var c = valuesPrivate.length;
            var idI = Ytils.YupputHelper.createUniqueButUpcountableInitialId();

            var findingsContainer = Ytils.YupputHtml.clearInnerHtmlAndGetElement(CONTAINER_FINDINGS_ID);
            valuesPrivateWRendering = [ ];

            for (i = 0; i < c; i += 1) {

                var newFindingDiv;
                var newFindingDivId;
                var thumbail = god(valuesPrivate[i], DATA_KEY_THUMBNAIL);
                var headline = god(valuesPrivate[i], DATA_KEY_HEADLINE);
                var metaData = god(valuesPrivate[i], DATA_KEY_META_DATA);
                var itemHtml = createFindingHtml(thumbail, headline, metaData);

                valuesPrivateWRendering[i] = { };
                valuesPrivateWRendering[i].thumbail = thumbail;
                valuesPrivateWRendering[i].headline = headline;
                valuesPrivateWRendering[i].metaData = metaData;
                valuesPrivateWRendering[i].html = itemHtml;
                valuesPrivateWRendering[i].id = Ytils.YupputHelper.createUniqueFindingId(idI);
                idI += 1;

                newFindingDiv = Ytils.YupputHtml.createDivHtmlElementWIdAndClass(valuesPrivateWRendering[i].id, FINDING_CONTAINER_CLASS);
                newFindingDiv.innerHTML = valuesPrivateWRendering[i].html;
                newFindingDiv = Ytils.YupputHtml.hideElement(newFindingDiv);

                findingsContainer.append(newFindingDiv);
            }
        };

        var hideAllNonMatching = function() {

            var targetedHtmlId;
            var i;

            var c = valuesPrivateWRenderingNotMatching.length;
            for (i = 0; i < c; i += 1) {

                targetedHtmlId = valuesPrivateWRenderingNotMatching[i].id;
                Ytils.YupputHtml.hide(targetedHtmlId);
            }
        };

        /**
         * Filters all prepared values according to the input.
         *
         * @param {string} inputValue
         */
        var filterAllValues = function(inputValue) {

            var god = Ytils.YupputHelper.god;

            // Reset matches:
            valuesPrivateWRenderingMatchCount = 0;
            valuesPrivateWRenderingMatching = [ ];
            valuesPrivateWRenderingNotMatching = [ ];

            var matchesHeadlineOrMetaData = function(item, inputValue) {

                var headlineHaystack = god(item, DATA_KEY_HEADLINE);
                var metaDataHaystack = god(item, DATA_KEY_META_DATA);

                var headlineMatch = Ytils.YupputHelper.isStringStartingWith(headlineHaystack, inputValue);
                var metaDataMatch = Ytils.YupputHelper.isStringStartingWith(metaDataHaystack, inputValue);

                return headlineMatch || metaDataMatch;
            };

            var i;
            var c = valuesPrivateWRendering.length;

            if (Ytils.YupputHelper.isNonEmptyString(inputValue)) {

                for (i = 0; i < c; i += 1) {

                    if (matchesHeadlineOrMetaData(valuesPrivateWRendering[i], inputValue)) {

                        valuesPrivateWRenderingMatching.push(valuesPrivateWRendering[i]);
                        valuesPrivateWRenderingMatchCount += 1;
                    } else {

                        valuesPrivateWRenderingNotMatching.push(valuesPrivateWRendering[i]);
                    }
                }
            } else {

                valuesPrivateWRenderingNotMatching = valuesPrivateWRendering;
                hideAllNonMatching();
            }
        };

        var handleUpDownBtns = function() {

            /*
        var CONTAINER_FINDINGS_UP_ID = "ytilsYupputFindingsUpIndicator";
        var CONTAINER_FINDINGS_DOWN_ID = "ytilsYupputFindingsDownIndicator";
        var FINDINGS_UP_BTN_ID = "ytilsYupputFindingsUpBtn";
        var FINDINGS_DOWN_BTN_ID = "ytilsYupputFindingsDownBtn";
             */

            var hideAllUpAndDownBtns = function () {

                Ytils.YupputHtml.hide(CONTAINER_FINDINGS_ID);
                Ytils.YupputHtml.hide(CONTAINER_FINDINGS_UP_ID);
                Ytils.YupputHtml.hide(CONTAINER_FINDINGS_DOWN_ID);
            };

            if (false/*  || valuesPrivateWRenderingFiltered.length === 0*/) {

                hideAllUpAndDownBtns();

            } else {

                // TODO
            }
        };

        var showMatchingItemsAndHideNotMatchingItems = function() {

            var targetedHtmlId;
            var i;
            var c;
            var realStartValueDisplayed = startValueDisplayed;
            var totalAmountMatches = valuesPrivateWRenderingMatching.length;

            var showAllMatching = function() {

                c = valuesPrivateWRenderingMatching.length;
                for (i = 0; i < c; i += 1) {

                    targetedHtmlId = valuesPrivateWRenderingMatching[i].id;
                    Ytils.YupputHtml.show(targetedHtmlId);
                }
            };

            // Rendering strategy:
            // 1.) Hide all:
            // 2.) If maxItemCount <= valuesPrivateWRenderingMatching.length -> show all
            //     If maxItemCount > valuesPrivateWRenderingMatching
            //          2a.) startValueDisplayed + maxItemCount <= valuesPrivateWRenderingMatching.length -> show all from startValueDisplayed.
            //          2b.) startValueDisplayed + maxItemCount > valuesPrivateWRenderingMatching.length -> Reduce startValueDisplayed by overhang.
            hideAllNonMatching();
            if (totalAmountMatches <= maxItemCount) {

                showAllMatching();

            } else {

                if (startValueDisplayed + maxItemCount <= valuesPrivateWRenderingMatching.length) {

                    // TODO
                    // showAllMatchingFromTo(startValueDisplayed, (startValueDisplayed + maxItemCount));
                }

            }
        };

        var filterAllValuesAndRender = function(inputValue) {

            filterAllValues(inputValue);
            showMatchingItemsAndHideNotMatchingItems();
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
                filterAllValuesAndRender(Ytils.YupputInput.getValueFromInput(INPUT_ID));
                handleUpDownBtns();

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

                } else if (e.key === "Enter") {

                    if (uiVisible) {

                        fireCallback();
                    }

                } else {

                    filterAllValuesAndRender(Ytils.YupputInput.getValueFromInput(INPUT_ID));
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

            var preload = function() {

                var i;
                var c = valuesPrivate.length;

                for (i = 0; i < c; i += 1) {

                    if (Ytils.YupputHelper.isString(valuesPrivate[i].thumbnail)) {

                        Ytils.YupputHtml.preloadImage(valuesPrivate[i].thumbnail);
                    }

                    if (Ytils.YupputHelper.isString(valuesPrivate[i].fullImage)) {

                        Ytils.YupputHtml.preloadImage(valuesPrivate[i].fullImage);
                    }
                }
            };

            var god = Ytils.YupputHelper.god;

            placeholder = god(config,"placeholder") || DEFAULT_PLACEHOLDER;
            zIndex = god(config,"zIndex") || DEFAULT_Z_INDEX;
            autoHide = god(config,"autoHide") || DEFAULT_AUTO_HIDE;
            maxItemCount = god(config,"maxItemCount") || DEFAULT_MAX_ITEM_COUNT;
            ctrlShiftChar = god(config,"ctrlShiftChar") || DEFAULT_CTRL_SHIFT_CHAR;
            hideOnEscape = god(config,"hideOnEscape") || DEFAULT_HIDE_ON_ESCAPE;
            preloadImages = god(config,"preloadImages") || DEFAULT_PRELOAD_IMAGES;
            stopPropagateEnter = god(config,"stopPropagateEnter") || DEFAULT_STOP_PROPAGATE_ENTER;
            stopPropagateEscape = god(config,"stopPropagateEscape") || DEFAULT_STOP_PROPAGATE_ESCAPE;

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
            valuesPrivate = values;
            prepareAllValuesAndAppendToBody();

            Ytils.YupputHtml.expectExisting(INPUT_ID);
            initKeyListener();

            if (preloadImages) {

                preload();
            }

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
            prepareAllValuesAndAppendToBody();
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