# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.4.0] - 2019-12-04
### Added
- Remote selects can now define inital values parameters (#40)
- AsyncWrapper validation (#42)
- New filters structure validation (#41)
- New filter component: DateTimePicker (#41)

## [2.3.0] - 2019-11-29
### Added
- Selects `labelPrefix` support added
- `FilesSection` parameters validation added

## [2.2.1] - 2019-11-21
### Fixed
- Remote `Select` filters are now validated properly

## [2.2.0] - 2019-11-21
### Added
- `prefix` mapper added

## [2.1.0] - 2019-11-20
### Added
- Browse field component support added for `Link`

## [2.0.0] - 2019-11-13
### Added
- `position` property added to section's `topComponents`

### Removed
- `actions` removed from sections properties. Use `topComponents` + `ActionButtons` instead. **BREAKING CHANGE**

## [1.12.0] - 2019-11-13
### Added
- Input form fields now accept the `type` component attribute with value `'password'`

## [1.11.0] - 2019-11-01
### Added
- New Edit section support added: `FormSection`

## [1.10.0] - 2019-10-23
### Added
- New Edit section support added: `ApiKeysSection`

### Fixed
- Form field component validation fixed for `Checklist`

## [1.9.0] - 2019-10-04
### Added
- Now form FieldGroups can be collapsible
- Form field component support added for `FieldsArray`
- UserChip now can receive data without fetching it
- New Edit sections support added: `FilesSection` and `OrderItemsSection`
- Browse field component support added for `SacClaimChange`
- Create and Edit can now be customized with `berforeId` and `afterId` components
- Browse ActionButtons now support `removeRow` and `refresh` callbacks

## [1.8.0] - 2019-09-24
### Added
- Form fields components support added for `DateTimePicker`, `ColorPicker`, `Code` and `Link`
- Browse now is capable of having no actions
- Browse field component support added for `Color`

## [1.7.0] - 2019-09-10
### Added
- `labelFieldName` support added for Selects
- `valuesMapper` support added for local Selects

## [1.6.0] - 2019-09-10
### Added
- `environment` support added for local schema resolution

### Fixed
- `staticFilters` static type now can be anything

## [1.5.0] - 2019-09-09
### Added
- `target` support for edit and create schemas
- `staticFilters` support for browse

## [1.4.0] - 2019-09-05
### Added
- `date` mapper support

## [1.3.0] - 2019-09-02
### Added
- `UserChip` support in browse and edit

## [1.2.1] - 2019-08-30
### Fixed
- Top components structure

## [1.2.0] - 2019-08-29
### Added
- Top components for edit sections
- StatusChip now accept `useTheme` property
- `Chip` component can now be used in Browses and Edits
- Edit fields now can have the `noLabel` property
- Form FieldGroups now accept the `position` property
- Actions for edit sections

## [1.1.0] - 2019-08-26
### Added
- Endpoint resolver

## [1.0.2] - 2019-08-16
### Changed
- Now each error is logged separately

### Fixed
- `Multiselect` component name

## [1.0.1] - 2019-08-16
### Fixed
- npx command added

## [1.0.0] - 2019-08-16
### Added
- First package version
