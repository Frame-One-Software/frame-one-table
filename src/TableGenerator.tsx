import React, { ReactNode } from 'react';
import {ContextFunctionCell, ContextFunctionData, ContextFunctionPagination, ContextFunctionRow, TableData } from './contextTypes';

export interface ColumnOption {
  key: string | number; // which key or index is this referring to
  headerValue?: any // this is what value is passed into the header, use this to label the header
  footerValue?: any // this is what value is passed into the header, use this to label the footer

  valueFormatter?: ContextFunctionCell<any>; // change the value
  headerRender?: ContextFunctionCell<ReactNode>; // format the header
  cellRender?: ContextFunctionCell<ReactNode>; // format the cell
  footerRender?: ContextFunctionCell<ReactNode>; // format the footer

  headerClassName?: string;
  cellClassName?: string
  headerStyle?: CSSStyleDeclaration
  cellStyle?: CSSStyleDeclaration

  sortable?: boolean;
  sortFunction?: (a: any, b: any) => number;

  hidden?: boolean; // easier to use a boolean in some cases
}

export interface TableGeneratorProps {
  /**
   * Pass in the data here to be rendered
   */
  data?: TableData[],

  /**
   * Options to determine the rendering of each column
   */
  columnOptions?: ColumnOption[],

  /**
   * Determine a default for each column as sortable. This can be overridden by the columnOptions
   */
  sortable?: boolean,

  headerClassName?: string;

  cellClassName?: string
  headerStyle?: CSSStyleDeclaration
  cellStyle?: CSSStyleDeclaration

  // filter out rows that are shown
  rowFilter?: ContextFunctionRow<boolean>;

  // pagination options
  pageSize?: number // amount to show on a page, if undefined then unlimited
  pageIndex?: number // which page are you on
  hidePaginationControl?: boolean // will hide the pagination options

  // create your own pagination controls
  paginationControlsRender?: ContextFunctionPagination<ReactNode>

  // loading, its nice to use this instead of increment loading since we can just block a table
  loading?: boolean;
  loadingOverlay?: ContextFunctionData<ReactNode>;
}

export const TableGenerator: React.FC<TableGeneratorProps> = (props) => {
  return (
    <p>Stuff123</p>
  );
};

export default TableGenerator;