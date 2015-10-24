'use strict';
describe('Short require', function describeShortrequire () {
    var shortrequire;

    beforeEach(function loadShortrequire () {
        shortrequire = require('./index')().compare;
    });

    it('should allow no require', function compare () {
        var result,
            testCode;

        testCode = 'var hello;';
        result = shortrequire(testCode);

        expect(result.pass).toBe(true);
    });

    it('should allow global requires', function compare () {
        var result,
            testCode;

        testCode = 'require("fs");';
        result = shortrequire(testCode);

        expect(result.pass).toBe(true);
    });

    it('should allow silbings requires', function compare () {
        var result,
            testCode;

        testCode = 'require("./sibling");';
        result = shortrequire(testCode);

        expect(result.pass).toBe(true);
    });

    it('should fail requiring parent directories', function compare () {
        var result,
            testCode;

        testCode = 'require("../uncle");';
        result = shortrequire(testCode);

        expect(result.pass).toBe(false);
    });

    it('should fail requiring child directories of globals', function compare () {
        var result,
            testCode;

        testCode = 'require("global/child");';
        result = shortrequire(testCode);
        expect(result.pass).toBe(false);
    });

    it('should fail requiring nibling (child of sibling) directories', function compare () {
        var result,
            testCode;
        
        testCode = 'require("./sibling/nibling");';
        result = shortrequire(testCode);
        expect(result.pass).toBe(false);
    });

    it('should reference the failing line number', function compare () {
        var result,
            testCode;

        testCode = [
            'require("./valid");',
            'require("../fail/../all/over/the/../place");'
        ].join('\n');

        result = shortrequire(testCode);

        expect(result.message).toMatch(/\w+\s2\:/);
    });
});
