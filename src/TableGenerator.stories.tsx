import React from 'react';
import {Story, Meta} from '@storybook/react';
import TableGenerator, {TableGeneratorProps} from './TableGenerator';

export default {
	title: 'Example/TableGenerator',
	component: TableGenerator,
} as Meta;

const Template: Story<TableGeneratorProps> = (args) => <TableGenerator {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	data: [
		{
			firstName: "spencer",
			lastName: "gray",
			sex: true,
			height: 188,
        },
		{
			firstName: "christopher",
			lastName: "powroznik",
			sex: true,
			height: 180,
		},
		{
			firstName: "xiao bin",
			lastName: "sheng",
			sex: false,
			height: 175,
		},
	],
	columnOptions: [
		{
			key: "firstName",
			headerValue: "First Name",
			sortable: true,
		},
		{
			key: "lastName",
			headerValue: "Last Name",
			sortable: true,
		},
		{
			key: "sex",
			headerValue: "Sex",
			sortable: true,
			valueFormatter: (sex: boolean) => sex ? "Male" : "Female",
		},
		{
			key: "height",
			headerValue: "Height (cm)",
			sortable: true,
			valueFormatter: (height: number) => height + "cm"
		},
	],
};
