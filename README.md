# grunt-maketextfiles

> Builds the textfiles.js manifest needed to import data and template textfiles into requireJS for eDetails
> Based on original makeTextFiles npm module: https://github.com/incuna/maketextfiles

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-maketextfiles --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-maketextfiles');
```

## The "maketextfiles" task

### Overview
In your project's Gruntfile, add a section named `maketextfiles` to the data object passed into `grunt.initConfig()`.

```js

grunt.initConfig({
    //if you are using grunt watch, add
    watch: {
        options: {
            atBegin: true,
            interrupt: true
        },
        textFilesProject: {
            files: [
                'project/data/**/*.{json, yaml}',
                'project/templates/**/*.html',
            ],
            tasks: ['maketextfiles'],
            options: {
                event: ['added', 'deleted'],
            }
        },
        textFilesJam: {
            files: [
                'project/jam/require.config.js'
            ],
            tasks: ['maketextfiles'],
        }
    }
});
```

### Options

#### options.destinationFileName
Type: `String`
Default value: `project/textFiles.js`

The name of the output file relative to the Gruntfile.

### Usage Examples

#### Default Options
These would be the default options as used in a Gruntfile.

```js
grunt.initConfig({
  makeTextFiles: {
    options: {
      destinationFileName: 'project/textFiles.js',
    },
  },
});
```

### package.json files
This task reads text directories from package.json file for the main project and jam packages.

Text file definitions must be declared inside the `textDirs` property in a package file. This is an array of objects to parse, each containing these properties:

#### textDirs.path
Type: `String`

Relative path of the directory to parse

#### textDirs.fileTypes
Type: `array`

Array of file extensions to match inside the textDirs.path

#### example package.json property

```
"textDirs": [
    {
        "path": "data"
        "fileTypes": [
            "json",
            "yaml"
        ] 
    },
    {
        "path": "templates"
        "fileTypes": [
            "html"
        ] 
    }
]
```

## Contributing
* In lieu of a formal styleguide, take care to maintain the existing coding style. 
* Add unit tests for any new or changed functionality. 
* Lint and test your code using [Grunt](http://gruntjs.com/).
* To release:
    * Update `package.json` with version number (use semver)
    * Update `CHANGELOG.md`
    * Tag release with version number
