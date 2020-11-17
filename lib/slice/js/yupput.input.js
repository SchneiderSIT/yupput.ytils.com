    Ytils.YupputInput = { };

    /**
     * Returns an input HTML element handle.
     *
     * @param {string} id
     * @throws Throws an exception if id does not represent a HTML input handle.
     * @returns {HTMLElement}
     */
    Ytils.YupputInput.getInputTypeTextHandleById = function(id) {

        var inputHandle = document.getElementById(id);
        var isInputText = Ytils.YupputHelper.isHtmlElement(inputHandle) && inputHandle.type === "text";

        if (false === isInputText) {

            throw "Parameter id does not represent a HTML input element.";
        }

        return inputHandle;
    };



    /**
     * Clears the value of an input element.
     *
     * @param {string} id
     */
    Ytils.YupputInput.clearInput = function(id) {

        Ytils.YupputInput.getInputTypeTextHandleById(id).value = "";
    };

    /**
     * Returns the value of an HTML input type="text" element.
     *
     * @param {string} id
     * @returns {string}
     */
    Ytils.YupputInput.getValueFromInput = function(id) {

        return Ytils.YupputInput.getInputTypeTextHandleById(id).value;
    };

    /**
     * Whether the referenced input type="text" is empty or not.
     *
     * @param {string} id
     * @returns {boolean}
     */
    Ytils.YupputInput.isEmptyInput = function(id) {

        var val = Ytils.YupputInput.getValueFromInput(id);

        return false === Ytils.YupputHelper.isNonEmptyString(val);
    };
