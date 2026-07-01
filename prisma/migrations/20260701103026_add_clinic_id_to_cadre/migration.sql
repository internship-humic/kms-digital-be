/*
  Warnings:

  - Added the required column `clinic_id` to the `cadres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cadres" ADD COLUMN     "clinic_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cadres" ADD CONSTRAINT "cadres_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
