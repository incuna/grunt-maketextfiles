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
grunt.initConfig({
  makeTextFiles: {
    options: {

    },
  },
});
```

### Options

#### options.dataDirs
Type: `Array`
Default value: `[]`

An array of objects contaiing properties for requirejs module names and paths look for files in.

#### options.projectPath
Type: `String`
Default value: `project/`

Path to the project folder which contains the modules. Output file is also written here.
Needs trailing slash.

#### options.destinationFileName
Type: `String`
Default value: `textfiles.js`

The name of the output file. Written to options.projectPath.

#### options.fileTypes
Type: `Array`
Default value: `['json', 'yaml', 'html']`

Array of file extensions to look for in the matching folders.

### Usage Examples

#### Default Options
These would be the default options as used in a Gruntfile.

```js
grunt.initConfig({
  makeTextFiles: {
    options: {
      dataDirs: [
        {
          name: 'compiled-data',
          path: 'compiled-data'
        },
        {
          name: 'templates',
          path: 'templates'
        },
        {
          name: 'edetail/templates',
          path: 'jam/edetail/templates'
        },
        {
          name: 'edetail-widgets/templates',
          path: 'jam/edetail-widgets/templates'
        },    {
          name: 'edetail-video/templates',
          path: 'jam/edetail-video/templates'
        },    {
          name: 'edetail-audio/templates',
          path: 'jam/edetail-audio/templates'
        },    {
          name: 'edetail-presentation-builder/templates',
          path: 'jam/edetail-presentation-builder/templates'
        }
      ],
      projectPath: 'project/',
      destinationFileName: 'textFiles.js',
      fileTypes: [
        'json',
        'yaml',
        'html'
      ]
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.1 Updated this readme
* 0.1.0 Initial test release
