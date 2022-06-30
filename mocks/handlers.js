import { rest } from "msw";
import { apiUrl } from "../utils/api-url";

export const handlers = [
  rest.get(`${apiUrl}/items`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: [
          { title: "Item 1", body: "Description" },
          { title: "Item 2", body: "Description" },
        ],
      })
    );
  }),
  rest.post(`${apiUrl}/add-item`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const itemsOverride = rest.get(`${apiUrl}/items`, (req, res, ctx) => {
  return res(
    ctx.json({
      items: [
        { title: "Override 1", body: "Description" },
        { title: "Override 2", body: "Description" },
      ],
    })
  );
});
