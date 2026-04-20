import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  tablesFilter: ["nextn_*", "pendientes_maw", "blog_posts", "qr_codes_tracked", "qr_scans", "feedback_projects", "client_accesses", "feedback_comments", "feedback_comments_resolved"],
});
