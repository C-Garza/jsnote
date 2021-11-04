interface ActionButtonProps {
  icon: string;
  handleClick: () => void;
}

const ActionButton = ({icon, handleClick}: ActionButtonProps): JSX.Element => {
  return (
    <button className="button is-primary is-small" onClick={handleClick}>
      <span className="icon">
        <i className={icon}></i>
      </span>
    </button>
  );
};

export default ActionButton;