    Ytils.YupputHelper = { };

    Ytils.YupputHelper.isArray = function(obj) {

        return typeof obj === "object" && typeof obj.length === "number";
    };

    Ytils.YupputHelper.isObject = function(obj) {

        return typeof obj === "object";
    };

    /**
     * Expects parameter func to be a function and throws an exception with string msg if func is not a function.
     *
     * @param {function} func
     * @param {string} msg
     * @throws Throws an exception with message msg.
     */
    Ytils.YupputHelper.expectFunction = function(func, msg) {

        if (typeof func !== "function") {

            throw msg;
        }
    };

    /**
     * Savely return object key key from parameter obj or null if obj is not an object or the key does not exist.
     *
     * @param {object} obj
     * @param {string|number} key
     * @returns {null|*}
     */
    Ytils.YupputHelper.god = function(obj, key) {

        if (Ytils.YupputHelper.isObject(obj) && obj.hasOwnProperty(key)) {

            return obj[key];
        }

        return null;
    };