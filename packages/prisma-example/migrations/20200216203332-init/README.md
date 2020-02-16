# Migration `20200216203332-init`

This migration has been generated by Roman Paradeev at 2/16/2020, 8:33:32 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."User" (
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '' 
) 

CREATE TABLE "quaint"."Batch" (
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "user" INTEGER   ,FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL
) 

CREATE TABLE "quaint"."Task" (
    "batch" INTEGER   ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false ,FOREIGN KEY ("batch") REFERENCES "Batch"("id") ON DELETE SET NULL
) 

CREATE UNIQUE INDEX "quaint"."User.name" ON "User"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200216203332-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
+datasource db {
+  provider = "sqlite"
+  url      = "sqlite:./prisma2.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id      Int     @id @default(autoincrement())
+  name    String  @unique
+  batches Batch[]
+}
+
+model Batch {
+  id    Int    @id @default(autoincrement())
+  tasks Task[]
+}
+
+model Task {
+  id          Int     @id @default(autoincrement())
+  isCompleted Boolean
+}
```

