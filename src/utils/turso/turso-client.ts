import { createClient } from "@tursodatabase/api";

const TURSO_TOKEN = process.env.TURSO_TOKEN;
const TURSO_ORG = process.env.TURSO_ORG;

if (!TURSO_TOKEN || !TURSO_ORG) {
  throw new Error("Turso environment variables are not set");
}

export const turso = createClient({
  org: TURSO_ORG,
  token: TURSO_TOKEN,
});
