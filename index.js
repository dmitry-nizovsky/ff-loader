var path        = require("path");
var loaderUtils = require("loader-utils");
var jsonLoader  = require('json-loader');

function FeatureFlag(config) {
  this.config = config;
}

FeatureFlag.prototype.getModule = function(name) {
  for (var i = 0, max = this.config.length; i < max; i++) {
    if (this.config[i].state) {
      var modules = this.config[i].modules;

      if (modules[name]) {
        return modules[name];
      }
    }
  }

  return name;
};

function parseConfigPath(config) {
  for (var i = 0, max = config.length; i < max; i++) {
    var modules = {};
    for (var k in config[i].modules) {
      if (!config[i].modules.hasOwnProperty(k)) continue;
      modules[resolve(k)] = resolve(config[i].modules[k]);
    }

    config[i].modules = modules;
  }

  return config;
}

function resolve(name) {
  return require.resolve(path.resolve(name));
}

module.exports = function() {};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  var query       = loaderUtils.parseQuery(this.query);
  var configPath  = query.config || false;
  var currentPath = remainingRequest;

  if (configPath) {
    config = require(resolve(configPath));
    config = parseConfigPath(config);

    var ff = new FeatureFlag(config);
    currentPath = ff.getModule(currentPath);
  }

  if (currentPath.indexOf('json') !== -1) {
    return jsonLoader(require(currentPath));
  }

  return "module.exports = " + require(currentPath) + ";";
};
