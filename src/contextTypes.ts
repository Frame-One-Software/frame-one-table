// table data
export type TableDataEntryArray = any[];
export type TableDataEntryJSON = {[key: string]: any};
export type TableDataRow = TableDataEntryArray[] | TableDataEntryJSON[];

// context helper
export type ContextFunctionData<R> = (data: TableDataRow) => R
export type ContextFunctionCell<R> = (value: any, row: TableDataEntryArray | TableDataEntryJSON, key: string | number, data: TableDataRow, index?: number) => R
export type ContextFunctionRow<R> = (row: TableDataEntryArray | TableDataEntryJSON, key: string | number, data: TableDataRow, index?: number) => R
export type ContextFunctionPagination<R> = (pageSize: number, pageIndex: number, goToPage: (page: number) => void, data: TableDataRow) => R
