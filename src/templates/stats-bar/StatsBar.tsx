import React from "react";
import { Stat } from "../../models/stats";
import styles from "./stats-bar.module.scss";

const StatsBar = ({ stats }: { stats: Stat }) => {
  return (
    <div className={styles.statBar}>
      <StatItem label="offices" value={`${stats.office_count}`} />
      <StatItem
        label="avg employees per location"
        value={`${stats.employee_avg}`}
      />
      <StatItem label="continents" value={`${stats.continent_count}`} />
      <StatItem label="languages" value={`${stats.spoken_languages.length}`} />
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h1>
      {value} <span>{label}</span>
    </h1>
  </div>
);

export default StatsBar;
