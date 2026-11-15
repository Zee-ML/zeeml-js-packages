#!/usr/bin/env node
import fs from 'node:fs';
import { jsonToCsv } from './index.js';

const file = process.argv[2];
if (!file) {
  console.log('Usage: zeeml-json-csv <input.json>  |  Web studio: https://zeeml.com/json-to-csv');
  process.exit(0);
}
const raw = fs.readFileSync(file, 'utf8');
process.stdout.write(jsonToCsv(raw) + '\n');
