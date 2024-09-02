import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

// types.ts
export interface BaseElement {
  type: string;
  children: CustomText[];
}

export type CustomElement = ParagraphElement | HeadingElement | TodoElement;

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  children: CustomText[];
};

export type TodoElement = {
  type: 'todo';
  checked: boolean;
  children: CustomText[];
};

export type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
