import qs from "querystringify";
import { OfficeSearch } from "../models/offices";
import dataOffices from "./data/offices.json";
import searchOffices from "./searchOffices";

const sleep = (t = Math.random() * 200 + 300) =>
  new Promise(resolve => setTimeout(resolve, t));

const apiUrl = new window.URL("http://fake.fabernovel.com/api");

const originalFetch = window.fetch;

type CustomFetch = (url: string, config?: RequestInit) => Promise<Response>;

const isFakeApi = (
  endpoint: string,
  method: string = "GET",
  queryStringParam?: string
) => (url: string, config?: RequestInit) => {
  const { origin, pathname, search } = new window.URL(url);
  const fetchMethod = config !== undefined ? config.method || "GET" : "GET";

  return (
    origin === apiUrl.origin &&
    pathname.startsWith(`${apiUrl.pathname}/${endpoint}`) &&
    fetchMethod === method &&
    (queryStringParam
      ? qs.parse(search).hasOwnProperty(queryStringParam)
      : true)
  );
};

async function fakeAPI(url: string, config?: RequestInit): Promise<Response> {
  await sleep();
  const { query } = qs.parse(new window.URL(url).search) as {
    query?: string;
  };
  let matches: OfficeSearch | undefined = undefined;

  if (query) {
    matches = searchOffices(dataOffices, query);
  } else {
    matches = dataOffices;
  }

  return new Promise(resolve => {
    resolve({
      status: 200,
      json: async () => matches
    } as Response);
  });
}

const fetch: CustomFetch = async (url: string, config?: RequestInit) => {
  if (isFakeApi(url, "GET")) {
    const groupTitle = `%c ${(config || {}).method || "GET"} -> ${url}`;
    try {
      const response = await fakeAPI(url, config);
      console.groupCollapsed(groupTitle, "color: #0f9d58");
      console.info("REQUEST:", { url, ...config });
      console.info("RESPONSE:", {
        ...response,
        ...(response.json ? { json: await response.json() } : {})
      });
      console.groupEnd();
      return response;
    } catch (error) {
      let rejection = error;
      if (error instanceof Error) {
        rejection = {
          status: 500,
          message: error.message
        };
      }
      console.groupCollapsed(groupTitle, "color: #ef5350");
      console.info("REQUEST:", { url, ...config });
      console.info("REJECTION:", rejection);
      console.groupEnd();
      return Promise.reject(rejection);
    }
  } else {
    return originalFetch(url, config);
  }
};

// @ts-ignore
window.fetch = fetch;
