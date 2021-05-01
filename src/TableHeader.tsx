import React, {ReactNode} from "react";
import {ColumnOption, TableGeneratorProps} from "./TableGenerator";
import classNames from "classnames";
import {TableData} from "./contextTypes";

interface ITableHeaderProps extends TableGeneratorProps {
	onSort?(data: TableData[]): void;
}

const TableHeader: React.FC<ITableHeaderProps> = (props: ITableHeaderProps) => {

	const {columnOptions, data} = props;

	function makeTableHeaderCell(column: ColumnOption, i: number): ReactNode {
		if (column.hidden) {
			return null;
		}

		let content: ReactNode = column.headerValue;

		if (column.headerRender) {
			content = column.headerRender(column.headerValue, data[i], column.key, data, i);
		}

		const thClasses = classNames(column.headerCellClassName, {
			"cursor-pointer": column.sortable,
		});

		function handleSort(): void {
			if (!column.sortable) {
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
				style={column.headerStyle}
				onClick={handleSort}
			>
				{content}
			</th>
		);
	}

	return (
		<tr>
			{columnOptions.map(makeTableHeaderCell)}
		</tr>
	);
};

export default TableHeader;
