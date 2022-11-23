# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.96.0] - 2022-11-23

### Added

- Add new property `urlField` for Image component

## [2.95.0] - 2022-11-02

### Added

- add defaultValue for filters

## [2.94.0] - 2022-10-14

### Added

- add new properties for chip component

## [2.93.0] - 2022-09-08

### Added

- add `source` and `endpointParameters` in Monitor `Fields`

## [2.92.0] - 2022-08-16

### Added

- Add conditions in browse page actions

## [2.91.0] - 2022-08-03

### Added

- Now the `Selects` can group there options

## [2.90.0] - 2022-07-26

### Added

- New property `featureFlags` in `Browse` and `Monitor`

## [2.89.0] - 2022-07-15

### Added

- New property `defaultValueField` in Form Fields
- Now you can use the `RemoteSection` in `MultiSection` sections
- From now on you can use the `mappers` on the monitor `cards`
- The `FieldList` is now available on New / Edit Forms

## [2.88.0] - 2022-06-16

### Added

- Now the properties `field` in themeConditionals are not required

### Fixed

- Fix when validating the properties `canDragMarkers` and `showPOI` in `Map` component

## [2.87.0] - 2022-06-02

### Added

- New component `Steps`
- New properties `canDragMarkers` and `showPOI` in `Map` component

## [2.86.0] - 2022-05-27

### Added

- Now you can use the `Template` mapper in the following components: `Header` (edit) and `Remote Options` in `Select` Component

## [2.85.0] - 2022-05-24

### Added

- New properties `canCreateTime`, `timeOptions.hourLapse`, `timeOptions.minuteLapse` and `timeOptions.custom` to use in `DatePicker` component
- New properties `modalSize` to use in `Location` and `RemoteActions` components, `MassiveActions` (browse), Monitor Actions, `ActionForm` in TopComponents and the action type `form` in `genericActions`.

## [2.84.0] - 2022-04-19

### Added

- New properties `sourceField` for `ListTooltip` y `Modal`

## [2.83.0] - 2022-04-12

### Added

- New properties in the FieldsArray component: `showDivisor`, `addButtonIcon`, `addButtonPosition` and `addButtonText`, now can be a boolean
- New property `floatingLabel` in all fields, to change the label
- New property `drawRoute` in `Map` component
- New property `conditions` for `ListTooltip` y `Modal`

### Changed

- Now the property `targetField` in the `Select` component can be an object

## [2.82.1] - 2022-04-04

### Added

- New property `themeField` for `markers` in `Map` component

## [2.82.0] - 2022-03-31

### Added

- New property `innerField` in `conditions` property
- New property `markers` in `Map` component to set `icon`, `color`, even a specific `theme` of `infoWindow` to show more information about the markers
- New property `targetField` in `Select` component

## [2.81.1] - 2022-03-21

### Changed

- remove source as required in `massiveActions`

## [2.81.0] - 2022-03-15

### Added

- Add `dependencies` in `summary` Section
- New property `useTimezone` in `DatePicker` component
- Add static actions in Browse Page for the `massiveActions` functionality

## [2.80.0] - 2022-02-22

### Added

- New property `incomingFormat` in mapper `date`
- New property `icon` in component `Link`
- New property `cardLink` in `Monitor` schema

## [2.79.1] - 2022-02-10

### Added

- Improve `views` traslateKey validation

## [2.79.0] - 2022-02-07

### Added

- `Browses` - New option `none` for pageSize
- `Browses` - New properties `autoRefresh`. Now you can send a `boolean` or a `number` (60 is the minimum)
- `BrowseSection` - New properties `canExport` and `canImport`
- `Edit` - Now you can add global `Dependencies`

## [2.78.0] - 2022-02-01

### Added

- `Monitor` - Now the monitors can use a new property `autoRefresh` to obtain the rows every x's minutes

## [2.77.0] - 2022-01-28

### Changed

- Now the actions of the `Monitor` they hast to be equal than the `Preview` actions, called `GenericActions`

## [2.76.0] - 2022-01-18

### Added

- Now the `Monitor` schema can add actions to perform for each card

## [2.75.0] - 2022-01-14

### Added

- Now the component `rowCollapse` can use all de browse schema components

### Changed

- Improvements in the validation of translation keys. Now you can't use the namespace `views`

## [2.74.0] - 2021-12-21

### Added

