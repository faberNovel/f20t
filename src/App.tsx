import React from "react";
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

type State = {
  sort: "asc" | "desc";
  offices?: OfficeSearch;
  query?: any;
  stats?: Stat;
};
class App extends React.Component<{}, State> {
  state: State = {
    sort: "asc",
    offices: undefined,
    query: undefined,
    stats: undefined
  };

  handleSortToggle = () => {
    this.setState({ sort: this.state.sort === "asc" ? "desc" : "asc" });
  };

  sortOffices = (office1: Office, office2: Office) => {
    if (this.state.sort === "asc") {
      return office1.location.city.localeCompare(office2.location.city);
    } else {
      return office2.location.city.localeCompare(office1.location.city);
    }
  };

  componentDidMount() {
    getOffices().then(offices =>
      this.setState(state => ({ ...state, offices }))
    );
    getStats().then(stats => this.setState({ stats }));
  }

  componentWillUpdate(_nextProps: any, nextState: State) {
    if (nextState.query !== this.state.query && nextState.query !== undefined) {
      this.handleOfficeSearch(nextState.query);
    }
  }

  handleOfficeSearch = (query: string) => {
    getOffices(query).then(offices =>
      this.setState(state => ({ ...state, offices }))
    );
  };

  render() {
    return (
      <div className={styles.app}>
        <Header
          sort={this.state.sort}
          onSortToggle={this.handleSortToggle}
          onSearchSubmit={query => this.setState({ query })}
        />
        {this.state.stats && <StatsBar stats={this.state.stats} />}
        {this.state.offices ? (
          <OfficeList
            offices={this.state.offices.data.sort(this.sortOffices)}
          />
        ) : (
          false
        )}
      </div>
    );
  }
}

export default App;
