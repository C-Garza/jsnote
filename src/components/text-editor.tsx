import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { Cell } from "../state";
import {useActions} from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
};

const TextEditor = ({cell}: TextEditorProps): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const MDEditorContainerRef = useRef<HTMLDivElement | null>(null);
  const {updateCell} = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if(MDEditorContainerRef.current && event.target && MDEditorContainerRef.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, {capture: true});

    return () => {
      document.removeEventListener("click", listener, {capture: true});
    };
  }, []);

  const handleChange = (val: string | undefined) => {
    if(val === undefined) {
      updateCell(cell.id, "");
      return;
    }
    updateCell(cell.id, val);
  };

  if(editing) {
    return (
      <div className="text-editor" ref={MDEditorContainerRef}>
        <MDEditor value={cell.content} onChange={handleChange} />
      </div>
    )
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  )
};

export default TextEditor;