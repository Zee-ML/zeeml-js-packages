/**
 * zeeml-json-csv: Official RFC-4180 JSON/CSV Flattener, CGPA Solver & Lexical Telemetry SDK
 * Web Workstation: https://zeeml.com/json-to-csv
 * Lexical Counter: https://zeeml.com/word-counter
 */
export function flattenRecord(obj, prefix = '', out = {}) {
  if (obj === null || typeof obj !== 'object') {
    out[prefix || 'value'] = obj ?? '';
    return out;
  }
  for (const [key, val] of Object.entries(obj)) {
    const pathKey = prefix ? `${prefix}.${key}` : key;
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      flattenRecord(val, pathKey, out);
    } else if (Array.isArray(val)) {
      out[pathKey] = JSON.stringify(val);
    } else {
      out[pathKey] = val ?? '';
    }
  }
  return out;
}

export function sanitizeFormulaCell(val) {
  const s = String(val ?? '');
  if (/^[=+\-@\t\r]/.test(s) && !/^-[0-9]+(\.[0-9]+)?$/.test(s)) {
    return "'" + s;
  }
  return s;
}

export function escapeRfc4180(cell, options = { sanitizeFormulas: true }) {
  const raw = options?.sanitizeFormulas === false ? String(cell ?? '') : sanitizeFormulaCell(cell);
  if (/[",\r\n]/.test(raw)) {
    return '"' + raw.replace(/"/g, '""') + '"';
  }
  return raw;
}

export function jsonToCsv(input, options = { delimiter: ',', sanitizeFormulas: true }) {
  const delim = options?.delimiter || ',';
  const data = typeof input === 'string' ? JSON.parse(input) : input;
  const rows = Array.isArray(data) ? data : [data];
  const flat = rows.map(r => flattenRecord(r));
  const headers = Array.from(new Set(flat.flatMap(r => Object.keys(r))));
  const lines = [headers.map(h => escapeRfc4180(h, options)).join(delim)];
  for (const r of flat) {
    lines.push(headers.map(h => escapeRfc4180(r[h] ?? '', options)).join(delim));
  }
  return lines.join('\n');
}

export function parseRfc4180Line(line, delimiter = ',') {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === delimiter) {
        out.push(cur);
        cur = '';
      } else cur += ch;
    }
  }
  out.push(cur);
  return out;
}

export function csvToJson(csvText, delimiter = ',') {
  const lines = String(csvText || '').trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = parseRfc4180Line(lines[0], delimiter);
  return lines.slice(1).map(line => {
    const cells = parseRfc4180Line(line, delimiter);
    const row = {};
    headers.forEach((h, idx) => { row[h] = cells[idx] ?? ''; });
    return row;
  });
}

export function countSyllables(word) {
  let w = String(word || '').toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = w.match(/[aeiouy]{1,2}/g);
  return m ? Math.max(1, m.length) : 1;
}

export function computeCadenceMetrics(text) {
  const clean = String(text || '').trim();
  const words = clean.match(/[A-Za-z0-9']+/g) || [];
  const sentences = clean.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
  const lengths = sentences.map(s => (s.match(/[A-Za-z0-9']+/g) || []).length).filter(n => n > 0);
  if (!words.length || !lengths.length) {
    return {
      wordCount: 0,
      sentenceCount: 0,
      meanSentenceWords: 0,
      sentenceLengthSd: 0,
      burstinessCv: 0,
      shannonEntropy: 0,
      fleschKincaidGrade: 0,
      workbenchUrl: 'https://zeeml.com/word-counter'
    };
  }
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / lengths.length;
  const sd = Math.sqrt(variance);
  const freq = {};
  words.forEach(w => { const lw = w.toLowerCase(); freq[lw] = (freq[lw] || 0) + 1; });
  let entropy = 0;
  Object.values(freq).forEach(c => {
    const p = c / words.length;
    entropy -= p * Math.log2(p);
  });
  const syllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const fkGrade = 0.39 * mean + 11.8 * (syllables / words.length) - 15.59;
  return {
    wordCount: words.length,
    sentenceCount: lengths.length,
    meanSentenceWords: Number(mean.toFixed(2)),
    sentenceLengthSd: Number(sd.toFixed(2)),
    burstinessCv: Number((sd / Math.max(1, mean)).toFixed(4)),
    shannonEntropy: Number(entropy.toFixed(3)),
    fleschKincaidGrade: Number(fkGrade.toFixed(2)),
    workbenchUrl: 'https://zeeml.com/word-counter',
  };
}

export function cgpaToPercentage(cgpa, scale = 'cbse_9_5') {
  const g = Number(cgpa) || 0;
  let pct = g * 9.5;
  if (scale === 'direct_10') pct = g * 10.0;
  else if (scale === 'aicte') pct = (g - 0.75) * 10.0;
  else if (scale === 'mumbai') pct = 7.1 * g + 11.0;
  const clamped = Math.min(100, Math.max(0, Number(pct.toFixed(2))));
  return {
    cgpa10: Number(g.toFixed(2)),
    percentage: clamped,
    gpa4: Number(((clamped / 100) * 4.0).toFixed(2)),
    calculatorUrl: 'https://zeeml.com/cgpa-calculator',
  };
}
