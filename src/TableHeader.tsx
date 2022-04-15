import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import classNames from "classnames";
import {ISortStyle, SortOrder} from "./utils/sorting";
import {CellContextDetails} from "./contextTypes";

export interface ITableHeaderProps extends Partial<TableGeneratorProps> {
	sortConfiguration: ISortStyle;
	onSort?(sortConfiguration: ISortStyle): void;
}

const TableHeader: React.FC<ITableHeaderProps> = (props) => {

	function makeSortingIcons(_sortConfiguration: ISortStyle, currentColumn: boolean): ReactNode {
		const ascending: boolean = _sortConfiguration?.order === SortOrder.ASCENDING;
		const descending: boolean = _sortConfiguration?.order === SortOrder.DESCENDING;

		const upArrowClasses: string = classNames("sorting-icon", {
			"sorting-icon-active": currentColumn && ascending,
		});

		const downArrowClasses: string = classNames("sorting-icon", {
			"sorting-icon-active": currentColumn && descending,
		});

		return (
			<div className="sorting-icons-container">
				<div className={upArrowClasses}>
					▲
				</div>
				<div className={downArrowClasses}>
					▼
				</div>
			</div>
		);
	}

	function makeTableHeaderCell(column: ColumnOption, i: number): ReactNode {
		if (column.hidden) {
			return null;
		}

		// Determine if the column is sortable. First check if table sorting is true & this column is not disabled,
		// then if that doesn't evaluate true, just check if this column is set as sortable.
		const isSortable: boolean = (props.sortable && column.sortable !== false) || column.sortable;

		// Determine if the sort icons should be displayed. First check if they are true on the table & this column does not have them set to false,
		// then if that doesn't evaluate true, just check if this column has them enabled.
		const showSortIcons: boolean = (props.showSortIcons && column.showSortIcons !== false) || column.showSortIcons;

		// Create the content to be rendered, starting with the headerValue.
		let content: any = column.headerValue;

		// Construct this object with all the details needed for the value formatter / cell render functions
		const cellContextDetails: CellContextDetails = {
			value: content,
			row: undefined,
			key: column.key,
			data: props.data,
			column,
			index: undefined,
		};

		// Reassign the content to the custom render function if it exists.
		if (column.headerRender) {
			content = column.headerRender(column.headerValue, cellContextDetails);
		}

		// Generate classes for the header cell.
		const thClasses: string = classNames(column.headerCellClassName, {
			"sortable-th": isSortable,
			"sortable-th-with-icons": isSortable && showSortIcons,
		});

		// Handle sorting, if enabled.
		function handleSort(): void {
			if (!isSortable) {
				return;
			}

			let sortOrder: SortOrder;
			if (props.sortConfiguration?.key !== column?.key) {
				sortOrder = SortOrder.ASCENDING;
			} else if (props.sortConfiguration?.key === column?.key) {
				switch (props.sortConfiguration?.order) {
					case SortOrder.NONE:
						sortOrder = SortOrder.ASCENDING;
						break;
					case SortOrder.ASCENDING:
						sortOrder = SortOrder.DESCENDING;
						break;
					case SortOrder.DESCENDING:
						sortOrder = SortOrder.NONE;
						break;
				}
			}

			if (sortOrder === SortOrder.NONE) {
				props.onSort(undefined);
			} else {
				props.onSort({
					key: column?.key?.toString(),
					order: sortOrder,
				});
			}
		}

		return (
			<th
				className={thClasses}
				style={column.headerCellStyle}
				onClick={handleSort}
			>
				{(isSortable && showSortIcons) ? (
					<div>
						{content}
						{makeSortingIcons(props.sortConfiguration, column.key === props.sortConfiguration?.key)}
					</div>
				) : (
					<React.Fragment>
						{content}
					</React.Fragment>
				)}
			</th>
		);
	}

	return (
		<thead>
			<tr
				className={props.headerClassName}
				style={props.headerStyle}
			>
				{props.columnOptions.map(makeTableHeaderCell)}
			</tr>
		</thead>
	);
};

export default TableHeader;
