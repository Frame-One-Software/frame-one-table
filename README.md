# Frame One Table

## Installation

### npm
```bash
npm frame-one-table
```

### yarn
```bash
yarn frame-one-table
```

## Usage

Use Frame One Table's `TableGenerator` component like any React component; and pass it props to configure your table as desired.

```tsx
import * as React from 'react'
import {TableGenerator} from "frame-one-table";

class Example extends React.Component {
  render () {
    return (
      <TableGenerator
        columnOptions={[]}
        data={[]}
      />
    )
  }
}
```

## Props

### Table Generator `TableGeneratorProps`
| Prop | Type | Description |
| --- | :---: | --- |
| `data` | `TableData` | Pass in the data here to be rendered
| `columnOptions` | `ColumnOption[]` | Options to determine the rendering of each column
| `paginatorProps` | `IPaginatorProps[]` | Props for controlling the paginator
| `sortable` | `boolean` | Determine a default for each column as sortable. This can be overridden by the columnOptions
| `showSortIcons` | `boolean` | Toggle to hide or show the arrow icons in the header cells when a column is sortable. Defaults true
| `showHeader` | `boolean` | Hide or show the header row. Defaults true
| `showBody` | `boolean` | Hide or show the body part of the table. Not sure why you would want to hide it if you are using this library. Defaults true
| `headerClassName` | `string` | className applied to the header row
| `rowClassName` | `string` | className applied to each row in the body
| `headerCellClassName` | `string` | className applied to each cell in the header row
| `rowCellClassName` | `string` | className applied to each cell in the table body
| `headerStyle` | `CSSProperties` | style tag applied to the header row
| `rowStyle` | `CSSProperties` | style tag applied to each row in the body
| `headerCellStyle` | `CSSProperties` | style tag applied to each cell in the header row
| `rowCellStyle` | `CSSProperties` | style tag applied to each cell in the table body
| `rowFilter` | `ContextFunctionRow<boolean>` | filter out rows that are shown // TODO
| `paginationControlsRender` | `ContextFunctionPagination<ReactNode>` | create your own pagination controls // TODO
| `loading` | `boolean` | loading, its nice to use this instead of increment loading since we can just block a table // TODO
| `loadingOverlay` | `ContextFunctionData<ReactNode>` | loading, its nice to use this instead of increment loading since we can just block a table // TODO

### Column Options `ColumnOption`
| Prop | Type | Description |
| --- | :---: | --- |
| `key` | `string` `number` | key that is used to extract the correct value from the row's object (string) or array (number)
| `headerValue` | `any` | Label for the header cell (ie. First Name)
| `valueFormatter` | `ContextFunctionCell<any>` | Format function to run the values for the column's body cells through before displaying them (ie. (height) => height + "cm"). Does not modify the value used to compare for sorting the column
| `headerRender` | `ContextFunctionCell<ReactNode>` | Custom render function for the header cell
| `cellRender` | `ContextFunctionCell<ReactNode>` | Custom render function for the body cells of this column
| `headerCellClassName` | `string` | className applied to the header cell
| `rowCellClassName` | `string` | className applied to the body cells of this column
| `headerCellStyle` | `CSSProperties` | style tag applied to the header cell
| `rowCellStyle` | `CSSProperties` | style tag applied to the body cells of this column
| `sortable` | `boolean` | Toggle if this column can be sorted. Takes precedent over the "sortable" prop from TableGeneratorProps
| `showSortIcons` | `boolean` | Toggle to hide or show the arrow icons in the header cell if the column is sortable. Takes precedent of the "showSortIcons" props from TableGeneratorProps
| `sortFunction` | `(a: any, b: any, aRow: TableDataEntry, bRow: TableDataEntry, data: TableData, columns: ColumnOption[], sortConfiguration: ISortStyle) => number` | Custom sort function for the column where a & b are the values. If not custom sort is applied, the library will attempt to sort automatically based on the primitive data type
| `hidden` | `boolean` | Toggle for hiding a column... Perhaps if a column becomes hidden based on certain conditions on your end, change this to false instead of creating a whole new set of column options

### Paginator Props `IPaginatorProps`
| Prop | Type | Description |
| --- | :---: | --- |
| `show` | `boolean` | Show or hide the paginator. Defaults false
| `limitLabel` | `string` | String shown next to the drop-down for choosing the limit (ie. Showing X - Y of Z)
| `currentLimit` | `number` | Currently selected limit for the table
| `limitOptions` | `number[]` | Array of numbers representing options for what limits can be chosen via the drop-down
| `total` | `number` | Total number of results in the table or pool of data. Used to calculate the last index for the "go to last" button
| `onLimitChange` | `(newLimit: number) => void` | Handler for changing the limit per page via the drop-down
| `enableGoPrevious` | `boolean` | Toggle for if the "go to first" and "previous" buttons should be enabled
| `enableGoNext` | `boolean` | Toggle for if the "go to last" and "next" buttons should be enabled
| `showGoToFirstButton` | `boolean` | Hide or show the "go to first" button. Defaults true
| `showGoToLastButton` | `boolean` | Hide or show the "go to last" button. Defaults true
| `currentOffset` | `number` | Current offset of the pagination, indexed at 0
| `availableOffsets` | `number[]` | Array of numbers for which pages should be accessible via the paginator (indexed at 0 - ie. [0, 1, 2, 3, 4], will be displayed as [1, 2, 3, 4 ,5] by the library)
| `onOffsetChange` | `(newOffset: number) => void` | Handler for changing the selected offset page

### Table Data Types
| Name | Type | Notes |
| --- | :---: | --- |
| `TableDataEntryArray` | `any[]` | // TODO; currently not supported
| `TableDataEntryJSON` | `{[key: string]: any}` |
| `TableData` | `Array<TableDataEntryArray>` or `Array<TableDataEntryJSON>` | The data for the table
| `TableDataEntry` | `TableDataEntryArray` or `TableDataEntryJSON` | Represents a single row
| `TableDataEntry` | `TableDataEntryArray` or `TableDataEntryJSON` | Represents a single row

### Context Helpers
| Name | Type |
| --- | :---: |
| `ContextFunctionData<R>` | `(data: TableData) => R`
| `ContextFunctionCell<R>` | `(value: any, row: TableDataEntryArray or TableDataEntryJSON, key: string or number, data: TableData, index?: number) => R`
| `ContextFunctionRow<R>` | `(row: TableDataEntryArray or TableDataEntryJSON, key: string or number, data: TableData, index?: number) => R`
| `ContextFunctionPagination<R>` | `(pageSize: number, pageIndex: number, goToPage: (page: number) => void, data: TableData) => R`
