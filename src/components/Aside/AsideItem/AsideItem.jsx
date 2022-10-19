import React from "react";
import styles from "./AsideItem.module.scss";
import { AppContext } from "../../../context/store";
import cnBind from "classnames/bind";

import { SvgSelector } from "../../../utils/svgSelector";

const cx = cnBind.bind(styles);

const AsideItem = (props) => {
  const { name, id, colorId } = props.list;
  const { colors, deleteList, selectedListId, setSelectedListId } =
    React.useContext(AppContext);
  const hexColor = colors.find((color) => color.id === colorId).hex;

  const selectHandler = () => {
    setSelectedListId(id);
  };

  const clickHandler = (e) => {
    e.stopPropagation();
    deleteList(id);
  };
  return (
    <li
      onClick={selectHandler}
      className={cx("item", { selected: id === selectedListId })}
    >
      <span style={{ backgroundColor: hexColor }} />
      <p>{name}</p>
      <div>
        <button onClick={clickHandler} className={cx("btn-reset")}>
          <SvgSelector id="close" />
        </button>
      </div>
    </li>
  );
};

export default AsideItem;
