/*
  Warnings:

  - Added the required column `clinic_id` to the `measurements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "measurements" ADD COLUMN     "clinic_id" TEXT NOT NULL,
ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
