'use strict';
var codeCopter = require('code-copter');

codeCopter.configure({
    analyzer: {
        jscs: true,
        jshint: true
    },
    exclude: ['.git', 'coverage','node_modules']
});

describe('Code quality', codeCopter);
