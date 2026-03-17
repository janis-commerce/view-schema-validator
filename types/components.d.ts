import { Mapper, Conditions, Validation, Endpoint, EndpointParameter, StringPrefix, Width } from './common';

/** Section root component names */
export type SectionRootComponent =
	| 'MainForm'
	| 'BrowseSection'
	| 'LogsBrowseSection'
	| 'FilesSection'
	| 'OrderItemsSection'
	| 'ApiKeysSection'
	| 'FormSection'
	| 'ImageFilesSection'
	| 'OmsOrderInfo'
	| 'OmsControls'
	| 'MultiSection'
	| 'Comments'
	| 'OmsOrderHistory'
	| 'Summary'
	| 'RemoteSection'
	| 'ReadOnlySection';

/** Browse field component names */
export type BrowseComponentName =
	| 'Text'
	| 'BoldText'
	| 'Icon'
	| 'Chip'
	| 'MediumChip'
	| 'SmallChip'
	| 'StatusChip'
	| 'BadgeLetter'
	| 'UserChip'
	| 'AsyncUserChip'
	| 'Color'
	| 'Image'
	| 'UserImage'
	| 'Svg'
	| 'ActionButtons'
	| 'FieldList'
	| 'Location'
	| 'AsyncWrapper'
	| 'MultiValueWrapper'
	| 'CopyToClipboardButton'
	| 'CountDown';

/** Edit/Create form field component names */
export type EditComponentName =
	| 'Input'
	| 'Textarea'
	| 'Select'
	| 'Switch'
	| 'Checkbox'
	| 'DateTimePicker'
	| 'Text'
	| 'Code'
	| 'Link'
	| 'AsyncWrapper'
	| 'Preview'
	| 'Location'
	| 'ColorPicker'
	| 'Toggle'
	| 'MultiSelect'
	| 'SwitchList'
	| 'FieldList';

/** Header component names */
export type HeaderComponentName =
	| 'IdText'
	| 'DefaultTitle'
	| 'MainTitle'
	| 'CustomTitle'
	| 'StatusChip'
	| 'BadgeLetter'
	| 'Chip'
	| 'MediumChip'
	| 'SmallChip'
	| 'UserChip'
	| 'UserImage'
	| 'Image'
	| 'Icon'
	| 'Color';

/** Field appearance for responsive layout */
export interface FieldAppearance {
	desktop?: {
		width?: Width;
	};
	mobile?: {
		width?: Width;
	};
}

/** Browse view field definition */
export interface BrowseField {
	name: string;
	component: BrowseComponentName | string;
	mapper?: Mapper;
	conditions?: Conditions;
	componentAttributes?: Record<string, any>;
	attributes?: {
		sortable?: boolean;
		isStatus?: boolean;
		isDefaultSort?: boolean;
		initialSortDirection?: 'asc' | 'desc';
		[key: string]: any;
	};
	appearance?: FieldAppearance;
}

/** Edit/Create form field definition */
export interface EditField {
	name: string;
	component: EditComponentName | string;
	mapper?: Mapper;
	conditions?: Conditions;
	validations?: Validation[][];
	componentAttributes?: Record<string, any>;
	width?: Width;
	source?: Endpoint;
	endpointParameters?: EndpointParameter[];
	dependencies?: any[];
	label?: StringPrefix;
}

/** Fields group within a section */
export interface FieldsGroup {
	name?: string;
	fields: EditField[];
	position?: 'left' | 'right';
	icon?: string;
	collapsible?: boolean;
	defaultOpen?: boolean;
}

/** Header title component */
export interface HeaderComponent {
	name: string;
	component: HeaderComponentName;
	mapper?: Mapper;
	componentAttributes?: Record<string, any>;
}

/** Header configuration */
export interface Header {
	title: HeaderComponent[] | {
		hideTitle?: boolean;
		components?: HeaderComponent[];
		afterId?: HeaderComponent[];
		beforeId?: HeaderComponent[];
		identifier?: string | string[] | { template: string; fields: string[] };
	};
}

/** Sub-section for MultiSection */
export interface SubSection {
	name: string;
	rootComponent: 'FormSection';
	fieldsGroup?: FieldsGroup[];
	icon?: string;
}

/** Section definition */
export interface Section {
	name?: string;
	rootComponent: SectionRootComponent | string;
	icon?: string;
	fieldsGroup?: FieldsGroup[];
	fields?: BrowseField[];
	source?: Endpoint;
	endpointParameters?: EndpointParameter[];
	target?: Endpoint;
	targetEndpointParameters?: EndpointParameter[];
	subSections?: SubSection[];
	componentAttributes?: Record<string, any>;
}

/** Filter component names */
export type FilterComponentName =
	| 'Input'
	| 'Select'
	| 'DateTimePicker'
	| 'StatusSelector'
	| 'UserSelector';

/** Browse filter definition */
export interface Filter {
	name: string;
	component: FilterComponentName | string;
	componentAttributes?: Record<string, any>;
	source?: Endpoint;
	endpointParameters?: EndpointParameter[];
}
