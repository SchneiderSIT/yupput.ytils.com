    Ytils.YupputHtml = { };

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
     * Hides HTML element with id.
     *
     * @param {string} id
     */
    Ytils.YupputHtml.hide = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            elem.style.display = "none";
        }
    };

    /**
     * Adds display: none; CSS to a given HTMLObject element. If parameter is invalid, an exception will be thrown.
     *
     * @param {object} elem
     * @return HTMLObjectElement
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
     */
    Ytils.YupputHtml.show = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            elem.style.display = "block";
        }
    };