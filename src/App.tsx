import React, { FC, useState } from "react";
import "./styles/global.scss";
import styles from "./app.module.scss";
import Header from "./templates/header";
import { Office } from "./models/offices";

type Sort = "asc" | "desc";

const App: FC = () => {
  const [sort, setSort] = useState<Sort>("asc");

  const handleSortToggle = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const sortOffices = (office1: Office, office2: Office) => {
    if (sort === "asc") {
      return office1.location.city.localeCompare(office2.location.city);
    } else {
      return office2.location.city.localeCompare(office1.location.city);
    }
  };

  return (
    <div className={styles.app}>
      <Header
        sort={sort}
        onSortToggle={handleSortToggle}
        onSearchSubmit={console.log}
      />
    </div>
  );
};

export default App;
