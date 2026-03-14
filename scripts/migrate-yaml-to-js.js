#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

let ymljs;
try {
	ymljs = require('yamljs');
} catch(e) {
	console.error('Error: yamljs is required for migration. Install it temporarily:');
	console.error('  npm install yamljs');
	process.exit(1);
}

/**
 * Convert a JavaScript value to a pretty-printed JS source string
 */
function toJsSource(obj, indent = 0) {
	const pad = '\t'.repeat(indent);
	const pad1 = '\t'.repeat(indent + 1);

	if(obj === null || obj === undefined)
		return String(obj);
	if(typeof obj === 'boolean' || typeof obj === 'number')
		return String(obj);
	if(typeof obj === 'string')
		return JSON.stringify(obj);

	if(Array.isArray(obj)) {
		if(obj.length === 0)
			return '[]';
		const items = obj.map(item => pad1 + toJsSource(item, indent + 1));
		return '[\n' + items.join(',\n') + '\n' + pad + ']';
	}

	if(typeof obj === 'object') {
		const keys = Object.keys(obj);
		if(keys.length === 0)
			return '{}';
		const entries = keys.map(key => {
			const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
			return pad1 + safeKey + ': ' + toJsSource(obj[key], indent + 1);
		});
		return '{\n' + entries.join(',\n') + '\n' + pad + '}';
	}

	return String(obj);
}

/**
 * Find all $ref entries in an object and collect their paths
 */
function findRefs(obj, refs = []) {
	if(!obj || typeof obj !== 'object')
		return refs;

	if(Array.isArray(obj)) {
		obj.forEach(item => findRefs(item, refs));
		return refs;
	}

	if(obj.$ref && typeof obj.$ref === 'string')
		refs.push(obj.$ref);

	Object.values(obj).forEach(val => findRefs(val, refs));
	return refs;
}

/**
 * Replace $ref objects with require() variable references in the object
 */
function replaceRefs(obj, refVarMap) {
	if(!obj || typeof obj !== 'object')
		return obj;

	if(Array.isArray(obj))
		return obj.map(item => replaceRefs(item, refVarMap));

	if(obj.$ref && refVarMap[obj.$ref])
		return `__REF__${refVarMap[obj.$ref]}__REF__`;

	const result = {};
	for(const [key, val] of Object.entries(obj))
		result[key] = replaceRefs(val, refVarMap);

	return result;
}

/**
 * Convert a $ref path to a require path and variable name
 */
function refToRequire(refPath, isPartial) {
	// Remove leading slash if present
	const cleanPath = refPath.startsWith('/') ? refPath.substring(1) : refPath;

	// Convert .yml/.yaml extensions to .js, keep .json as-is
	let requirePath = cleanPath.replace(/\.ya?ml$/, '.js');

	// Generate a variable name from the file name
	const baseName = path.basename(requirePath, path.extname(requirePath))
		.replace(/[^a-zA-Z0-9]/g, '_')
		.replace(/^(\d)/, '_$1');

	const varName = baseName + (isPartial ? 'Partial' : '');

	return { requirePath: './' + requirePath, varName };
}

/**
 * Convert a single YAML file to JS
 */
function convertFile(inputFile, outputFile) {
	const content = fs.readFileSync(inputFile, 'utf8');
	const parsed = ymljs.parse(content);

	if(!parsed) {
		console.warn(`Skipping ${inputFile}: empty or invalid YAML`);
		return;
	}

	// Find all $ref entries
	const refs = findRefs(parsed);
	const uniqueRefs = [...new Set(refs)];

	let jsContent = '\'use strict\';\n\n';

	if(uniqueRefs.length > 0) {
		// Generate require statements and variable mapping
		const refVarMap = {};
		const requires = [];

		for(const ref of uniqueRefs) {
			const { requirePath, varName } = refToRequire(ref, ref.includes('.partial.'));
			refVarMap[ref] = varName;
			requires.push(`const ${varName} = require('${requirePath}');`);
		}

		jsContent += requires.join('\n') + '\n\n';

		// Replace $ref with variable references
		const replaced = replaceRefs(parsed, refVarMap);
		let source = toJsSource(replaced);

		// Replace __REF__varName__REF__ placeholders with actual variable references
		source = source.replace(/"__REF__([^"]+)__REF__"/g, '$1');

		jsContent += 'module.exports = ' + source + ';\n';
	} else {
		jsContent += 'module.exports = ' + toJsSource(parsed) + ';\n';
	}

	// Ensure output directory exists
	const outputDir = path.dirname(outputFile);
	fs.mkdirSync(outputDir, { recursive: true });

	fs.writeFileSync(outputFile, jsContent);
	console.log(`Converted: ${inputFile} -> ${outputFile}`);
}

/**
 * Recursively find all YAML files in a directory
 */
function findYamlFiles(dir) {
	const results = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for(const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if(entry.isDirectory())
			results.push(...findYamlFiles(fullPath));
		else if(/\.ya?ml$/.test(entry.name))
			results.push(fullPath);
	}

	return results;
}

// Main
const args = process.argv.slice(2);

if(args.length < 1) {
	console.log('Usage: node migrate-yaml-to-js.js <input-dir> [output-dir]');
	console.log('');
	console.log('If output-dir is omitted, .js files are created alongside the .yml files.');
	console.log('');
	console.log('Examples:');
	console.log('  node migrate-yaml-to-js.js ./view-schemas');
	console.log('  node migrate-yaml-to-js.js ./view-schemas ./view-schemas-js');
	process.exit(0);
}

const inputDir = path.resolve(args[0]);
const outputDir = args[1] ? path.resolve(args[1]) : null;

if(!fs.existsSync(inputDir)) {
	console.error(`Error: Input directory does not exist: ${inputDir}`);
	process.exit(1);
}

const yamlFiles = findYamlFiles(inputDir);

if(yamlFiles.length === 0) {
	console.log('No YAML files found in', inputDir);
	process.exit(0);
}

console.log(`Found ${yamlFiles.length} YAML file(s) to convert.\n`);

for(const yamlFile of yamlFiles) {
	const relativePath = path.relative(inputDir, yamlFile);
	const jsRelativePath = relativePath.replace(/\.ya?ml$/, '.js');
	const outputFile = outputDir
		? path.join(outputDir, jsRelativePath)
		: path.join(path.dirname(yamlFile), path.basename(yamlFile).replace(/\.ya?ml$/, '.js'));

	convertFile(yamlFile, outputFile);
}

console.log(`\nDone! Converted ${yamlFiles.length} file(s).`);
