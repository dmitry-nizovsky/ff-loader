# ff-loader
Feature Flag loader for webpack

# Example use this loader

``` javascript
var ffConfig    = require("./conf/config.json");
var FeatureFlag = require('ff-plugin');

module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /.js/,
        loader: "ff-loader",
        include: /cont|conf/,
      },
      {
        test: /\.json$/,
        loaders: [
          'ff-loader',
          'json-loader',
        ]
      },
    ]
  },
  plugins: [
    new FeatureFlag(ffConfig)
  ]
};
```

* add feature use ff in your modules
``` javascript
var ff = require('ff-module');

if (ff.enabled('ff-section-name')) { // login-form
  // if feature enabled do this
}
else {
  // if feature disabled do this
}
```

#Config feature flag

* add feature merged config file(json or js) one path to many paths

``` javascript
[
  {
    "name": "login-form",
    "state": true,
    "modules": {
      "./cont/abs.js": "./cont/bs.js",
      "./conf/app_conf.json": [
        "./conf/ff.json",
        "./conf/ff-second.json"
      ]
    }
  }
]
```
