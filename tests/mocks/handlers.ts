import { http, HttpResponse } from "msw";
import { categories } from "../data";

export const handlers = [
  http.get("http://localhost:8888/categories", () => {
    return HttpResponse.json(categories);
  }),
];
