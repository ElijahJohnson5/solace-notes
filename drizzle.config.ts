import type { Config } from "drizzle-kit";
 
export default {
  schema: "./db/notes/schema.ts",
  out: "./drizzle",
} satisfies Config;