import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import classNames from "classnames";
import {TableData} from "./contextTypes";

interface ITableFooterProps extends TableGeneratorProps {
	onSort?(data: TableData[]): void;
}

const TableFooter: React.FC<ITableFooterProps> = (props: ITableFooterProps) => {

	const {data, columnOptions, footerClassName, footerStyle} = props;

	function makeTableFooterCell(column: ColumnOption, i: number): ReactNode {
		if (column.hidden) {
			return null;
		}


		// Determine if the column is sortable. First check if table sorting is true & this column is not disabled,
		// then if that doesn't evaluate true, just check if this column is set as sortable.
		const isSortable: boolean = (props.sortable && column.sortable !== false) || column.sortable;


		// Create the content to be rendered, starting with the footerValue.
		let content: ReactNode = column.footerValue;

		// Reassign the content to the custom render function if it exists.
		if (column.footerRender) {
			content = column.footerRender(column.footerValue, undefined, column.key, data, i);
		}


		// Generate classes for the footer cell.
		const thClasses: string = classNames(column.footerCellClassName, {
			"cursor-pointer": isSortable,
		});


		// Handle sorting, if enabled.
		function handleSort(): void {
			if (!isSortable) {
				return;
			}

			if (column.sortFunction) {
				let d: TableData[] = data;
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
				style={column.footerCellStyle}
				onClick={handleSort}
			>
				{content}
			</th>
		);
	}

	return (
		<tfoot>
			<tr
				className={footerClassName}
				style={footerStyle}
			>
				{columnOptions.map(makeTableFooterCell)}
			</tr>
		</tfoot>
	);
};

export default TableFooter;
