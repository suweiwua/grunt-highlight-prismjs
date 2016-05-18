/*
 * grunt-highlight-prism
 * https://github.com/suweiwua/grunt-highlight-prismjs
 *
 * Copyright (c) 2016 suwei
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var Prism = require('prismjs');
    var path = require('path');

    grunt.registerMultiTask('highlight-prismjs', 'syntax highlight with prismjs', function() {
        this.files.forEach(function(f) {
            var src, cwd = f.cwd;

            src = f.src.filter(function(p) {
                if (cwd) {
                    p = path.join(f.cwd, p);
                }

                if (grunt.file.isFile(p)) {
                    return true;
                } else {
                    grunt.fail.fatal('Source "' + p + '" is not a file');
                    return false;
                }
            });

            if (src.length > 1 && isFilename(f.dest)) {
                grunt.fail.fatal('Source file cannot be more than one when dest is a file.');
            }

            src.forEach(function(p) {
                var fileName = f.flatten ? path.basename(p) : p;
                var outFile = isFilename(f.dest) ? f.dest : path.join(f.dest, fileName);
                var extName = (path.extname(fileName) || '' ).slice(1) || 'html';

                if (cwd) {
                    p = path.join(cwd, p);
                }

                var rawSource = grunt.file.read(p);
                grunt.file.write(outFile, Prism.highlight(rawSource, Prism.languages[extName]));

                grunt.log.oklns('Saved ' + outFile);
            });
        });
    });

    function isFilename(p) {
        return !!path.extname(p);
    }
};