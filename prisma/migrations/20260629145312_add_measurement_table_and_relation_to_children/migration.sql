/*
  Warnings:

  - You are about to drop the `children` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `parents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Childrentatus" AS ENUM ('NORMAL', 'LOWRISK', 'HIGHRISK');

-- DropForeignKey
ALTER TABLE "children" DROP CONSTRAINT "children_parent_id_fkey";

-- DropTable
DROP TABLE "children";

-- CreateTable
CREATE TABLE "childrens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "parent_id" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "status" "Childrentatus",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "childrens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurements" (
    "id" TEXT NOT NULL,
    "children_id" TEXT NOT NULL,
    "measurement_date" TIMESTAMP(3) NOT NULL,
    "age_month" INTEGER NOT NULL,
    "body_weight" DOUBLE PRECISION NOT NULL,
    "body_height" DOUBLE PRECISION NOT NULL,
    "head_circumference" DOUBLE PRECISION,
    "zscore_bb" DOUBLE PRECISION,
    "zscore_tb" DOUBLE PRECISION,
    "zscore_lk" DOUBLE PRECISION,
    "zscore_gizi" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parents_phone_number_key" ON "parents"("phone_number");

-- AddForeignKey
ALTER TABLE "childrens" ADD CONSTRAINT "childrens_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "childrens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
