# ff-loader
Feature Flag loader for webpack

# Example use this loader

``` javascript
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
        query: {
          config: './conf/config.json',
        }
      },
      {
        test: /\.json$/,
        loaders: [
          './ff-loader?{"config":"./conf/config.json"}',
          'json-loader',
        ]
      },
    ]
  }
};
```

config feature flag

``` javascript
[
  {
    "name": "login-form",
    "state": true,
    "modules": {
      "./cont/abs.js": "./cont/bs.js",
      "./conf/app_conf.json": "./conf/ff.json"
    }
  }
]
```
