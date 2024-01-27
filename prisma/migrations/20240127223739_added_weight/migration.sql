-- CreateTable
CREATE TABLE "Weight" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "targetWeight" INTEGER,
    "unit" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredWeight" (
    "id" TEXT NOT NULL,
    "weightId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "RegisteredWeight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredWeight" ADD CONSTRAINT "RegisteredWeight_weightId_fkey" FOREIGN KEY ("weightId") REFERENCES "Weight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredWeight" ADD CONSTRAINT "RegisteredWeight_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
