'use strict';
var codeCopter = require('code-copter'),
    shortrequire = require('../');

codeCopter.configure({
    shortrequire: shortrequire
});

describe('Short Require Example', codeCopter);
