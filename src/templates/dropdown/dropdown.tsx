import React, { FC, useState } from "react";
import { Continent } from "../../models/offices";
import { ReactComponent as ChevronIcon } from "../../styles/icons/chevron-icon.svg";
import styles from "./dropdown.module.scss";

type Props = {
  continentList: Continent[];
  continentSelected: Continent;
  onChangeContinent: (continent: Continent) => void;
};

const Dropdown: FC<Props> = ({
  onChangeContinent,
  continentList,
  continentSelected,
}) => {
  const [displayList, setDisplayList] = useState(false);

  const renderItemList = (continent: Continent, index: number) => {
    return (
      <div
        className={styles.item}
        key={index}
        onClick={() => {
          onChangeContinent(continent);
          setDisplayList(false);
        }}
      >
        {continent.label}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => setDisplayList(!displayList)}
        className={styles.selector}
      >
        {continentSelected.label} <ChevronIcon className={styles.chevronIcon} />
      </div>
      {displayList && (
        <div className={styles.list}>
          {continentList.map((continent, index) => {
            return renderItemList(continent, index);
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
