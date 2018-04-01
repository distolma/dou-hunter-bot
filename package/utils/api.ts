import axios from "axios";

import { douParser } from "./xml-parser";
import { HtmlData, UserVacancies } from "../interfaces";

const { SOURCE_URL } = process.env;

export const getVacantions = (params: UserVacancies) =>
  axios
    .get<HtmlData[]>(SOURCE_URL, {
      params,
      transformResponse: [data => douParser(data)]
    })
    .then(({ data }) => data);
