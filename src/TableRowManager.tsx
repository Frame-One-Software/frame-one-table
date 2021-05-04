import React, {ReactNode} from "react";
import {TableGeneratorProps} from "./TableGenerator";
import {TableDataEntryArray, TableDataEntryJSON} from "./contextTypes";
import TableRow from "./TableRow";

const TableRowManager: React.FC<TableGeneratorProps> = (props: TableGeneratorProps) => {

	const {data} = props;

	function makeTableRow(row: TableDataEntryArray | TableDataEntryJSON, i: number): ReactNode {
		return (
			<TableRow
				{...props}
				rowData={row}
				rowIndex={i}
			/>
		);
	}

	return (
		<tbody>
			{data.map(makeTableRow)}
		</tbody>
	);
};

export default TableRowManager;
