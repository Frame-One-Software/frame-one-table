import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import {TableDataEntryArray, TableDataEntryJSON} from "./contextTypes";
import classNames from "classnames";

interface ITableRowProps extends TableGeneratorProps {
	rowData: TableDataEntryArray | TableDataEntryJSON;
	rowIndex: number;
}

const TableRow: React.FC<ITableRowProps> = (props: ITableRowProps) => {

	const {
		data,
		columnOptions,
		rowData,
		rowIndex,
		rowClassName,
		rowCellClassName,
		rowStyle,
		rowCellStyle,
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
			content = column.valueFormatter(content, rowData, column.key, data, rowIndex);
		}

		// Convert value to string
		if (content) {
			content = content.toString();
		}

		// Reassign the content to the custom render function if it exists.
		if (column.cellRender) {
			content = column.cellRender(content, rowData, column.key, data, rowIndex);
		}


		// Generate classes for the header cell.
		const cellClasses: string = classNames(rowCellClassName, column.rowCellClassName);


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
