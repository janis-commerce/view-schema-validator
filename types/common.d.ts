/** Service endpoint configuration */
export interface Endpoint {
	service: string;
	namespace: string;
	method: string;
	resolve?: boolean;
}

/** Endpoint parameter value */
export interface EndpointParameterValue {
	dynamic?: string;
	static?: string | number | boolean | any[] | Record<string, any>;
}

/** Endpoint parameter */
export interface EndpointParameter {
	name: string;
	target: 'path' | 'query' | 'body' | 'queryString' | 'filter';
	value: EndpointParameterValue;
	mapper?: Mapper;
}

/** Redirect configuration */
export interface RedirectConfig {
	source: Endpoint;
	endpointParameters?: EndpointParameter[];
}

/** Data dependency */
export interface Dependency {
	name: string;
	targetField: string;
	source: Endpoint;
	endpointParameters?: EndpointParameter[];
	searchMethod?: 'find' | 'filter';
	dependencies?: Dependency[];
}

/** Auto refresh configuration - seconds (minimum 60) or boolean */
export type AutoRefresh = boolean | number;

/** String prefix pattern (localization key) */
export type StringPrefix = string;

/** Theme definition - maps status values to colors */
export type ThemeDefinition = Record<string, string | Record<string, string>>;

/** Themes map */
export type Themes = Record<string, ThemeDefinition>;

/** Feature flags */
export interface FeatureFlags {
	allowMultiSort?: boolean;
}

/** Modal size */
export type ModalSize = string;

/** Template for string interpolation */
export interface Template {
	template: string;
	fields: string[];
}

/** Can create configuration */
export type CanCreate = boolean | {
	endpoint: Endpoint;
	endpointParameters: EndpointParameter[];
};

/** Width configuration */
export type Width = string | number;

/** Date mapper props */
export interface DateMapperProps {
	incomingFormat?: string;
	format?: string;
	relative?: boolean;
	start?: string;
	end?: string;
}

/** Number to time mapper props */
export interface NumberToTimeMapperProps {
	type?: 'minute' | 'hour' | 'day' | 'week' | string;
	format?: string;
}

/** Prefix/Suffix mapper props */
export interface PrefixSuffixMapperProps {
	addWhitespace?: boolean;
	translate?: boolean;
	value?: string;
}

/** Currency mapper props */
export interface CurrencyMapperProps {
	currencyCode?: string;
	currencyField?: string;
}

/** Array map mapper props */
export interface ArrayMapMapperProps {
	value: string | Template;
}

/** Add static value mapper props */
export interface AddStaticValueMapperProps {
	value: string;
	translate?: boolean;
}

/** Mapper configuration */
export type Mapper =
	| string
	| { name: 'date'; props?: DateMapperProps }
	| { name: 'numberToTime'; props?: NumberToTimeMapperProps }
	| { name: 'prefix'; props?: PrefixSuffixMapperProps }
	| { name: 'suffix'; props?: PrefixSuffixMapperProps }
	| { name: 'currency'; props?: CurrencyMapperProps }
	| { name: 'arrayMap'; props: ArrayMapMapperProps }
	| { name: 'template'; props: Template }
	| { name: 'addStaticValue'; props: AddStaticValueMapperProps }
	| { name: 'addHashtag' | 'booleanToStatus' | 'booleanToWord' | 'translate' }
	| Mapper[];

/** Condition rule */
export interface Condition {
	name: string;
	field?: string;
	referenceValue?: any;
}

/** Conditions configuration */
export interface Conditions {
	showWhen?: Condition[][];
	matchWhen?: Condition[][];
}

/** Validation rule */
export interface Validation {
	name: string;
	options?: Record<string, any>;
}

/** Link configuration */
export interface Link {
	service?: string;
	namespace?: string;
	method?: string;
	text?: StringPrefix;
}

/** Custom link */
export interface CustomLink {
	href?: string;
	text?: StringPrefix;
}

/** Status bar configuration */
export interface StatusBar {
	field: string;
	mapper?: Mapper;
	componentAttributes?: Record<string, any>;
}

/** Sortable field configuration */
export interface SortableField {
	name: string;
	isDefaultSort?: boolean;
	initialSortDirection?: 'asc' | 'desc';
}

/** Sortable fields */
export type SortableFields = SortableField[];

/** Action callback names */
export type ActionCallback = 'removeRow' | 'reloadRow' | 'reloadBrowse' | string;

/** Action configuration */
export interface Action {
	name: string;
	type?: 'endpoint' | 'link' | 'form';
	icon?: string;
	label?: StringPrefix;
	endpoint?: Endpoint;
	endpointParameters?: EndpointParameter[];
	conditions?: Conditions;
	callback?: ActionCallback;
	modalSize?: ModalSize;
	confirmationModal?: Record<string, any>;
	componentAttributes?: Record<string, any>;
}
