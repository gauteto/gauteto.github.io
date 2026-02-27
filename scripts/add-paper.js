#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataFile = path.join(root, 'data', 'papers.json');

const required = ['id', 'type', 'title', 'authors', 'year', 'status', 'pdf'];
const args = process.argv.slice(2);
const entry = {};

for (const arg of args) {
  const [k, ...rest] = arg.split('=');
  const v = rest.join('=');
  if (!k || !v) continue;
  entry[k] = v;
}

for (const key of required) {
  if (!entry[key]) {
    console.error(`Missing required field: ${key}`);
    process.exit(1);
  }
}

if (!['working', 'publication'].includes(entry.type)) {
  console.error('type must be working or publication');
  process.exit(1);
}

entry.year = Number(entry.year);
if (Number.isNaN(entry.year)) {
  console.error('year must be a number');
  process.exit(1);
}

const existing = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
if (existing.some((p) => p.id === entry.id)) {
  console.error(`id already exists: ${entry.id}`);
  process.exit(1);
}

entry.abstract = entry.abstract || '';
entry.journal = entry.journal || '';
entry.doi = entry.doi || '';
entry.code_link = entry.code_link || '';

existing.push(entry);
existing.sort((a, b) => (b.year || 0) - (a.year || 0));

fs.writeFileSync(dataFile, `${JSON.stringify(existing, null, 2)}\n`);
console.log(`Added ${entry.type} paper: ${entry.title}`);
