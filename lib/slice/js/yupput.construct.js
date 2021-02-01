
    /**
     * Constructor.
     *
     * @param {object[]} values - An array of objects with the following parameters:
     * @param {string} values.headline - The headline of the entry.
     * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
     * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
     * @param {string} values.value - The value to return to the callback if value[x] has been selected.
     * @throws Will throw an exception if current browser is an Internet Explorer with a version lower than 10.
     */
    var construct = function(values) {

        var preload = function() {

            var i;
            var c = valuesPrivate.length;

            for (i = 0; i < c; i += 1) {

                if (Ytils.YupputHelper.isString(valuesPrivate[i].thumbnail)) {

                    Ytils.YupputHtml.preloadImage(valuesPrivate[i].thumbnail);
                }
            }
        };

        var god = Ytils.YupputHelper.god;
        var godd = Ytils.YupputHelper.godd;
        var ieCheck = Ytils.YupputHelper.isIEWVersion();

        if (ieCheck.isIE && ieCheck.version <= 9) {

            throw "Ytils Yupput requires Internet Explorer with a version higher or equal 10.";
        }

        placeholder = godd(config,"placeholder", DEFAULT_PLACEHOLDER);
        zIndex = godd(config,"zIndex", DEFAULT_Z_INDEX);
        maxItemCount = godd(config,"maxItemCount", DEFAULT_MAX_ITEM_COUNT);
        ctrlShiftChar = godd(config,"ctrlShiftChar", DEFAULT_CTRL_SHIFT_CHAR);
        hideOnEscape = godd(config,"hideOnEscape", DEFAULT_HIDE_ON_ESCAPE);
        preloadImages = godd(config,"preloadImages", DEFAULT_PRELOAD_IMAGES);
        matchOnlyHeadline = godd(config,"matchOnlyHeadline", DEFAULT_MATCH_ONLY_HEADLINE);
        stopPropagateEnter = godd(config,"stopPropagateEnter", DEFAULT_STOP_PROPAGATE_ENTER);
        stopPropagateEscape = godd(config,"stopPropagateEscape", DEFAULT_STOP_PROPAGATE_ESCAPE);
        stopPropagateDblClick = godd(config,"stopPropagateDblClick", DEFAULT_STOP_PROPAGATE_DBLCLICK);
        containsForHeadlineMatches = godd(config,"containsForHeadlineMatches", DEFAULT_CONTAINS_FOR_HEADLINE_MATCHES);
        containsForMetaMatches = godd(config,"containsForMetaMatches", DEFAULT_CONTAINS_FOR_META_MATCHES);
        callbackOnNoSelOnEnter = godd(config,"callbackOnNoSelOnEnter", DEFAULT_CALLBACK_ON_NO_SELECTION_ON_ENTER);
        hideOnCallbackFired = godd(config,"hideOnCallbackFired", DEFAULT_HIDE_ON_CALLBACK);
        matchCaseInsensitive = godd(config,"matchCaseInsensitive", DEFAULT_MATCH_CASE_INSENSITIVE);
        callbackOnChange = god(config, "callbackOnChange");
        moveCursorToEndOnUp = godd(config,"moveCursorToEndOnUp", DEFAULT_MOVE_CURSOR_BACK_TO_END_ON_UP_ARROW);
        callbackThumbnailClick = god(config, "callbackThumbnailClick");

        if (containsForHeadlineMatches) {
            matchForHeadlineMatchesCallback = Ytils.YupputHelper.isStringContaining;
        }
        if (containsForMetaMatches) {
            matchForMetaMatchesCallback = Ytils.YupputHelper.isStringContaining;
        }

        var yyh = Ytils.YupputHelper;

        // Check callback parameter:
        yyh.expectFunction(callback, "Ytils.Yupput expects parameter callback to be a function.");

        // Check config options:
        yyh.expectFunctionOrNull(callbackOnChange, "Ytils.Yupput expects config option .callbackOnChange to be a function.");
        yyh.expectString(placeholder, "Ytils.Yupput expects config option .placeholder to be a string.");
        yyh.expectInt(zIndex, "Ytils.Yupput expects config option .zIndex to be an integer number.");
        yyh.expectInt(maxItemCount, "Ytils.Yupput expects config option .maxItemCount to be an integer number.");
        yyh.expectBoolean(hideOnEscape, "Ytils.Yupput expects config option .hideOnEscape to be a boolean.");
        yyh.expectBoolean(matchCaseInsensitive, "Ytils.Yupput expects config option .matchCaseInsensitive to be a boolean.");
        yyh.expectBoolean(callbackOnNoSelOnEnter, "Ytils.Yupput expects config option .callbackOnNoSelOnEnter to be a boolean.");
        yyh.expectBoolean(hideOnCallbackFired, "Ytils.Yupput expects config option .hideOnCallbackFired to be a boolean.");
        yyh.expectBoolean(preloadImages, "Ytils.Yupput expects config option .preloadImages to be a boolean.");
        yyh.expectBoolean(matchOnlyHeadline, "Ytils.Yupput expects config option .matchOnlyHeadline to be a boolean.");
        yyh.expectBoolean(containsForHeadlineMatches, "Ytils.Yupput expects config option .containsForHeadlineMatches to be a boolean.");
        yyh.expectBoolean(containsForMetaMatches, "Ytils.Yupput expects config option .containsForMetaMatches to be a boolean.");
        yyh.expectBoolean(stopPropagateEnter, "Ytils.Yupput expects config option .stopPropagateEnter to be a boolean.");
        yyh.expectBoolean(stopPropagateEscape, "Ytils.Yupput expects config option .stopPropagateEscape to be a boolean.");
        yyh.expectBoolean(stopPropagateDblClick, "Ytils.Yupput expects config option .stopPropagateDblClick to be a boolean.");
        yyh.expectBoolean(moveCursorToEndOnUp, "Ytils.Yupput expects config option .moveCursorToEndOnUp to be a boolean.");
        yyh.expectAz09CharOrNull(ctrlShiftChar, "Ytils.Yupput expects config option .ctrlShiftChar to be a single char within a-z, A-Z or 0-9.");
        yyh.expectFunctionOrNull(callbackOnChange, "Ytils.Yupput expects config option .callbackOnChange to be a function.");


        if (null !== ctrlShiftChar) {

            ctrlShiftChar = ctrlShiftChar.toUpperCase();
        }

        createInitialContainer();
        valuesPrivate = values;
        prepareAllValuesAndAppendToBody();

        Ytils.YupputHtml.expectExisting(INPUT_ID);
        initKeyListeners();
        initMouseListeners(true);

        if (preloadImages) {

            preload();
        }
    };

    construct(values);
