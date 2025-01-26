-- CreateTable
CREATE TABLE "game_state" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cookies" INTEGER NOT NULL DEFAULT 0,
    "click_value" INTEGER NOT NULL DEFAULT 1,
    "auto_clickers" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
