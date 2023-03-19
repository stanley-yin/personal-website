// const Post = () => {
//   return <h1>Post</h1>;
// };

/*
Similarly to the blog overview page, you will be pre-rendering each post page.

In /pages/posts/[slug].js, add the getStaticProps() function after the Post component and call the getSingleBlogPostBySlug function to fetch the blog post from Notion.
*/

import ReactMarkdown from "react-markdown";
import { getAllPublished, getSinglePost } from "../../lib/notion";
import Layout from "../../components/layout";

export default function Post({ post }) {
  const lines = post.markdown.split("\n");
  // const menu = lines.forEach((line) => {});
  console.log(post.markdown.split("\n"));
  return (
    <Layout>
      <div className="py-12">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-2">{post.metadata.title}</h1>
          <span>{post.metadata.date}</span>
          <div className="border my-8" />
        </div>
        <div className="flex gap-x-24">
          <ReactMarkdown className="prose">{post.markdown}</ReactMarkdown>
          <div>
            <p>目錄</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};
