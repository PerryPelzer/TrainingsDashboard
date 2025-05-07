-- CreateTable
CREATE TABLE "Trainingseinheit" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "beschreibung" TEXT NOT NULL,
    "dauer" INTEGER NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "erstelltAm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aktualisiertAm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trainingseinheit_pkey" PRIMARY KEY ("id")
);
