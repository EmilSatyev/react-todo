import React from "react";
import { AppContext } from "../../../context/store";
import styles from "./TaskTitle.module.scss";
import cnBind from "classnames/bind";
import { SvgSelector } from "../../../utils/svgSelector";

const cx = cnBind.bind(styles);

const TaskTitle = ({ id }) => {
  const { lists, colors, editTitle, selectedListId } = React.useContext(AppContext);
  const listObj = lists.find((list) => list.id === id);
  const colorHex = colors.find((color) => color.id === listObj.colorId).hex;

  const [isEditTitle, setIsEditTitle] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState(listObj.name);

  const toggleIsEdit = () => {
    setIsEditTitle(!isEditTitle);
  };

  const editHandler = () => {
    editTitle(titleValue, id);
    setIsEditTitle(false)
  }

  React.useEffect(() => {
    setIsEditTitle(false);
    setTitleValue(listObj.name)
  }, [selectedListId]);

  return (
    <div className={styles.title}>
      {isEditTitle ? (
        <input
          style={{ color: colorHex }}
          onChange={(e) => setTitleValue(e.target.value)}
          value={titleValue}
          type="text"
        />
      ) : (
        <h1 style={{ color: colorHex }}>{listObj.name}</h1>
      )}
      {isEditTitle ? (
        <button onClick={editHandler} className={cx("save", "btn-reset")}>
          <SvgSelector id="save" />
        </button>
      ) : (
        <button onClick={toggleIsEdit} className={cx("edit", "btn-reset")}>
          <SvgSelector id="edit" />
        </button>
      )}
    </div>
  );
};

export default TaskTitle;
