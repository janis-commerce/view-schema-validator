# view-schema-validator

[![Build Status](https://travis-ci.org/janis-commerce/view-schema-validator.svg?branch=master)](https://travis-ci.org/janis-commerce/view-schema-validator)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/view-schema-validator/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/view-schema-validator?branch=master)

Validator and Builder for View Schemas for JANIS VIEWS

## Installation
```sh
npm install  @janiscommerce/view-schema-validator
```

## Usage
```sh
npx @janiscommerce/view-schema-validator validate -i=/schemas -o=/build
```
### Commands
```sh
build        Validate, compile and write new file or files JSON with valid schemas and defaults include.
validate     Validate if the file or files are valid schemas
```
### Options:
```sh
--input, -i   write a relative dir folder or dir file
--output, -o  write a relative dir fordel for your outputs
```

## Examples

### Recursively validating and building directory

```sh
npx @janiscommerce/view-schema-validator validate -i=/schemas -o=/build
npx @janiscommerce/view-schema-validator build -i=/schemas -o=/build
```

### Validate or Build a file
Accepts files json and Yaml

```sh
npx @janiscommerce/view-schema-validator validate -i=/schemas/browse.json -o=/build
npx @janiscommerce/view-schema-validator build -i=/schemas/browse.yml -o=/build
```