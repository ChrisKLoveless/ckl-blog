import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Form, Link, Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import { useUser } from "~/utils";

type Post = {
  slug: string;
  title: string;
};


type LoaderData = {
  posts: Post[] | null;
};;

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return json<LoaderData>({ posts });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();
  const user = useUser();


  return (
    <main>
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to="/">Blog Posts</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
        <Link to="/">
        <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Home
          </button>
        </Link>
      </header>
      {posts ? (
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex-1 p-6">
          <Outlet />
      </div>
    </main>
  );
}
