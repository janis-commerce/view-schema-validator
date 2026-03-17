'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
 * Convert a kebab-case or snake_case string to camelCase
 */
function toCamelCase(str) {
	return str
		.replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
		.replace(/^[A-Z]/, char => char.toLowerCase())
		.replace(/^(\d)/, '_$1');
}

/**
 * Convert a $ref path to a require path and variable name
 * @param {string} refPath - The $ref path (resolved from root, e.g. /order/partial.yml)
 * @param {boolean} isPartial - Whether this is a partial file
 * @param {string} currentFileRelDir - The directory of the current file relative to input root (e.g. "order")
 */
function refToRequire(refPath, isPartial, currentFileRelDir) {
	const cleanPath = refPath.startsWith('/') ? refPath.substring(1) : refPath;

	const refJsPath = cleanPath.replace(/\.ya?ml$/, '');

	let requirePath = path.relative(currentFileRelDir, refJsPath);
	if(!requirePath.startsWith('.'))
		requirePath = './' + requirePath;

	const fileName = path.basename(refJsPath).replace(/\.partial$/, '');
	const baseName = toCamelCase(fileName);
	const varName = baseName + (isPartial ? 'Partial' : '');

	return { requirePath, varName };
}

/**
 * Convert a single YAML file to JS
 * @param {string} inputFile - Absolute path to the YAML file
 * @param {string} outputFile - Absolute path to the output JS file
 * @param {object} ymljs - yamljs module
 * @param {string} currentFileRelDir - Directory of the current file relative to input root
 */
function convertFile(inputFile, outputFile, ymljs, currentFileRelDir) {
	const content = fs.readFileSync(inputFile, 'utf8');
	const parsed = ymljs.parse(content);

	if(!parsed) {
		console.warn(`Skipping ${inputFile}: empty or invalid YAML`);
		return;
	}

	const refs = findRefs(parsed);
	const uniqueRefs = [...new Set(refs)];

	let jsContent = '\'use strict\';\n\n';

	if(uniqueRefs.length > 0) {
		const refVarMap = {};
		const requires = [];

		for(const ref of uniqueRefs) {
			const { requirePath, varName } = refToRequire(ref, ref.includes('.partial.'), currentFileRelDir);
			refVarMap[ref] = varName;
			requires.push(`const ${varName} = require('${requirePath}');`);
		}

		jsContent += requires.join('\n') + '\n\n';

		const replaced = replaceRefs(parsed, refVarMap);
		let source = toJsSource(replaced);

		source = source.replace(/"__REF__([^"]+)__REF__"/g, '$1');

		jsContent += 'module.exports = ' + source + ';\n';
	} else
		jsContent += 'module.exports = ' + toJsSource(parsed) + ';\n';

	const outDir = path.dirname(outputFile);
	fs.mkdirSync(outDir, { recursive: true });

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

/**
 * Load yamljs dependency (required only for migration)
 */
function loadYamlJs() {
	try {
		return require('yamljs'); // eslint-disable-line global-require
	} catch(e) {
		console.error('Error: yamljs is required for migration but is not included as a dependency.');
		console.error('Install it temporarily before running the migration:');
		console.error('  npm install --no-save yamljs');
		process.exit(1);
	}
}

/**
 * Run the YAML to JS migration
 * @param {string} inputDir - Absolute path to the input directory with YAML files
 * @param {string} [outputDir] - Absolute path to the output directory. If omitted, JS files are created alongside YAML files.
 */
function execute(inputDir, outputDir) {

	const ymljs = loadYamlJs();

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

	const actualOutputDir = outputDir || inputDir;

	for(const yamlFile of yamlFiles) {
		const relativePath = path.relative(inputDir, yamlFile);
		const relativeDir = path.dirname(relativePath);
		const jsRelativePath = relativePath.replace(/\.ya?ml$/, '.js');
		const outputFile = outputDir
			? path.join(outputDir, jsRelativePath)
			: path.join(path.dirname(yamlFile), path.basename(yamlFile).replace(/\.ya?ml$/, '.js'));

		convertFile(yamlFile, outputFile, ymljs, relativeDir);
	}

	console.log(`\nDone! Converted ${yamlFiles.length} file(s).`);

	console.log('\nRunning linter with --fix...');
	try {
		execSync(`npx eslint --fix "${actualOutputDir}"`, { stdio: 'inherit' });
		console.log('Linting complete.');
	} catch(e) {
		console.warn('Linter finished with warnings or errors. Review the output above.');
	}
}

module.exports = { execute };
