/*
  Warnings:

  - You are about to drop the `game_state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `added_value` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `inflation_rate` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `total_cookies` on the `User` table. All the data in the column will be lost.
  - Added the required column `addedValue` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inflationRate` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "game_state";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameState" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cookies" INTEGER NOT NULL DEFAULT 0,
    "clickValue" INTEGER NOT NULL DEFAULT 1,
    "autoClickers" INTEGER NOT NULL DEFAULT 0
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "addedValue" INTEGER NOT NULL,
    "inflationRate" REAL NOT NULL
);
INSERT INTO "new_Shop" ("id", "name", "price") SELECT "id", "name", "price" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "totalCookies" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("id", "password", "username") SELECT "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
