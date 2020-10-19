    Ytils.YupputHtml = { };

    /**
     * Creates a new DIV-HTMLObjectElement and returns it with an id.
     *
     * @param {string} id
     * @returns {HTMLObjectElement}
     */
    Ytils.YupputHtml.createDiv = function(id) {

        var div = document.createElement("div");
        div.id = id;

        return div;
    };