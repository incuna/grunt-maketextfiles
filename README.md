# grunt-makeTextFiles

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

## The "makeTextFiles" task

### Overview
In your project's Gruntfile, add a section named `makeTextFiles` to the data object passed into `grunt.initConfig()`.

```js
//find and load the settings for makeTextFiles module
var makeTextFileSettings = require('grunt-makeTextFiles/lib/settings').init(grunt);

grunt.initConfig({
    makeTextFileSettings: makeTextFileSettings,
    //compile list of text files into textfiles.js
    makeTextFiles: {
        options: {
            settings: '<%= makeTextFileSettings %>'
        }
    },
    //if you are using grunt watch, also add
    watch: {
        options: {
            atBegin: true,
            interrupt: true
        },
        textFiles: {
            files: '<%= makeTextFileSettings.filePatterns %>',
            tasks: ['makeTextFiles'],
            options: {
                event: ['added', 'deleted'],
                settings: '<%= makeTextFileSettings %>'
            }
        }
    }
});
```

To generate the 

### Options

#### options.settings
Type: `Array`
Default value: `{}`

Required. The settings object output from the lib/settings.js module.

#### options.destinationFileName
Type: `String`
Default value: `textfiles.js`

The name of the output file. Written to options.projectPath.

### Usage Examples

#### Default Options
These would be the default options as used in a Gruntfile.

```js
grunt.initConfig({
  makeTextFiles: {
    options: {
      settings: makeTextFileSettings
      destinationFileName: 'textFiles.js',
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.1 Updated this readme
* 0.1.0 Initial test release
