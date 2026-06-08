/*
  Warnings:

  - Added the required column `address` to the `parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `parents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parents" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "clinic_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "children" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "parent_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "village_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_village_id_fkey" FOREIGN KEY ("village_id") REFERENCES "villages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
