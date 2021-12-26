    Ytils.YupputHtml = { };

    /**
     * This function returns the CSS text for a HTML element referenced by id and returns the CSS for the key cssKey.
     *
     * @param {string} id
     * @param {string} cssKey
     * @returns {*}
     */
    Ytils.YupputHtml.getCssFromElement = function(id, cssKey)
    {
        return window.getComputedStyle(document.getElementById(id)).getPropertyValue(cssKey);
    };

    /**
     * Updates the z-index of HTML element referenced by id
     *
     * @param {string} id
     * @param {number} zIndex
     */
    Ytils.YupputHtml.setZIndexImportant = function(id, zIndex)
    {
        Ytils.YupputHtml.expectExisting(id);
        document.getElementById(id).style.setProperty("z-index", zIndex, "important");
    };

    /**
     * Creates and appends a div with given id if it does not exists. In both cases it will return the html element.
     *
     * @param {string} id
     * @returns {HTMLElement}
     */
    Ytils.YupputHtml.createAndAppendIfNotExists = function(id) {

        if (false === Ytils.YupputHtml.isExisting()) {

            return Ytils.YupputHtml.createAndAppendDivWithId(id);
        }

        return document.getElementById(id);
    };

    /**
     * Sets the inner HTML of the HTML element referenced by the given id.
     *
     * @param {string} id
     * @param {string} html
     */
    Ytils.YupputHtml.setInnerHtml = function(id, html) {

        if (false === Ytils.YupputHtml.isExisting(id)) {

            Ytils.YupputHelper.thrErr("setInnerHtml expects parameter id to represent an existing HTML ID.");
        }

        document.getElementById(id).innerHTML = html;
    };

    /**
     * Clears the inner HTML of the HTML element referenced by the given id.
     *
     * @param {string} id
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.clearInnerHtmlAndGetElement = function(id)
    {
        Ytils.YupputHtml.setInnerHtml(id, "");

        return document.getElementById(id);
    };

    /**
     * * Creates a DIV-HtmlObjectElement, but not appends it to the body.
     *
     * @returns {HTMLDivElement}
     */
    Ytils.YupputHtml.createDivHtmlElement = function() {

        return document.createElement("div");
    };

    /**
     * Creates a DIV-HtmlObjectElement with a id and class name, but not appends it to the body.
     *
     * @param {string} id
     * @param {string} className
     * @returns {HTMLObjectElement}
     */
    Ytils.YupputHtml.createDivHtmlElementWIdAndClass = function(id, className) {

        var div = Ytils.YupputHtml.createDivHtmlElement();
        div.className = className;
        div.id = id;

        return div;
    };

    /**
     * Creates a new DIV-HTMLObjectElement, appends it to the body and returns the newly created element.
     *
     * @param {string} id
     * @returns {HTMLObjectElement}
     */
    Ytils.YupputHtml.createAndAppendDivWithId = function(id) {

        var div = Ytils.YupputHtml.createDivHtmlElement();
        div.id = id;

        document.body.appendChild(div);

        return div;
    };

    /**
     * Whether an HTML element exists with a given id or not.
     *
     * @param {string} id
     * @returns {boolean}
     */
    Ytils.YupputHtml.isExisting = function(id) {

        return null !== document.getElementById(id);
    };

    /**
     * Expects parameter id to represent an existing HTML element. Otherweise an exception will be thrown.
     *
     * @param id
     */
    Ytils.YupputHtml.expectExisting = function(id) {

        if (false === Ytils.YupputHtml.isExisting(id)) {

            Ytils.YupputHelper.thrErr("Expecting existing HTML element with ID: " + id);
        }
    };

    /**
     * Sets the selection range to an input type="text" or textarea handle.
     *
     * @param {HTMLObjectElement} inputHandle
     * @param {number} start
     * @param {number} end
     */
    Ytils.YupputHtml.setSelectionRange = function(inputHandle, start, end) {

        var CHARACTER = "character";
        var range;

        if (inputHandle.setSelectionRange) {

            inputHandle.focus();
            inputHandle.setSelectionRange(start, end);

        } else if (inputHandle.createTextRange) {

            range = inputHandle.createTextRange();

            range.collapse(true);
            range.moveEnd(CHARACTER, end);
            range.moveStart(CHARACTER, start);
            range.select();
        }
    }

    /**
     * Sets the cursor position to an input type="text" or textarea handle.
     *
     * @param {HTMLObjectElement} inputHandle
     * @param {number} pos
     */
    Ytils.YupputHtml.setCursorPosition = function(inputHandle, pos)
    {
        Ytils.YupputHtml.setSelectionRange(inputHandle, pos, pos);
    }

    /**
     * Forces the browser to load an image so it might be available when Yupput.show() is called.
     *
     * @param {string} url
     */
    Ytils.YupputHtml.preloadImage = function(url) {

        var img = new Image();
        img.src = url;
    };

    /**
     * Hides HTML element with id.
     *
     * @param {string} id
     * @returns {HTMLObjectElement|null}
     */
    Ytils.YupputHtml.hide = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            return Ytils.YupputHtml.hideElement(elem);
        }

        return null;
    };

    /**
     * Adds display: none; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @returns HTMLObjectElement
     */
    Ytils.YupputHtml.hideElement = function(elem) {

        if (elem && elem.style) {

            elem.style.display = "none";

        } else {

            Ytils.YupputHelper.thrErr("Ytils.YupputHtml.hideElement() expects parameter elem to be an instance of HTMLObjectElement.");
        }

        return elem;
    };

    /**
     * Shows HTML element with id.
     *
     * @param {string} id
     * @return {HTMLObjectElement|null}
     */
    Ytils.YupputHtml.show = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            return Ytils.YupputHtml.showElement(elem);
        }

        return null;
    };

    /**
     * Adds display: block; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.showElement = function(elem) {

        if (elem && elem.style) {

            elem.style.display = "block";

        } else {

            Ytils.YupputHelper.thrErr("Ytils.YupputHtml.hideElement() expects parameter elem to be an instance of HTMLObjectElement.");
        }

        return elem;
    };

    /**
     * Adds visibility: visible/hidden; CSS to a given HTMLObject element. If parameter is invalid, an exception with
     * message excMsg will be thrown.
     *
     * @param {object} elem
     * @param {string} visibility
     * @param {string} excMsg
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.visibleOrInvisibleElement = function(elem, visibility, excMsg) {

        if (elem && elem.style) {

            elem.style.visibility = visibility;

        } else {

            Ytils.YupputHelper.thrErr(excMsg);
        }

        return elem;
    };

    /**
     * Adds visibility: visible; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.visibleElement = function(elem) {

        var msg = "Ytils.YupputHtml.visibleElement() expects parameter elem to be an instance of HTMLObjectElement.";

        return Ytils.YupputHtml.visibleOrInvisibleElement(elem, "visible", msg);
    };

    /**
     * Adds visibility: hidden; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @return HTMLObjectElement
     */
    Ytils.YupputHtml.invisibleElement = function(elem) {

        var msg = "Ytils.YupputHtml.invisibleElement() expects parameter elem to be an instance of HTMLObjectElement.";

        return Ytils.YupputHtml.visibleOrInvisibleElement(elem, "hidden", msg);
    };

