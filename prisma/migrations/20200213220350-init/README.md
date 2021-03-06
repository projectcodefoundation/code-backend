# Migration `20200213220350-init`

This migration has been generated by Oliver Ni at 2/13/2020, 10:03:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "bio" text  NOT NULL DEFAULT '',
    "email" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "name" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Course" (
    "id" SERIAL,
    "title" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Section" (
    "course" integer   ,
    "id" SERIAL,
    "title" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Lesson" (
    "id" SERIAL,
    "title" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Block" (
    "id" SERIAL,
    "lang" text  NOT NULL DEFAULT 'py',
    "lesson" integer   ,
    "source" text  NOT NULL DEFAULT '',
    "type" text  NOT NULL DEFAULT 'Markdown',
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Section" ADD FOREIGN KEY ("course") REFERENCES "public"."Course"("id") ON DELETE SET NULL

ALTER TABLE "public"."Block" ADD FOREIGN KEY ("lesson") REFERENCES "public"."Lesson"("id") ON DELETE SET NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200213220350-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,51 @@
+datasource db {
+    provider = "postgresql"
+    url      = "postgresql://prisma:6s2eYF^Y&DEYu+NV@159.65.65.201:5432/prisma"
+}
+
+model User {
+    id    Int    @id @default(autoincrement())
+    email String @unique
+    name  String
+    bio   String @default("")
+}
+
+model Course {
+    id       Int       @id @default(autoincrement())
+    title    String
+    sections Section[]
+}
+
+model Section {
+    id    Int    @id @default(autoincrement())
+    title String
+}
+
+model Lesson {
+    id     Int     @id @default(autoincrement())
+    title  String
+    blocks Block[]
+}
+
+model Block {
+    id     Int       @id @default(autoincrement())
+    type   BlockType
+    lang   Language
+    source String
+}
+
+enum BlockType {
+    Markdown
+    Code
+}
+
+enum Language {
+    py
+    js
+    html
+    text
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
```


