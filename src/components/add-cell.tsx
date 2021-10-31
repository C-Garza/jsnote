import "./add-cell.css";
import {useActions} from "../hooks/use-actions";
import { CellTypes } from "../state";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
};

const AddCell = ({previousCellId, forceVisible}: AddCellProps): JSX.Element => {
  const {insertCellAfter} = useActions();

  const handleClick = (cellType: CellTypes) => {
    insertCellAfter(previousCellId, cellType);
  };

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button className="button is-rounded is-primary is-small" onClick={() => handleClick("code")}>
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={() => handleClick("text")}>
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;