- New property `columnsType` in `MainForm`, `ReadOnlySection` and `FormSections` to handle the form columns
- New property `responseProperty` in `Select` component
- New property `translateLabel` in `FieldGroups`

## [2.73.0] - 2021-12-09

### Added

- New propertyes `type` `icon` `autoComplete` in component `MultiInput`
- Now de monitor can use `dependencies`, `sortableFields`, `statusBar` and `autoRefresh` properties

## [2.72.0] - 2021-12-01

### Added

- Now the `Monitor` schema can add `themes`

## [2.71.0] - 2021-11-26

### Changed

- New `BaseCard` for `Monitor` schema.

## [2.70.0] - 2021-11-10

### Added

- New type of condtional `matchWhen` for the Monitor Schema

## [2.69.1] - 2021-10-26

### Fixed

- Change property `sourceEndpointParameters` to `endpointParameters` in RemoteSection

## [2.69.0] - 2021-10-26

### Added

- New Schema page `Monitor`
- Now the properties `canEdit` and `canExport` on the Browse schema are `true` by default
- Add property `sourceEndpointParameters` in RemoteSection
- Now you can add multiples entities in the `canExport` or `canImport` actions

## [2.68.0] - 2021-10-13

### Added

- New value `auto` in height property for summary cards and graphs

## [2.67.0] - 2021-10-08

### Added

- Now the deafult value of canExport is true on browses

## [2.66.0] - 2021-10-07

### Added

- Now we validate and build the sections as well

## [2.65.1] - 2021-09-27

### Added

- Add logger info with the current package version

## [2.65.0] - 2021-09-26

### Changed

- Now all the select has de property `canClear`

## [2.64.0] - 2021-09-02

### Added

- New property `previewSource` in `rowCollapse`
- Now you can use the components `Icon`, `Image`, `UserImage`, `Color` in the `Header`
- Now you can use the `mappers` in the `endpointParameters`
- New property `translateLabel` in every field

## [2.63.0] - 2021-08-31

### Added

- New Component `MainTitle`
- New property `sourceField` in `Browse` y `Form` sections

### Deprecated

- Property `components` inside `hedaer.title`
- Components `IdText`, `DefaultTitle` and `CustomTitle`

## [2.62.0] - 2021-08-27

### Added

- New callback openLink
- The current path (view-schemas) from the source of the references will be taken by default
- Now you can add themes in the seactions `FromSection` and `BrowseSection`

### Fixed

- Now nested `$ref` work as they should

## [2.61.0] - 2021-08-09

- New property `LabelMapper` in `Link` component
- New component `DefaultTitle` in Header
- Add property `targetEndpointParameters` in RemoteSection

## [2.60.1] - 2021-08-05

### Fixed

- `EndopointParameters` now accept booleans as static values

## [2.60.0] - 2021-07-29

### Added

- New property `statusBar` in the Browse Page
- New property width in fields

### Removed

- The New Action button in the browse is removed

## [2.59.0] - 2021-07-19

### Added

- New Summary Card `GraphCard`
- Add conditionals in fieldsGroups

## [2.58.0] - 2021-07-05

### Added

- Add new properties `icon` and `iconColor` in Text component
- New deprecation messages if a schemas has a deprecated property
- Now you can add `$ref` in you schemas and the package will resolve it for you
- New actions in `preview` page

### Fixed

- fix `overwritename` value type

## [2.57.0] - 2021-06-23

### Added

- Add new property `canCreate` in all `Select` components.
- New section `RemoteSection` for edit pages

## [2.56.0] - 2021-06-09

### Added

- New targets `body`, `queryString`, `filter` for empointParameter property
- New property `searchMethod` in dependencies with two possible values `find` and `filter`

### Deprecated

- Now the target `query` in enpointParameters is deprecated

## [2.55.0] - 2021-06-07

### Added

- New property position in all fields
- New mapper `template` for all fields
- New property `placeholder` in `Input`, `Textarea` and `Select` components

## [2.54.0] - 2021-05-26

### Added

- New component `StatusSelector`
- New property `rowCollapse` in BrowseSchema
- New section `ReadOnlySection`
- New Schema Page `Preview`

## [2.53.0] - 2021-05-12

### Added

- Add new Cards for a summary `OMSOrderShippingCard` `OMSOrderPickingCard` `OMSOrderStepsCard` `OMSOrderTotalsCard` `OMSOrderCustomerCard` `OMSOrderPaymentsCard`

## [2.52.0] - 2021-05-06

### Added

