    Ytils.YupputHelper = { };

    Ytils.YupputHelper.isArray = function(obj) {

        return typeof obj === "object" && typeof obj.length === "number";
    };

    Ytils.YupputHelper.god = function(obj, key) {

        if (obj.hasOwnProperty(key)) {

            return obj[key];
        }

        return null;
    };