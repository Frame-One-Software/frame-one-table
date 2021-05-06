import React, {CSSProperties, ReactNode, useState} from "react";
import {
	ContextFunctionCell,
	ContextFunctionData,
	ContextFunctionPagination,
	ContextFunctionRow,
	TableData, TableDataEntry
} from './contextTypes';
import TableHeader from "./TableHeader";
import TableRowManager from "./TableRowManager";
import "./style/index.css";
import {ISortStyle, sortTableData} from "./utils/sorting";
import Paginator from "./Paginator";

export interface IPaginatorProps {
	/**
	 * Show or hide the paginator. Defaults false
	 */
	show: boolean;

	/**
	 * String shown next to the drop-down for choosing the limit (ie. Showing X - Y of Z)
	 */
	limitLabel?: string;

	/**
	 * Currently selected limit for the table
	 */
	currentLimit: number;

	/**
	 * Array of numbers representing options for what limits can be chosen via the drop-down
	 */
	limitOptions: number[];

	/**
	 * Total number of results in the table or pool of data. Used to calculate the last index for the "go to last" button
	 */
	total: number;

	/**
	 * Handler for changing the limit per page via the drop-down
	 * @param newLimit
	 */
	onLimitChange(newLimit: number): void;

	/**
	 * Toggle for if the "go to first" and "previous" buttons should be enabled
	 */
	enableGoPrevious?: boolean;

	/**
	 * Toggle for if the "go to last" and "next" buttons should be enabled
	 */
	enableGoNext?: boolean;

	/**
	 * Hide or show the "go to first" button. Defaults true
	 */
	showGoToFirstButton?: boolean;

	/**
	 * Hide or show the "go to last" button. Defaults true
	 */
	showGoToLastButton?: boolean;

	/**
	 * Current offset of the pagination, indexed at 0
	 */
	currentOffset: number;

	/**
	 * Array of numbers for which pages should be accessible via the paginator (indexed at 0 - ie. [0, 1, 2, 3, 4], will be displayed as [1, 2, 3, 4 ,5] by the library)
	 */
	availableOffsets: number[];

	/**
	 * Handler for changing the selected offset page
	 * @param newOffset
	 */
	onOffsetChange(newOffset: number): void;
}

export interface ColumnOption {
	/**
	 * key that is used to extract the correct value from the row's object (string) or array (number)
	 */
	key: string | number;

	/**
	 * Label for the header cell (ie. First Name)
	 *
	 */
	headerValue?: any;

	/**
	 * Format function to run the values for the column's body cells through before displaying them (ie. (height) => height + "cm"). Does not modify the value used to compare for sorting the column
	 */
	valueFormatter?: ContextFunctionCell<any>;

	/**
	 * Custom render function for the header cell
	 */
	headerRender?: ContextFunctionCell<ReactNode>;

	/**
	 * Custom render function for the body cells of this column
	 *
	 */
	cellRender?: ContextFunctionCell<ReactNode>;

	/**
	 * className applied to the header cell
	 *
	 */
	headerCellClassName?: string;

	/**
	 * className applied to the body cells of this column
	 *
	 */
	rowCellClassName?: string;

	/**
	 * style tag applied to the header cell
	 */
	headerCellStyle?: CSSProperties;

	/**
	 * style tag applied to the body cells of this column
	 */
	rowCellStyle?: CSSProperties;

	/**
	 * Toggle if this column can be sorted. Takes precedent over the "sortable" prop from TableGeneratorProps
	 */
	sortable?: boolean;

	/**
	 * Toggle to hide or show the arrow icons in the header cell if the column is sortable. Takes precedent of the "showSortIcons" props from TableGeneratorProps
	 */
	showSortIcons: boolean;

	/**
	 * Custom sort function for the column where a & b are the values.
	 * If not custom sort is applied, the library will attempt to sort automatically based on the primitive data type
	 *
	 * @param a
	 * @param b
	 * @param aRow
	 * @param bRow
	 * @param data
	 * @param columns
	 * @param sortConfiguration
	 */
	sortFunction?: (a: any, b: any, aRow: TableDataEntry, bRow: TableDataEntry, data: TableData, columns: ColumnOption[], sortConfiguration: ISortStyle) => number;

	/**
	 * Toggle for hiding a column... Perhaps if a column becomes hidden based on certain conditions on your end, change this to false instead of creating a whole new set of column options
	 */
	hidden?: boolean;
}

