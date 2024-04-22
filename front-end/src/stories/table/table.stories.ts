import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from 'src/app/components/table/table.component';

const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    data: {
      control: 'object',
    },
    displayedColumns: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Default: Story = {
  args: {
    data: [{ id: 1, name: 'Cristian', gender: 'male' }],
    displayedColumns: new Set(['id', 'name', 'gender']),
  },
};
