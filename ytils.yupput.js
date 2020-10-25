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
        var CONTAINER_FINDINGS_ID = "ytilsYupputFindings";
        var INPUT_ID = "ytilsYupputInput";
        var FINDINGS_UP_BTN_ID = "ytilsYupputFindingsUpBtn";
        var FINDINGS_DOWN_BTN_ID = "ytilsYupputFindingsDownBtn";

        // var IMAGE_B64_FINDINGS_DOWN = "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAWCAYAAACyjt6wAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAACzUlEQVRIie2Tv2sUQRTH38zu7MzeoWnE4P+RxkaIze5tcooa4y+iTQIaECz9ERVUUBtBLbSI4q8oIiq6tzN7FqawEM0fIhGJOaP7xrvZGwst5LjEXC5p1E85+77vfYY3C/CfvxzS7jCO4w1CiDN5nj8Iw/D9WgoopQLXdbdprc+Wy+VPrd9puxCltFwsFo8SQl4mSbJlDeX2Oo7zvFAojFNKy21dFsvOz8+/E0L0Oo7zTEq5dbXl4jg+4DjObc/z/Fqt9g4AVLu6tisGAEjTdJO19mmhUNiMiJ+NMfsGBwerqyQ35HneFOfcQ8S3hJBdYRh+6EgQAKBarW601j7xfX+L1rpmjDk0MDDwohu5SqUywBib4pz3IOIbSulQEAQfF6tfbMUAAPAruCPLsphz3sMYeyylPLpSuSRJtjPGHgkhehDxtTFm51JyfxQEAAjDcG5hYWE/Iqae53HXda9KKY91KhfH8ZDrulNCiHVZlr0ihOxu99d2LAgAMDw8/FVrvQ8RJWOMuK57RSl1fLlylUplL+f8nhCimGWZ1FrvCcNwbjnZJd9gK1LK9YSQ+0KIbcYYaDQaZ6MoOrdUJkmSYcbYXc/zBCK+tNaORFH0ZbkzOxIEAKhWq8U8z+8IIYbyPAdjzIVSqXS6XW2apiOEkJuc8wIiPqOUHgyC4Fsn85a14t8JguDb7OzsiNb6oeu6wBibUEpdhJbLSinHKKW3OOeFLMseG2NGOpWD1qadMD09LRBx0vf9A81mE+r1+qVSqXQCAEApNU4pveZ5noOIU77vj/b39+uVzFmxIACAlJIDwHXO+Viz2YRGo3HZWltzHOcC55xqre9Yaw9HUfR9pTO6EgQAsNYSpdR5xtgpQn62o5QCIk729vaO9/X1Nbrp3/EbbIUQYqMomqjX6yfzPLeEENBa35iZmTnSrdyqk6bpqFJqwlrb9cX/88/wA121MqctorD3AAAAAElFTkSuQmCC\" alt=\"\" />";
        // var IMAGE_B64_FINDINGS_UP = "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAWCAYAAACyjt6wAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAACzUlEQVRIie2Tv2sUQRTH38zu7MzeoWnE4P+RxkaIze5tcooa4y+iTQIaECz9ERVUUBtBLbSI4q8oIiq6tzN7FqawEM0fIhGJOaP7xrvZGwst5LjEXC5p1E85+77vfYY3C/CfvxzS7jCO4w1CiDN5nj8Iw/D9WgoopQLXdbdprc+Wy+VPrd9puxCltFwsFo8SQl4mSbJlDeX2Oo7zvFAojFNKy21dFsvOz8+/E0L0Oo7zTEq5dbXl4jg+4DjObc/z/Fqt9g4AVLu6tisGAEjTdJO19mmhUNiMiJ+NMfsGBwerqyQ35HneFOfcQ8S3hJBdYRh+6EgQAKBarW601j7xfX+L1rpmjDk0MDDwohu5SqUywBib4pz3IOIbSulQEAQfF6tfbMUAAPAruCPLsphz3sMYeyylPLpSuSRJtjPGHgkhehDxtTFm51JyfxQEAAjDcG5hYWE/Iqae53HXda9KKY91KhfH8ZDrulNCiHVZlr0ihOxu99d2LAgAMDw8/FVrvQ8RJWOMuK57RSl1fLlylUplL+f8nhCimGWZ1FrvCcNwbjnZJd9gK1LK9YSQ+0KIbcYYaDQaZ6MoOrdUJkmSYcbYXc/zBCK+tNaORFH0ZbkzOxIEAKhWq8U8z+8IIYbyPAdjzIVSqXS6XW2apiOEkJuc8wIiPqOUHgyC4Fsn85a14t8JguDb7OzsiNb6oeu6wBibUEpdhJbLSinHKKW3OOeFLMseG2NGOpWD1qadMD09LRBx0vf9A81mE+r1+qVSqXQCAEApNU4pveZ5noOIU77vj/b39+uVzFmxIACAlJIDwHXO+Viz2YRGo3HZWltzHOcC55xqre9Yaw9HUfR9pTO6EgQAsNYSpdR5xtgpQn62o5QCIk729vaO9/X1Nbrp3/EbbIUQYqMomqjX6yfzPLeEENBa35iZmTnSrdyqk6bpqFJqwlrb9cX/88/wA121MqctorD3AAAAAElFTkSuQmCC\" alt=\"\" />";

        var placeholder;
        var zIndex;
        var autoHide;
        var inputHandle;
        var initialized = false;
        var containerFindingsInnerHtml = "";
        var uiVisible = false;

        /**
         * Private function to render the dialogue.
         *
         * @param {object[]} values - An array of objects with the following parameters:
         * @param {string} values.headline - The headline of the entry.
         * @param {string[]} values.metaData - An array of string to display meta data in the second row below the headline.
         * @param {string} [values.thumbnail] - Optional: The url to the thumbnail image.
         * @param {string} values.value - The value to return to the callback if value[x] has been selected.
         */
        var showPrivate = function(values) {

            Ytils.YupputHtml.show(CONTAINER_ID);
            uiVisible = true;
        };

        /**
         * Sets the focus to the input element.
         */
        var setFocus = function() {

            document.getElementById(CONTAINER_ID).focus();
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

            var inputHandle = document.getElementById(INPUT_ID);

            inputHandle.addEventListener("keydown", (e) => {

                if (e.ctrlKey && e.shiftKey && e.key === "M") {

                    showPrivate()
                }
            });
        };

        /**
         * Constructor.
         */
        var construct = function() {

            placeholder = Ytils.YupputHelper.god(config,"placeholder") || DEFAULT_PLACEHOLDER;
            zIndex = Ytils.YupputHelper.god(config,"zIndex") || DEFAULT_Z_INDEX;
            autoHide = Ytils.YupputHelper.god(config,"autoHide") || DEFAULT_AUTO_HIDE;

            Ytils.YupputHelper.expectFunction(callback, "Ytils.Yupput expects parameter callback to be a function.");

            createInitialContainer();

            Ytils.YupputHtml.expectExisting(INPUT_ID);
            initKeyListener();

            initialized = true;
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

            showPrivate(values);
            setFocus();
        };

        construct();
    };

}());