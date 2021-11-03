import {useEffect} from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import {useActions} from "../hooks/use-actions";
import {useTypedSelector} from "../hooks/use-typed-selector";
import "./code-cell.css";

interface CodeCellProps {
  cell: Cell;
};

const CodeCell = ({cell}: CodeCellProps): JSX.Element => {
  const {updateCell, createBundle} = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if(!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content, createBundle]); //Possible solution: _isMounted Ref to skip init render, add second useEffect

  return (
    <Resizable direction="vertical">
      <div style={{height: "calc(100% - 10px)", display: "flex", flexDirection: "row"}}>
        <Resizable direction="horizontal">
          <CodeEditor 
            initialValue={cell.content}
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;