-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "location_name" TEXT NOT NULL,
    "location_number" TEXT NOT NULL,
    "area" INTEGER NOT NULL,
    "parentIds" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);
