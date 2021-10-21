import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

const TextEditor = (): JSX.Element => {
  const [value, setValue] = useState("# Header");
  const [editing, setEditing] = useState(false);
  const MDEditorContainerRef = useRef<HTMLDivElement | null>(null);

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
      setValue("");
      return;
    }
    setValue(val);
  };

  if(editing) {
    return (
      <div className="text-editor" ref={MDEditorContainerRef}>
        <MDEditor value={value} onChange={handleChange} />
      </div>
    )
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  )
};

export default TextEditor;