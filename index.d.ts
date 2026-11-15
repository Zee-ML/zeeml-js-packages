export function flattenRecord(obj: Record<string, unknown>, prefix?: string, out?: Record<string, string>): Record<string, string>;
export function sanitizeFormulaCell(val: unknown): string;
export function escapeRfc4180(cell: unknown, options?: { sanitizeFormulas?: boolean }): string;
export function jsonToCsv(input: string | unknown[] | Record<string, unknown>, options?: { delimiter?: string; sanitizeFormulas?: boolean }): string;
export function parseRfc4180Line(line: string, delimiter?: string): string[];
export function csvToJson(csvText: string, delimiter?: string): Record<string, string>[];
export function countSyllables(word: string): number;
export function computeCadenceMetrics(text: string): {
  wordCount: number;
  sentenceCount: number;
  meanSentenceWords: number;
  sentenceLengthSd: number;
  burstinessCv: number;
  shannonEntropy: number;
  fleschKincaidGrade: number;
  workbenchUrl: string;
};
export function cgpaToPercentage(cgpa: number, scale?: 'cbse_9_5' | 'direct_10' | 'aicte' | 'mumbai'): {
  cgpa10: number;
  percentage: number;
  gpa4: number;
  calculatorUrl: string;
};
