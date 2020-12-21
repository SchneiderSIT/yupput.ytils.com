    Ytils.YupputHelper = { };

    /**
     * Whether given parameter obj is a HTML element or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isHtmlElement = function(obj) {

        return (typeof obj === "object") && (obj.nodeType === 1) &&
            (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
    };

    /**
     * Whether current browser is the Internet Explorer and if so, which version.
     *
     * @returns {{isIE: boolean, version: number}|{isIE: boolean, version: null}}
     */
    Ytils.YupputHelper.isIEWVersion = function()
    {
        var ua = window.navigator.userAgent;
        var msIE = ua.indexOf("MSIE ");
        var version;

        if (msIE > 0)
        {
            try {

                version = parseInt(ua.substring(msIE + 5, ua.indexOf(".", msIE)), 10);

                return { "isIE": true, "version": version };

            } catch { }

            return { "isIE": true, "version": null };
        }

        return { "isIE": false, "version": null };
    };

    /**
     * Whether given param is an array or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isArray = function(obj) {

        return typeof obj === "object" && typeof obj.length === "number";
    };

    /**
     * Whether given param is an object or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isObject = function(obj) {

        return typeof obj === "object";
    };

    /**
     * Whether given param is a boolean or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isBoolean = function(obj) {

        return typeof obj === "boolean";
    };

    /**
     * Whether given param is a string or not.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isString = function(obj) {

        return typeof obj === "string";
    };

    /**
     * To generate ids for YupputItem containers.
     *
     * @param {numeric} numericId
     * @returns {string}
     */
    Ytils.YupputHelper.createUniqueFindingId = function(numericId) {

        return "ytilsYupputFinding" + numericId;
    };

    /**
     * This function simply returns the current timestamp.
     * You may NOT use this value directly as a HTML id as it is invalid to
     * use just numbers as HTML id.
     *
     * @returns {number}
     */
    Ytils.YupputHelper.createUniqueButUpcountableInitialId = function() {

        return Date.now();
    };

    /**
     * Whether obj is a string and contains val or not.
     *
     * @param {*} obj
     * @param {string} val
     */
    Ytils.YupputHelper.isStringContaining = function(obj, val) {

        var a = Ytils.YupputHelper.isString(obj);
        var b = obj.indexOf(val) !== -1;

        return  a && b;
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

    /**
     * Returns true if obj is a non-empty string.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isNonEmptyString = function(obj) {

        if (Ytils.YupputHelper.isString(obj)) {

            return obj.trim() !== "";
        }

        return false;
    };

    /**
     * Returns true if obj is a number representing an integer value.
     *
     * @param {*} obj
     * @returns {boolean}
     */
    Ytils.YupputHelper.isInt = function(obj) {

        return typeof obj === "number" && obj === parseInt(obj, 10);
    };

    /**
     * Returns true if val is a string of length 1 between 0-9, a-z and A-Z.
     *
     * @param {*} val
     * @returns {boolean}
     */
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
     * Expects parameter val to be a single char within a-z, A-Z or 0-9.
     *
     * @param {string} val
     * @param {string} msg
     */
    Ytils.YupputHelper.expectAz09CharOrNull = function(val, msg) {

        if (null !== val) {

            if (!Ytils.YupputHelper.isAz09Char(val)) {

                Ytils.YupputHelper.thrErr(msg);
            }
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
     * Savely return object key key from parameter obj or default def if obj is not an object or the key does not exist.
     *
     * @param {object} obj
     * @param {string|number} key
     * @param {*} def
     * @returns {null|*}
     */
    Ytils.YupputHelper.godd = function(obj, key, def) {

        if (Ytils.YupputHelper.isObject(obj) && obj.hasOwnProperty(key)) {

            return obj[key];
        }

        return def;
    };

    /**
     * Throws a "[Ytils.Yupput] "-prefixed exception.
     * @param error
     */
    Ytils.YupputHelper.thrErr = function(error) {

        throw "[Ytils.Yupput] " + error;
    };