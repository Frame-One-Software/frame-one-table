import React from 'react';
import { Story, Meta } from '@storybook/react';
import TableGenerator, {TableGeneratorProps} from './TableGenerator';

export default {
  title: 'Example/TableGenerator',
  component: TableGenerator,
} as Meta;

const Template: Story<TableGeneratorProps> = (args) => <TableGenerator {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
