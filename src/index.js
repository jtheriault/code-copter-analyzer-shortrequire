'use strict';
module.exports = shortRequire;

// TODO: Clean and optimize this clumsy thing
function checkLine (line, lineIndex) {
    var status = {
            hasError: false,
            line: lineIndex + 1
        },
        requireStatement;

    requireStatement = line.match(/\W?require\s*?\(\s*?(['"])[^\1]+\1\s*?\)/);

    if (requireStatement !== null) {
        var slashCount = (requireStatement[0].match(/\//g) || []).length,
            hasPrefix = requireStatement[0].match(/['"]\.\//) !== null;

        if (slashCount - (hasPrefix ? 1 : 0) > 0) {
            status.hasError = true;
            status.message = `${requireStatement[0]} references another directory`;
        }
    }

    return status;
}

/**
 * 
 */
function shortRequire () {
    return {
        compare: function compare (actual) {
            var result = { pass: true },
                errors;

            // TODO: Capture line number
            errors = actual.split('\n')
                .map(checkLine)
                .filter(status => status.hasError)
                .map(error => `line ${error.line}:\t${error.message}`);
                
            result.pass = errors.length === 0;

            if (result.pass) {
                result.message = 'Expected source to require peer modules';
            }
            else {
                result.message = errors
                    .join('\n');
            }

            return result;
        }
    };
}
