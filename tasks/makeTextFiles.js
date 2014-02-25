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

        // import Nodejs libs
        var fs = require('fs');
        var path = require('path');
        var _ = require('lodash');

        //static vars
        var packageFileName = 'package.json';
        var projectBasePath = 'project/';
        var projectPackage = grunt.file.readJSON(packageFileName);
        //template file relative to this file
        var templateFileName = '../templates/textFiles.template.js';

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            destinationFileName: projectBasePath + 'textFiles.js'
        });

        //converts path relative to project root to absolute file system path
        function projectToAbsPath(relPath) {
            return path.resolve(relPath);
        }
        //converts path relative to plugin root to absolute file system path
        function pluginToAbsPath(relPath) {
            return path.join(__dirname, relPath);
        }

        //takes a parsed package.json object and requireJS module name, and returns any text dirs as an array
        function textDirsFromPackage(packageObj, jamDir) {
            var packageName = null;
            var basePath = projectBasePath;
            if (jamDir) {
                //we only need to store package name and path for jam packages, not root project package
                packageName = packageObj.name;
                basePath = jamDir + '/' + packageName + '/';
            }

            var textDirs = [];
            if (packageObj.textDirs) {
                _(packageObj.textDirs).each(function(textDir) {
                    //we add the package name and path properties so we can use them later when making the template
                    textDir.packageName = packageName;
                    textDir.basePath = basePath;
                    textDirs.push(textDir);
                });
            }
            return textDirs;
        }

        function getJamPackages() {
            var jamPackages = [];

            //Add text dirs from jam packages
            if (projectPackage.jam && projectPackage.jam.packageDir && projectPackage.jam.dependencies) {
                //find all jam packages

                var jamPackageFiles = [];
                if (projectPackage.jam.dependencies) {
                    //we have some jam packages, so look for package.json files in each package
                    for (var packageName in projectPackage.jam.dependencies) {
                        var packageFilePath = projectPackage.jam.packageDir + '/' + packageName + '/' + packageFileName;
                        if (grunt.file.exists(packageFilePath)) {
                            jamPackageFiles.push(packageFilePath);
                        }
                    }
                }

                //read package.jsons and make object of parsed packages
                jamPackages = _(jamPackageFiles).map(function(packageFilePath) {
                    return grunt.file.readJSON(packageFilePath);
                });
            }
            return jamPackages;
        }

        //takes an array of textDir objects and returns all matched filepaths inside as actual paths and requireJS mdoule paths
        function expandTextDirFilePaths(textDirs) {
            //Look through each module path and make a list of matching text files
            //We make two arrays as they need to be output separately in the template
            var filePaths = [];
            var requireJSPaths = [];

            //Go through each text dir, adding matching files to the list
            _(textDirs).each(function (textDir) {
                //match all files for this textdir
                var fileMatchStrings = [];
                _(textDir.fileTypes).each(function(fileType) {
                    var fileTypeMatchString = textDir.path + '/**/*.' + fileType;
                    fileMatchStrings.push(fileTypeMatchString);
                });

                var matchOptions = {};
                if (textDir.basePath) {
                    //get files relative to package path if present
                    matchOptions.cwd = textDir.basePath;
                }

                var matchingFiles = grunt.file.expand(matchOptions, fileMatchStrings);

                //populate lists for template
                _(matchingFiles).each(function(filePath) {
                    if (!filePaths[filePath]) {
                        //dont add if we already have the paths in the list
                        //this allows overriding of paths by the project
                        var requireBasePath = 'text!';
                        if (textDir.packageName) {
                            requireBasePath += textDir.packageName + '/';
                        }

                        filePaths.push(filePath);
                        requireJSPaths.push(requireBasePath + filePath);
                    }
                });
            });

            return {
                realPaths: filePaths,
                requireJSPaths: requireJSPaths
            };
        }

        //write out textfiles.js file from template and filepath data
        function writeTemplate(filePaths) {
            // Write out the textFiles manifest using the template and the built files array
            //get absolute template path in filesystem
            var templatePath = pluginToAbsPath(templateFileName);
            //get template file contents
            var templateString = fs.readFileSync(templatePath, 'utf8');

            grunt.log.writeln('Writing ' + options.destinationFileName);

            var fileTemplate = _.template(templateString);
            var destinationFileContents = fileTemplate({
                requirePaths: filePaths.requireJSPaths.join("',\n    '"),
                textFiles: filePaths.realPaths.join("',\n        '")
            });
            var destinationPath = projectToAbsPath(options.destinationFileName);
            fs.writeFileSync(destinationPath, destinationFileContents);
        }

        function init() {
            //var to store all text dirs
            var textDirs = [];

            //Add text dirs from main project
            textDirs = textDirs.concat(textDirsFromPackage(projectPackage));

            var jamPackages = getJamPackages();
            //Add jam package text dirs to list
            _(jamPackages).each(function(jamPackage) {
                textDirs = textDirs.concat(textDirsFromPackage(jamPackage, projectPackage.jam.packageDir));
            });

            var filePaths = expandTextDirFilePaths(textDirs);

            if (!filePaths.realPaths) {
                //warn and exit grunt with a message
                grunt.warn('No files found', 0);
            }

            writeTemplate(filePaths);
        }

        init();
    });
};
