# ff-loader
Feature Flag loader for webpack

# Description
This way for feature flug good work with reactjs. You can override any file to other work for images and sass and etc.
But ff-loader working only build stage and this has plus and minus
Plus:
- you have bundle always antual deps (if you switch one implementation to other, fisrt implementation don't be added to bundle)
- if ff needs remove you need just rename file and remove old version it help you avoid problem after refactoring removing ff from app

Minus:
- If you want dynamically enable of disable feature flug state it possible only in runtime and you need use ff-plugin for it
- If teammate don't know about this loader on project they are don't understand why change code don't work it possible if you create 2 implementation for ff A and state of ff A in true and teammate try changes file with first implementation.

# Goal 
escape from "condition" in code (but if you need if statment I create plugin for it).

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
