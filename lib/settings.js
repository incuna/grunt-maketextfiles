exports.init = function(grunt) {
    'use strict';

    var requirejs = require('requirejs');
    var settingsFileName = 'settings.js';

    //local exports var to store the methods we are going to return
    var exports = {};

    //recursively searches the project folder for a matching settings file
    function getSettingsFilePath() {
        var settingsPath;
        // Guess settingsPath
        if (grunt.file.exists(settingsFileName)) {
            settingsPath = settingsFileName;
        } else {
            var found = grunt.file.expand('*/' + settingsFileName)
            if (found.length) {
                settingsPath = found[0];
            }
        }
        return settingsPath;
    }

    function getSettings = function {
        //get settings Path and check valid
        var settingsPath = getSettingsFilePath();
        if (grunt.file.exists(settingsPath)) {
            grunt.log.writeln('Using ' + settingsPath);
        } else {
            //exit with task error
            grunt.warn('Cant find ' + settingsFileName, 3);
        }
        var settings = requirejs(settingsPath);
        return settings;
    };

    var settings = getSettings();

    return settings;
};
