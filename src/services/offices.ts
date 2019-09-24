import { fetch } from "../fake-fetch";
import { OfficeSearch } from "../models/offices";
import { Stat } from "../models/stats";

export function getOffices(query: string = ""): Promise<OfficeSearch> {
  return fetch(
    `http://fake.fabernovel.com/api/offices?query=${query}`
  ).then(r => r.json());
}

export function getStats(query?: string): Promise<Stat> {
  const initialStat: Stat = {
    office_count: 0,
    employee_avg: 0,
    continent_count: 0,
    spoken_languages: []
  };
  const continents: Array<string> = [];
  const languages: Array<Array<string>> = [];

  return getOffices(query)
    .then(offices => {
      return [
        offices,
        offices.data.reduce(function(stats, office) {
          continents.push(office.location.continent.label);
          languages.push(office.location.language);

          const stat: Stat = {
            ...stats,
            employee_avg: stats.employee_avg + office.employees_count,
            office_count: stats.office_count + 1
          };
          return stat;
        }, initialStat)
      ] as [OfficeSearch, Stat];
    })
    .then(data => {
      const [offices, stats] = data;
      return {
        ...stats,
        employee_avg: Math.round(stats.employee_avg / offices.data.length),
        continent_count: continents.filter(
          (value, i) => continents.indexOf(value) === i
        ).length,
        spoken_languages: ([] as Array<string>)
          .concat(...languages)
          .filter((value, i, langs) => langs.indexOf(value) === i)
      };
    });
}
