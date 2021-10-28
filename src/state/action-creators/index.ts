import { ActionType } from "../action-types";
import { 
  Action, 
  UpdateCellAction,
  DeleteCellAction, 
  MoveCellAction, 
  InsertCellBeforeAction,
  Direction
} from "../actions";
import { CellTypes } from "../cell";

const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  };
};

const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};

const insertCellBefore = (id: string, cellType: CellTypes): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType
    }
  };
};