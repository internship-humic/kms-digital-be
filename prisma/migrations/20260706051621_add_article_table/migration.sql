-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('ACTIVITY', 'NUTRITION', 'HEALTH');

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "cover_image" TEXT,
    "writer_name" TEXT NOT NULL,
    "writer_identity" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
