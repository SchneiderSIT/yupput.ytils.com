    Ytils.YupputHelper = { };

    Ytils.YupputHelper.isArray = function(obj) {

        return typeof obj === "object" && typeof obj.length === "number";
    };

    Ytils.YupputHelper.isObject = function(obj) {

        return typeof obj === "object";
    };

    Ytils.YupputHelper.isBoolean = function(obj) {

        return typeof obj === "boolean";
    };

    Ytils.YupputHelper.isString = function(obj) {

        return typeof obj === "string";
    };

    /**
     * Whether obj is a string and starts with val or not.
     *
     * @param {*} obj
     * @param {string} val
     */
    Ytils.YupputHelper.isStringStartingWith = function(obj, val) {

        return Ytils.YupputHelper.isString(obj) && (obj.lastIndexOf(val, 0) === 0);
    };

    Ytils.YupputHelper.isNonEmptyString = function(obj) {

        if (Ytils.YupputHelper.isString(obj)) {

            return obj.trim() !== "";
        }

        return false;
    };

    Ytils.YupputHelper.isInt = function(obj) {

        return typeof obj === "number" && obj === parseInt(obj, 10);
    };

    Ytils.YupputHelper.isAz09Char = function(val) {

        var OK_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        return Ytils.YupputHelper.isString(val) && val.length === 1 && OK_CHARS.indexOf(val) !== -1;
    };

    /**
     * Expects parameter val to be a string.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectString = function(val, msg) {

        if (!Ytils.YupputHelper.isString(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter val to be an integer.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectInt = function(val, msg) {

        if (!Ytils.YupputHelper.isInt(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter val to be a boolean.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectBoolean = function(val, msg) {

        if (!Ytils.YupputHelper.isBoolean(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter val to be a single char within a-z, A-Z or 0-9.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectAz09Char = function(val, msg) {

        if (!Ytils.YupputHelper.isAz09Char(val)) {

            Ytils.YupputHelper.thrErr(msg);
        }
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

            Ytils.YupputHelper.thrErr(msg);
        }
    };

    /**
     * Expects parameter func to be a function or null and throws an exception with string msg if func is not a function.
     *
     * @param {function} func
     * @param {string} msg
     * @throws Throws an exception with message msg.
     */
    Ytils.YupputHelper.expectFunctionOrNull = function(func, msg) {

        if (null !== func && typeof func !== "function") {

            Ytils.YupputHelper.thrErr(msg);
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

    /**
     * Throws a "[Ytils.Yupput] "-prefixed exception.
     * @param error
     */
    Ytils.YupputHelper.thrErr = function(error) {

        throw "[Ytils.Yupput] " + error;
    };