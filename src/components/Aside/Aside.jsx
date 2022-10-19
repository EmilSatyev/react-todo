import React from "react";
import styles from "./Aside.module.scss";
import cnBind from "classnames/bind";
import AsideList from "./AsideList/AsideList";
import { AppContext } from "../../context/store";
import AddingModal from "../UI/AddingModal/AddingModal";
import { SvgSelector } from "../../utils/svgSelector";

const cx = cnBind.bind(styles);

const Aside = () => {
  const [isAddModalShow, setIsAddModalShow] = React.useState(false);

  const { lists, selectedListId, setSelectedListId } =
    React.useContext(AppContext);

  return (
    <div className={styles.aside}>
      {lists.length > 0 && (
        <>
          <button
            onClick={() => setSelectedListId(null)}
            className={cx("btn", "btn-reset", {
              selected: selectedListId === null,
            })}
          >
            <SvgSelector id="menu" />
            <span>Все задачи</span>
          </button>
          <AsideList />
        </>
      )}
      <button
        onClick={() => setIsAddModalShow(true)}
        className={cx("btn", "btn-reset", "add_btn")}
      >
        <SvgSelector id="plus" />
        <span>Добавить папку</span>
      </button>
      {isAddModalShow && (
        <AddingModal
          isAddModalShow={isAddModalShow}
          setIsAddModalShow={setIsAddModalShow}
        />
      )}
    </div>
  );
};

export default Aside;
