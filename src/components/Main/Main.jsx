import React from "react";
import styles from "./Main.module.scss";
import { AppContext } from "../../context/store";
import Task from "../Task/Task";

const Main = () => {
  const { selectedListId, lists } = React.useContext(AppContext);

  return (
    <div className={styles.main}>
      {selectedListId === null ? (
        lists.map((list) => <Task key={list.id} id={list.id}/>)
      ) : (
        <Task id={selectedListId}/>
      )}
    </div>
  );
};

export default Main;
