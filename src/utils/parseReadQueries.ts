import { QueryObj } from "../controller/readTasksHandler";

interface MatchObj {
  completed?: boolean;
  description?: { $regex: RegExp };
}

interface OptionsObj {
  limit?: number;
  skip?: number;
  sort?: { [key: string]: number };
}
const parseReadQueries = (queries: QueryObj) => {
  const match: MatchObj = {};
  const options: OptionsObj = {};
  if (queries.completed) match.completed = queries.completed === "true";
  if (queries.description)
    match.description = { $regex: new RegExp(queries.description) };
  if (queries.limit) options.limit = +queries.limit;
  if (queries.skip) options.skip = +queries.skip;
  if (queries.sortBy) {
    const underlinePos = queries.sortBy.indexOf("_");
    const sortBy = queries.sortBy.slice(0, underlinePos);
    const order = queries.sortBy.slice(underlinePos + 1);
    options.sort = { [sortBy]: order === "desc" ? -1 : 1 };
  }
  return { match, options };
};

export default parseReadQueries;
