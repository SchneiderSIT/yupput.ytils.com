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

    Ytils.YupputHtml.setInnerHtml = function(id, html) {

        if (false === Ytils.YupputHtml.isExisting(id)) {

            Ytils.YupputHelper.thrErr("setInnerHtml expects parameter id to represent an existing HTML ID.");
        }

        document.getElementById(id).innerHTML = html;
    };

    /**
     * Creates a new DIV-HTMLObjectElement, appends it to the body and returns the newly created element.
     *
     * @param {string} id
     * @returns {HTMLObjectElement}
     */
    Ytils.YupputHtml.createAndAppendDivWithId = function(id) {

        var div = document.createElement("div");
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
     * Hides HTML element with id.
     * @param {string} id
     */
    Ytils.YupputHtml.hide = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            elem.style.display = "none";
        }
    };

    /**
     * Shows HTML element with id.
     * @param {string} id
     */
    Ytils.YupputHtml.show = function(id) {

        var elem = document.getElementById(id);
        if (elem) {

            elem.style.display = "block";
        }
    };