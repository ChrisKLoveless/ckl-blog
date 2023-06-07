import { prisma } from "~/db.server";

export async function getPosts() {
  return prisma.post.findMany();
}

export function getPost( slug: string) {
  return prisma.post.findFirst({
    where: { slug },
    select: { markdown: true, title: true }
  });
}