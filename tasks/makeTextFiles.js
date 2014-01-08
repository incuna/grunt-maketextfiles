/*
 * grunt-makeTextFiles
 * 
 *
 * Copyright (c) 2014 Incuna Ltd.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerTask('makeTextFiles', 'Builds textfiles.js needed by eDetails', function() {
        // Nodejs libs.
        var fs = require('fs');
        var path = require('path');
        var _ = require('lodash');

        //converts path relative to project root to absolute file system path 
        function projectToAbsPath(relPath) {
            return path.resolve(relPath);
        }
        //converts path relative to plugin root to absolute file system path 
        function pluginToAbsPath(relPath) {
            return path.join(__dirname, relPath);
        }

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            dataDirs: [],
            projectPath: 'project/',
            destinationFileName: 'textFiles.js',
            fileTypes: [
                'json',
                'yaml',
                'html'
            ]
        });

        //template file relative to this file
        var templateFileName = '../templates/textFiles.template.js';

        //Look through each module path and make list of matching text files
        var fileMatchString = '**/*.{' + options.fileTypes.join(',') + '}';

        var filePaths = _.chain(options.dataDirs).map(function (module) {
            var globOptions = {
                cwd: options.projectPath + module.path
            }
            //get the files relative to each of the module directories
            var files = grunt.file.expand(globOptions, fileMatchString);

            // Add the module path back to the start of the relative file paths
            var projectFiles = _.map(files, function (file) {
                var moduleFile = path.join(module.name, file);
                return moduleFile;
            });
            return projectFiles;
        }).flatten().value();

        if (!filePaths) {
            //warn and exit grunt with a task
            grunt.warn('No files found', 0);
        }

        var sortedPaths = filePaths.sort();
        var textPaths = _(sortedPaths).map(function (filePath) {
            return 'text!' + filePath
        });

        // Write out the textFiles manifest using the template and the built files array
        //get absolute template path in filesystem
        var templatePath = pluginToAbsPath(templateFileName);
        //get template file contents
        var templateString = fs.readFileSync(templatePath, 'utf8');

        grunt.log.writeln('Writing ' + options.destinationFileName);
        var fileTemplate = _.template(templateString);
        var destinationFileContents = fileTemplate({
            textFiles: sortedPaths.join("',\n        '"),
            paths: textPaths.join("',\n    '")
        });
        // grunt.log.writeln('destinationFileContents ' + destinationFileContents);
        var destinationPath = projectToAbsPath(options.projectPath + options.destinationFileName);
        fs.writeFileSync(destinationPath, destinationFileContents);
    });
};
