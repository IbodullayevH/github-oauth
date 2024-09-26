-- CreateTable
CREATE TABLE "users_db" (
    "id" SERIAL NOT NULL,
    "userId" TEXT DEFAULT '',
    "displayName" TEXT NOT NULL,
    "username" TEXT DEFAULT '',
    "profileUrl" TEXT DEFAULT '',
    "emails" TEXT NOT NULL,
    "photos" TEXT NOT NULL,

    CONSTRAINT "users_db_pkey" PRIMARY KEY ("id")
);
