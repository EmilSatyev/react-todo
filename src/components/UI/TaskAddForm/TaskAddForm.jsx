import React from "react";
import styles from "./TaskAddForm.module.scss";
import { AppContext } from "../../../context/store";
import cnBind from "classnames/bind";

const cx = cnBind.bind(styles);

const TaskAddForm = ({ listId }) => {
  const [inputValue, setInputValue] = React.useState("");
  const { addTask, isTaskSending } = React.useContext(AppContext);

  const clickHandler = () => {
    if (inputValue.trim()) {
      addTask(listId, inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={styles.taskAdd}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      />
      <button
        className={cx("btn", "btn-reset", "btnAddForm")}
        onClick={clickHandler}
      >
        {isTaskSending ? "Добавление" : "Добавить"}
      </button>
    </div>
  );
};

export default TaskAddForm;
