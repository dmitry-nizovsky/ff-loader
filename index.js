var utils       = require("loader-utils");
var FeatureFlag = require("./lib/feature-flag");

module.exports = function() {};

module.exports.pitch = function (remainingRequest) {
    var query      = utils.parseQuery(this.query);
    var configPath = query.config || false;
    var rr = remainingRequest.split('!');
    var currentPath = rr[rr.length - 1];
    var newPath = currentPath;

    if (configPath) {
        var ff = new FeatureFlag();
        var config = require(ff.resolve(configPath));

        ff.setConfig(config);
        newPath = ff.getModule(currentPath);

        if (Array.isArray(newPath)) {
            try {
                var data = require(currentPath);

                for (var i = 0, max = newPath.length; i < max; i++) {
                    data = Object.assign(data, require(newPath[i]));
                }
            } catch (e) {
                throw "The merger is not possible check include files if they return data is not an object [" + currentPath + ", " + newPath.join(', ') + "]";
            }

            return "module.exports = " + JSON.stringify(data) + ";";
        }

        newPath = remainingRequest.replace(currentPath, newPath);
    }

    return "module.exports = require(" + utils.stringifyRequest(this, "!!" + newPath) + ");";
};
