import {useActions} from "../hooks/use-actions";
import ActionButton from "./action-button";
import "./action-bar.css";

interface ActionBarProps {
  id: string;
}

const ActionBar = ({id}: ActionBarProps): JSX.Element => {
  const {moveCell, deleteCell} = useActions();

  const handleUpClick = () => {
    moveCell(id, "up");
  };

  const handleDownClick = () => {
    moveCell(id, "down");
  };

  const handleDeleteClick = () => {
    deleteCell(id);
  };

  return (
    <div className="action-bar">
      <ActionButton icon={"fas fa-arrow-up"} handleClick={handleUpClick} />
      <ActionButton icon={"fas fa-arrow-down"} handleClick={handleDownClick} />
      <ActionButton icon={"fas fa-times"} handleClick={handleDeleteClick} />
    </div>
  );
};

export default ActionBar;