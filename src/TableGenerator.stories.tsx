import React from 'react';
import {Story, Meta} from '@storybook/react';
import TableGenerator, {TableGeneratorProps} from './TableGenerator';
import {LoadingIcon} from "./Loader";
import {CellContextDetails} from "./contextTypes";

export default {
	title: 'Example/TableGenerator',
	component: TableGenerator,
} as Meta;

const Template: Story<TableGeneratorProps> = (args) => <TableGenerator {...args} />;

export const Primary = Template.bind({});

function stringToCaps(word: string = "", details: CellContextDetails): string {
	if (word === "") {
		return word;
	}

	return word?.[0]?.toUpperCase() + word?.substring(1);
}

Primary.args = {
	data: [
		{
			firstName: "spencer",
			lastName: "gray",
			sex: true,
			height: 188,
			favWord: "load",
			nestedData: {
				test: 1,
			},
        },
		{
			firstName: "christopher",
			lastName: "powroznik",
			sex: true,
			height: 180,
			favWord: "reference",
			nestedData: {
				test: 1,
			},
		},
		{
			firstName: "lucy",
			lastName: "sheng",
			sex: false,
			height: 175,
			favWord: "perforate",
			nestedData: {
				test: 1,
			},
		},
		{
			firstName: "victor",
			lastName: "li",
			sex: true,
			height: 230,
			favWord: "map",
			nestedData: {
				test: 1,
			},
		},
		{
			firstName: "susan",
			lastName: "li",
			sex: false,
			height: 170,
			favWord: "split",
			nestedData: {
				test: 1,
			},
		},
		{
			firstName: "raymond",
			lastName: "chiu",
			sex: true,
			height: 176,
			favWord: "upset",
			nestedData: {
				test: 1,
			},
		},
		{
			firstName: "jerry",
			lastName: "jurr",
			sex: true,
			height: 179,
			favWord: "establish",
			nestedData: {
				test: 1,
			},
		},
	],
	columnOptions: [
		{
			key: "firstName",
			headerValue: "First Name",
			// sortable: true,
			valueFormatter: stringToCaps,
		},
		{
			key: undefined,
			headerValue: "Nested Test",
			// sortable: true,
			cellRender: (row: any) => {
				return row.nestedData?.test;
			},
		},
		{
			key: "lastName",
			headerValue: "Last Name",
			sortable: true,
			valueFormatter: stringToCaps,
		},
		{
			key: "sex",
			headerValue: "Sex",
			sortable: true,
			valueFormatter: (sex: boolean) => sex ? "Male ♂" : "Female ♀",
		},
		{
			key: "height",
			headerValue: "Height (cm)",
			sortable: true,
			valueFormatter: (height: number) => height + "cm",
			rowCellStyle: {textAlign: "right"},
		},
		{
			key: "favWord",
			headerValue: "Favourite Word",
			sortable: false,
			valueFormatter: stringToCaps,
			rowCellStyle: {textAlign: "center"}
		},
		{
			key: "customRenderColumn",
			headerValue: "Custom Render",
			sortable: false,
			cellRender: (value, row, key, data, index) => {
				return (
					<div style={{display: "flex", justifyContent: "center"}}>
						<button
							style={{cursor: "pointer"}}
							onClick={() => {
								alert(
									"The data for this row only is: " + JSON.stringify(row) + "\n\n" +
									"The key for this row is: " + (key ? key.toString() : "undefined") + "\n\n" +
									"The index for this row is: " + (index !== undefined ? index.toString() : "undefined") + "\n\n" +
									"The data for the whole table is: " + JSON.stringify(data)
								);
							}}
						>
							Hello!
						</button>
					</div>
				);
			},
		},
	],
	sortable: true,
	paginatorProps: {
		show: true,
		limitLabel: "Showing 1 - 10 of 1200",
		currentLimit: 10,
		limitOptions: [10, 20, 30, 40, 50],
		total: 1200,
		onLimitChange: (v) => {alert("new limit:" + v)},
		enableGoPrevious: false,
		enableGoNext: true,
		showGoToFirstButton: true,
		showGoToLastButton: true,
		currentOffset: 0,
		availableOffsets: [0, 1, 2, 3, 4],
		onOffsetChange: (v) => {alert("new offset:" + v)},
	},
	loadingIcon: LoadingIcon.SPINNER,
	loading: false,
	enableNoDataMessage: true,
};
