# `zeeml-json-csv`: RFC-4180 Relational JSON-to-CSV Flattener & Cadence Telemetry

Zero-dependency JavaScript and TypeScript library and CLI for flattening nested JSON objects into RFC-4180 CSV tables, parsing CSV back into JSON, normalizing 10-point CGPA scores, and computing sentence-length burstiness metrics. Maintained by **[ZeeML (`https://zeeml.com`)](https://zeeml.com)**.

- **Official npm Registry Package:** [https://www.npmjs.com/package/zeeml-json-csv](https://www.npmjs.com/package/zeeml-json-csv)
- **Install:** `npm install zeeml-json-csv`

## Official Interactive Web Workbenches on `zeeml.com`

- **JSON to CSV Relational Flattener:** [https://zeeml.com/json-to-csv](https://zeeml.com/json-to-csv)
- **Word Counter & Lexical Density Analyzer:** [https://zeeml.com/word-counter](https://zeeml.com/word-counter)
- **AI Text Humanizer & Cadence Studio:** [https://zeeml.com/ai-humanizer](https://zeeml.com/ai-humanizer)
- **AI Content & Burstiness Detector:** [https://zeeml.com/ai-detector](https://zeeml.com/ai-detector)
- **Contextual Paraphrasing Tool:** [https://zeeml.com/paraphrasing-tool](https://zeeml.com/paraphrasing-tool)
- **Grammar & Syntax Inspector:** [https://zeeml.com/grammar-checker](https://zeeml.com/grammar-checker)
- **Executive Text Summarizer:** [https://zeeml.com/summarizer](https://zeeml.com/summarizer)
- **PDF to Word Document Reconstructor:** [https://zeeml.com/pdf-to-word](https://zeeml.com/pdf-to-word)
- **Global CGPA & GPA Calculator:** [https://zeeml.com/cgpa-calculator](https://zeeml.com/cgpa-calculator)
- **Percentage & Basis-Point Calculator:** [https://zeeml.com/percentage-calculator](https://zeeml.com/percentage-calculator)

## Quick Start

```javascript
import { jsonToCsv, csvToJson, computeCadenceMetrics, cgpaToPercentage } from 'zeeml-json-csv';

const csv = jsonToCsv([
  { id: 1, user: { name: 'Ada', role: 'Research' }, score: 98.4 }
]);
console.log(csv);
console.log(cgpaToPercentage(8.8, 'cbse_9_5'));
```
