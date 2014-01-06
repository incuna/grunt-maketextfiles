# grunt-makeTextFiles

> Builds the textfiles.js manifest needed to import data and template textfiles into requireJS for eDetails
> Based on original makeTextFiles npm module: https://github.com/incuna/MakeTextFiles

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-makeTextFiles --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-makeTextFiles');
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

An array of requirejs module names/paths to parse. The corresponding real paths will be parsed to looks for text files

#### options.projectPath
Type: `String`
Default value: `project/`

Path to the project folder which contains the modules. Output file is also written here.
Needs trailing slash.

#### options.projectPath
Type: `Array`
Default value: `['json', 'yaml', 'html']`

Array of file extensions to look for in the matching folders.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  makeTextFiles: {
    options: {
      dataDirs: [
        'compiled-data',
        'templates',
        'edetail/templates',
        'edetail-widgets/templates',
        'edetail-video/templates',
        'edetail-audio/templates',
        'edetail-presentation-builder/templates'
      ],
      projectPath: 'project/',
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
0.1.1 Updated this readme
0.1.0 Initial test release
