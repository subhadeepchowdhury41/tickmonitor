"use client";

import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  createEditor,
  Transforms,
  Range,
  Editor as SlateEditor,
  Element as SlateElement,
  Descendant,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import SubtaskCard from "./subtask-card";
import { title } from "process";

interface CustomElement {
  type:
    | "paragraph"
    | "subtask"
    | "mention"
    | "dependencytask"
    | "heading1"
    | "heading2";
  children: CustomText[];
  username?: string;
  dependency?: string;
}

interface CustomText {
  text: string;
}

const autofillTexts = [
  ">paragraph",
  ">subtask",
  "@",
  ">dependencytask",
  ">heading1",
  ">heading2",
];

const autoFillsMapping = {
  ">paragraph": {
    title: "Paragraph",
    description: "Select to write a Paragraph",
  },
  ">subtask": {
    title: "Subtask",
    description: "Select to create a Subtask",
  },
  "@": {
    title: "Mention",
    description: "Select to Mention a user",
  },
  ">dependencytask": {
    title: "Dependency",
    description: "Select to choose a Dependency for this task",
  },
  ">heading1": {
    title: "Heading1",
    description: "Select to add a Heading1",
  },
  ">heading2": {
    title: "Heading2",
    description: "Select to Add Heading2",
  },
};

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: any;
  children: any;
  element: CustomElement;
}) => {
  switch (element.type) {
    case "subtask":
      return (
        <div {...attributes} style={{ marginLeft: "20px" }}>
          <SubtaskCard title="This is a new Subtask" description="" />
        </div>
      );
    case "mention":
      return (
        <span {...attributes} style={{ backgroundColor: "#eee" }}>
          @{element.username}
        </span>
      );
    case "dependencytask":
      return (
        <span {...attributes} style={{ backgroundColor: "#eef" }}>
          {element.dependency}
        </span>
      );
    case "heading1":
      return <h1 {...attributes} style={{ fontSize: "h1" }}></h1>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const [target, setTarget] = useState<Range | null>(null);
  const [autoFills, setAutoFills] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const renderElement = useCallback(
    (props: any) => (
      <div className="my-2 py-1 pl-2 border-l border-slate-400 bg-slate-100">
        {props.element.children[0].text === "" && (
          <div className="absolute text-slate-500">
            {"Type >subtask, >dependency, or @ for mentions."}
          </div>
        )}
        <Element {...props} />
      </div>
    ),
    []
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (target) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setIndex((prevIndex) => (prevIndex + 1) % options.length);
            break;
          case "ArrowUp":
            event.preventDefault();
            setIndex(
              (prevIndex) => (prevIndex - 1 + options.length) % options.length
            );
            break;
          case "Enter":
            event.preventDefault();
            if (options[index]) {
              Transforms.select(editor, target);
              insertOption(editor, options[index]);
              setTarget(null);
            }
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, options, target]
  );

  const insertOption = (editor: SlateEditor, option: string) => {
    let newElement: CustomElement;
    if (search === "@") {
      newElement = {
        type: "mention",
        username: option,
        children: [{ text: "" }],
      };
    } else if (search === ">subtask") {
      newElement = { type: "subtask", children: [{ text: option }] };
    } else if (search === ">dependencytask") {
      newElement = {
        type: "dependencytask",
        dependency: option,
        children: [{ text: "" }],
      };
    } else {
      newElement = { type: "paragraph", children: [{ text: option }] };
    }
    Transforms.insertNodes(editor, newElement);
    Transforms.move(editor);
  };

  const onChange = (value: Descendant[]) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = SlateEditor.before(editor, start, {
        unit: "word",
      }) ?? { ...start, offset: 0 };
      const before = (wordBefore && SlateEditor.before(editor, wordBefore)) ?? {
        ...start,
        offset: wordBefore.offset === 0 ? 0 : wordBefore.offset + 1,
      };
      const beforeRange = before && SlateEditor.range(editor, before, start);
      const beforeText = beforeRange && SlateEditor.string(editor, beforeRange);
      const beforeMatches = autofillTexts.filter((text) =>
        text.toLowerCase().startsWith(beforeText.trimStart())
      );
      setAutoFills(beforeMatches);
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const domRange = domSelection.getRangeAt(0).cloneRange();
        const rect = domRange.getBoundingClientRect();
        setPopupPosition({ top: rect.top - 40, left: rect.left });
      }
    }
  };

  const getOptions = (pattern: string): string[] => {
    if (pattern === "@") {
      return ["User1", "User2", "User3"];
    }
    if (pattern === ">subtask") {
      return ["Subtask1", "Subtask2", "Subtask3"];
    }
    if (pattern === ">dependencytask") {
      return ["Task1", "Task2", "Task3"];
    }
    return [];
  };

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Editable
        renderElement={renderElement}
        onKeyDown={onKeyDown}
        onBlur={() => {
          setAutoFills([]);
        }}
        className="mx-2 px-2 outline-none"
        style={{
          fontSize: 14,
        }}
      />
      {autoFills.length > 0 && (
        <div
          className="shadow-xl min-w-[320px] p-2 px-4 overflow-y-auto"
          style={{
            position: "absolute",
            zIndex: 1,
            top: popupPosition.top + 70,
            left: popupPosition.left,
            height: "270px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "0.25em",
          }}
        >
          {autoFills.map((option, index) => {
            return (
              <div key={index} className="w-[100%] h-[50px] my-2 flex flex-col">
                <div className="font-[500]">
                  {autoFillsMapping[option].title}
                </div>
                <div className="text-sm text-slate-600">
                  {autoFillsMapping[option].description}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {target && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            background: "white",
            border: "1px solid #ddd",
          }}
        >
          {options.map((option, i) => (
            <div
              key={option}
              style={{
                padding: "8px",
                background: i === index ? "#bde4ff" : "white",
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </Slate>
  );
};

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default Editor;
