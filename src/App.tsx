import React, { FC, useState, useEffect, useRef } from "react";
import "./styles/global.scss";
import styles from "./app.module.scss";
import Header from "./templates/header";
import { Office } from "./models/offices";
import { OfficeSearch } from "./models/offices";
import OfficeList from "./templates/office-list/OfficeList";
import { getStats } from "./services/offices";
import { getOffices } from "./services/offices";
import StatsBar from "./templates/stats-bar/StatsBar";
import { Stat } from "./models/stats";
import { usePrevious } from "./support/hooks/usePrevious";

type Sort = "asc" | "desc";

const App: FC = () => {
  const [sort, setSort] = useState<Sort>("asc");
  const [offices, setOffices] = useState<OfficeSearch | undefined>(undefined);
  const [query, setQuery] = useState<any>(undefined);
  const [stats, setStats] = useState<Stat | undefined>(undefined);

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

  const prevQuery = usePrevious(query);

  useEffect(() => {
    getOffices().then((offices) => setOffices(() => offices));
    getStats().then((stats) => setStats(stats));

    if (prevQuery !== query && query !== undefined) {
      handleOfficeSearch(query);
    }
  }, [query, prevQuery]);

  const handleOfficeSearch = (query: string) => {
    getOffices(query).then((offices) => setOffices(() => offices));
  };

  return (
    <div className={styles.app}>
      <Header
        sort={sort}
        onSortToggle={handleSortToggle}
        onSearchSubmit={(query) => setQuery(query)}
      />
      {stats && <StatsBar stats={stats} />}
      {offices ? (
        <OfficeList offices={offices.data.sort(sortOffices)} />
      ) : (
        false
      )}
    </div>
  );
};

export default App;
