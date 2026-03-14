import {
	Endpoint,
	EndpointParameter,
	Dependency,
	AutoRefresh,
	StringPrefix,
	Themes,
	FeatureFlags,
	CanCreate,
	Action,
	Mapper,
	Conditions,
	StatusBar,
	SortableFields,
	RedirectConfig
} from './common';

import {
	BrowseField,
	Section,
	Header,
	Filter
} from './components';

/** Base properties shared by all view definitions */
export interface ViewBase {
	root: string;
	service: string;
	name: string;
	title?: StringPrefix;
	redirect?: RedirectConfig | false;
}

/** Browse view definition */
export interface BrowseView extends ViewBase {
	root: 'Browse';
	source?: Endpoint;
	fields?: BrowseField[];
	filters?: Filter[];
	actions?: Action[];
	autoRefresh?: AutoRefresh;
	canExport?: boolean | { endpoint: Endpoint; endpointParameters?: EndpointParameter[] };
	canImport?: boolean | { endpoint: Endpoint; endpointParameters?: EndpointParameter[] };
	canCreate?: CanCreate;
	maxPreviewColumns?: number;
	featureFlags?: FeatureFlags;
	dependencies?: Dependency[];
	endpointParameters?: EndpointParameter[];
	rowLink?: string | false;
	rowCollapse?: {
		fields: BrowseField[];
	};
	topComponents?: any[];
}

/** Edit view definition (extends Create with additional properties) */
export interface EditView extends ViewBase {
	root: 'Edit';
	source?: Endpoint;
	target?: Endpoint;
	sections?: Section[];
	header?: Header;
	themes?: Themes;
	canPrint?: boolean;
	canCreate?: CanCreate;
	hideApplyButton?: boolean;
	collapseSections?: boolean;
	saveRedirectUrl?: string;
	cancelRedirectUrl?: string;
	dependencies?: Dependency[];
	actions?: Action[];
	remoteActions?: any;
}

/** Create view definition */
export interface CreateView extends ViewBase {
	root: 'Create';
	target?: Endpoint;
	sections?: Section[];
	header?: Header;
	canCreate?: boolean;
	hideApplyButton?: boolean;
	collapseSections?: boolean;
	saveRedirectUrl?: string;
	cancelRedirectUrl?: string;
}

/** Dashboard graph definition */
export interface DashboardGraph {
	component: string;
	name: string;
	title?: StringPrefix;
	translateTitle?: boolean;
	subtitle?: StringPrefix;
	translateSubtitle?: boolean;
	source?: Endpoint;
	endpointParameters?: EndpointParameter[];
	componentAttributes?: Record<string, any>;
	x: number;
	y: number;
	width: number;
	height: number | 'auto';
	filters?: Filter[];
	label?: any;
	values?: any[];
	link?: string | Record<string, any>;
}

/** Dashboard source definition */
export interface DashboardSource {
	name: string;
	source: Endpoint;
	endpointParameters?: EndpointParameter[];
}

/** Dashboard view definition */
export interface DashboardView extends ViewBase {
	root: 'Dashboard';
	graphs: DashboardGraph[];
	filters?: Filter[];
	sources?: DashboardSource[];
}

/** Preview view definition */
export interface PreviewView extends ViewBase {
	root: 'Preview';
	source?: Endpoint;
	sourceEndpointParameters?: EndpointParameter[];
	sections: Section[];
	header?: Header;
	themes?: Themes;
	actions?: Action[];
}

/** Monitor card field */
export interface MonitorField {
	name: string;
	component: string;
	mapper?: Mapper;
	label?: StringPrefix;
	translateLabel?: boolean;
	columnLink?: string;
	conditions?: Conditions;
	source?: Endpoint;
	endpointParameters?: EndpointParameter[];
	actionsModalSize?: string;
}

/** Monitor view definition */
export interface MonitorView extends ViewBase {
	root: 'Monitor';
	source?: Endpoint;
	endpointParameters?: EndpointParameter[];
	themes?: Themes;
	filters?: Filter[];
	statusBar?: StatusBar;
	sortableFields?: SortableFields;
	featureFlags?: FeatureFlags;
	autoRefresh?: AutoRefresh;
	dependencies?: Dependency[];
	cardLink?: false | Record<string, any>;
	columnsWidth?: number | string;
	columnsQuantityScroll?: number;
	hideEmptyColumns?: boolean;
	fields?: MonitorField[];
	schemaSource?: {
		type: 'static' | 'dynamic';
		endpoint: Endpoint;
		endpointParameters?: EndpointParameter[];
	};
}

/** Planning view definition */
export interface PlanningView extends ViewBase {
	root: 'Planning';
	canRefresh?: boolean;
	canExport?: boolean | { endpoint: Endpoint; endpointParameters?: EndpointParameter[] };
	canImport?: boolean | { endpoint: Endpoint; endpointParameters?: EndpointParameter[] };
	filters?: Filter[];
}

/** Settings view definition */
export interface SettingsView extends ViewBase {
	root: 'Settings';
	source?: Endpoint;
	target?: Endpoint;
	sections: Section[];
	dependencies?: Dependency[];
	actions?: Action[];
	remoteActions?: any;
}

/** Union type of all view definitions */
export type ViewDefinition =
	| BrowseView
	| EditView
	| CreateView
	| DashboardView
	| PreviewView
	| MonitorView
	| PlanningView
	| SettingsView;
