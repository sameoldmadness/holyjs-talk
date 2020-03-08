import { Prisma } from "./generated/prisma";

export const db = new Prisma({
  endpoint: 'http://localhost:4466'
})
