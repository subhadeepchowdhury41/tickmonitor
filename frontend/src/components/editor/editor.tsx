import { useState } from "react";
import { EditorContent, EditorRoot, JSONContent } from "novel";

const Editor = () => {
  const [content, setContent] = useState<JSONContent | null>(null);
  return (
    <EditorRoot>
      <EditorContent
        initialContent={content ?? undefined}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
      />
    </EditorRoot>
  );
};

export default Editor;
