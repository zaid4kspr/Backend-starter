import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1704409521819 implements MigrationInterface {
  name = 'first1704409521819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo_entity" ("id" SERIAL NOT NULL, "name" character varying, "url" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e3a5807b27c3b7e1f36c9e65fac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "firstName" character varying(25) NOT NULL, "lastName" character varying(25) NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client_entity" ("id" SERIAL NOT NULL, "firstName" character varying(25) NOT NULL, "lastName" character varying(25) NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "avatar" character varying NOT NULL, CONSTRAINT "UQ_6293da38f0cd82179891e274d5f" UNIQUE ("email"), CONSTRAINT "PK_b730a3f25cd74d13a5cb68cbc59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "photo_entity" ADD CONSTRAINT "FK_19cd6e42249b6491818b06a550e" FOREIGN KEY ("userId") REFERENCES "client_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "photo_entity" DROP CONSTRAINT "FK_19cd6e42249b6491818b06a550e"`);
    await queryRunner.query(`DROP TABLE "client_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "photo_entity"`);
  }
}
