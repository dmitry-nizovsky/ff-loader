var path = require("path");

function FeatureFlag(config) {
    if (config) this.setConfig(config);
}

FeatureFlag.prototype.setConfig = function(config) {
    this.config = this.resolveConfigPath(config);
};

FeatureFlag.prototype.getModule = function(name) {
    var resolve = this.resolve(name);

    for (var i = 0, max = this.config.length; i < max; i++) {
        if (this.config[i].state) {
            var modules = this.config[i].modules;

            if (typeof modules[resolve] !== "undefined") {
                return modules[resolve];
            }
        }
    }

    return resolve;
};

FeatureFlag.prototype.resolveConfigPath = function (config) {
    for (var i = 0, max = config.length; i < max; i++) {
        var modules = {};

        for (var k in config[i].modules) {
            if (!config[i].modules.hasOwnProperty(k)) continue;

            if (Array.isArray(config[i].modules[k])) {
                var modulePath = [];

                for (var j = 0, maxj = config[i].modules[k].length; j < maxj; j++) {
                    modulePath.push(this.resolve(config[i].modules[k][j]));
                }

                modules[this.resolve(k)] = modulePath;
            } else {
                modules[this.resolve(k)] = this.resolve(config[i].modules[k]);
            }
        }

        config[i].modules = modules;
    }

    return config;
};

FeatureFlag.prototype.resolve = function(relativePath) {
    return require.resolve(path.resolve(relativePath));
};

module.exports = FeatureFlag;
