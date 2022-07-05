import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import {CellContextDetails, TableDataEntryJSON} from "./contextTypes";
import classNames from "classnames";

export interface ITableRowProps extends Partial<TableGeneratorProps> {
	rowData: TableDataEntryJSON;
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
		let content = rowData?.[column.key];

		// Construct this object with all the details needed for the value formatter / cell render functions
		const cellContextDetails: CellContextDetails = {
			value: content,
			row: rowData,
			key: column.key,
			data,
			column,
			index: rowIndex,
		};

		// Run value through formatter if it exists
		if (column.valueFormatter) {
			content = column.valueFormatter(content ? content : rowData, cellContextDetails);
		}

		// Convert value to string
		// todo -> not sure why this was here in the first place.
		// if (content) {
		// 	content = content.toString();
		// }

		// Reassign the content to the custom render function if it exists.
		if (column.cellRender) {
			content = column.cellRender(content ? content : rowData, cellContextDetails);
		}

		// Generate classes for the header cell.
		const _rowClassName: string = (typeof column.rowCellClassName === "string" || !column.rowCellClassName) ?
			column.rowCellClassName as string :
			column.rowCellClassName(content.toString(), cellContextDetails);
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
