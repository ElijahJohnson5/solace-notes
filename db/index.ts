import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
 
const sqlite = new Database('sqlite.db');
const db: BetterSQLite3Database = drizzle(sqlite);

(async () => await migrate(db, { migrationsFolder: "drizzle" }))();

export default db;