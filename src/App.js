import React from "react";
import styles from './App.module.scss'

import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";

function App() {
  // const { todo } = React.useContext(AppContext);
  return (
    <div className={styles.todo}>
      <Aside />
      <Main/>
    </div>
  );
}

export default App;
