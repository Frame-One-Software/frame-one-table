import React, {ReactNode} from "react";
import {TableGeneratorProps} from "./TableGenerator";
import {TableDataEntry} from "./contextTypes";
import TableRow from "./TableRow";

const TableRowManager: React.FC<Partial<TableGeneratorProps>> = (props) => {

	function makeTableRow(row: TableDataEntry, i: number): ReactNode {
		return (
			<TableRow
				data={props.data}
				columnOptions={props.columnOptions}
				rowClassName={props.rowClassName}
				rowCellClassName={props.rowCellClassName}
				rowStyle={props.rowStyle}
				rowCellStyle={props.rowStyle}
				rowData={row}
				rowIndex={i}
			/>
		);
	}

	return (
		<tbody>
			{(props.data as Array<any>)?.map(makeTableRow)}
		</tbody>
	);
};

export default TableRowManager;
