/**
 * Cucumber 11 auto-loads only .js/.cjs/.mjs/.json/.yaml/.yml.
 * This file registers ts-node and re-exports cucumber.ts.
 */
require('ts-node/register');
const loaded = require('./cucumber.ts');
module.exports = loaded.default ?? loaded;
