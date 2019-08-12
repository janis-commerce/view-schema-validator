# view-schema-validator

[![Build Status](https://travis-ci.org/janis-commerce/view-schema-validator.svg?branch=master)](https://travis-ci.org/janis-commerce/view-schema-validator)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/view-schema-validator/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/view-schema-validator?branch=master)

## Installation
```sh
npm install  @janiscommerce/view-schema-validator
```

## Usage
```js
npx @janiscommerce/view-schema-validator validate -i=/schemas -o=/build
```
### Comandos
```js
  build        Validate, compile and write new file or files JSON with valid schemas and default includes.
  validate     Validate if the file or files are valid schemas
```
### Opciones:
```js
  --input, -i   write a dir for your inputs files folder or file
  --output, -o  write a dir for outputs
```

## Examples

### Validating directory recurbitly
```js
npx @janiscommerce/view-schema-validator validate -i=/schemas -o=/build
```

### Building directory recurbitly
```js
npx @janiscommerce/view-schema-validator build -i=/schemas -o=/build
```

### Validate file
```js
npx @janiscommerce/view-schema-validator build -i=/schemas/browse.json -o=/build
npx @janiscommerce/view-schema-validator build -i=/schemas/browse.yml -o=/build
```