- Add new property `dependency` in each field to complements with dependecies property.
- Add new property `dependencies` in form and browses
- New property `autocomplete` in fields `Input`, `Textarea`, `Switch` and `Checkbox` to set the autocomplete value.
- New component `ObjectCreator`
- New component `Location`

## [2.51.0] - 2021-03-29

### Added

- New properties `addButtonText`, `addButtonTextColor`, `addButtonBackgoundColor`, `addButtonIcon` in `FieldsArray` component
- New callback `redirect` for the `ActionButtons` and `ActionForm` components

## [2.50.0] - 2021-03-01

### Added

- Now the component `TopComponents` can use in the Browse pages
- Now in the Browse pages you can add a `massiveActions`
- The component `AsyncWrapper` in the Edit Pages, now you can use the property `targetField`

## [2.49.0] - 2021-01-29

### Added

- New mapper `arrayMap` for fields
- New callbalck en ActionButtos `reloadRow`
- New properties in Edit Schemas `hideUserCreated` and `hideUserModified`

### Changed

- Now the default value of the `searchParam` in the remote select is: `filters[search]`
- Now the default value of the `valuesMapper` in the remote select is: `label: name` and `value: id`

### Deprecated

- Now the the `staticFilters` are replaced with the `endpointParameters`. Within 1 month the property will be **removed**.

## [2.48.0] - 2021-01-29

### Added

- New section `Summary` for edits
- New property `rowLinkPath` in `browseSection`. Now with this property you will be able to change the path where are going to redirect

## [2.47.0] - 2021-01-19

### Added

- New property `showOnPreview` in browse schema to show columns on preview mode

## [2.46.0] - 2021-01-05

### Added

- New property `canPrint` in edit Schemas

## [2.45.0] - 2020-12-30

### Added

- New component `selectForm`. A new select that you can create or edit a related entity
- New property `preloadOptions` in selects that preload the options on load
- New property `format` in DateTimePicker component that format the value when send the data on the request

## [2.44.0] - 2020-12-15

### Added

- New fontSize option `medium` for the appearance for the browse fields

### Changed

- Now the appearance property can receive a one of this three string options `auto`, a `px` value `(20px)` or a `%` value `(30%)`.
- The property `hasPreview` has change the name to `canPreview` the default value is false.

## [2.43.1] - 2020-11-27

### Fixed

- Fix properties `Width` and `Height` in `HTML` component, not `Code`

## [2.43.0] - 2020-11-27

### Added

- Add new property `useTheme` in `BadgeLetter` component
- Add new property `defaultOpen` in fieldsGroup

## [2.42.1] - 2020-11-18

### Fixed

- Fix themeConditionals properties names

## [2.42.0] - 2020-11-13

### Added

- New property in BrowseSchema `fieldSortEndpoint`
- New property in BrowseSchema `canImport`

## [2.41.0] - 2020-11-11

### Added

- New properties `Width` and `Height` in `Code` component.
- New Conditionals types: `greaterThan`, `greaterOrEqual`, `lowerThan`, `lowerOrEqual`
- New property `themeConditionals` inside `componentAttributes` in `Chip`, `StatusChip` and `Icon` components.

## [2.40.0] - 2020-11-06

### Added

- New properties `path` for the compoonent Link in edit/create pages

## [2.39.0] - 2020-11-02

### Added

- New properties `urlTarget` and `endpointParameters` for the compoonent Link in edit/create pages
- New type `sourceEndpoint` property `target` for `Action` schema of the actionButtons
- Now `themes` schemas can receive an `object` and a `string` as it was already has been doing
- Now the `Icon` component doesn\`t require the `icon` property and it has been added `useTheme`, a new property

## [2.38.0] - 2020-10-16

### Added

- New property `componentMapping` in trigger schemas. Now dataMappding is no longer required
- New component `IconSelector`
- New component `Preview`

## [2.37.0] - 2020-10-02

### Added

- New property `components` in schema edit header title

## [2.36.0] - 2020-09-21

### Added

- New section `Comments`
- New section `OmsOrderHistory`
- New poperty value in component `graphs`
- GitHub Actions for build, coverage and publish

## [2.35.0] - 2020-09-04

### Added

- New presets for the component DatePicker: `today`, `yesterday`, `nextWeek`, `lastWeek`, `lastMonth`, `nextMonth`
- New optionals props `icon`, `iconColor`, `color`, `backgroundColor` for the component `ActionForm` in `TopComponents`
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
