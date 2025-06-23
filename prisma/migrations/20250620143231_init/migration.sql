-- CreateTable
CREATE TABLE "depoimentos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "relacao" TEXT,
    "descricao" TEXT,
    "video_drive_id" TEXT,
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "depoimentos_pkey" PRIMARY KEY ("id")
);
