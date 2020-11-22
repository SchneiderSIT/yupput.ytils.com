

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
        unhighlightAllItems();
        prepareAllValuesAndAppendToBody();
        initMouseListeners(false);
    };

    /**
     * Renders the dialogue.
     */
    this.show = function() {

        showPrivate(values);
    };

    /**
     * Hides the dialogue and resets it.
     */
    this.hide = function() {

        hidePrivate();
    };