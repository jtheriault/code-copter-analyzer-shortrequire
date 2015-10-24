'use strict';
var codeCopter = require('code-copter');

codeCopter.configure({
    jscs: true,
    jshint: true
});

describe('Code quality', codeCopter);
