# ezyLuna

ezyLuna is a project made to ease the management of the many features that the Yanfly plugins adds to RPG Maker MV.

To know more about these plugins (which are not mine), check out <http://yanfly.moe/>!



## Table of contents

- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)



## Quick start

- [Download the latest release.](https://github.com/chaoshades/ezyLuna/archive/DEV.zip)
- [Download Caddy]
(https://caddyserver.com/download)
  1. Select Features
    * Server Types - select HTTP
    * Directives / Middleware - select cors
  2. Donate (if you want :))
  3. Choose platform corresponding to your OS version
- Drop caddy.exe into ezyLuna/www directory
- Rename/copy CaddyFile.default to CaddyFile
- [Configure Caddy (CaddyFile)]
(#caddy-configuration-caddyfile)
- Run caddy.exe (you need to keep it running, this is your local host for ezyLuna)
- Rename/copy config.default.json to config.json
- [Configure ezyLuna (config.json)]
(#configuration-file-configjson)
- Put it into ezyLuna/www directory
- Open any browser
- Go to the address you configured for ezyLuna

### What's included

Within the download you'll find the following directories and files, you'll see something like this:

```
ezyLuna/
├── css/
├── fonts/
├── img/
├── js/
│   ├── adapters/
│   ├── parsers/
│   │   └── tpl/
│   ├── tags/ 
│   └── views/ 
│       └── partials/
├── lib/
├── tests/
│   ├── factories/
│   ├── lib/ 
│   └── spec/ 
└── tpl/
    └── partials/
```

## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/chaoshades/ezyLuna/issues/new).



## Documentation

Still in development...

### Caddy configuration (CaddyFile)

There is a [complete documentation](https://caddyserver.com/docs/caddyfile) about this file, but here is an example :

```
localhost:2015 {
	cors
}

localhost:9005 {
	cors
	root "C:\path\to\project"
}
```
And the same example with annotations :
```
#Represents the url for ezyLuna (normally, you don't need to change it)
localhost:2015 {
	cors
}
#Use 0.0.0.0 instead of localhost if you want to access it anywhere on your local network
#0.0.0.0:2015{
#	cors
#}

#Define each of your projects from here
#Change the port number if you want to have more than one project
#Change the root for the directory of your RPG Maker MV project (the Game.rpgproject file)
localhost:9005 {
	cors
	root "C:\path\to\project"
}

#Use 0.0.0.0 instead of localhost if you want to access it anywhere on your local network
#0.0.0.0:9005 {
#	cors
#	root "C:\path\to\project"
#}

```

### Configuration file (config.json)

It will eventually be automatically generated from ezyLuna, but for now, you need to create it yourself.

Here is an example :

```
{
"projects": [
    {"url": "http://localhost:9005/"}
]
}
```
And the same example with annotations :
```
// Define each of your projects url here
{
"projects": [
    // You can use localhost...
    //{"url": "http://localhost:9005/"}
    // ...or local network ip depending of your CaddyFile
    //{"url": "http://192.168.1.1:9005/"}
]
}
```



## Contributing

Still in development...

The test framework used is [Jasmine](http://jasmine.github.io/index.html). There is plenty of documentation on their website.

### Unit tests

Still in development...

### Func tests

If you want to run func tests, you will need the config.json file within the tests directory.



## Creators

- <https://github.com/chaoshades>



## Copyright and license

Code released under the [WTFPL](http://www.wtfpl.net/).