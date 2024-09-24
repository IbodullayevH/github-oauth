-- CreateTable
CREATE TABLE "users_db" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_db_pkey" PRIMARY KEY ("id")
);
