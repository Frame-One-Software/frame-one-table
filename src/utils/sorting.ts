import {TableData} from "../contextTypes";
import {ColumnOption} from "../TableGenerator";

export enum SortOrder {
	ASCENDING = "ASCENDING",
	DESCENDING = "DESCENDING",
	NONE = "NONE",
}

export interface ISortStyle {
	key: string;
	order: SortOrder;
}

export function sortTableData(data: TableData = [], columns: ColumnOption[] = [], sortConfiguration: ISortStyle, sortable: boolean): TableData {
	return undefined
}

// export function sortTableData(data: TableData = [], columns: ColumnOption[] = [], sortConfiguration: ISortStyle, sortable: boolean): TableData {
// 	if (!sortConfiguration || Object.keys(sortConfiguration).length === 0 || sortConfiguration?.order === SortOrder.NONE) {
// 		return data;
// 	}
//
// 	// Find the column we are working with based on the selection.
// 	const sortingColumn: ColumnOption = columns.filter((column: ColumnOption) => {return column.key === sortConfiguration.key})[0];
//
// 	if (sortingColumn.sortable === false) {
// 		return data;
// 	}
//
// 	// Initialize new copy of the array to prevent mutating original.
// 	let sortedData: TableData = data.concat([]);
//
// 	if (sortingColumn.sortFunction) {
// 		sortedData.sort((a, b) => {
// 			const _a = a[sortConfiguration.key];
// 			const _b = b[sortConfiguration.key];
//
// 			return sortingColumn.sortFunction(_a, _b, a, b, data, columns, sortConfiguration);
// 		});
// 	} else {
// 		sortedData.sort((a, b) => {
// 			const _a = a[sortConfiguration.key];
// 			const _b = b[sortConfiguration.key];
//
// 			const typeA: string = typeof _a;
// 			const typeB: string = typeof _b;
//
// 			if (typeA !== typeB) {
// 				return 0;
// 			}
//
// 			switch (typeof _a) {
// 				case "string":
// 					return _a.localeCompare(_b);
// 				case "number":
// 					return _a - _b;
// 				case "boolean":
// 					return _a === _b ? 0 : (_a ? 1 : -1);
// 				default:
// 					return 0;
// 			}
// 		});
// 	}
//
// 	switch (sortConfiguration.order) {
// 		case SortOrder.ASCENDING:
// 			return sortedData;
// 		case SortOrder.DESCENDING:
// 			return sortedData.reverse();
// 		default:
// 			return data;
// 	}
// }
