-- AlterTable
ALTER TABLE "childrens" ADD COLUMN     "education" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "referral" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplement" BOOLEAN NOT NULL DEFAULT false;
