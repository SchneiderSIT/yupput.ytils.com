
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
        callbackOnNoSelectionOnEnter = god(config,"callbackOnNoSelectionOnEnter") || DEFAULT_CALLBACK_ON_NO_SELECTION_ON_ENTER;
        hideOnCallbackFired = god(config,"hideOnCallbackFired") || DEFAULT_HIDE_ON_CALLBACK;
        matchCaseInsensitive = god(config,"matchCaseInsensitive") || DEFAULT_MATCH_CASE_INSENSITIVE;

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

        callbackOnChange = god(config, "callbackOnChange");
        Ytils.YupputHelper.expectFunctionOrNull(callbackOnChange, "Ytils.Yupput expects config option .callbackOnChange to be a function.");

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

        // initialized = true;
    };

    construct(values);