export interface TableGeneratorProps {
	/**
	 * Pass in the data here to be rendered
	 */
	data?: TableData;

	/**
	 * Options to determine the rendering of each column
	 */
	columnOptions?: ColumnOption[];

	/**
	 * Props for controlling the paginator
	 */
	paginatorProps: IPaginatorProps;

	/**
	 * Determine a default for each column as sortable. This can be overridden by the columnOptions
	 */
	sortable?: boolean;

	/**
	 * Toggle to hide or show the arrow icons in the header cells when a column is sortable. Defaults true
	 */
	showSortIcons: boolean;

	/**
	 * Hide or show the header row. Defaults true
	 */
	showHeader: boolean;

	/**
	 * Hide or show the body part of the table. Not sure why you would want to hide it if you are using this library. Defaults true
	 */
	showBody: boolean;

	/**
	 * className applied to the header row
	 */
	headerClassName?: string;

	/**
	 * className applied to each row in the body
	 */
	rowClassName?: string;

	/**
	 * className applied to each cell in the header row
	 */
	headerCellClassName?: string;

	/**
	 * className applied to each cell in the table body
	 */
	rowCellClassName?: string;

	/**
	 * style tag applied to the header row
	 */
	headerStyle?: CSSProperties;

	/**
	 * style tag applied to each row in the body
	 */
	rowStyle?: CSSProperties;

	/**
	 * style tag applied to each cell in the header row
	 */
	headerCellStyle?: CSSProperties;

	/**
	 * style tag applied to each cell in the table body
	 */
	rowCellStyle?: CSSProperties;

	// filter out rows that are shown
	rowFilter?: ContextFunctionRow<boolean>; // TODO

	// create your own pagination controls
	paginationControlsRender?: ContextFunctionPagination<ReactNode>; // TODO

	// loading, its nice to use this instead of increment loading since we can just block a table
	loading?: boolean; // TODO
	loadingOverlay?: ContextFunctionData<ReactNode>; // TODO
}

export const TableGenerator: React.FC<TableGeneratorProps> = (props) => {

	// Save the currently selected column used to determine sorting (if any) as well as ascending or descending.
	const [sortConfiguration, setSortConfiguration] = useState<ISortStyle>(undefined);

	// Generated the sorted data on each render (due to the sortConfiguration changing or new data coming in)
	const sortedData: TableData = sortTableData(props.data, props.columnOptions, sortConfiguration, props.sortable);

	return (
		<div className="table-and-paginator-container">
			<div className="table-responsive">
				<table className="content-table">
					{props.showHeader && (
						<TableHeader
							data={sortedData}
							columnOptions={props.columnOptions}
							headerClassName={props.headerClassName}
							headerStyle={props.headerStyle}
							sortConfiguration={sortConfiguration}
							onSort={setSortConfiguration}
							sortable={props.sortable}
							showSortIcons={props.showSortIcons}
						/>
					)}

					{props.showBody && (
						<TableRowManager
							data={sortedData}
							columnOptions={props.columnOptions}
							rowClassName={props.rowClassName}
							rowCellClassName={props.rowCellClassName}
							rowStyle={props.rowStyle}
							rowCellStyle={props.rowStyle}
						/>
					)}
				</table>
			</div>

			{props.paginatorProps?.show && (
				<div className="paginator-scroll-manager">
					<Paginator
						show={props.paginatorProps?.show}
						limitLabel={props.paginatorProps?.limitLabel}
						currentLimit={props.paginatorProps?.currentLimit}
						limitOptions={props.paginatorProps?.limitOptions}
						total={props.paginatorProps?.total}
						onLimitChange={props.paginatorProps?.onLimitChange}
						enableGoPrevious={props.paginatorProps?.enableGoPrevious}
						enableGoNext={props.paginatorProps?.enableGoNext}
						showGoToFirstButton={props.paginatorProps?.showGoToFirstButton}
						showGoToLastButton={props.paginatorProps?.showGoToLastButton}
						currentOffset={props.paginatorProps?.currentOffset}
						availableOffsets={props.paginatorProps?.availableOffsets}
						onOffsetChange={props.paginatorProps?.onOffsetChange}
					/>
				</div>
			)}
		</div>
	);
};

TableGenerator.defaultProps = {
	showHeader: true,
	showBody: true,
	showSortIcons: true,
};

export default TableGenerator;
