import React, {ReactNode} from "react";
import {TableGeneratorProps} from "./TableGenerator";
import {TableDataEntry} from "./contextTypes";
import TableRow from "./TableRow";
import classNames from "classnames";

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
			{(props.data && props.data.length > 0) ? (
				<React.Fragment>
					{(props.data as Array<any>)?.map(makeTableRow)}
				</React.Fragment>
			) : (
				<React.Fragment>
					{props.enableNoDataMessage && (
						<tr>
							<td
								colSpan={props.columnOptions?.length}
								className={classNames("frame-one-table-no-data-cell", props.noDataClassName)}
								style={props.noDataStyle}
							>
								{props.noDataRender ? (
									<React.Fragment>
										{props.noDataRender}
									</React.Fragment>
								) : (
									<React.Fragment>
										{props.noDataMessage ? props.noDataMessage : "No Data."}
									</React.Fragment>
								)}
							</td>
						</tr>
					)}
				</React.Fragment>
			)}
		</tbody>
	);
};

export default TableRowManager;
