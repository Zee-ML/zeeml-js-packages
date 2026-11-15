import assert from 'node:assert/strict';
import { jsonToCsv, csvToJson, computeCadenceMetrics, cgpaToPercentage } from './index.js';

const csv = jsonToCsv([
  { id: 1, user: { name: 'Ada, Countess', formula: '=SUM(A1:A2)' }, score: -12.5 }
]);
assert.ok(csv.includes('"Ada, Countess"'), 'Quotes commas per RFC-4180');
assert.ok(csv.includes("'=SUM(A1:A2)"), 'Sanitizes spreadsheet formula injection');
assert.ok(csv.includes(',-12.5'), 'Preserves negative numbers without false formula prefix');

const back = csvToJson(csv);
assert.equal(back.length, 1);
assert.equal(back[0]['user.name'], 'Ada, Countess');

const cad = computeCadenceMetrics('Short clause. This second sentence contains significantly more words so that the standard deviation and burstiness coefficient increase.');
assert.ok(cad.wordCount === 18);
assert.ok(cad.burstinessCv > 0.35);

const gpa = cgpaToPercentage(8.6, 'cbse_9_5');
assert.equal(gpa.percentage, 81.7);
console.log('45-npm-registry unit & adversarial tests passed (100%).');
