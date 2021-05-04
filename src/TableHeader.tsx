import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import classNames from "classnames";
import {TableDataRow} from "./contextTypes";

interface ITableHeaderProps extends TableGeneratorProps {
	onSort?(data: TableDataRow): void;
}

const TableHeader: React.FC<ITableHeaderProps> = (props: ITableHeaderProps) => {

	const {data, columnOptions, headerClassName, headerStyle} = props;

	function makeTableHeaderCell(column: ColumnOption, i: number): ReactNode {
		if (column.hidden) {
			return null;
		}


		// Determine if the column is sortable. First check if table sorting is true & this column is not disabled,
		// then if that doesn't evaluate true, just check if this column is set as sortable.
		const isSortable: boolean = (props.sortable && column.sortable !== false) || column.sortable;


		// Create the content to be rendered, starting with the headerValue.
		let content: ReactNode = column.headerValue;

		// Reassign the content to the custom render function if it exists.
		if (column.headerRender) {
			content = column.headerRender(column.headerValue, undefined, column.key, data, i);
		}


		// Generate classes for the header cell.
		const thClasses: string = classNames(column.headerCellClassName, {
			"cursor-pointer": isSortable,
		});


		// Handle sorting, if enabled.
		function handleSort(): void {
			if (!isSortable) {
				return;
			}

			if (column.sortFunction) {
				let d: TableDataRow = data;
				// todo run through custom sort
				alert("run custom sort!");
				props.onSort(d);
			} else {
				alert("todo: default sort!!");
			}
		}

		return (
			<th
				className={thClasses}
				style={column.headerCellStyle}
				onClick={handleSort}
			>
				{content}
			</th>
		);
	}

	return (
		<thead>
			<tr
				className={headerClassName}
				style={headerStyle}
			>
				{columnOptions.map(makeTableHeaderCell)}
			</tr>
		</thead>
	);
};

export default TableHeader;
