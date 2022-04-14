// table data
import {ColumnOption} from "./TableGenerator";
import {ReactNode} from "react";

export type TableDataEntryJSON = { [key: string]: any };
export type TableData = Array<TableDataEntryJSON>;

// context helper
// export type ContextFunctionData<R> = (data: TableData) => R
// export type ContextFunctionCell<R> = (value: any, row: TableDataEntryArray | TableDataEntryJSON, key: string | number, data: TableData, column: ColumnOption, index?: number) => R
// export type ContextFunctionRow<R> = (row: TableDataEntryArray | TableDataEntryJSON, key: string | number, data: TableData, column: ColumnOption, index?: number) => R
// export type ContextFunctionPagination<R> = (pageSize: number, pageIndex: number, goToPage: (page: number) => void, data: TableData) => R

// v2
export interface CellContextDetails<T = string> { // todo rename
	value: T;
	row: TableDataEntryJSON;
	key: string;
	data: TableData;
	column: ColumnOption;
	index?: number;
}
export type ContextFunctionCellWithValue<T, U> = (value: T, data: CellContextDetails<T>) => U;
export type ContextFunctionCellWithoutValue<T = ReactNode> = (data: TableData) => T;
