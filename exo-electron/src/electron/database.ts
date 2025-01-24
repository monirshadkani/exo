import Database from "better-sqlite3";

// path to the SQLite database file
const dbPath = "game.db";

// initialize the database
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS game_state (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cookies INTEGER DEFAULT 0,
    click_value INTEGER DEFAULT 1,
    auto_clickers INTEGER DEFAULT 0 
  );
`);

//save the game state
export function saveGameState(
  cookies: number,
  clickValue: number,
  autoClickers: number
): void {
  const stmt = db.prepare(`
      INSERT OR REPLACE INTO game_state (id, cookies, click_value, auto_clickers)
      VALUES (1, ?, ?, ?)
    `);
  stmt.run(cookies, clickValue, autoClickers);
}
