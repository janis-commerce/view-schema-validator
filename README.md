# view-schema-validator

![Build Status](https://github.com/janis-commerce/view-schema-validator/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/view-schema-validator/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/view-schema-validator?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fview-schema-validator.svg)](https://www.npmjs.com/package/@janiscommerce/view-schema-validator)

Validator and Builder for View Schemas for JANIS VIEWS

## Installation
```sh
npm install  @janiscommerce/view-schema-validator
```

## Usage
```sh
npx @janiscommerce/view-schema-validator build -i=/schemas -o=/build
```
### Commands
```sh
build        Validate, compile and write new file or files JSON with valid schemas and defaults include.
validate     Validate if the file or files are valid schemas
```

### Options:
```sh
--input, -i     write a relative dir folder or dir file
--output, -o    write a relative dir fordel for your outputs
--service, -s   write a service local for resolve endpoints
--schemasFolder, -f  write the name of the folder where the partials schemes are
--env, -e       write a current environment for resolve endpoints
--minified, -m  write build minified json files
--watch, -w     watch input and execute on changes
```

## Examples

### Recursively validating and building directory

```sh
npx @janiscommerce/view-schema-validator validate -i=/schemas
npx @janiscommerce/view-schema-validator build -i=/schemas -o=/build
```

### Validate or Build a file
Accepts files json and Yaml

```sh
npx @janiscommerce/view-schema-validator validate -i=/schemas/browse.json
npx @janiscommerce/view-schema-validator build -i=/schemas/browse.yml -o=/build
```

### Recursively validating and building directory and watching for changes

```sh
npx @janiscommerce/view-schema-validator validate -i=/schemas -w
npx @janiscommerce/view-schema-validator build -i=/schemas -o=/build -w
```

### Reference resolving

All files ending with `.partial.yml` or `.partial.json` will not be validated or builded and may be used to resolve references in other schemas

```
/schemas
/schemas/browse.yml
/schemas/section.partial.yml
/schemas/anotherSection.partial.json
```

### Usage partials references

```yaml
sections:
  - name: mainFormSection
    rootComponent: MainForm
    icon: catalogue

    fieldsGroup:
      - name: detail
        position: left
        icon: catalogue
        collapsible: true
        defaultOpen: true
        fields:
          - $ref: fields/idText.partial.yml

          - name: name
            component: Input

          - name: descriptionTwo
            component: Textarea

  - $ref: sections/browse.partial.yml
```

The final paths would be like this

`view-schemas/fields/idText.partial.json`

`view-schemas/sections/browse.partial.yml`


### Usage partials into other partials

Example folder with partials

```
view-schemas
|__fields
|____idText.partial.yml
|__sections
|____browse.partial.yml
```

Example of use in `view-schemas/sections/browse.partial.yml`

```yaml
name: someBrowse
rootComponent: BrowseSection
source:
  service: sac
  namespace: claim-semaphore
  method: browse
  resolve: false
fields:
  - $ref: ../fields/idText.partial.json

  - name: name
    component: BoldText

  - name: color
    component: Text
```
