import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { getAllPublished } from "../lib/notion";
import Layout from "../components/Layout";

export default function Home({ posts }) {
  if (!posts) return <h1>No posts</h1>;

  return (
    <Layout home={true}>
      <div className="flex flex-col items-center justify-center text-gray-900">
        <Head>
          <title>My Blog</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center py-24 min-h-screen">
          <div className="w-40 h-40 relative mb-4 rounded-full overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              property
              className="object-cover object-left"
            />
          </div>
          <h1 className="text-6xl font-bold text-center">My Blog</h1>
          <p className="my-4 text-lg">
            Welcome to my blog! This is where I share my thoughts on all things
            tech.
          </p>
          <div className="flex space-x-4">
            <FaReact className="w-12 h-12" />
            <SiTailwindcss className="w-12 h-12" />
          </div>
        </div>

        {/* Latest Blog */}
        <div className="w-full py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {posts.map((post, index) => (
                <Link href={`/posts/${post.slug}`} key={index}>
                  <div className="my-4 border border-gray-200 p-4 rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <div>
                      <div className="text-gray-600">{post.date}</div>
                      <p>{post.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllPublished();

  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
};
