import { CustomElement } from './types';

export type Command = {
  title: string;
  type: CustomElement['type'];
};

export const commands: Command[] = [
  { title: 'Heading', type: 'heading' },
  { title: 'To-Do List', type: 'todo' },
  { title: 'Paragraph', type: 'paragraph' },
];