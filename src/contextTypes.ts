// table data
import {ColumnOption} from "./TableGenerator";

export type TableDataEntryArray = any[]; // TODO: add support; array format not currently supported by any of the components or logic
export type TableDataEntryJSON = {[key: string]: any};
export type TableData = Array<TableDataEntryArray> | Array<TableDataEntryJSON>;
export type TableDataEntry = TableDataEntryArray | TableDataEntryJSON;

// context helper
export type ContextFunctionData<R> = (data: TableData) => R
export type ContextFunctionCell<R> = (value: any, row: TableDataEntryArray | TableDataEntryJSON, key: string | number, data: TableData, column: ColumnOption, index?: number) => R
export type ContextFunctionRow<R> = (row: TableDataEntryArray | TableDataEntryJSON, key: string | number, data: TableData, index?: number) => R
export type ContextFunctionPagination<R> = (pageSize: number, pageIndex: number, goToPage: (page: number) => void, data: TableData) => R
