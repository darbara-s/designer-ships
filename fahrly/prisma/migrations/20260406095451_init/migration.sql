-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "overallRating" REAL NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "passRate" INTEGER NOT NULL,
    "priceRange" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "hasIntensiveCourse" BOOLEAN NOT NULL DEFAULT false,
    "acceptingStudents" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
