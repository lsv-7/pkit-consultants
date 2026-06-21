import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.admin.upsert({
    where: {
      email: "admin@pkitconsultants.com",
    },
    update: {},
    create: {
      name: "PKIT Admin",
      email: "admin@pkitconsultants.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin created successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });