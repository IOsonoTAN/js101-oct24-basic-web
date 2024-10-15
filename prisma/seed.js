const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const password = '123456';
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com', password: hashedPassword },
      { name: 'Bob', email: 'bob@example.com', password: hashedPassword },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
