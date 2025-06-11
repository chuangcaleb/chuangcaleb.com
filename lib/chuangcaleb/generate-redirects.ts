import fs from 'node:fs';
import * as yaml from 'js-yaml';

const JSON_FILE = 'src/data/note-redirects.json';
const YAML_FILE = 'src/data/redirects.yaml';
const OUTPUT_FILE = 'public/_redirects';

// Read JSON file
const jsonContent = fs.readFileSync(JSON_FILE, 'utf8');
const jsonRedirects = JSON.parse(jsonContent) as Record<string, string>;

// Read YAML file
const yamlContent = fs.readFileSync(YAML_FILE, 'utf8');
const yamlRedirects = yaml.load(yamlContent) as Array<{
	id: string;
	to: string;
}>;

// Build redirects array
const redirects: string[] = [];

// From JSON
for (const [from, to] of Object.entries(jsonRedirects)) {
	redirects.push(`/notes/${from} /notes/${to} 301`);
}

// From YAML
for (const entry of yamlRedirects) {
	redirects.push(`${entry.id} ${entry.to} 301`);
}

// Write output file
fs.writeFileSync(OUTPUT_FILE, redirects.join('\n'));

console.log(`✅ _redirects file generated with ${redirects.length} entries.`);
