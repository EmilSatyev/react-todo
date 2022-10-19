import React from "react";
import styles from "./AddingModal.module.scss";
import { AppContext } from "../../../context/store";
import { SvgSelector } from "../../../utils/svgSelector";

import cnBind from "classnames/bind";


const cx = cnBind.bind(styles);

const AddingModal = ({ setIsAddModalShow, isAddModalShow }) => {
  const { colors, addNewFolder } = React.useContext(AppContext);
  const [name, setName] = React.useState("");
  const [colorId, setColorId] = React.useState(1);

  const modalRef = React.useRef(null);

  React.useEffect(() => {

    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsAddModalShow(false)
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    }
  }, [isAddModalShow]);

  const clickHandler = () => {
    if (name.trim()) {
      addNewFolder({ name, colorId });
      setName("");
      setColorId(1);
      setIsAddModalShow(false);
    }
  };

  return (
    <div ref={modalRef} className={styles.add_modal}>
      <button
        onClick={() => setIsAddModalShow(false)}
        className={cx("close", "btn-reset")}
      >
        <SvgSelector id="close" />
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Название папки"
      />
      <div className={styles.colors}>
        {colors.map((color) => (
          <div key={color.id}>
            <input
              checked={color.id === colorId}
              onChange={() => setColorId(color.id)}
              type="radio"
              name="color"
              id={color.name}
            />
            <label
              htmlFor={color.name}
              style={{ backgroundColor: color.hex }}
            />
          </div>
        ))}
      </div>

      <button className={cx("btn-reset")} onClick={clickHandler}>
        Добавить
      </button>
    </div>
  );
};

export default AddingModal;
