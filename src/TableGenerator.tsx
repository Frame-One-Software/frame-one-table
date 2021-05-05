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
import TableFooter from "./TableFooter";
import "./style/index.css";
import {ISortStyle, sortTableData} from "./utils/sorting";

export interface ColumnOption {
	key: string | number; // which key or index is this referring to
	headerValue?: any; // this is what value is passed into the header, use this to label the header
	footerValue?: any; // this is what value is passed into the footer, use this to label the footer

	valueFormatter?: ContextFunctionCell<any>; // change the displayed value
	headerRender?: ContextFunctionCell<ReactNode>; // format the header
	cellRender?: ContextFunctionCell<ReactNode>; // format the cell
	footerRender?: ContextFunctionCell<ReactNode>; // format the footer

	headerCellClassName?: string; // class name applied to the header cell in the column
	rowCellClassName?: string; // class name applied to each body cell in the column
	footerCellClassName?: string; // class name applied to the footer cell in the column

	headerCellStyle?: CSSProperties; // overrides styling from className
	rowCellStyle?: CSSProperties; // overrides styling from className
	footerCellStyle?: CSSProperties; // overrides styling from className

	sortable?: boolean; // overrides sortable prop on table
	showSortIcons: boolean;
	sortFunction?: (a: any, b: any, aRow: TableDataEntry, bRow: TableDataEntry, data: TableData, columns: ColumnOption[], sortConfiguration: ISortStyle) => number;

	hidden?: boolean; // easier to use a boolean in some cases
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
	 * Determine a default for each column as sortable. This can be overridden by the columnOptions
	 */
	sortable?: boolean;
	showSortIcons: boolean;

	showHeader: boolean; // default true
	showBody: boolean; // default true
	showFooter: boolean; // default false

	headerClassName?: string; // class name applied to the header row
	rowClassName?: string; // class name applied to each body row
	footerClassName?: string; // class name applied to the footer row
	headerCellClassName?: string; // class name applied to each cell in the header row
	rowCellClassName?: string // class name applied to each cell in the body rows
	footerCellClassName?: string // class name applied to each cell in the footer row

	headerStyle?: CSSProperties; // style applied to the header row
	rowStyle?: CSSProperties; // style applied to each body row
	footerStyle?: CSSProperties; // style applied to the footer row
	headerCellStyle?: CSSProperties; // style applied to each cell in the header row
	rowCellStyle?: CSSProperties; // style applied to reach cell in the body rows
	footerCellStyle?: CSSProperties; // style applied to each cell in the footer row

	// filter out rows that are shown
	rowFilter?: ContextFunctionRow<boolean>;

	// pagination options
	pageSize?: number; // amount to show on a page, if undefined then unlimited
	pageIndex?: number; // which page are you on
	hidePaginationControl?: boolean; // will hide the pagination options

	// create your own pagination controls
	paginationControlsRender?: ContextFunctionPagination<ReactNode>;

	// loading, its nice to use this instead of increment loading since we can just block a table
	loading?: boolean;
	loadingOverlay?: ContextFunctionData<ReactNode>;
}

export const TableGenerator: React.FC<TableGeneratorProps> = (props) => {

	const {
		data,
		columnOptions,
		sortable,
		showHeader,
		showBody,
	} = props;

	const [sortConfiguration, setSortConfiguration] = useState<ISortStyle>(undefined);

	const sortedData: TableData = sortTableData(props.data, columnOptions, sortConfiguration, sortable);

	// TODO change spreaders into manual entry
	return (
		<div className="table-responsive">
			<table className="content-table">
				{showHeader && (
					<TableHeader
						{...props}
						data={sortedData}
						sortConfiguration={sortConfiguration}
						onSort={setSortConfiguration}
					/>
				)}

				{showBody && (
					<TableRowManager
						{...props}
						data={sortedData}
					/>
				)}
			</table>
		</div>
	);
};

TableGenerator.defaultProps = {
	showHeader: true,
	showBody: true,
	showFooter: false,
	showSortIcons: true,
};

export default TableGenerator;
