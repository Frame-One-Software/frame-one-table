import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import {TableDataEntryArray, TableDataEntryJSON} from "./contextTypes";
import classNames from "classnames";

export interface ITableRowProps extends Partial<TableGeneratorProps> {
	rowData: TableDataEntryArray | TableDataEntryJSON;
	rowIndex: number;
}

const TableRow: React.FC<ITableRowProps> = (props) => {

	const {
		data,
		columnOptions,
		rowClassName,
		rowCellClassName,
		rowStyle,
		rowCellStyle,
		rowData,
		rowIndex,
	} = props;

	function makeTableCell(column: ColumnOption): ReactNode {
		if (column.hidden) {
			return null;
		}


		// Create the content to be rendered, starting with the cell value found within the data.
		// Value is .toString()'d so numbers and booleans will display properly.
		let content: ReactNode = rowData?.[column.key];

		// Run value through formatter if it exists
		if (column.valueFormatter) {
			content = column.valueFormatter(content, rowData, column.key, data, column, rowIndex);
		}

		// Convert value to string
		if (content) {
			content = content.toString();
		}

		// Reassign the content to the custom render function if it exists.
		if (column.cellRender) {
			content = column.cellRender(content, rowData, column.key, data, column, rowIndex);
		}


		// Generate classes for the header cell.
		const _rowClassName: string = (typeof column.rowCellClassName === "string" || !column.rowCellClassName) ? column.rowCellClassName as string : column.rowCellClassName(content, rowData, column.key, data, column, rowIndex);
		const cellClasses: string = classNames(rowCellClassName, _rowClassName);


		return (
			<td
				className={cellClasses}
				style={{
					...rowCellStyle,
					...column.rowCellStyle,
				}}
			>
				{content}
			</td>
		);
	}

	return (
		<tr
			className={rowClassName}
			style={rowStyle}
		>
			{columnOptions.map(makeTableCell)}
		</tr>
	);
};

export default TableRow;
