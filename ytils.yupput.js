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
     * @param {YupputItem[]} values - An array of objects with the following parameters:
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
     * @param {boolean} [config.matchOnlyHeadline] - Whether to find matches only over the headline value and not within meta data. Defaults to false.
     * @param {boolean} [config.containsForHeadlineMatches] - Whether to use contains for headline matching instead of starts-with-check. Defaults to false.
     * @param {boolean} [config.containsForMetaMatches] - Whether to use contains for meta string matching instead of starts-with-check. Defaults to false.
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
        var DATA_KEY_VALUE = "value"; // TODO Callback

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
        var DEFAULT_MATCH_ONLY_HEADLINE = false;
        var DEFAULT_CONTAINS_FOR_HEADLINE_MATCHES = false;
        var DEFAULT_CONTAINS_FOR_META_MATCHES = false;

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

        var EMPTY = "";
        var NO_FINDING_HIGHLIGHTED_VALUE = -1;

        /**
         * The main, outer container handle.
         *
         * @type HTMLObjectElement
         */
        var mainContainerHandle;

        /**
         * @type YupputItem[]
         */
        var valuesPrivate;

        /**
         * @type YupputItem[]
         */
        var valuesPrivateWRendering;

        /**
         * @type YupputItem[]
         */
        var valuesPrivateWRenderingMatching;

        /**
         * @type YupputItem[]
         */
        var valuesPrivateWRenderingNotMatching;

        /**
         * @type {number}
         */
        var valuesPrivateWRenderingMatchCount = 0;

        /**
         * @type {number}
         */
        var startValueDisplayed = 0;

        // General configuration settings.
        /**
         * @type {string}
         */
        var placeholder;

        /**
         * @type {number}
         */
        var zIndex;

        /**
         * @type {boolean}
         */
        var autoHide;

        /**
         * @type {number}
         */
        var maxItemCount;

        /**
         * @type {boolean}
         */
        var preloadImages;

        /**
         * @type {boolean}
         */
        var matchOnlyHeadline;

        // Event configuration settings:
        /**
         * @†ype {boolean}
         */
        var stopPropagateEnter;

        /**
         * @†ype {boolean}
         */
        var stopPropagateEscape;

        /**
         * @†ype {boolean}
         */
        var hideOnEscape;

        // Callback functions:
        /**
         * @†ype {function}
         */
        var callbackOnEscape = null; // TODO

        /**
         * @†ype {function}
         */
        var callbackBeforeShow = null;  // TODO

        /**
         * @†ype {boolean}
         */
        var initialized = false;

        /**
         * @†ype {boolean}
         */
        var containsForHeadlineMatches;

        /**
         * @†ype {boolean}
         */
        var containsForMetaMatches;

        /**
         * @†ype {function}
         */
        var matchForHeadlineMatchesCallback = Ytils.YupputHelper.isStringStartingWith;

        /**
         * @†ype {function}
         */
        var matchForMetaMatchesCallback = Ytils.YupputHelper.isStringStartingWith;

        /**
         * @†ype {string}
         */
        var containerFindingsInnerHtml = EMPTY;

        /**
         * @†ype {boolean}
         */
        var uiVisible = false;

        /**
         * @†ype {string}
         */
        var ctrlShiftChar;

        /**
         * Whether and when - which - YupputItem is selected by keyboard up/down. If -1: No selection.
         *
         * @type {number}
         */
        var keyboardSelectedItem = NO_FINDING_HIGHLIGHTED_VALUE;

        /**
         * The HTML ID of a YupputItem when hovered by mouse pointer.
         *
         * @type {string}
         */
        var highlightedFindingId = null;

        /**
         * {YupputItem} selectedItem
         */
        var selectedItem = null;

        /**
         * @type {string}
         */
        var bottomLineCssText = null;

        /**
         * This function fires the callback passed into the constructor.
         */
        var fireInputCallback = function() {

            callback(selectedItem, Ytils.YupputInput.getValueFromInput(INPUT_ID));
        };

        /**
         * Depending on current active state, up/down buttons can be made
         * visible or invisible.
         */
        var displayOrHideDownButton = function() {

            var yhtml = Ytils.YupputHtml;

            var upArrowContainer = document.getElementById(CONTAINER_FINDINGS_UP_ID);
            var downArrowContainer = document.getElementById(CONTAINER_FINDINGS_DOWN_ID);
            var upArrowElem = document.getElementById(FINDINGS_UP_BTN_ID);
            var downArrowElem = document.getElementById(FINDINGS_DOWN_BTN_ID);

            var operateUpDownButtonVisibility = function() {

                yhtml.showElement(upArrowContainer);
                yhtml.showElement(downArrowContainer);

                if (startValueDisplayed > 0) {

                    yhtml.visibleElement(upArrowElem);

                } else {

                    yhtml.invisibleElement(upArrowElem);
                }

                if (!(startValueDisplayed + 1 >= valuesPrivateWRenderingMatching.length)) {

                    yhtml.visibleElement(downArrowElem);

                } else {

                    yhtml.invisibleElement(downArrowElem);
                }
            };

            if (!valuesPrivateWRenderingMatching.length) {

                yhtml.hideElement(upArrowContainer);
                yhtml.hideElement(downArrowContainer);

            } else {

                if (maxItemCount > valuesPrivateWRenderingMatching.length) {

                    yhtml.invisibleElement(upArrowElem);
                    yhtml.invisibleElement(downArrowElem);

                } else {

                    operateUpDownButtonVisibility();
                }
            }
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
                findingHtml = findingHtml.replace("{{headline}}", EMPTY);
            }

            if (yh.isNonEmptyString(metaData)) {
                findingHtml = findingHtml.replace("{{metaData}}", metaData);
            } else {
                findingHtml = findingHtml.replace("{{metaData}}", EMPTY);
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

        /**
         * Hides a given array of YupputItems.
         *
         * @param {YupputItem[]} items
         */
        var hideYupputItems = function(items) {

            var targetedHtmlId;
            var i;

            var c = items.length;
            for (i = 0; i < c; i += 1) {

                targetedHtmlId = items[i].id;
                Ytils.YupputHtml.hide(targetedHtmlId);
            }
        };

        var hideAll = function() {

            hideYupputItems(valuesPrivateWRendering);
        };

        var hideAllNonMatching = function() {

            hideYupputItems(valuesPrivateWRenderingNotMatching);
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

                var headlineMatch = matchForHeadlineMatchesCallback(headlineHaystack, inputValue);
                var metaDataMatch = false;

                if (false === matchOnlyHeadline) {

                    metaDataMatch = matchForMetaMatchesCallback(metaDataHaystack, inputValue);
                }

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

        /**
         * Iterates over the matched items and assigns the iteration number to match the keyboard up-/down-count equivalent.
         *
         * @param {string} id
         * @return {number}
         */
        var getKeyboardSelectedItemPositionByHtmlId = function(id) {

            var i;
            var c = valuesPrivateWRenderingMatching.length;
            if (c > maxItemCount) {

                 c = maxItemCount;
            }

            for (i = 0; i < c; i += 1) {

                if (valuesPrivateWRenderingMatching[i].id === id) {

                    return i;
                }
            }

            return NO_FINDING_HIGHLIGHTED_VALUE;
        };

        /**
         * This function iterates over all YupputItems and shows or hides them.
         * This function also (re-)displays the bottom line
         *
         * border-bottom: #b6b6b6 solid 1px
         */
        var showMatchingItemsAndHideNotMatchingItems = function() {

            var targetedHtmlId;
            var i;
            var c;
            var totalAmountMatches = valuesPrivateWRenderingMatching.length;

            /**
             * Shows a matching item and assigns bottomLineCssText if it did not happen yet.
             * The value for bottomLineCssText will be retrieved from the computed style. This is for the case
             * Yupput's CSS is overwritten by someone.
             *
             * @param {YupputItem} item
             */
            var showMatchingItem = function(item) {

                var elementHandle = Ytils.YupputHtml.show(item.id);

                if (null === bottomLineCssText) {

                    bottomLineCssText = Ytils.YupputHtml.getCssFromElement(item.id, "border-bottom");
                }

                elementHandle.style.borderBottom = bottomLineCssText;
            };

            /**
             * Removes the bottom line for the last matching item. This will be repaired on every item
             * being shown - everytime. Therefore this function can only be called after rendering is done.
             *
             * @param {YupputItem} lastItem
             */
            var removeBottomLineFromLastDisplayedItem = function(lastItem) {

                var elementHandle = document.getElementById(lastItem.id);
                elementHandle.style.borderBottom = "none";
            };

            /**
             * Shows all matching YupputItems.
             */
            var showAllMatching = function() {

                c = valuesPrivateWRenderingMatching.length;
                for (i = 0; i < c; i += 1) {

                    showMatchingItem(valuesPrivateWRenderingMatching[i]);

                    if (i === (c - 1)) {

                        removeBottomLineFromLastDisplayedItem(valuesPrivateWRenderingMatching[i]);
                    }
                }
            };

            /**
             * Shows matching subset of valuesPrivateWRenderingMatching with parameters from/to as array-indexes.
             *
             * @param {number} from
             * @param {number} to
             */
            var showMatching = function(from, to) {

                var i;
                if (to >= valuesPrivateWRenderingMatching.length) {

                    to = valuesPrivateWRenderingMatching.length;
                }

                for (i = from; i < to; i += 1) {

                    showMatchingItem(valuesPrivateWRenderingMatching[i]);

                    if (i === (to - 1)) {

                        removeBottomLineFromLastDisplayedItem(valuesPrivateWRenderingMatching[i]);
                    }
                }
            };

            // Rendering strategy:
            //
            // 1.) Hide all:
            // 2.) If maxItemCount >= totalAmountMatches -> show all
            //     If maxItemCount < totalAmountMatches
            //          2a.) startValueDisplayed + maxItemCount <= valuesPrivateWRenderingMatching.length -> show all from startValueDisplayed.
            //          2b.) startValueDisplayed + maxItemCount > valuesPrivateWRenderingMatching.length -> Reduce startValueDisplayed by overhang.
            hideAll();

            var backShiftedStartValue;
            if (totalAmountMatches > 0) {

                if (maxItemCount >= totalAmountMatches) {

                    showAllMatching();

                } else {

                    if ((startValueDisplayed + maxItemCount) <= totalAmountMatches) {

                        showMatching(startValueDisplayed, (startValueDisplayed + maxItemCount));

                    } else {

                        backShiftedStartValue = totalAmountMatches - maxItemCount;
                        showMatching(backShiftedStartValue, totalAmountMatches);
                    }
                }
            }

            // TODO: Fix last line
        };

        /**
         * This function has to be called whenever the displayed amount of YupputItems changes. This can happen by
         *  - Change of the inputValue
         *  - Navigation by up/down-buttons
         *  Later options:
         *  - Clicking the arrow indicators on the right
         *  - Mouse wheel
         *
         * @param {string} inputValue
         */
        var filterAllValuesAndRender = function(inputValue) {

            filterAllValues(inputValue);
            showMatchingItemsAndHideNotMatchingItems();
            displayOrHideDownButton();
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

            mainContainerHandle = Ytils.YupputHtml.createAndAppendIfNotExists(CONTAINER_ID);
            Ytils.YupputHtml.hide(CONTAINER_ID);

            containerFindingsInnerHtml = "/**jsmrg htmlvar escdoublequotes lib/slice/htmlvar/yupput.container-inner-html-w-input.html %d%placeholder */";
            Ytils.YupputHtml.setInnerHtml(CONTAINER_ID, containerFindingsInnerHtml);
        };

        var clearAllHighlightings = function() {

            // TODO
            console.log("clearAllHighlightings");
        };

        var highlightStartValueDisplayed = function() {

            // TODO
            console.log("highlightStartValueDisplayed " + startValueDisplayed);
        };

        /**
         *
         * @param {number} direction
         */
        var operateUpAndDownSelection = function(direction) {

            var totalAmountMatches = valuesPrivateWRenderingMatching.length;

            if (keyboardSelectedItem !== NO_FINDING_HIGHLIGHTED_VALUE) {

                startValueDisplayed = keyboardSelectedItem += direction;

            } else {

                startValueDisplayed += direction;
            }

            // Ignore direction: Always chose the first one.
            if (startValueDisplayed <= NO_FINDING_HIGHLIGHTED_VALUE) {

                startValueDisplayed = 0;

            } else if (startValueDisplayed >= totalAmountMatches) {

                startValueDisplayed = totalAmountMatches - 1;
            }

            displayOrHideDownButton();
            highlightStartValueDisplayed();
        };

        /**
         * Initializes keydown and -up events.
         */
        var initKeyListeners = function() {

            document.addEventListener("keydown", (e) => {

                if (e.ctrlKey && e.shiftKey && e.key === ctrlShiftChar) {

                    if (false === uiVisible) {

                        e.stopPropagation();
                        showPrivate();

                    } else {

                        setFocus();
                    }
                }
            });

            var inputHandle = Ytils.YupputInput.getInputTypeTextHandleById(INPUT_ID);
            inputHandle.onkeyup = function(e) {

                if (hideOnEscape && e.key === "Escape") {

                    hidePrivate();

                    if (stopPropagateEscape) {

                        e.stopPropagation();
                    }

                } else if (e.key === "Enter") {

                    if (uiVisible) {

                        fireInputCallback();
                    }

                    if (stopPropagateEnter) {

                        e.stopPropagation();
                    }

                } else {

                    if (e.key === "ArrowDown") {

                        operateUpAndDownSelection(1);

                    } else if (e.key === "ArrowUp") {

                        operateUpAndDownSelection(-1);
                    }

                    if (false === e.ctrlKey) {

                        filterAllValuesAndRender(Ytils.YupputInput.getValueFromInput(INPUT_ID));
                    }
                }
            };
        };

        /**
         * Initializes mousemove-listeners on all YupputItems.
         *
         * @param {boolean} initial - Only initially the mouse-out-event for the surrounding findings-container is required.
         */
        var initMouseListeners = function(initial) {

            var i;
            var c = valuesPrivateWRendering.length;
            var previousKeyboardSelectedItem = null;
            var yupputFindingContainerHandle;

            if (initial) {

                document.getElementById(CONTAINER_FINDINGS_ID).addEventListener("mouseleave", function() {

                    highlightedFindingId = null;
                    keyboardSelectedItem = NO_FINDING_HIGHLIGHTED_VALUE;
                    previousKeyboardSelectedItem = null;
                });
            }

            for (i = 0; i < c; i += 1) {

                yupputFindingContainerHandle = document.getElementById(valuesPrivateWRendering[i].id)
                yupputFindingContainerHandle.addEventListener("mousemove", function(e) {

                    highlightedFindingId = this.id;
                    keyboardSelectedItem = getKeyboardSelectedItemPositionByHtmlId(this.id);

                    // We do not want that to happen on every mousemove-tick.
                    if (null !== previousKeyboardSelectedItem && previousKeyboardSelectedItem !== keyboardSelectedItem) {

                        previousKeyboardSelectedItem = keyboardSelectedItem;
                        clearAllHighlightings();
                    }
                });
            }
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
            matchOnlyHeadline = god(config,"matchOnlyHeadline") || DEFAULT_MATCH_ONLY_HEADLINE;
            stopPropagateEnter = god(config,"stopPropagateEnter") || DEFAULT_STOP_PROPAGATE_ENTER;
            stopPropagateEscape = god(config,"stopPropagateEscape") || DEFAULT_STOP_PROPAGATE_ESCAPE;
            containsForHeadlineMatches = god(config,"containsForHeadlineMatches") || DEFAULT_CONTAINS_FOR_HEADLINE_MATCHES;
            containsForMetaMatches = god(config,"containsForMetaMatches") || DEFAULT_CONTAINS_FOR_META_MATCHES;

            if (containsForHeadlineMatches) {
                matchForHeadlineMatchesCallback = Ytils.YupputHelper.isStringContaining;
            }
            if (containsForMetaMatches) {
                matchForMetaMatchesCallback = Ytils.YupputHelper.isStringContaining;
            }

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
            initKeyListeners();
            initMouseListeners(true);

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
            initMouseListeners(false);
        };

        /**
         * Renders the dialogue.
         */
        this.show = function() {

            showPrivate(values);
        };

        construct(values);
    } ;

}());