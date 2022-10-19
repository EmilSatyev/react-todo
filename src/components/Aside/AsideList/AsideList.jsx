import React from 'react';
import {AppContext} from "../../../context/store";
import AsideItem from "../AsideItem/AsideItem";


const AsideList = () => {
  const {lists} = React.useContext(AppContext)

  return (
    <ul style={{marginBottom: "30px"}}>
      {
        lists.map(list => <AsideItem key={list.id} list={list}/>)
      }
    </ul>
  );
};

export default AsideList;