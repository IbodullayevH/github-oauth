/*
  Warnings:

  - You are about to drop the column `email` on the `users_db` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `users_db` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users_db` table. All the data in the column will be lost.
  - Added the required column `emails` to the `users_db` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photos` to the `users_db` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_db" DROP COLUMN "email",
DROP COLUMN "fullname",
DROP COLUMN "password",
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "emails" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "photos" TEXT NOT NULL;
