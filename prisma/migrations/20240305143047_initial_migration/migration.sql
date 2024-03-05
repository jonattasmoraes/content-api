-- CreateTable
CREATE TABLE "api_content" (
    "id" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "aboutPage" TEXT NOT NULL,

    CONSTRAINT "api_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "urlIcon" TEXT NOT NULL,
    "aboutProject" TEXT NOT NULL,
    "infos" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "deployUrl" TEXT NOT NULL,

    CONSTRAINT "api_projects_pkey" PRIMARY KEY ("id")
);
