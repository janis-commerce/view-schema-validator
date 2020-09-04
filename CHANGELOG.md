# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.35.0] - 2020-09-04
### Added
- New presets for the component DatePicker: `today`, `yesterday`, `nextWeek`, `lastWeek`, `lastMonth`, `nextMonth`
- New optionals props `icon`, `iconColor`, `color`, `backgroundColor` for the componente `ActionForm` in `TopComponents`
- Added `Image` and `UserImage` components in Edits schemas. Also the Image has add a optional value `roundBorders`

## [2.34.0] - 2020-08-21
### Added
- New props `showPickingSessions` `showPurchasedItems` `showPickedItems` `showClaimItems` `canEditPrice` for section `OrderItemsSection`
- New prop `source` for `userSelector` `userChip` `asyncUserChip`
- New component `actionForm` for `topComponents`

## [2.33.0] - 2020-08-06
### Added
- New section `MultiSection`
- New prop `defaultValue` for input components

## [2.32.0] - 2020-07-27
### Added
- `OmsControls` section added

## [2.31.0] - 2020-07-06
### Added
- New prop `remoteActions` in Edit schema, for management remote actions
- New props `setStartOfDay` and `setEndOfDay` for DateTimePicker component
- New type hidden for component Input
- New props for fieldsMapping in Map componenet: `country`, `city`, `street`, `number`, etc

## [2.30.0] - 2020-06-25
### Added
- New property `includeDataFrom` in form sections to use other section data
- New Schema `Dashboard` and graphs property in browse schema
- New property `width` in apperance property

## [2.29.0] - 2020-06-09
### Added
- New dataMatching and targetField for AsyncWrapper component
- New properties `sourceEndpointParameters` and `targetEndpointParameters` for the source and target in the `FormSection`.
- New componentnt `MediumChip`
- Now in the `Chip` component you can set a theme for the icon and color property
- New propierty `addWhitespace` for suffix and prefix mappers

## [2.28.0] - 2020-06-08
### Added
- Prefix and Suffix mappers can now be translated
- Currency mapper can get currencyCode from the data
- `source` is not required for edit pages without a main form

## [2.27.0] - 2020-05-26
### Added
- Added `endpointParameters` to browse fields interactions

### Changed
- `target` is no longer required in Form sections

## [2.26.0] - 2020-05-21
### Added
- Create and Edit sections now accept an icon to display in the tab

## [2.25.0] - 2020-05-21
### Added
- `hideTitle` property to hide Edit views default title
- Browse fields `appearance` object
- Edit sections tabs can now be collapsed globally or individually
- New browse filter component to easily filter by users

## [2.24.0] - 2020-05-20
### Added
- `OmsOrderInfo` section added

## [2.23.0] - 2020-05-14
### Added
- `FilesSection` and `ImageFilesSection` can now be sorted

## [2.22.1] - 2020-05-13
### Fixed
- `UserAsyncWrapper` name fixed to `AsyncUserChip`

## [2.22.0] - 2020-05-11
### Added
- New browse component `UserAsyncWrapper`, to replace AsyncWrappers with UserChips
- Browses can now be sorted, defining `sortEndpoint` property
- New properties `fileUpdateEndpoint` and `fileUpdateEndpointParameters` to update image custom fields in `ImageFilesSection`
- `MultiValueWrapper` can now be defined as collapsable and customize it's behaviour
- Inputs, Selects and MultiSelects now accept an icon property that will be shown inside them
- StatusChip can now be used as a field in forms
- Edit sections can now be hidden using conditions
- Edit top component actions can now be hidden using conditions
- Browse fields improved, now they accept user interactions in hover and click events!

## [2.21.0] - 2020-04-23
### Added
- Browse sections appearance can now be customized with `rowMinHeight` and `rowVerticalAlign`

## [2.20.0] - 2020-04-22
### Added
- New field component for Forms: `SelectMultilevel`
- New customizations for `BadgeLetter`: `backgroundColorTheme`, `backgroundColorSource`, `fontColorTheme`, `fontColorSource`
- Browse section new property: `canRefresh`
- New mapper `suffix`
- `MultiValueWrapper` browse field new property `useDataField` to customize behaviour for object multivalues

## [2.19.0] - 2020-04-20
### Added
- New edit section: `ImageFilesSection`

## [2.18.0] - 2020-04-13
### Added
- New conditionals: `isDev` and `isNotDev`
- New edit properties: `canCreate`, `saveRedirectUrl` and `cancelRedirectUrl`

## [2.17.0] - 2020-04-01
### Added
- Edit header identifier can now be customized
- Edit actions can now have a callback

## [2.16.0] - 2020-03-17
### Added
- New prop `idField` in `ApiKeySection`
- New prop `canExport` in Browses
- New prop `canClear` in Selects and Multiselects
- New props `textColor` and `backgroundColor` in Chips
- New prop `referenceValueType` for dynamic validations

## [2.15.0] - 2020-02-19
### Added
- Actions now support enndpointParameters as an array of objects
- Added new validations: `isOneOf` and `isNotOneOf`
- Added `referenceValueType` in validations to validate against other fields

### Changed
- `Map` componentAttribute `fieldsMapping` is now optional

## [2.14.0] - 2020-02-11
### Added
- HTML component added in forms

## [2.13.0] - 2020-01-23
### Added
- Conditions for browse fields
- Endpoint parameters for selects in browse filters and forms
- FieldsArray component now accepts a `maxElements` property
- Form fields now accept triggers to update data on change
- Remote selects now accept a templated label
- New form component `Map`

## [2.12.1] - 2020-01-15
### Added
- Post publish script to notify about new versions

### Fixed
- `source` property is now required only in Browse and Edit pages. Not any more in Create pages.

## [2.12.0] - 2020-01-13
### Added
- `AsyncWrapper` support for edits
- `Code` component now can be editable with `canEdit` property
- `OrderItemsSection` now can be configured to fetch data properly.

## [2.11.0] - 2020-01-02
### Added
- Edit title components now accept mappers
- Browse filters can now be multiselects
- Select and multiselect filters now accept initial values

## [2.10.0] - 2019-12-27
### Added
- `sortableFields` property added to browse
- `requiredFields` property added for `MultiInput` form component
- `themes` compatibility added for browse and edits + Support for `StatusChip` `useTheme` attribute

## [2.9.0] - 2019-12-24
### Added
- Field `deviceDisplay` property to handle browse fields that only show on desktop or mobile

## [2.8.0] - 2019-12-24
### Added
- Fields conditions to show/hide and enable/disable them based on other field's values

## [2.7.0] - 2019-12-19
### Added
- Watch parameter added to execute on input changes: `--watch` or `-w`

## [2.6.1] - 2019-12-18
### Fixed
- `UserChip` userDataSource image property fixed

## [2.6.0] - 2019-12-18
### Added
- `uniqueField` property in `FieldsArray` form component
- Browse component `MultiValueWrapper`
- Browse `canCreate` property

### Changed
- Edit `target` is now optional

## [2.5.0] - 2019-12-17
### Added
- `fileGetEndpoint` property added to `FileSection` to download a file

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
