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
  console.log(post);
  return (
    <Layout>
      <section className="prose py-12">
        <h2>{post.metadata.title}</h2>
        <span>{post.metadata.date}</span>
        <p>{post.metadata.tags.join(", ")}</p>
        <ReactMarkdown>{post.markdown}</ReactMarkdown>
      </section>
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
