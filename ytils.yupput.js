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
     * @param {YupputItem[]} values - An array of objects with the following parameters:
     * @param {inputCallback} callback - The callback function for selections on Yupput. Two parameters will be passed into this callback.
     * @callback inputCallback
     * @param {string} callback.selectedItem The value of the selected item that has been passed in into Yupput before.
     * @param {string} callback.inputValue The value of the input element at the enter-key-event or on selection of an item.
     *
     * @callback typingCallback
     * @param {string} callback.inputValue The current value of the input element.
     *
     * @param {object} config
     * @param {string} [config.placeholder] - The placeholder text for the input on the top, defaults to "Search value".
     * @param {string} [config.zIndex] - The z-index for the absolute positioned Yupput container, defaults to 2000.
     * @param {string} [config.autoHide] - Whether to automatically close Yupput dialogue on entry selection/callback or not. Defaults to true.
     * @param {string} [config.hideOnEscape] - Whether to hide Yupput dialogue on escape or not. Defaults to true.
     * @param {string} [config.maxItemCount] - The maximum number of items being displayed on the Yupput dialogue. Defaults to 5.
     * @param {string} [config.ctrlShiftChar] - The char that opens the Yupput dialogue, when hit together with Control and Shift. Defaults to "Y".
     * @param {boolean} [config.matchCaseInsensitive] - Whether to match case insensitive or not. Defaults to true.
     * @param {boolean} [config.callbackOnNoSelectionOnEnter] - Whether to fire @callback inputCallback on enter when nothing's been selected. Will use first displayed item or null. Defaults to false.
     * @param {boolean} [config.hideOnCallbackFired] - Whether to hide Yupput dialogue on callback fired or not. Defaults to false.
     * @param {boolean} [config.preloadImages] - Whether to preload the images of the items passed into the constructor or not.
     * @param {boolean} [config.matchOnlyHeadline] - Whether to find matches only over the headline value and not within meta data. Defaults to false.
     * @param {boolean} [config.containsForHeadlineMatches] - Whether to use contains for headline matching instead of starts-with-check. Defaults to false.
     * @param {boolean} [config.containsForMetaMatches] - Whether to use contains for meta string matching instead of starts-with-check. Defaults to false.
     * @param {boolean} [config.metaDataOnlyForSearch] - Whether to use the given metaData only for the filtering process. Headline becomes bigger in this case. Defaults to false.
     * @param {string} [config.stopPropagateEnter] - Whether to stop propagation of enter when hit while the cursor is in Yupput's input field. Defaults to false.
     * @param {string} [config.stopPropagateEscape] - Whether to stop propagation of escape when hit while the cursor is in Yupput's input field. Defaults to false.
     * @param {typingCallback} [config.callbackOnChange] - Optional function callback that will be fired on input change. The current input value will be passed in.
     * @constructor
     */
    Ytils.Yupput = function(values, callback, config) {

        var DATA_KEY_HEADLINE = "headline";
        var DATA_KEY_META_DATA = "metaData";
        var DATA_KEY_THUMBNAIL = "thumbnail";

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
        var DEFAULT_CALLBACK_ON_NO_SELECTION_ON_ENTER = false;
        var DEFAULT_HIDE_ON_CALLBACK = false;
        var DEFAULT_MATCH_CASE_INSENSITIVE = true;

        // CSS IDs:
        var CONTAINER_ID = "ytilsYupputOuterContainer";
        var CONTAINER_FINDINGS_ID = "ytilsYupputFindings";
        var INPUT_ID = "ytilsYupputInput";
        var CONTAINER_FINDINGS_UP_ID = "ytilsYupputFindingsUpIndicator";
        var CONTAINER_FINDINGS_DOWN_ID = "ytilsYupputFindingsDownIndicator";
        var FINDINGS_UP_BTN_ID = "ytilsYupputFindingsUpBtn";
        var FINDINGS_DOWN_BTN_ID = "ytilsYupputFindingsDownBtn";

        // CSS classes:
        var FINDING_CONTAINER_CLASS = "ytilsYupputFinding";
        var FINDING_HOVER_AND_SELECTION_CLASS = "ytilsYupputFindingHighlighted";

        // HTML templates:
        var FINDING_HTML_TEMPLATE = "/**jsmrg htmlvar escdoublequotes lib/slice/htmlvar/yupput.finding.html */";

        var EMPTY = "";
        var NO_SELECTED_ITEM = -1;

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

        /**
         * @†ype {boolean}
         */
        var hideOnCallbackFired;

        /**
         * @†ype {boolean}
         */
        var matchCaseInsensitive;

        /**
         * @†ype {boolean}
         */
        // var initialized = false;

        /**
         * @†ype {callbackOnChange|null}
         */
        var callbackOnChange;

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
         * @†ype {boolean}
         */
        var callbackOnNoSelectionOnEnter;

        /**
         * {YupputItem} selectedItem
         */
        var selectedItem = NO_SELECTED_ITEM;

        /**
         * @type {string}
         */
        var bottomLineCssText = null;

        /**
         * @type {function}
         */
        var hidePrivate;

        /**
         * This function fires the callback passed into the constructor.
         */
        var fireInputCallback = function() {

            var selectedYupputItem;
            var inputValue = Ytils.YupputInput.getValueFromInput(INPUT_ID);

            if (NO_SELECTED_ITEM !== selectedItem) {

                if (callbackOnNoSelectionOnEnter) {

                    callback(null, inputValue);

                    if (hideOnCallbackFired) {

                        hidePrivate();
                    }
                }

            } else {

                selectedYupputItem = valuesPrivateWRenderingMatching[selectedItem];
                callback(selectedYupputItem, inputValue);

                if (hideOnCallbackFired) {

                    hidePrivate();
                }
            }
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

                if (!(startValueDisplayed + maxItemCount >= valuesPrivateWRenderingMatching.length)) {

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

            var newFindingDiv;
            var thumbail;
            var headline;
            var metaData;
            var itemHtml;
            for (i = 0; i < c; i += 1) {

                thumbail = god(valuesPrivate[i], DATA_KEY_THUMBNAIL);
                headline = god(valuesPrivate[i], DATA_KEY_HEADLINE);
                metaData = god(valuesPrivate[i], DATA_KEY_META_DATA);
                itemHtml = createFindingHtml(thumbail, headline, metaData);

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

                // Apply case-insensitivity - if configured or default.
                if (matchCaseInsensitive) {

                    headlineHaystack = headlineHaystack.toLowerCase();
                    metaDataHaystack = metaDataHaystack.toLowerCase();
                    inputValue = inputValue.toLowerCase();
                }

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
        var getSelectedItemPositionByHtmlId = function(id) {

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

            return NO_SELECTED_ITEM;
        };

        /**
         * This function iterates over all YupputItems and shows or hides them.
         * This function also (re-)displays the bottom line
         *
         * border-bottom: #b6b6b6 solid 1px
         */
        var showMatchingItemsAndHideNotMatchingItems = function() {

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

                var i;
                var c = valuesPrivateWRenderingMatching.length;
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
         * Removes all highlightings from visible YupputItems.
         */
        var unhighlightAllItems = function() {

            var i;
            for (i = 0; i < valuesPrivateWRenderingMatching.length; i += 1) {

                document.getElementById(valuesPrivateWRenderingMatching[i].id).classList.remove(FINDING_HOVER_AND_SELECTION_CLASS);
            }
        };

        /**
         * This function sets selection values to initial state (e.g. when closing the dialogue).
         * We must also not forget to unhighlight a possibly previous selected item.
         */
        var resetSelectedItemAndHighlightings = function() {

            startValueDisplayed = 0;
            selectedItem = NO_SELECTED_ITEM;
            unhighlightAllItems();
        };

        /**
         * Hides the dialogue.
         */
        hidePrivate = function() {

            resetSelectedItemAndHighlightings();
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

            Ytils.YupputHtml.createAndAppendIfNotExists(CONTAINER_ID);
            Ytils.YupputHtml.hide(CONTAINER_ID);

            containerFindingsInnerHtml = "/**jsmrg htmlvar escdoublequotes lib/slice/htmlvar/yupput.container-inner-html-w-input.html %d%placeholder */";
            Ytils.YupputHtml.setInnerHtml(CONTAINER_ID, containerFindingsInnerHtml);
        };

        /**
         * Handles the movement of selectedItem and startValueDisplayed
         * when the up or down button is pressed.
         *
         * @param {number} direction
         */
        var operateUpAndDownSelection = function(direction) {

            var selectedYupputItem;

            // Strategy:
            // The selectedItem moves the viewport.
            // The top end of the viewport is startValueDisplayed.
            // If selectedItem touches gets lower than startValueDisplayed, viewport moves up until 0 is reached.
            // If selectedItem touches the bottom bound which is defined by (startValueDisplayed + maxItemCount),
            // the viewport moves down until the bottom is reached.

            // 1. Calculate selectedItem.
            if (NO_SELECTED_ITEM === selectedItem) {

                selectedItem = startValueDisplayed;

            } else {

                selectedItem += direction;
                if (selectedItem < 0) {

                    selectedItem = 0;

                } else if (selectedItem >= valuesPrivateWRenderingMatching.length) {

                    selectedItem = valuesPrivateWRenderingMatching.length -1;
                }
            }

            // 2. Calculate startValueDisplayed from selectedItem.
            if (selectedItem < startValueDisplayed) {

                startValueDisplayed = selectedItem;

            } else if (selectedItem > (startValueDisplayed + maxItemCount - 1)) {

                startValueDisplayed += 1;
            }

            // Unhighlight all and then highlight the one selected.
            unhighlightAllItems();
            selectedYupputItem = valuesPrivateWRenderingMatching[selectedItem];
            document.getElementById(selectedYupputItem.id).classList.add(FINDING_HOVER_AND_SELECTION_CLASS);

            filterAllValuesAndRender(Ytils.YupputInput.getValueFromInput(INPUT_ID));
            displayOrHideDownButton();
        };

        /**
         * Initializes keydown and -up events.
         */
        var initKeyListeners = function() {

            document.addEventListener("keydown", function(e) {

                if (e.ctrlKey && e.shiftKey && e.key === ctrlShiftChar) {

                    if (false === uiVisible) {

                        e.stopPropagation();
                        showPrivate();

                    } else {

                        setFocus();
                    }
                }
            });

            var inputVal;
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

                    // false === e.ctrlKey - because it would'nt be rendered afterwards in this case.
                    if (e.key === "ArrowDown") {

                        operateUpAndDownSelection(1);
                        // filterAllValuesAndRender(); is called in function operateUpAndDownSelection().

                    } else if (e.key === "ArrowUp") {

                        operateUpAndDownSelection(-1);
                        // filterAllValuesAndRender(); is called in function operateUpAndDownSelection().

                    } else {

                        if (false === e.ctrlKey) {

                            inputVal = Ytils.YupputInput.getValueFromInput(INPUT_ID);
                            // NPE avoided by checks in construct().
                            if (null !== callbackOnChange) {

                                callbackOnChange(inputVal);
                            }

                            resetSelectedItemAndHighlightings();
                            filterAllValuesAndRender(inputVal);
                        }
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

            var CLICK = "click";
            var MOUSE_MOVE = "mousemove";
            var MOUSE_LEAVE = "mouseleave";

            var i;
            var c = valuesPrivateWRendering.length;
            var yupputFindingContainerHandle;

            var registerMouseMoveBehaviour = function(yupputFindingContainerHandle) {

                yupputFindingContainerHandle.addEventListener(MOUSE_MOVE, function() {

                    selectedItem = getSelectedItemPositionByHtmlId(this.id);
                    this.classList.add(FINDING_HOVER_AND_SELECTION_CLASS);
                });
            };

            var registerMouseClickBehaviour = function(yupputFindingContainerHandle) {

                yupputFindingContainerHandle.addEventListener(CLICK, function() {

                    selectedItem = getSelectedItemPositionByHtmlId(this.id);
                    fireInputCallback();
                });
            };

            var registerMouseLeaveBehaviour = function(yupputFindingContainerHandle) {

                yupputFindingContainerHandle.addEventListener(MOUSE_LEAVE, function() {

                    this.classList.remove(FINDING_HOVER_AND_SELECTION_CLASS);
                });
            };

            if (initial) {

                document.getElementById(CONTAINER_FINDINGS_ID).addEventListener(MOUSE_LEAVE, function() {

                    selectedItem = NO_SELECTED_ITEM;
                });
            }

            for (i = 0; i < c; i += 1) {

                yupputFindingContainerHandle = document.getElementById(valuesPrivateWRendering[i].id);
                registerMouseMoveBehaviour(yupputFindingContainerHandle);
                registerMouseClickBehaviour(yupputFindingContainerHandle);
                registerMouseLeaveBehaviour(yupputFindingContainerHandle);
            }
        };

        /**jsmrg include lib/slice/js/yupput.construct.js */
        /**jsmrg include lib/slice/js/yupput.public.js */
    };

}());