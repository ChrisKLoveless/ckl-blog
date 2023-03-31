import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });
  
  console.log(`Database has been seeded. 🌱`);
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const posts = [
  {
    slug: "my-first-post",
    title: "My First Post",
    markdown: `
      # This is my first blog post

      Isn't it great?
      `.trim(),
  },
  {
    slug: "downhill-MTB",
    title: "Downhill Mountain Biking Near Me",
    markdown: `
      # Downhill Mountain Biking Near Me
      - Sandy Ridge Trial System
      - Timberline Bike Park

      `.trim(),
  },
];


console.log(`Database has been seeded!`);
