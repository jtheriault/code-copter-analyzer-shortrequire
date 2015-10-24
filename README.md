[![Build Status](https://travis-ci.org/jtheriault/code-copter-analyzer-shortrequire.svg)](https://travis-ci.org/jtheriault/code-copter-analyzer-shortrequire)

## Summary
This plugin works with code-copter to fail testing if any module loaded via require is not sibling (e.g. './module-name) or as a global dependency (e.g. 'module-name').

The idea is to enforce pure encapsulation through the proper use of file, folder and npm modules.
