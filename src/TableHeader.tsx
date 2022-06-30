import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import {CellContextDetails} from "./contextTypes";

export interface ITableHeaderProps extends Partial<TableGeneratorProps> {
	onSort?(): void;
}

const TableHeader: React.FC<ITableHeaderProps> = (props) => {

	function makeTableHeaderCell(column: ColumnOption, i: number): ReactNode {
		if (column.hidden) {
			return null;
		}

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

		return (
			<th
				style={column.headerCellStyle}
				onClick={props.onSort}
			>
				{content}
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

TableHeader.defaultProps = {
	onSort: () => {},
};

export default TableHeader;
