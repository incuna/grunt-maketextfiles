define([
    'lodash',
    '<%= requirePaths %>'
], function (_) {
    var files = [
        '<%= textFiles %>'
    ];

    var textFilesHash = {};
    _(arguments).chain().slice(1).each(function (item, index) {
       textFilesHash[files[index]] = item
    });
    return textFilesHash;
});
